import { useState, useEffect } from "react";

import {
  Search,
  Sparkles,
  ChevronDown,
  FolderSearch,
  Layers3,
  Loader2,
  Blocks,
} from "lucide-react";


function Projects() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");

  // ================= API STATES =================

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= PAGE ANIMATION =================

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 80);

    return () => clearTimeout(timer);
  }, []);


  // ================= CATEGORIES =================

  const categories = [
    "All",
    "Web Development",
    "Frontend",
    "Backend",
    "Full Stack",
    "AI & Machine Learning",
    "Data Science",
    "Data Analytics",
    "Mobile Development",
    "Cloud & DevOps",
    "Cybersecurity",
    "Game Development",
  ];


  // ================= DIFFICULTIES =================

  const difficulties = [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];


  // =========================================================
  // SEARCH PROJECTS
  // =========================================================

  const handleSearch = async () => {

    if (!search.trim()) {

      setError(
        "Please enter what you want to build."
      );

      return;
    }


    try {

      setLoading(true);
      setError("");
      setProjects([]);


      const response = await fetch(
        "http://localhost:5000/api/projects/search",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            query: search.trim(),
            category,
            difficulty,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to generate project ideas."
        );

      }


      setProjects(
        data.projects || []
      );


    } catch (error) {

      console.error(
        "Project search error:",
        error
      );


      setError(
        error.message ||
        "Unable to connect to the server."
      );


      setProjects([]);


    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // SEARCH ON ENTER
  // =========================================================

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      handleSearch();
    }

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


        @keyframes projectCardIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }


        @keyframes iconFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-2px);
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

          transition-all
          duration-700
          ease-out

          ${
            pageLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
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
                text-[16px]
                font-medium
                text-cyan-400
              "
            >

              <Blocks
                size={20}
                strokeWidth={1.8}
                className="
                  transition-transform
                  duration-300
                  hover:-translate-y-0.5
                "
              />

              PROJECT DISCOVERY

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
              Find your next project
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
              Discover project ideas tailored to your
              interests, skills, technologies, and
              experience level.
            </p>

          </div>


          {/* =====================================================
              SEARCH BOX
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

            <div
              className="
                flex
                items-center
              "
            >

              <Search
                size={22}
                strokeWidth={1.7}
                className="
                  ml-4
                  shrink-0
                  text-gray-500
                  transition-all
                  duration-300
                  focus-within:text-violet-400
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
                placeholder="What do you want to build, learn, or explore?"
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

                    Generating

                  </>

                ) : (

                  <>

                    <Sparkles
                      size={16}
                      className="
                        transition-transform
                        duration-300
                        group-hover:rotate-12
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
              animate-[sectionFadeIn_0.6s_ease-out_0.25s_both]
            "
          >
            Try: React portfolio, AI chatbot, healthcare
            application, machine learning project
          </p>


          {/* =====================================================
              FILTERS
          ===================================================== */}

          <section
            className="
              mt-10
              space-y-4
            "
          >


            {/* ================= CATEGORY ================= */}

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

                <div className="flex items-center gap-2">

                  <Layers3
                    size={16}
                    className="
                      text-gray-400
                      transition-transform
                      duration-300
                      hover:-rotate-3
                    "
                  />

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-gray-200
                    "
                  >
                    Category
                  </span>

                </div>


                <span
                  className="
                    text-xs
                    text-gray-600
                  "
                >
                  Choose a project domain
                </span>

              </div>


              <div className="flex flex-wrap gap-2">

                {categories.map((item, index) => (

                  <button
                    key={item}
                    onClick={() =>
                      setCategory(item)
                    }
                    style={{
                      animationDelay: `${index * 25}ms`,
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
                        category === item

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
                            hover:bg-white/[0.04]
                            hover:text-gray-300
                            hover:-translate-y-[1px]
                          `
                      }
                    `}
                  >

                    {item}

                  </button>

                ))}

              </div>

            </div>


            {/* ================= DIFFICULTY + SORT ================= */}

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
                  flex
                  flex-col
                  gap-6
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                "
              >


                {/* DIFFICULTY */}

                <div>

                  <div className="mb-4">

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-gray-200
                      "
                    >
                      Difficulty
                    </span>

                  </div>


                  <div className="flex flex-wrap gap-2">

                    {difficulties.map((item, index) => (

                      <button
                        key={item}
                        onClick={() =>
                          setDifficulty(item)
                        }
                        style={{
                          animationDelay: `${index * 50}ms`,
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
                            difficulty === item

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
                                hover:bg-white/[0.04]
                                hover:text-gray-300
                                hover:-translate-y-[1px]
                              `
                          }
                        `}
                      >

                        {item}

                      </button>

                    ))}

                  </div>

                </div>


                {/* SORT */}

                <div className="lg:min-w-[190px]">

                  <div className="mb-4">

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
                        pr-9
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

                      <option value="Latest">
                        Latest
                      </option>

                      <option value="Popular">
                        Popular
                      </option>

                      <option value="Beginner Friendly">
                        Beginner Friendly
                      </option>

                      <option value="Advanced">
                        Advanced
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

            </div>

          </section>


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
              RESULTS HEADER
          ===================================================== */}

          {projects.length > 0 && !loading && (

            <div
              className="
                mt-12
                flex
                items-center
                justify-between
                border-b
                border-white/[0.06]
                pb-4

                animate-[sectionFadeIn_0.6s_ease-out_both]
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-wider
                    text-violet-400
                  "
                >
                  Generated Ideas
                </p>


                <h2
                  className="
                    mt-1
                    text-lg
                    font-semibold
                    text-white
                  "
                >
                  Projects you could build
                </h2>

              </div>


              <span
                className="
                  text-xs
                  text-gray-500
                "
              >
                {projects.length} ideas
              </span>

            </div>

          )}


          {/* =====================================================
              PROJECT RESULTS
          ===================================================== */}

          {projects.length > 0 && !loading && (

            <div
              className="
                mt-6
                grid
                gap-4
                md:grid-cols-2
                xl:grid-cols-3
              "
            >

              {projects.map(
                (project, index) => (

                  <article
                    key={`${project.title}-${index}`}
                    style={{
                      animationDelay: `${index * 90}ms`,
                    }}
                    className="
                      group
                      flex
                      flex-col
                      rounded-2xl
                      border
                      border-white/[0.07]
                      bg-[#0c1017]
                      p-5

                      opacity-0
                      animate-[projectCardIn_0.55s_ease-out_forwards]

                      transition-all
                      duration-300
                      ease-out

                      hover:-translate-y-[4px]
                      hover:border-white/[0.13]
                      hover:bg-[#0e131c]
                      hover:shadow-[0_15px_40px_rgba(0,0,0,0.18)]
                    "
                  >

                    {/* TOP */}

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

                        <Blocks
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


                      <span
                        className={`
                          rounded-full
                          border
                          px-2.5
                          py-1
                          text-[10px]
                          font-medium

                          transition-all
                          duration-300

                          ${
                            project.difficulty ===
                            "Beginner"

                              ? `
                                border-emerald-500/20
                                bg-emerald-500/[0.06]
                                text-emerald-300
                              `

                              : project.difficulty ===
                                "Advanced"

                              ? `
                                border-red-500/20
                                bg-red-500/[0.06]
                                text-red-300
                              `

                              : `
                                border-amber-500/20
                                bg-amber-500/[0.06]
                                text-amber-300
                              `
                          }
                        `}
                      >

                        {project.difficulty}

                      </span>

                    </div>


                    {/* TITLE */}

                    <h3
                      className="
                        mt-5
                        text-lg
                        font-semibold
                        tracking-tight
                        text-white

                        transition-all
                        duration-300

                        group-hover:text-violet-300
                        group-hover:translate-x-[1px]
                      "
                    >

                      {project.title}

                    </h3>


                    {/* DESCRIPTION */}

                    <p
                      className="
                        mt-3
                        line-clamp-3
                        text-sm
                        leading-6
                        text-gray-400
                      "
                    >

                      {project.description}

                    </p>


                    {/* CATEGORY */}

                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-gray-500
                      "
                    >

                      <Layers3 size={13} />

                      <span>
                        {project.category}
                      </span>

                    </div>


                    {/* TECHNOLOGIES */}

                    {project.technologies?.length > 0 && (

                      <div className="mt-5">

                        <p
                          className="
                            mb-2
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-wider
                            text-gray-500
                          "
                        >
                          Technologies
                        </p>


                        <div
                          className="
                            flex
                            flex-wrap
                            gap-1.5
                          "
                        >

                          {project.technologies.map(
                            (tech, techIndex) => (

                              <span
                                key={`${tech}-${techIndex}`}
                                className="
                                  rounded-md
                                  border
                                  border-white/[0.07]
                                  bg-white/[0.025]
                                  px-2
                                  py-1
                                  text-[10px]
                                  font-medium
                                  text-gray-300

                                  transition-all
                                  duration-200

                                  hover:border-violet-500/20
                                  hover:bg-violet-500/[0.04]
                                  hover:text-violet-300
                                "
                              >

                                {tech}

                              </span>

                            )
                          )}

                        </div>

                      </div>

                    )}


                    {/* FEATURES */}

                    {project.features?.length > 0 && (

                      <div className="mt-5">

                        <p
                          className="
                            mb-2
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-wider
                            text-gray-500
                          "
                        >
                          Key Features
                        </p>


                        <ul className="space-y-1.5">

                          {project.features
                            .slice(0, 3)
                            .map(
                              (
                                feature,
                                featureIndex
                              ) => (

                                <li
                                  key={featureIndex}
                                  className="
                                    flex
                                    gap-2
                                    text-xs
                                    leading-5
                                    text-gray-400

                                    transition-colors
                                    duration-200

                                    group-hover:text-gray-300
                                  "
                                >

                                  <span
                                    className="
                                      mt-2
                                      h-1
                                      w-1
                                      shrink-0
                                      rounded-full
                                      bg-violet-400
                                    "
                                  />

                                  <span>
                                    {feature}
                                  </span>

                                </li>

                              )
                            )}

                        </ul>

                      </div>

                    )}


                    {/* LEARNING OUTCOMES */}

                    {project.learningOutcomes?.length > 0 && (

                      <div className="mt-5">

                        <p
                          className="
                            mb-2
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-wider
                            text-gray-500
                          "
                        >
                          You'll Learn
                        </p>


                        <div
                          className="
                            flex
                            flex-wrap
                            gap-1.5
                          "
                        >

                          {project.learningOutcomes
                            .slice(0, 3)
                            .map(
                              (
                                item,
                                itemIndex
                              ) => (

                                <span
                                  key={itemIndex}
                                  className="
                                    text-[10px]
                                    text-gray-400
                                  "
                                >

                                  {item}

                                  {itemIndex <
                                    Math.min(
                                      project
                                        .learningOutcomes
                                        .length,
                                      3
                                    ) -
                                      1 && (

                                    <span
                                      className="
                                        mx-1.5
                                        text-gray-600
                                      "
                                    >
                                      •
                                    </span>

                                  )}

                                </span>

                              )
                            )}

                        </div>

                      </div>

                    )}


                    {/* FOOTER */}

                    <div
                      className="
                        mt-6
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
                          text-[10px]
                          text-gray-600

                          transition-colors
                          duration-300

                          group-hover:text-gray-500
                        "
                      >
                        AI Generated
                      </span>

                    </div>

                  </article>

                )
              )}

            </div>

          )}


          {/* =====================================================
              LOADING STATE
          ===================================================== */}

          {loading && (

            <section
              className="
                mt-8
                grid
                gap-4
                md:grid-cols-2
                xl:grid-cols-3

                animate-[sectionFadeIn_0.4s_ease-out_both]
              "
            >

              {[1, 2, 3, 4, 5, 6].map(
                (item) => (

                  <div
                    key={item}
                    className="
                      h-[330px]
                      animate-pulse
                      rounded-2xl
                      border
                      border-white/[0.06]
                      bg-[#0c1017]
                    "
                  />

                )
              )}

            </section>

          )}


          {/* =====================================================
              EMPTY STATE
          ===================================================== */}

          {!loading &&
            projects.length === 0 &&
            !error && (

              <section
                className="
                  mt-8
                  flex
                  min-h-[330px]
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-dashed
                  border-white/[0.08]
                  bg-[#0b0f16]

                  transition-all
                  duration-500

                  hover:border-white/[0.12]
                  hover:bg-[#0c1017]

                  animate-[sectionFadeIn_0.7s_ease-out_0.5s_both]
                "
              >

                <div
                  className="
                    flex
                    max-w-md
                    flex-col
                    items-center
                    px-6
                    text-center
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

                    <FolderSearch
                      size={28}
                      strokeWidth={1.4}
                      className="
                        text-violet-400
                        transition-transform
                        duration-500
                        hover:scale-105
                      "
                    />

                  </div>


                  <h2
                    className="
                      text-base
                      font-semibold
                      text-gray-300
                    "
                  >
                    No ideas yet
                  </h2>


                  <p
                    className="
                      mt-2
                      max-w-sm
                      text-sm
                      leading-6
                      text-gray-600
                    "
                  >
                    Search for a technology,
                    project type, or idea and
                    discover projects you could
                    build.
                  </p>

                </div>

              </section>

            )}

        </section>

      </main>

    </>

  );

}


export default Projects;