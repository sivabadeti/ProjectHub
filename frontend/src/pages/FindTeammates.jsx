import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  SlidersHorizontal,
  MapPin,
  GraduationCap,
  Briefcase,
  Mail,
  ChevronDown,
  ChevronUp,
  X,
  Users,
  ExternalLink,
  Loader2,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";


const FindTeams = () => {

  // =========================================================
  // API URL
  // =========================================================

  const API_URL = (
    import.meta.env.VITE_API_URL || ""
  ).replace(/\/$/, "");


  // =========================================================
  // STATES
  // =========================================================

  const [users, setUsers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [selectedRole, setSelectedRole] =
    useState("");

  const [selectedSkill, setSelectedSkill] =
    useState("");

  const [selectedLocation, setSelectedLocation] =
    useState("");

  const [expandedUser, setExpandedUser] =
    useState(null);


  // =========================================================
  // FETCH USERS
  // =========================================================

  useEffect(() => {

    const fetchTeammates = async () => {

      try {

        setLoading(true);
        setError("");


        // Get logged-in user's JWT
        const token =
          localStorage.getItem("token");


        if (!token) {

          setError(
            "Please login to find teammates."
          );

          setLoading(false);

          return;
        }


        const response = await fetch(
          `${API_URL}/api/users/teammates`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "application/json",
            },
          }
        );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Unable to fetch teammates."
          );

        }


        setUsers(
          Array.isArray(data.users)
            ? data.users
            : []
        );


      } catch (err) {

        console.error(
          "Fetch teammates error:",
          err
        );

        setError(
          err.message ||
          "Unable to connect to the server."
        );


      } finally {

        setLoading(false);

      }

    };


    fetchTeammates();

  }, [API_URL]);


  // =========================================================
  // PROFILE IMAGE URL
  // =========================================================

  const getProfileImageUrl = (
    profilePicture
  ) => {

    if (!profilePicture) {
      return null;
    }


    // If backend already returns a complete URL
    if (
      profilePicture.startsWith(
        "http://"
      ) ||
      profilePicture.startsWith(
        "https://"
      )
    ) {
      return profilePicture;
    }


    // If backend returns:
    // /uploads/profile-pictures/abc.jpg

    return `${API_URL}${
      profilePicture.startsWith("/")
        ? profilePicture
        : `/${profilePicture}`
    }`;

  };


  // =========================================================
  // FILTER USERS
  // =========================================================

  const filteredUsers = useMemo(() => {

    const searchText =
      search.trim().toLowerCase();

    const roleText =
      selectedRole.trim().toLowerCase();

    const skillText =
      selectedSkill.trim().toLowerCase();

    const locationText =
      selectedLocation.trim().toLowerCase();


    return users.filter((user) => {

      const userSkills =
        Array.isArray(user.skills)
          ? user.skills
          : [];


      // -----------------------------------------
      // MAIN SEARCH
      // -----------------------------------------

      const matchesSearch =
        !searchText ||

        user.name
          ?.toLowerCase()
          .includes(searchText) ||

        user.role
          ?.toLowerCase()
          .includes(searchText) ||

        user.college
          ?.toLowerCase()
          .includes(searchText) ||

        user.location
          ?.toLowerCase()
          .includes(searchText) ||

        user.branch
          ?.toLowerCase()
          .includes(searchText) ||

        user.about
          ?.toLowerCase()
          .includes(searchText) ||

        userSkills.some((skill) =>
          String(skill)
            .toLowerCase()
            .includes(searchText)
        );


      // -----------------------------------------
      // ROLE TEXT FILTER
      // -----------------------------------------

      const matchesRole =
        !roleText ||
        user.role
          ?.toLowerCase()
          .includes(roleText);


      // -----------------------------------------
      // SKILL TEXT FILTER
      // -----------------------------------------

      const matchesSkill =
        !skillText ||
        userSkills.some((skill) =>
          String(skill)
            .toLowerCase()
            .includes(skillText)
        );


      // -----------------------------------------
      // LOCATION TEXT FILTER
      // -----------------------------------------

      const matchesLocation =
        !locationText ||
        user.location
          ?.toLowerCase()
          .includes(locationText);


      return (
        matchesSearch &&
        matchesRole &&
        matchesSkill &&
        matchesLocation
      );

    });

  }, [
    users,
    search,
    selectedRole,
    selectedSkill,
    selectedLocation,
  ]);


  // =========================================================
  // TOGGLE USER DETAILS
  // =========================================================

  const toggleUser = (id) => {

    setExpandedUser(
      expandedUser === id
        ? null
        : id
    );

  };


  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {

    setSearch("");
    setSelectedRole("");
    setSelectedSkill("");
    setSelectedLocation("");

  };


  const hasFilters =
    search.trim() !== "" ||
    selectedRole.trim() !== "" ||
    selectedSkill.trim() !== "" ||
    selectedLocation.trim() !== "";


  // =========================================================
  // RETRY
  // =========================================================

  const handleRetry = () => {

    window.location.reload();

  };


  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          bg-[#090b10]
          px-4
          pb-20
          pt-28
          text-white
          sm:px-6
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-center
            py-32
          "
        >

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-cyan-400/10
              bg-cyan-400/5
            "
          >

            <Loader2
              size={24}
              className="
                animate-spin
                text-cyan-300
              "
            />

          </div>


          <h2
            className="
              mt-5
              text-lg
              font-medium
            "
          >
            Finding teammates
          </h2>


          <p
            className="
              mt-2
              text-sm
              text-gray-600
            "
          >
            Discovering developers
            from the community...
          </p>

        </div>

      </div>

    );

  }


  // =========================================================
  // MAIN UI
  // =========================================================

  return (

    <div
      className="
        min-h-screen
        bg-[#090b10]
        px-4
        pb-20
        pt-28
        text-white
        sm:px-6
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-400/10
                bg-cyan-400/5
              "
            >

              <Users
                size={21}
                className="text-cyan-300"
              />

            </div>


            <div>

              <h1
                className="
                  text-2xl
                  font-semibold
                  tracking-tight
                  sm:text-3xl
                "
              >
                Find Teammates
              </h1>


              <p
                className="
                  mt-1
                  text-sm
                  text-gray-500
                "
              >
                Discover people with the
                skills you need.
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div
            className="
              mb-6
              rounded-2xl
              border
              border-red-400/10
              bg-red-400/5
              p-4
            "
          >

            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              <p
                className="
                  text-sm
                  text-red-300
                "
              >
                {error}
              </p>


              <button
                onClick={handleRetry}
                className="
                  rounded-lg
                  border
                  border-red-400/20
                  px-3
                  py-2
                  text-xs
                  text-red-300
                  transition
                  hover:bg-red-400/10
                "
              >
                Try Again
              </button>

            </div>

          </div>

        )}


        {/* =================================================
            SEARCH + FILTERS
        ================================================= */}

        <div
          className="
            mb-8
            rounded-2xl
            animate-[fadeInUp_0.45s_ease-out_both]
            border
            border-white/10
            bg-white/[0.025]
            p-4
            shadow-2xl
            shadow-black/10
            transition-all
            duration-300
            hover:border-white/[0.14]
          "
        >

          {/* SEARCH */}

          <div className="relative">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />


            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="
                Search by name, skill, role, college or location...
              "
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#0d1017]
                py-3
                pl-11
                pr-4
                text-sm
                text-white
                outline-none
                transition
                placeholder:text-gray-600
                focus:border-cyan-400/30
                focus:ring-2
                focus:ring-cyan-400/5
              "
            />

          </div>


          {/* FILTERS */}

          <div
            className="
              mt-4
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >

            {/* ROLE */}

            <div className="relative group">

              <Briefcase
                size={16}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  z-10
                  -translate-y-1/2
                  text-gray-600
                  transition-colors
                  duration-200
                  group-focus-within:text-cyan-300
                "
              />

              <input
                type="text"
                value={selectedRole}
                onChange={(e) =>
                  setSelectedRole(e.target.value)
                }
                placeholder="Filter by role"
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-[#0d1017]
                  px-9
                  py-3
                  text-sm
                  text-gray-300
                  outline-none
                  transition-all
                  duration-300
                  placeholder:text-gray-600
                  hover:border-white/20
                  focus:scale-[1.01]
                  focus:border-cyan-400/30
                  focus:bg-cyan-400/[0.02]
                  focus:ring-2
                  focus:ring-cyan-400/5
                "
              />

            </div>


            {/* SKILL */}

            <div className="relative group">

              <SlidersHorizontal
                size={16}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  z-10
                  -translate-y-1/2
                  text-gray-600
                  transition-colors
                  duration-200
                  group-focus-within:text-cyan-300
                "
              />

              <input
                type="text"
                value={selectedSkill}
                onChange={(e) =>
                  setSelectedSkill(e.target.value)
                }
                placeholder="Filter by skill"
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-[#0d1017]
                  px-9
                  py-3
                  text-sm
                  text-gray-300
                  outline-none
                  transition-all
                  duration-300
                  placeholder:text-gray-600
                  hover:border-white/20
                  focus:scale-[1.01]
                  focus:border-cyan-400/30
                  focus:bg-cyan-400/[0.02]
                  focus:ring-2
                  focus:ring-cyan-400/5
                "
              />

            </div>


            {/* LOCATION */}

            <div className="relative group">

              <MapPin
                size={16}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  z-10
                  -translate-y-1/2
                  text-gray-600
                  transition-colors
                  duration-200
                  group-focus-within:text-cyan-300
                "
              />

              <input
                type="text"
                value={selectedLocation}
                onChange={(e) =>
                  setSelectedLocation(
                    e.target.value
                  )
                }
                placeholder="Filter by location"
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-[#0d1017]
                  px-9
                  py-3
                  text-sm
                  text-gray-300
                  outline-none
                  transition-all
                  duration-300
                  placeholder:text-gray-600
                  hover:border-white/20
                  focus:scale-[1.01]
                  focus:border-cyan-400/30
                  focus:bg-cyan-400/[0.02]
                  focus:ring-2
                  focus:ring-cyan-400/5
                "
              />

            </div>


            {/* CLEAR */}

            <button
              onClick={clearFilters}
              disabled={!hasFilters}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/[0.02]
                px-4
                py-3
                text-sm
                text-gray-400
                transition-all
                duration-200
                hover:border-white/20
                hover:bg-white/5
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >

              <X size={16} />

              Clear Filters

            </button>

          </div>

        </div>


        {/* =================================================
            RESULTS HEADER
        ================================================= */}

        <div
          className="
            mb-5
            flex
            items-center
            justify-between
          "
        >

          <p
            className="
              text-sm
              text-gray-500
            "
          >

            Showing{" "}

            <span
              className="
                font-medium
                text-gray-300
              "
            >
              {filteredUsers.length}
            </span>{" "}

            teammate
            {filteredUsers.length !==
            1
              ? "s"
              : ""}

          </p>

        </div>


        {/* =================================================
            NO RESULTS
        ================================================= */}

        {filteredUsers.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              px-6
              py-20
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-white/5
              "
            >

              <Users
                size={24}
                className="text-gray-500"
              />

            </div>


            <h3
              className="
                mt-5
                text-lg
                font-medium
              "
            >
              No teammates found
            </h3>


            <p
              className="
                mt-2
                text-sm
                text-gray-600
              "
            >
              Try changing your search
              or filters.
            </p>


            {hasFilters && (

              <button
                onClick={clearFilters}
                className="
                  mt-5
                  rounded-xl
                  border
                  border-white/10
                  px-4
                  py-2.5
                  text-sm
                  text-gray-400
                  transition
                  hover:bg-white/5
                  hover:text-white
                "
              >
                Clear Filters
              </button>

            )}

          </div>

        ) : (

          /* =================================================
             USER CARDS
          ================================================= */

          <div
            className="
              grid
              grid-cols-1
              gap-5
              lg:grid-cols-2
            "
          >

            {filteredUsers.map(
              (user, index) => {

                const expanded =
                  expandedUser ===
                  user.id ||
                  expandedUser ===
                  user._id;


                const userId =
                  user.id ||
                  user._id;


                const profileImage =
                  getProfileImageUrl(
                    user.profilePicture
                  );


                const skills =
                  Array.isArray(
                    user.skills
                  )
                    ? user.skills
                    : [];


                const projects =
                  Array.isArray(
                    user.projects
                  )
                    ? user.projects
                    : [];


                const certifications =
                  Array.isArray(
                    user.certifications
                  )
                    ? user.certifications
                    : [];


                const experience =
                  Array.isArray(
                    user.experience
                  )
                    ? user.experience
                    : [];


                const achievements =
                  Array.isArray(
                    user.achievements
                  )
                    ? user.achievements
                    : [];


                return (

                  <div
                    key={userId}
                    className="
                      group
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-[#0d1017]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-cyan-400/20
                      hover:shadow-xl
                      hover:shadow-cyan-950/10
                    "
                    style={{
                      animation:
                        `fadeInUp 0.4s ease ${index * 70}ms both`,
                    }}
                  >

                    {/* =================================
                        BASIC CARD
                    ================================= */}

                    <div className="p-5">

                      <div
                        className="
                          flex
                          gap-4
                        "
                      >

                        {/* PROFILE IMAGE */}

                        <div
                          className="
                            h-16
                            w-16
                            shrink-0
                            overflow-hidden
                            rounded-2xl
                            border
                            border-white/10
                            bg-[#151922]
                          "
                        >

                          {profileImage ? (

                            <img
                              src={
                                profileImage
                              }
                              alt={
                                user.name ||
                                "User"
                              }
                              className="
                                h-full
                                w-full
                                object-cover
                                transition
                                duration-500
                                group-hover:scale-105
                              "
                              onError={(
                                e
                              ) => {

                                e.currentTarget.style.display =
                                  "none";

                              }}
                            />

                          ) : (

                            <div
                              className="
                                flex
                                h-full
                                w-full
                                items-center
                                justify-center
                                text-xl
                                font-semibold
                                text-gray-500
                              "
                            >

                              {user.name
                                ?.charAt(
                                  0
                                )
                                .toUpperCase()}

                            </div>

                          )}

                        </div>


                        {/* BASIC INFO */}

                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >

                          <div
                            className="
                              flex
                              items-start
                              justify-between
                              gap-3
                            "
                          >

                            <div>

                              <h2
                                className="
                                  truncate
                                  text-base
                                  font-semibold
                                  text-white
                                "
                              >
                                {user.name ||
                                  "Unnamed User"}
                              </h2>


                              <p
                                className="
                                  mt-0.5
                                  text-sm
                                  text-cyan-300/80
                                "
                              >
                                {user.role ||
                                  "Role not specified"}
                              </p>

                            </div>

                          </div>


                          <div
                            className="
                              mt-2
                              flex
                              flex-wrap
                              gap-x-3
                              gap-y-1
                              text-xs
                              text-gray-500
                            "
                          >

                            {user.college && (

                              <span
                                className="
                                  flex
                                  items-center
                                  gap-1
                                "
                              >

                                <GraduationCap
                                  size={13}
                                />

                                {user.college}

                              </span>

                            )}


                            {user.location && (

                              <span
                                className="
                                  flex
                                  items-center
                                  gap-1
                                "
                              >

                                <MapPin
                                  size={13}
                                />

                                {user.location}

                              </span>

                            )}

                          </div>

                        </div>

                      </div>


                      {/* ABOUT */}

                      {user.about && (

                        <p
                          className="
                            mt-4
                            line-clamp-2
                            text-sm
                            leading-6
                            text-gray-500
                          "
                        >
                          {user.about}
                        </p>

                      )}


                      {/* SKILLS */}

                      {skills.length > 0 && (

                        <div
                          className="
                            mt-4
                            flex
                            flex-wrap
                            gap-2
                          "
                        >

                          {skills
                            .slice(0, 5)
                            .map(
                              (skill) => (

                                <span
                                  key={skill}
                                  className="
                                    rounded-lg
                                    border
                                    border-white/10
                                    bg-white/[0.03]
                                    px-2.5
                                    py-1
                                    text-xs
                                    text-gray-400
                                    transition
                                    group-hover:border-cyan-400/10
                                    group-hover:text-gray-300
                                  "
                                >
                                  {skill}
                                </span>

                              )
                            )}


                          {skills.length >
                            5 && (

                            <span
                              className="
                                rounded-lg
                                px-2
                                py-1
                                text-xs
                                text-gray-600
                              "
                            >
                              +
                              {skills.length -
                                5}{" "}
                              more
                            </span>

                          )}

                        </div>

                      )}


                      {/* VIEW MORE */}

                      <button
                        onClick={() =>
                          toggleUser(
                            userId
                          )
                        }
                        className="
                          mt-5
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-white/10
                          bg-white/[0.02]
                          py-2.5
                          text-sm
                          font-medium
                          text-gray-400
                          transition-all
                          duration-200
                          hover:border-cyan-400/20
                          hover:bg-cyan-400/5
                          hover:text-cyan-300
                        "
                      >

                        {expanded
                          ? "Show Less"
                          : "View More"}

                        {expanded ? (
                          <ChevronUp
                            size={16}
                          />
                        ) : (
                          <ChevronDown
                            size={16}
                          />
                        )}

                      </button>

                    </div>


                    {/* =================================
                        EXPANDED DETAILS
                    ================================= */}

                    <div
                      className={`
                        grid
                        transition-all
                        duration-500
                        ease-in-out
                        ${
                          expanded
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }
                      `}
                    >

                      <div
                        className="
                          overflow-hidden
                        "
                      >

                        <div
                          className="
                            border-t
                            border-white/10
                            px-5
                            pb-5
                            pt-5
                          "
                        >

                          {/* ABOUT */}

                          {user.about && (

                            <div>

                              <h3
                                className="
                                  mb-2
                                  text-xs
                                  font-semibold
                                  uppercase
                                  tracking-wider
                                  text-gray-600
                                "
                              >
                                About
                              </h3>


                              <p
                                className="
                                  text-sm
                                  leading-6
                                  text-gray-400
                                "
                              >
                                {user.about}
                              </p>

                            </div>

                          )}


                          {/* EDUCATION */}

                          {(user.college ||
                            user.branch ||
                            user.year) && (

                            <div
                              className="
                                mt-6
                              "
                            >

                              <h3
                                className="
                                  mb-2
                                  text-xs
                                  font-semibold
                                  uppercase
                                  tracking-wider
                                  text-gray-600
                                "
                              >
                                Education
                              </h3>


                              {user.branch && (

                                <p
                                  className="
                                    text-sm
                                    text-gray-300
                                  "
                                >
                                  {user.branch}
                                </p>

                              )}


                              {user.college && (

                                <p
                                  className="
                                    mt-1
                                    text-sm
                                    text-gray-500
                                  "
                                >
                                  {user.college}
                                </p>

                              )}


                              {user.year && (

                                <p
                                  className="
                                    mt-1
                                    text-xs
                                    text-gray-600
                                  "
                                >
                                  {user.year}
                                </p>

                              )}

                            </div>

                          )}


                          {/* ALL SKILLS */}

                          {skills.length >
                            0 && (

                            <div
                              className="
                                mt-6
                              "
                            >

                              <h3
                                className="
                                  mb-2
                                  text-xs
                                  font-semibold
                                  uppercase
                                  tracking-wider
                                  text-gray-600
                                "
                              >
                                Skills
                              </h3>


                              <div
                                className="
                                  flex
                                  flex-wrap
                                  gap-2
                                "
                              >

                                {skills.map(
                                  (
                                    skill
                                  ) => (

                                    <span
                                      key={
                                        skill
                                      }
                                      className="
                                        rounded-lg
                                        border
                                        border-cyan-400/10
                                        bg-cyan-400/5
                                        px-2.5
                                        py-1.5
                                        text-xs
                                        text-cyan-200/80
                                      "
                                    >
                                      {
                                        skill
                                      }
                                    </span>

                                  )
                                )}

                              </div>

                            </div>

                          )}


                          {/* EXPERIENCE */}

                          {experience.length >
                            0 && (

                            <div
                              className="
                                mt-6
                              "
                            >

                              <h3
                                className="
                                  mb-3
                                  text-xs
                                  font-semibold
                                  uppercase
                                  tracking-wider
                                  text-gray-600
                                "
                              >
                                Experience
                              </h3>


                              <div
                                className="
                                  space-y-3
                                "
                              >

                                {experience.map(
                                  (
                                    item,
                                    i
                                  ) => (

                                    <div
                                      key={i}
                                      className="
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-white/[0.02]
                                        p-3
                                      "
                                    >

                                      <p
                                        className="
                                          text-sm
                                          font-medium
                                          text-gray-300
                                        "
                                      >
                                        {item.role ||
                                          "Experience"}
                                      </p>


                                      {item.company && (

                                        <p
                                          className="
                                            mt-1
                                            text-xs
                                            text-cyan-300/70
                                          "
                                        >
                                          {
                                            item.company
                                          }
                                        </p>

                                      )}


                                      {item.location && (

                                        <p
                                          className="
                                            mt-1
                                            text-xs
                                            text-gray-600
                                          "
                                        >
                                          {
                                            item.location
                                          }
                                        </p>

                                      )}


                                      {item.description && (

                                        <p
                                          className="
                                            mt-2
                                            text-xs
                                            leading-5
                                            text-gray-600
                                          "
                                        >
                                          {
                                            item.description
                                          }
                                        </p>

                                      )}

                                    </div>

                                  )
                                )}

                              </div>

                            </div>

                          )}


                          {/* PROJECTS */}

                          {projects.length >
                            0 && (

                            <div
                              className="
                                mt-6
                              "
                            >

                              <h3
                                className="
                                  mb-3
                                  text-xs
                                  font-semibold
                                  uppercase
                                  tracking-wider
                                  text-gray-600
                                "
                              >
                                Projects
                              </h3>


                              <div
                                className="
                                  space-y-3
                                "
                              >

                                {projects.map(
                                  (
                                    project,
                                    i
                                  ) => (

                                    <div
                                      key={i}
                                      className="
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-white/[0.02]
                                        p-3
                                      "
                                    >

                                      <p
                                        className="
                                          text-sm
                                          font-medium
                                          text-gray-300
                                        "
                                      >
                                        {
                                          project.title ||
                                          project.name ||
                                          "Project"
                                        }
                                      </p>


                                      {(
                                        project.description
                                      ) && (

                                        <p
                                          className="
                                            mt-1
                                            text-xs
                                            leading-5
                                            text-gray-600
                                          "
                                        >
                                          {
                                            project.description
                                          }
                                        </p>

                                      )}

                                    </div>

                                  )
                                )}

                              </div>

                            </div>

                          )}


                          {/* CERTIFICATIONS */}

                          {certifications.length >
                            0 && (

                            <div
                              className="
                                mt-6
                              "
                            >

                              <h3
                                className="
                                  mb-2
                                  text-xs
                                  font-semibold
                                  uppercase
                                  tracking-wider
                                  text-gray-600
                                "
                              >
                                Certifications
                              </h3>


                              <div
                                className="
                                  space-y-2
                                "
                              >

                                {certifications.map(
                                  (
                                    cert,
                                    i
                                  ) => (

                                    <div
                                      key={i}
                                      className="
                                        text-sm
                                        text-gray-400
                                      "
                                    >

                                      <span
                                        className="
                                          text-gray-300
                                        "
                                      >
                                        {
                                          cert.title ||
                                          cert.name ||
                                          "Certification"
                                        }
                                      </span>


                                      {cert.issuer && (

                                        <span
                                          className="
                                            text-gray-600
                                          "
                                        >
                                          {" "}
                                          ·{" "}
                                          {
                                            cert.issuer
                                          }
                                        </span>

                                      )}

                                    </div>

                                  )
                                )}

                              </div>

                            </div>

                          )}


                          {/* ACHIEVEMENTS */}

                          {achievements.length >
                            0 && (

                            <div
                              className="
                                mt-6
                              "
                            >

                              <h3
                                className="
                                  mb-2
                                  text-xs
                                  font-semibold
                                  uppercase
                                  tracking-wider
                                  text-gray-600
                                "
                              >
                                Achievements
                              </h3>


                              <div
                                className="
                                  space-y-2
                                "
                              >

                                {achievements.map(
                                  (
                                    achievement,
                                    i
                                  ) => (

                                    <p
                                      key={i}
                                      className="
                                        text-sm
                                        text-gray-400
                                      "
                                    >
                                      {typeof achievement ===
                                      "string"
                                        ? achievement
                                        : achievement.title ||
                                          achievement.name ||
                                          "Achievement"}
                                    </p>

                                  )
                                )}

                              </div>

                            </div>

                          )}


                          {/* CONTACT + SOCIAL */}

                          <div
                            className="
                              mt-7
                              flex
                              flex-wrap
                              gap-2
                            "
                          >

                            {/* EMAIL */}

                            {user.email && (

                              <a
                                href={`mailto:${user.email}`}
                                className="
                                  inline-flex
                                  items-center
                                  gap-2
                                  rounded-xl
                                  border
                                  border-cyan-400/10
                                  bg-cyan-400/5
                                  px-3
                                  py-2
                                  text-xs
                                  text-cyan-300
                                  transition-all
                                  duration-200
                                  hover:-translate-y-0.5
                                  hover:bg-cyan-400/10
                                "
                              >

                                <Mail
                                  size={14}
                                />

                                Contact

                              </a>

                            )}


                            {/* GITHUB */}

                            {user.github && (

                              <a
                                href={
                                  user.github.startsWith(
                                    "http"
                                  )
                                    ? user.github
                                    : `https://${user.github}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                  inline-flex
                                  items-center
                                  gap-2
                                  rounded-xl
                                  border
                                  border-white/10
                                  bg-white/[0.02]
                                  px-3
                                  py-2
                                  text-xs
                                  text-gray-400
                                  transition-all
                                  duration-200
                                  hover:-translate-y-0.5
                                  hover:border-white/20
                                  hover:bg-white/5
                                  hover:text-white
                                "
                              >

                                <FaGithub
                                  size={15}
                                />

                                GitHub

                                <ExternalLink
                                  size={11}
                                />

                              </a>

                            )}


                            {/* LINKEDIN */}

                            {user.linkedin && (

                              <a
                                href={
                                  user.linkedin.startsWith(
                                    "http"
                                  )
                                    ? user.linkedin
                                    : `https://${user.linkedin}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                  inline-flex
                                  items-center
                                  gap-2
                                  rounded-xl
                                  border
                                  border-white/10
                                  bg-white/[0.02]
                                  px-3
                                  py-2
                                  text-xs
                                  text-gray-400
                                  transition-all
                                  duration-200
                                  hover:-translate-y-0.5
                                  hover:border-white/20
                                  hover:bg-white/5
                                  hover:text-white
                                "
                              >

                                <FaLinkedin
                                  size={15}
                                />

                                LinkedIn

                                <ExternalLink
                                  size={11}
                                />

                              </a>

                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                );

              }
            )}

          </div>

        )}

      </div>


      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style>
        {`
          @keyframes fadeInUp {

            from {
              opacity: 0;
              transform: translateY(12px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }

          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `}
      </style>

    </div>

  );

};


export default FindTeams;