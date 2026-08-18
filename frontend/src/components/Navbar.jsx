import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";


function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null);

  const navigate = useNavigate();


  // =========================
  // API URL
  // =========================

  const API_URL = (
    import.meta.env.VITE_API_URL || ""
  ).replace(/\/$/, "");


  // =========================
  // USER STATE
  // =========================

  const [user, setUser] = useState(() => {

    const savedUser =
      localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;

  });


  // =========================
  // PROFILE IMAGE URL
  // =========================

  const getProfileImageUrl = (
    profilePicture
  ) => {

    if (!profilePicture) {
      return null;
    }


    // Already a complete URL
    if (
      profilePicture.startsWith("http://") ||
      profilePicture.startsWith("https://")
    ) {
      return profilePicture;
    }


    // Backend stored relative path
    return `${API_URL}${
      profilePicture.startsWith("/")
        ? profilePicture
        : `/${profilePicture}`
    }`;

  };


  // =========================
  // AUTH STATE LISTENER
  // =========================

  useEffect(() => {

    const handleAuthChange = () => {

      const savedUser =
        localStorage.getItem("user");

      setUser(
        savedUser
          ? JSON.parse(savedUser)
          : null
      );

    };


    window.addEventListener(
      "authChange",
      handleAuthChange
    );


    return () => {

      window.removeEventListener(
        "authChange",
        handleAuthChange
      );

    };

  }, []);


  // =========================
  // NAVIGATION LINKS
  // =========================

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "Project Ideas",
      path: "/projects",
    },

    {
      name: "Datasets",
      path: "/datasets",
    },
    {
      name: "Find Team",
      path: "/teams",
    },
    {
      name: "Settings",
      path: "/profile",
    },
  ];


  // =========================
  // LOGIN SUCCESS
  // =========================

  const handleLoginSuccess = (
    loggedInUser
  ) => {

    setUser(loggedInUser);

    setAuthModal(null);


    window.dispatchEvent(
      new Event("authChange")
    );


    if (
      loggedInUser.profileCompleted
    ) {

      navigate("/profile");

    } else {

      navigate("/profile/edit");

    }

  };


  // =========================
  // REGISTER SUCCESS
  // =========================

  const handleRegisterSuccess = (
    registeredUser
  ) => {

    setUser(registeredUser);

    setAuthModal(null);


    window.dispatchEvent(
      new Event("authChange")
    );


    if (
      !registeredUser.profileCompleted
    ) {

      navigate("/profile/edit");

    } else {

      navigate("/profile");

    }

  };


  // =========================
  // PROFILE IMAGE
  // =========================

  const profileImage =
    getProfileImageUrl(
      user?.profilePicture
    );


  return (
    <>

      {/* ================= NAVBAR ================= */}

      <nav
        className="
          navbar-animate
          fixed
          left-0
          right-0
          top-0
          z-50
          border-b
          border-white/5
          bg-[#090b10]/90
          backdrop-blur-xl
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            justify-between
            px-6
            py-4
          "
        >

          {/* ================= LOGO ================= */}

          <Link
            to="/"
            className="flex items-center gap-2"
          >

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-gradient-to-br
                from-blue-400
                to-violet-500
                font-bold
                text-white
              "
            >
              P
            </div>


            <span
              className="
                text-lg
                font-semibold
                tracking-tight
                text-white
              "
            >
              ProjectHub
            </span>

          </Link>


          {/* ================= DESKTOP NAVIGATION ================= */}

          <div
            className="
              hidden
              items-center
              gap-8
              text-sm
              md:flex
            "
          >

            {navLinks.map((link) => (

              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>

            ))}

          </div>


          {/* ================= DESKTOP AUTH ================= */}

          <div
            className="
              hidden
              items-center
              gap-3
              md:flex
            "
          >

            {user ? (

              /* Logged in user */

              <Link
                to="/profile"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-3
                  py-2
                  text-sm
                  text-gray-300
                  transition

                  hover:border-white/20
                  hover:bg-white/[0.06]
                "
              >

                {/* PROFILE PICTURE */}

                <div
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    bg-gradient-to-br
                    from-indigo-500
                    to-blue-500
                    text-xs
                    font-semibold
                    text-white
                  "
                >

                  {profileImage ? (

                    <img
                      src={profileImage}
                      alt={
                        user.name ||
                        "Profile"
                      }
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                      onError={(e) => {

                        // Hide broken image
                        e.currentTarget.style.display =
                          "none";

                      }}
                    />

                  ) : (

                    user.name
                      ?.charAt(0)
                      .toUpperCase()

                  )}

                </div>


                <span>
                  {user.name}
                </span>

              </Link>

            ) : (

              /* Not logged in */

              <button
                onClick={() =>
                  setAuthModal("login")
                }
                className="
                  px-4
                  py-2
                  text-sm
                  text-gray-300
                  transition
                  hover:text-white
                "
              >
                Sign In
              </button>

            )}


            {/* Contact */}

            <Link
              to="/customer-service"
              className="
                rounded-full
                bg-gradient-to-r
                from-violet-400
                to-cyan-300
                px-5
                py-2
                text-sm
                font-medium
                text-black
                transition
                hover:opacity-90
              "
            >
              Contact
            </Link>

          </div>


          {/* ================= MOBILE HAMBURGER ================= */}

          <button
            onClick={() =>
              setIsOpen(!isOpen)
            }
            className="
              rounded-lg
              border
              border-white/10
              p-2
              text-gray-300
              transition
              hover:bg-white/5
              md:hidden
            "
            aria-label="Toggle navigation"
          >

            {isOpen ? (

              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />

              </svg>

            ) : (

              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />

              </svg>

            )}

          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}

        {isOpen && (

          <div
            className="
              border-t
              border-white/5
              px-6
              py-5
              md:hidden
            "
          >

            <div
              className="
                flex
                flex-col
                gap-2
              "
            >

              {/* Navigation */}

              {navLinks.map((link) => (

                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm transition ${
                      isActive
                        ? "bg-white/5 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>

              ))}


              <div
                className="
                  my-2
                  border-t
                  border-white/5
                "
              />


              {/* Mobile Login / User */}

              {user ? (

                <Link
                  to="/profile"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-gray-300
                    transition
                    hover:bg-white/5
                    hover:text-white
                  "
                >

                  {/* MOBILE PROFILE PICTURE */}

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      bg-gradient-to-br
                      from-indigo-500
                      to-blue-500
                      text-xs
                      font-semibold
                      text-white
                    "
                  >

                    {profileImage ? (

                      <img
                        src={profileImage}
                        alt={
                          user.name ||
                          "Profile"
                        }
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                        onError={(e) => {

                          e.currentTarget.style.display =
                            "none";

                        }}
                      />

                    ) : (

                      user.name
                        ?.charAt(0)
                        .toUpperCase()

                    )}

                  </div>


                  <span>
                    {user.name}
                  </span>

                </Link>

              ) : (

                <button
                  onClick={() => {

                    setIsOpen(false);

                    setAuthModal("login");

                  }}
                  className="
                    rounded-lg
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-gray-400
                    transition
                    hover:bg-white/5
                    hover:text-white
                  "
                >
                  Sign In
                </button>

              )}


              {/* Mobile Contact */}

              <Link
                to="/customer-service"
                onClick={() =>
                  setIsOpen(false)
                }
                className="
                  mt-1
                  rounded-lg
                  bg-gradient-to-r
                  from-violet-400
                  to-cyan-300
                  px-4
                  py-3
                  text-center
                  text-sm
                  font-medium
                  text-black
                "
              >
                Contact
              </Link>

            </div>

          </div>

        )}

      </nav>


      {/* ================= LOGIN MODAL ================= */}

      {authModal === "login" && (

        <LoginModal
          onClose={() =>
            setAuthModal(null)
          }
          onLoginSuccess={
            handleLoginSuccess
          }
          onRegister={() =>
            setAuthModal("register")
          }
        />

      )}


      {/* ================= REGISTER MODAL ================= */}

      {authModal === "register" && (

        <RegisterModal
          onClose={() =>
            setAuthModal(null)
          }
          onLogin={() =>
            setAuthModal("login")
          }
          onRegisterSuccess={
            handleRegisterSuccess
          }
        />

      )}

    </>
  );
}


export default Navbar;