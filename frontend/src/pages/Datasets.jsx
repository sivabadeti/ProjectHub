import { useState, useEffect } from "react";

import {
  Search,
  Database,
  ExternalLink,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  BarChart3,
  FileSpreadsheet,
  Loader2,
  Download,
  Heart,
  CalendarDays,
} from "lucide-react";


function Datasets() {

  const [search, setSearch] = useState("");
  const [source, setSource] = useState("All");
  const [domain, setDomain] = useState("All");
  const [sortBy, setSortBy] = useState("Relevance");


  // ================= BACKEND STATES =================

  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);


  // ================= PAGE ANIMATION =================

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 80);

    return () => clearTimeout(timer);

  }, []);


  // ================= SOURCES =================

  const sources = [
    "All",
    "Kaggle",
    "Hugging Face",
  ];


  // ================= DOMAINS =================

  const domains = [
    "All",
    "AI / ML",
    "Data Science",
    "Data Analytics",
    "Healthcare",
    "Finance",
    "Education",
    "NLP",
    "Computer Vision",
  ];


  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = async () => {

    if (!search.trim()) {

      setError(
        "Please enter a dataset or topic to search."
      );

      return;
    }


    setLoading(true);
    setError("");
    setHasSearched(true);
    setDatasets([]);


    try {

      const response = await fetch(
        "http://localhost:5000/api/datasets/search",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            query: search.trim(),
            source,
            domain,
            sortBy,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to search datasets."
        );

      }


      setDatasets(
        data.datasets || []
      );


    } catch (error) {

      console.error(
        "Dataset Search Error:",
        error
      );


      setError(
        error.message ||
        "Unable to connect to the server."
      );


      setDatasets([]);


    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // ENTER KEY
  // =========================================================

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      handleSearch();
    }

  };


  // =========================================================
  // NUMBER FORMAT
  // =========================================================

  const formatNumber = (number) => {

    if (!number) {
      return "0";
    }


    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(number);

  };


  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatDate = (date) => {

    if (!date) {
      return "";
    }


    const parsedDate = new Date(date);


    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {

      return "";

    }


    return parsedDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );

  };


  return (

    <>
      {/* =====================================================
          PROFESSIONAL ANIMATIONS
      ===================================================== */}

      <style>{`

        @keyframes pageFadeIn {

          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }


        @keyframes sectionFadeIn {

          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }


        @keyframes datasetCardIn {

          from {
            opacity: 0;
            transform: translateY(15px) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

        }


        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {

            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;

          }

        }

      `}</style>


      <main
        className={`
          min-h-screen
          bg-[#070a0f]
          px-5
          pb-20
          pt-28
          text-white
          md:px-10

          transition-all
          duration-700
          ease-out

          ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }
        `}
      >

        <section className="mx-auto max-w-7xl">


          {/* =====================================================
              HEADER
          ===================================================== */}

          <div
            className="
              mb-10

              animate-[sectionFadeIn_0.7s_ease-out_both]
            "
          >

            <div
              className="
                mb-3
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-cyan-400
              "
            >

              <Database
                size={16}
                className="
                  transition-transform
                  duration-300
                  hover:-translate-y-0.5
                "
              />

              DATASET DISCOVERY

            </div>


            <h1
              className="
                text-3xl
                font-semibold
                tracking-tight
                text-white
                md:text-5xl
              "
            >
              Find the right data for your project
            </h1>


            <p
              className="
                mt-4
                max-w-2xl
                text-sm
                leading-6
                text-gray-500
                md:text-base
              "
            >
              Discover datasets from trusted sources and
              find the data you need to build, train,
              and experiment with your ideas.
            </p>

          </div>


          {/* =====================================================
              SEARCH
          ===================================================== */}

          <div
            className="
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#0d1118]
              p-2

              transition-all
              duration-500
              ease-out

              hover:border-white/[0.12]
              hover:-translate-y-[1px]

              focus-within:border-violet-500/30
              focus-within:shadow-[0_0_40px_rgba(124,58,237,0.05)]
              focus-within:-translate-y-[1px]

              animate-[sectionFadeIn_0.7s_ease-out_0.12s_both]
            "
          >

            <div className="flex items-center">


              <Search
                size={22}
                strokeWidth={1.7}
                className="
                  ml-4
                  shrink-0
                  text-gray-500

                  transition-all
                  duration-300
                "
              />


              <input
                type="text"
                value={search}
                onChange={(e) => {

                  setSearch(e.target.value);

                  if (error) {
                    setError("");
                  }

                }}
                onKeyDown={handleKeyDown}
                placeholder="Search datasets, topics, or keywords..."
                className="
                  h-14
                  min-w-0
                  flex-1
                  bg-transparent
                  px-4
                  text-[15px]
                  font-medium
                  text-white
                  outline-none
                  placeholder:text-gray-600
                "
              />


              <button
                onClick={handleSearch}
                disabled={loading}
                className="
                  flex
                  h-12
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  text-sm
                  font-semibold
                  text-black

                  transition-all
                  duration-200
                  ease-out

                  hover:bg-gray-100
                  hover:-translate-y-[1px]
                  hover:shadow-[0_8px_25px_rgba(255,255,255,0.08)]

                  active:translate-y-0
                  active:scale-[0.97]

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {loading ? (

                  <>

                    <Loader2
                      size={16}
                      className="animate-spin"
                    />

                    Searching

                  </>

                ) : (

                  <>

                    <Search
                      size={16}
                      className="
                        transition-transform
                        duration-300
                      "
                    />

                    Search

                  </>

                )}

              </button>

            </div>

          </div>


          <p
            className="
              mt-3
              px-1
              text-xs
              text-gray-600

              animate-[sectionFadeIn_0.6s_ease-out_0.2s_both]
            "
          >
            Try: customer churn, medical images,
            stock market, sentiment analysis
          </p>


          {/* =====================================================
              FILTERS
          ===================================================== */}

          <div
            className="
              mt-10
              grid
              gap-5
              lg:grid-cols-[1fr_1fr_220px]
            "
          >


            {/* ================= SOURCE ================= */}

            <div
              className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#0c1017]
                p-5

                transition-all
                duration-300
                ease-out

                hover:-translate-y-[2px]
                hover:border-white/[0.11]
                hover:shadow-[0_12px_35px_rgba(0,0,0,0.15)]

                animate-[sectionFadeIn_0.7s_ease-out_0.3s_both]
              "
            >

              <div
                className="
                  mb-4
                  flex
                  items-center
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Database
                    size={16}
                    className="
                      text-gray-400
                      transition-transform
                      duration-300
                    "
                  />

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-gray-200
                    "
                  >
                    Source
                  </span>

                </div>


                <span
                  className="
                    text-xs
                    text-gray-600
                  "
                >
                  Dataset provider
                </span>

              </div>


              <div className="flex flex-wrap gap-2">

                {sources.map(
                  (item, index) => (

                    <button
                      key={item}
                      onClick={() =>
                        setSource(item)
                      }
                      style={{
                        animationDelay:
                          `${index * 50}ms`,
                      }}
                      className={`
                        rounded-lg
                        border
                        px-3.5
                        py-2
                        text-xs
                        font-medium

                        opacity-0
                        animate-[pageFadeIn_0.4s_ease-out_forwards]

                        transition-all
                        duration-200
                        ease-out

                        active:scale-95

                        ${
                          source === item

                            ? `
                              border-violet-500/50
                              bg-violet-500/10
                              text-violet-300
                              shadow-[0_0_20px_rgba(139,92,246,0.06)]
                            `

                            : `
                              border-white/[0.07]
                              bg-white/[0.02]
                              text-gray-500

                              hover:border-white/[0.14]
                              hover:text-gray-300
                              hover:bg-white/[0.04]
                              hover:-translate-y-[1px]
                            `
                        }
                      `}
                    >

                      {item}

                    </button>

                  )
                )}

              </div>

            </div>


            {/* ================= DOMAIN ================= */}

            <div
              className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#0c1017]
                p-5

                transition-all
                duration-300
                ease-out

                hover:-translate-y-[2px]
                hover:border-white/[0.11]
                hover:shadow-[0_12px_35px_rgba(0,0,0,0.15)]

                animate-[sectionFadeIn_0.7s_ease-out_0.4s_both]
              "
            >

              <div
                className="
                  mb-4
                  flex
                  items-center
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <SlidersHorizontal
                    size={16}
                    className="
                      text-gray-400
                      transition-transform
                      duration-300
                      hover:rotate-6
                    "
                  />

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-gray-200
                    "
                  >
                    Domain
                  </span>

                </div>


                <span
                  className="
                    text-xs
                    text-gray-600
                  "
                >
                  What are you building?
                </span>

              </div>


              <div className="flex flex-wrap gap-2">

                {domains.map(
                  (item, index) => (

                    <button
                      key={item}
                      onClick={() =>
                        setDomain(item)
                      }
                      style={{
                        animationDelay:
                          `${index * 35}ms`,
                      }}
                      className={`
                        rounded-lg
                        border
                        px-3
                        py-2
                        text-xs
                        font-medium

                        opacity-0
                        animate-[pageFadeIn_0.4s_ease-out_forwards]

                        transition-all
                        duration-200
                        ease-out

                        active:scale-95

                        ${
                          domain === item

                            ? `
                              border-cyan-400/40
                              bg-cyan-400/10
                              text-cyan-300
                            `

                            : `
                              border-white/[0.07]
                              bg-white/[0.02]
                              text-gray-500

                              hover:border-white/[0.14]
                              hover:text-gray-300
                              hover:bg-white/[0.04]
                              hover:-translate-y-[1px]
                            `
                        }
                      `}
                    >

                      {item}

                    </button>

                  )
                )}

              </div>

            </div>


            {/* ================= SORT ================= */}

            <div
              className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#0c1017]
                p-5

                transition-all
                duration-300
                ease-out

                hover:-translate-y-[2px]
                hover:border-white/[0.11]
                hover:shadow-[0_12px_35px_rgba(0,0,0,0.15)]

                animate-[sectionFadeIn_0.7s_ease-out_0.5s_both]
              "
            >

              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                "
              >

                <BarChart3
                  size={16}
                  className="
                    text-gray-400
                    transition-transform
                    duration-300
                    hover:-translate-y-0.5
                  "
                />

                <span
                  className="
                    text-sm
                    font-semibold
                    text-gray-200
                  "
                >
                  Sort by
                </span>

              </div>


              <div className="relative">

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="
                    h-10
                    w-full
                    appearance-none
                    rounded-lg
                    border
                    border-white/[0.08]
                    bg-[#10151d]
                    px-3
                    text-xs
                    font-medium
                    text-gray-300
                    outline-none

                    transition-all
                    duration-300

                    hover:border-white/[0.14]

                    focus:border-violet-500/40
                    focus:shadow-[0_0_20px_rgba(139,92,246,0.05)]
                  "
                >

                  <option value="Relevance">
                    Relevance
                  </option>

                  <option value="Most Recent">
                    Most Recent
                  </option>

                  <option value="Most Popular">
                    Most Popular
                  </option>

                  <option value="Most Downloaded">
                    Most Downloaded
                  </option>

                </select>


                <ChevronDown
                  size={15}
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500

                    transition-transform
                    duration-300
                  "
                />

              </div>

            </div>

          </div>


          {/* =====================================================
              RESULTS HEADER
          ===================================================== */}

          <div
            className="
              mt-12
              flex
              items-center
              justify-between
              border-b
              border-white/[0.06]
              pb-4

              animate-[sectionFadeIn_0.6s_ease-out_0.55s_both]
            "
          >

            <div>

              <h2
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                Explore datasets
              </h2>


              <p
                className="
                  mt-1
                  text-xs
                  text-gray-600
                "
              >

                {hasSearched
                  ? `${datasets.length} dataset${
                      datasets.length === 1
                        ? ""
                        : "s"
                    } found`
                  : "Results from trusted dataset repositories"}

              </p>

            </div>


            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                text-gray-500
              "
            >

              <Sparkles
                size={14}
                className="
                  transition-transform
                  duration-500
                  hover:rotate-12
                "
              />

              Powered by multiple sources

            </div>

          </div>


          {/* =====================================================
              ERROR
          ===================================================== */}

          {error && (

            <div
              className="
                mt-6
                rounded-xl
                border
                border-red-500/20
                bg-red-500/[0.05]
                px-4
                py-3
                text-sm
                text-red-300

                animate-[sectionFadeIn_0.4s_ease-out_both]
              "
            >

              {error}

            </div>

          )}


          {/* =====================================================
              LOADING
          ===================================================== */}

          {loading && (

            <div
              className="
                mt-6
                flex
                min-h-[330px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#0b0f16]

                animate-[sectionFadeIn_0.4s_ease-out_both]
              "
            >

              <Loader2
                size={30}
                strokeWidth={1.5}
                className="
                  animate-spin
                  text-violet-400
                "
              />


              <p
                className="
                  mt-4
                  text-sm
                  text-gray-400
                "
              >
                Searching trusted dataset sources...
              </p>

            </div>

          )}


          {/* =====================================================
              RESULTS
          ===================================================== */}

          {!loading &&
            datasets.length > 0 && (

              <div
                className="
                  mt-6
                  space-y-4
                "
              >

                {datasets.map(
                  (dataset, index) => (

                    <article
                      key={`${dataset.source}-${dataset.ref}-${index}`}
                      style={{
                        animationDelay:
                          `${index * 80}ms`,
                      }}
                      className="
                        group
                        rounded-2xl
                        border
                        border-white/[0.07]
                        bg-[#0c1017]
                        p-5

                        opacity-0
                        animate-[datasetCardIn_0.55s_ease-out_forwards]

                        transition-all
                        duration-300
                        ease-out

                        hover:-translate-y-[3px]
                        hover:border-white/[0.13]
                        hover:bg-[#0e131c]
                        hover:shadow-[0_15px_40px_rgba(0,0,0,0.18)]
                      "
                    >


                      {/* ================= CARD TOP ================= */}

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                      >

                        <div
                          className="
                            flex
                            min-w-0
                            items-start
                            gap-4
                          "
                        >

                          <div
                            className="
                              flex
                              h-11
                              w-11
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-white/[0.07]
                              bg-white/[0.025]

                              transition-all
                              duration-300

                              group-hover:border-violet-500/20
                              group-hover:bg-violet-500/[0.04]
                            "
                          >

                            <Database
                              size={20}
                              strokeWidth={1.5}
                              className="
                                text-violet-400

                                transition-transform
                                duration-300

                                group-hover:-translate-y-0.5
                              "
                            />

                          </div>


                          <div className="min-w-0">

                            <h3
                              className="
                                truncate
                                text-base
                                font-semibold
                                text-white

                                transition-colors
                                duration-300

                                group-hover:text-violet-300
                              "
                            >
                              {dataset.title}
                            </h3>


                            <span
                              className={`
                                mt-2
                                inline-flex
                                rounded-md
                                border
                                px-2
                                py-1
                                text-[10px]
                                font-semibold

                                transition-all
                                duration-300

                                ${
                                  dataset.source ===
                                  "Kaggle"

                                    ? `
                                      border-blue-400/20
                                      bg-blue-400/[0.06]
                                      text-blue-300
                                    `

                                    : `
                                      border-orange-400/20
                                      bg-orange-400/[0.06]
                                      text-orange-300
                                    `
                                }
                              `}
                            >

                              {dataset.source}

                            </span>

                          </div>

                        </div>

                      </div>


                      {/* ================= DESCRIPTION ================= */}

                      <p
                        className="
                          mt-4
                          line-clamp-2
                          max-w-4xl
                          text-sm
                          leading-6
                          text-gray-500

                          transition-colors
                          duration-300

                          group-hover:text-gray-400
                        "
                      >

                        {dataset.description ||
                          "No description available for this dataset."}

                      </p>


                      {/* ================= METADATA ================= */}

                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          items-center
                          gap-x-5
                          gap-y-2
                          text-xs
                          text-gray-600
                        "
                      >

                        {dataset.downloadCount > 0 && (

                          <span
                            className="
                              flex
                              items-center
                              gap-1.5

                              transition-colors
                              duration-200

                              group-hover:text-gray-500
                            "
                          >

                            <Download size={13} />

                            {formatNumber(
                              dataset.downloadCount
                            )}

                            {" "}downloads

                          </span>

                        )}


                        {dataset.likes > 0 && (

                          <span
                            className="
                              flex
                              items-center
                              gap-1.5

                              transition-colors
                              duration-200

                              group-hover:text-gray-500
                            "
                          >

                            <Heart size={13} />

                            {formatNumber(
                              dataset.likes
                            )}

                            {" "}likes

                          </span>

                        )}


                        {dataset.lastUpdated && (

                          <span
                            className="
                              flex
                              items-center
                              gap-1.5

                              transition-colors
                              duration-200

                              group-hover:text-gray-500
                            "
                          >

                            <CalendarDays
                              size={13}
                            />

                            Updated{" "}

                            {formatDate(
                              dataset.lastUpdated
                            )}

                          </span>

                        )}

                      </div>


                      {/* ================= CARD FOOTER ================= */}

                      <div
                        className="
                          mt-5
                          flex
                          items-center
                          justify-between
                          border-t
                          border-white/[0.06]
                          pt-4
                        "
                      >

                        <span
                          className="
                            truncate
                            pr-4
                            text-xs
                            text-gray-600

                            transition-colors
                            duration-300

                            group-hover:text-gray-500
                          "
                        >

                          {dataset.owner ||
                            dataset.source}

                        </span>


                        <a
                          href={dataset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-white/[0.08]
                            bg-white/[0.025]
                            px-3.5
                            py-2
                            text-xs
                            font-medium
                            text-gray-300

                            transition-all
                            duration-200
                            ease-out

                            hover:-translate-y-[1px]
                            hover:border-white/[0.15]
                            hover:bg-white/[0.05]
                            hover:text-white
                            hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]

                            active:translate-y-0
                            active:scale-[0.97]
                          "
                        >

                          View Dataset

                          <ExternalLink
                            size={13}
                            className="
                              transition-transform
                              duration-300

                              group-hover:translate-x-0.5
                              group-hover:-translate-y-0.5
                            "
                          />

                        </a>

                      </div>

                    </article>

                  )
                )}

              </div>

            )}


          {/* =====================================================
              EMPTY STATE
          ===================================================== */}

          {!loading &&
            !hasSearched &&
            datasets.length === 0 && (

              <div
                className="
                  mt-6
                  flex
                  min-h-[330px]
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-dashed
                  border-white/[0.08]
                  bg-[#0b0f16]
                  px-6
                  text-center

                  transition-all
                  duration-500

                  hover:border-white/[0.12]
                  hover:bg-[#0c1017]

                  animate-[sectionFadeIn_0.7s_ease-out_0.6s_both]
                "
              >

                <div
                  className="
                    mb-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.025]

                    transition-all
                    duration-500

                    hover:-translate-y-1
                    hover:border-violet-500/20
                    hover:bg-violet-500/[0.04]
                  "
                >

                  <FileSpreadsheet
                    size={28}
                    strokeWidth={1.4}
                    className="
                      text-gray-500

                      transition-all
                      duration-500

                      hover:text-violet-400
                      hover:scale-105
                    "
                  />

                </div>


                <h3
                  className="
                    text-base
                    font-semibold
                    text-gray-300
                  "
                >
                  No datasets to display yet
                </h3>


                <p
                  className="
                    mt-2
                    max-w-md
                    text-sm
                    leading-6
                    text-gray-600
                  "
                >
                  Search for a dataset above and
                  we'll find relevant results from
                  trusted sources such as Kaggle and
                  Hugging Face.
                </p>

              </div>

            )}


          {/* =====================================================
              NO RESULTS
          ===================================================== */}

          {!loading &&
            hasSearched &&
            datasets.length === 0 &&
            !error && (

              <div
                className="
                  mt-6
                  flex
                  min-h-[330px]
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-dashed
                  border-white/[0.08]
                  bg-[#0b0f16]
                  px-6
                  text-center

                  transition-all
                  duration-500

                  hover:border-white/[0.12]
                  hover:bg-[#0c1017]

                  animate-[sectionFadeIn_0.6s_ease-out_both]
                "
              >

                <div
                  className="
                    mb-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.025]

                    transition-all
                    duration-500

                    hover:-translate-y-1
                    hover:border-violet-500/20
                    hover:bg-violet-500/[0.04]
                  "
                >

                  <Database
                    size={28}
                    strokeWidth={1.4}
                    className="
                      text-gray-500

                      transition-all
                      duration-500

                      hover:text-violet-400
                      hover:scale-105
                    "
                  />

                </div>


                <h3
                  className="
                    text-base
                    font-semibold
                    text-gray-300
                  "
                >
                  No datasets found
                </h3>


                <p
                  className="
                    mt-2
                    max-w-md
                    text-sm
                    leading-6
                    text-gray-600
                  "
                >
                  Try a different keyword or select
                  another dataset source.
                </p>

              </div>

            )}

        </section>

      </main>

    </>

  );

}


export default Datasets;