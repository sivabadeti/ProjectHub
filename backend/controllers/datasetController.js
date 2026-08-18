const axios = require("axios");


// ======================================================
// SEARCH DATASETS
// ======================================================

const searchDatasets = async (req, res) => {
  try {

    const {
      query,
      source = "All",
      domain = "All",
      sortBy = "Relevance",
    } = req.body;


    // ==================================================
    // VALIDATE QUERY
    // ==================================================

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }


    const searchQuery = query.trim();


    // ==================================================
    // DATA ARRAYS
    // ==================================================

    let kaggleDatasets = [];
    let huggingFaceDatasets = [];


    // ==================================================
    // KAGGLE REQUEST
    // ==================================================

    const getKaggleDatasets = async () => {

      try {

        const response = await axios.get(
          "https://www.kaggle.com/api/v1/datasets/list",
          {
            params: {
              search: searchQuery,

              sortBy:
                sortBy === "Most Recent"
                  ? "updated"
                  : "hottest",

              page: 1,
            },

            headers: {
              Authorization:
                `Bearer ${process.env.KAGGLE_API_TOKEN}`,
            },
          }
        );


        const datasets = response.data || [];


        return datasets.map((dataset) => ({

          title: dataset.title,

          ref: dataset.ref,

          description:
            dataset.subtitle || "",

          owner:
            dataset.ownerName || "",

          source: "Kaggle",

          url:
            `https://www.kaggle.com/datasets/${dataset.ref}`,

          lastUpdated:
            dataset.lastUpdated || null,

          downloadCount:
            dataset.downloadCount || 0,

          voteCount:
            dataset.voteCount || 0,

          usabilityRating:
            dataset.usabilityRating || null,

          size:
            dataset.totalBytes || null,

        }));

      } catch (error) {

        console.error(
          "Kaggle API Error:",
          error.response?.data ||
          error.message
        );

        return [];

      }

    };


    // ==================================================
    // HUGGING FACE REQUEST
    // ==================================================

    const getHuggingFaceDatasets = async () => {

      try {

        const response = await axios.get(
          "https://huggingface.co/api/datasets",
          {
            params: {

              search: searchQuery,

              limit: 20,

              sort: "downloads",

              direction: -1,

            },
          }
        );


        const datasets = response.data || [];


        return datasets.map((dataset) => ({

          title: dataset.id,

          ref: dataset.id,

          description:
            dataset.description ||
            dataset.cardData?.description ||
            "",

          owner:
            dataset.author || "",

          source: "Hugging Face",

          url:
            `https://huggingface.co/datasets/${dataset.id}`,

          lastUpdated:
            dataset.lastModified || null,

          downloadCount:
            dataset.downloads || 0,

          likes:
            dataset.likes || 0,

          tags:
            dataset.tags || [],

          private:
            dataset.private || false,

        }));

      } catch (error) {

        console.error(
          "Hugging Face API Error:",
          error.response?.data ||
          error.message
        );

        return [];

      }

    };


    // ==================================================
    // DECIDE WHICH SOURCE TO SEARCH
    // ==================================================

    if (source === "Kaggle") {

      kaggleDatasets =
        await getKaggleDatasets();

    }


    else if (source === "Hugging Face") {

      huggingFaceDatasets =
        await getHuggingFaceDatasets();

    }


    else if (source === "All") {

      const [
        kaggleResults,
        huggingFaceResults,
      ] = await Promise.all([
        getKaggleDatasets(),
        getHuggingFaceDatasets(),
      ]);


      kaggleDatasets =
        kaggleResults;

      huggingFaceDatasets =
        huggingFaceResults;

    }


    else {

      return res.status(400).json({
        success: false,
        message: "Invalid dataset source.",
      });

    }


    // ==================================================
    // COMBINE RESULTS
    // ==================================================

    let datasets = [
      ...kaggleDatasets,
      ...huggingFaceDatasets,
    ];


    // ==================================================
    // REMOVE DUPLICATES
    // ==================================================

    const uniqueDatasets = Array.from(

      new Map(

        datasets.map((dataset) => [

          `${dataset.source}-${dataset.ref}`,

          dataset,

        ])

      ).values()

    );


    // ==================================================
    // SORT RESULTS
    // ==================================================

    if (sortBy === "Most Downloaded") {

      uniqueDatasets.sort(

        (a, b) =>

          (b.downloadCount || 0) -
          (a.downloadCount || 0)

      );

    }


    else if (sortBy === "Most Recent") {

      uniqueDatasets.sort(

        (a, b) =>

          new Date(
            b.lastUpdated || 0
          ) -

          new Date(
            a.lastUpdated || 0
          )

      );

    }


    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(200).json({

      success: true,

      source,

      query: searchQuery,

      domain,

      count:
        uniqueDatasets.length,

      datasets:
        uniqueDatasets,

    });


  } catch (error) {

    console.error(
      "Dataset Search Error:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Unable to search datasets.",

    });

  }
};


// ======================================================
// EXPORT
// ======================================================

module.exports = {
  searchDatasets,
};