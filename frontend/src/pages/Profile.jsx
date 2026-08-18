import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  GraduationCap,
  Mail,
  MapPin,
  BriefcaseBusiness,
  Home,
  FolderKanban,
  Database,
  BookOpen,
  Users,
  Settings,
  LogOut,
  BadgeInfo
} from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const glowRef = useRef(null);

 
  const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  // =========================================================
  // MODERN SCROLL + POINTER ANIMATIONS
  // =========================================================

  useEffect(() => {
    const root = profileRef.current;
    if (!root) return;

    const revealItems = root.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    const handlePointerMove = (event) => {
      const glow = glowRef.current;
      if (!glow) return;

      glow.style.transform =
        `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);


  const getFileUrl = (filePath) => {
    if (!filePath) return null;

    // If the backend already returns a complete URL, use it directly.
    if (/^https?:\/\//i.test(filePath)) {
      return filePath;
    }

    return `${API_URL}${filePath.startsWith("/") ? filePath : `/${filePath}`}`;
  };

  const [user, setUser] = useState(null);

  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        navigate("/");
        return;
      }

      try {
        const parsedUser = JSON.parse(savedUser);

        setUser(parsedUser);

        setSkills(
          Array.isArray(parsedUser.skills)
            ? parsedUser.skills
            : []
        );

        setProjects(
          Array.isArray(parsedUser.projects)
            ? parsedUser.projects
            : []
        );

        setExperiences(
          Array.isArray(parsedUser.experience)
            ? parsedUser.experience
            : []
        );

        setAchievements(
          Array.isArray(parsedUser.achievements)
            ? parsedUser.achievements
            : []
        );

        setCertifications(
          Array.isArray(parsedUser.certifications)
            ? parsedUser.certifications
            : []
        );
      } catch (error) {
        console.error("Invalid user data:", error);

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        navigate("/");
      }
    };

    loadUser();

    const handleAuthChange = () => {
      loadUser();
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener(
        "authChange",
        handleAuthChange
      );
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.dispatchEvent(new Event("authChange"));

    navigate("/");
  };

  if (!user) {
    return null;
  }

  // profilePicture is the field stored in the MongoDB User document.
  const profileImage = getFileUrl(user.profilePicture);

  /*
   * Education exists only when the user has actually
   * entered education-related information.
   */
  const hasEducation =
    user.college ||
    user.branch ||
    user.year;

  return (
    <div className="min-h-screen bg-[#070a0f] text-white animate-[profileFadeIn_0.6s_ease-out_both]">

      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[280px] border-r border-white/[0.06] bg-[#070a0f] lg:flex lg:flex-col">

        <div className="px-5 py-8">

          {/* LOGO */}

          <Link
            to="/"
            className="group mb-10 flex items-center gap-3 px-2 transition-transform duration-300 hover:translate-x-1"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-violet-500 text-lg font-bold text-white shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 group-hover:shadow-cyan-400/10">
              P
            </div>

            <span className="text-[21px] font-semibold tracking-tight text-white">
              ProjectHub
            </span>
          </Link>

          {/* NAVIGATION */}

          <nav className="space-y-1">

            <SidebarLink
              to="/"
              icon={Home}
              label="Home"
            />

            <SidebarLink
              to="/projects"
              icon={FolderKanban}
              label="Project Ideas"
            />

            <SidebarLink
              to="/datasets"
              icon={Database}
              label="Datasets"
            />


            <SidebarLink
              to="/teams"
              icon={Users}
              label="Find Team"
            />

            <SidebarLink
              to="/about"
              icon={BadgeInfo}
              label="About"
            />

            <SidebarLink
              to="/profile"
              icon={Settings}
              label="Settings"
            />

            

          </nav>

        </div>

        {/* LOGOUT */}

        <div className="mt-3 px-5">

          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] font-medium text-gray-400 transition-all duration-300 ease-out hover:translate-x-1 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut
              size={19}
              strokeWidth={1.8}
              className="transition-colors group-hover:text-red-400"
            />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="relative z-10 min-h-screen lg:pl-[280px]">

        <div className="mx-auto max-w-[1380px] px-4 py-5 sm:px-6 lg:px-8 lg:py-6">

          {/* =================================================
              MOBILE HEADER
          ================================================= */}

          <div className="mb-6 flex items-center justify-between lg:hidden">

            <Link
              to="/"
              className="flex items-center gap-2 text-white"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-violet-500 text-sm font-bold text-white">
                P
              </div>

              <span className="text-[19px] font-semibold tracking-tight">
                ProjectHub
              </span>

            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-gray-400 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
            >
              <LogOut size={14} />

              Logout
            </button>

          </div>


          {/* =================================================
              PROFILE HEADER
          ================================================= */}

          <section className="profile-card transition-all duration-300 ease-out hover:border-white/[0.10] hover:shadow-2xl hover:shadow-black/20 animate-[profileSlideUp_0.65s_ease-out_0.08s_both]">

            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_300px]">

              {/* =================================================
                  LEFT PROFILE
              ================================================= */}

              <div>

                <div className="flex flex-col gap-6 sm:flex-row">

                  {/* PROFILE IMAGE */}

                  <div className="shrink-0">

                    {profileImage ? (

                      <img
                        src={profileImage}
                        alt={user.name || "Profile"}
                        className="h-24 w-24 rounded-full object-cover transition-all duration-500 ease-out hover:scale-105 hover:ring-2 hover:ring-[#22D3EE]/20 sm:h-28 sm:w-28"
                      />

                    ) : (

                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#151b25] text-3xl font-semibold text-[#22D3EE] transition-all duration-500 ease-out hover:scale-105 hover:bg-[#18212c] hover:ring-2 hover:ring-[#22D3EE]/20 sm:h-28 sm:w-28">
                        {user.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                    )}

                  </div>


                  {/* USER INFORMATION */}

                  <div className="min-w-0">

                    {/* NAME */}

                    <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      {user.name}
                    </h1>


                    {/* ROLE */}

                    {user.role && (
                      <p className="mt-1 text-sm font-medium text-[#22D3EE]">
                        {user.role}
                      </p>
                    )}


                    {/* INFORMATION */}

                    <div className="mt-5 space-y-3 text-sm text-gray-500">

                      {/* BRANCH */}

                      {user.branch && (
                        <div className="flex items-center gap-3">

                          <BriefcaseBusiness
                            size={16}
                            strokeWidth={1.6}
                            className="shrink-0 text-gray-500"
                          />

                          <span>
                            {user.branch}
                          </span>

                        </div>
                      )}


                      {/* EMAIL */}

                      {user.email && (
                        <div className="flex items-center gap-3">

                          <Mail
                            size={16}
                            strokeWidth={1.6}
                            className="shrink-0 text-gray-500"
                          />

                          <span className="truncate">
                            {user.email}
                          </span>

                        </div>
                      )}


                      {/* COLLEGE */}

                      {user.college && (
                        <div className="flex items-center gap-3">

                          <GraduationCap
                            size={17}
                            strokeWidth={1.6}
                            className="shrink-0 text-gray-500"
                          />

                          <span>
                            {user.college}
                          </span>

                        </div>
                      )}


                      {/* LOCATION */}

                      {user.location && (
                        <div className="flex items-center gap-3">

                          <MapPin
                            size={16}
                            strokeWidth={1.6}
                            className="shrink-0 text-gray-500"
                          />

                          <span>
                            {user.location}
                          </span>

                        </div>
                      )}

                    </div>


                    {/* BUTTONS */}

                    <div className="mt-5 flex flex-wrap gap-3">

                      <button
                        onClick={() =>
                          navigate("/edit-profile")
                        }
                        className="rounded-xl bg-[#090b10] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/5 hover:shadow-lg hover:shadow-black/20 active:scale-[0.98]"
                      >
                        Edit Profile
                      </button>


                      {/* VIEW RESUME */}

                      {user.resume && (
                        <a
                          href={getFileUrl(user.resume)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-white/[0.08] px-5 py-2.5 text-sm font-medium text-gray-300 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#22D3EE]/30 hover:bg-[#22D3EE]/[0.03] hover:text-[#22D3EE] active:scale-[0.98]"
                        >
                          View Resume
                        </a>
                      )}

                    </div>

                  </div>

                </div>

              </div>


              {/* =================================================
                  ABOUT + EDUCATION
              ================================================= */}

              <div className="border-t border-white/[0.07] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">

                {/* ABOUT */}

                <SectionHeading>
                  ABOUT ME
                </SectionHeading>

                {user.about ? (

                  <p className="mt-4 text-sm leading-6 text-gray-500">
                    {user.about}
                  </p>

                ) : (

                  <p className="mt-4 text-sm leading-6 text-gray-700">
                    Add your introduction from Edit Profile.
                  </p>

                )}


                {/* DIVIDER */}

                <div className="my-7 h-px bg-white/[0.06]" />


                {/* EDUCATION */}

                <SectionHeading>
                  EDUCATION
                </SectionHeading>

                {hasEducation ? (

                  <div className="mt-4">

                    {/* BRANCH */}

                    {user.branch && (
                      <h3 className="font-medium text-white">
                        {user.branch}
                      </h3>
                    )}

                    {/* COLLEGE */}

                    {user.college && (
                      <p className="mt-1 text-sm text-[#22D3EE]">
                        {user.college}
                      </p>
                    )}

                    {/* YEAR */}

                    {user.year && (
                      <p className="mt-2 text-xs text-gray-600">
                        {user.year}
                      </p>
                    )}

                  </div>

                ) : (

                  <p className="mt-4 text-sm text-gray-700">
                    Add your education from Edit Profile.
                  </p>

                )}

              </div>

            </div>

          </section>


          {/* =================================================
              SKILLS + LINKS
          ================================================= */}

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            {/* SKILLS */}

            <section className="profile-card p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.10] hover:shadow-xl hover:shadow-black/20 animate-[profileSlideUp_0.65s_ease-out_0.16s_both]">

              <SectionHeading>
                SKILLS
              </SectionHeading>

              {skills.length > 0 ? (

                <div className="mt-5 flex flex-wrap gap-2">

                  {skills.map((skill, index) => (

                    <span
                      key={index}
                      style={{ animationDelay: `${index * 45}ms` }}
                      className="profile-chip rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-gray-300 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#22D3EE]/20 hover:bg-[#22D3EE]/[0.04] hover:text-white"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              ) : (

                <p className="mt-5 text-sm text-gray-600">
                  No skills added yet.
                </p>

              )}

            </section>


            {/* LINKS */}

            <section className="profile-card p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.10] hover:shadow-xl hover:shadow-black/20 animate-[profileSlideUp_0.65s_ease-out_0.16s_both]">

              <SectionHeading>
                LINKS
              </SectionHeading>

              <div className="mt-5 space-y-5">

                {/* GITHUB */}

                {user.github && (

                  <a
                    href={user.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 text-sm text-[#22D3EE] transition-all duration-300 ease-out hover:translate-x-1 hover:text-[#67e8f9]"
                  >

                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-xs font-medium text-white">
                      GH
                    </span>

                    <span className="truncate">
                      {user.github}
                    </span>

                  </a>

                )}


                {/* LINKEDIN */}

                {user.linkedin && (

                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 text-sm text-[#22D3EE] transition-all duration-300 ease-out hover:translate-x-1 hover:text-[#67e8f9]"
                  >

                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-xs font-medium text-white">
                      in
                    </span>

                    <span className="truncate">
                      {user.linkedin}
                    </span>

                  </a>

                )}


                {!user.github &&
                  !user.linkedin && (

                    <p className="text-sm text-gray-600">
                      Add your GitHub and LinkedIn from Edit Profile.
                    </p>

                  )}

              </div>

            </section>

          </div>


          {/* =================================================
              PROJECTS + EXPERIENCE
          ================================================= */}

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">

            {/* PROJECTS */}

            <section className="profile-card p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.10] hover:shadow-xl hover:shadow-black/20 animate-[profileSlideUp_0.65s_ease-out_0.16s_both]">

              <div className="flex items-center justify-between">

                <SectionHeading>
                  PROJECTS
                </SectionHeading>

              </div>


              {projects.length > 0 ? (

                <div className="mt-5 divide-y divide-white/[0.06]">

                  {projects.map((project, index) => (

                    <div
                      key={project.id || index}
                      className="group flex gap-4 py-5 first:pt-2 transition-all duration-300 ease-out hover:translate-x-1"
                    >

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-[#22D3EE] transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-[#22D3EE]/10">
                        {"</>"}
                      </div>

                      <div className="min-w-0">

                        <h3 className="text-sm font-medium text-white">
                          {project.name}
                        </h3>

                        {project.description && (
                          <p className="mt-1 text-xs leading-5 text-gray-600">
                            {project.description}
                          </p>
                        )}

                        {project.github && (

                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-xs text-[#22D3EE] transition-all duration-300 hover:translate-x-1 hover:text-[#67e8f9]"
                          >
                            GitHub →
                          </a>

                        )}

                      </div>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="py-8">

                  <p className="text-sm text-gray-600">
                    No projects added yet.
                  </p>

                  <button
                    onClick={() =>
                      navigate("/edit-profile")
                    }
                    className="mt-3 text-xs text-[#22D3EE]"
                  >
                    Add Project →
                  </button>

                </div>

              )}

            </section>


            {/* EXPERIENCE */}

            <section className="profile-card p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.10] hover:shadow-xl hover:shadow-black/20 animate-[profileSlideUp_0.65s_ease-out_0.16s_both]">

              <SectionHeading>
                EXPERIENCE
              </SectionHeading>


              {experiences.length > 0 ? (

                <div className="mt-6 space-y-7">

                  {experiences.map(
                    (experience, index) => (

                      <div
                        key={experience.id || index}
                        className="group flex gap-4 transition-all duration-300 ease-out hover:translate-x-1"
                      >

                        <div className="relative flex w-3 shrink-0 justify-center">

                          <div className="mt-1 h-3 w-3 rounded-full bg-[#22D3EE]" />

                          {index !==
                            experiences.length - 1 && (

                            <div className="absolute top-4 h-full w-px bg-[#22D3EE]/20" />

                          )}

                        </div>


                        <div className="flex-1">

                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                            <h3 className="text-sm font-medium">
                              {experience.role}
                            </h3>

                            {experience.duration && (
                              <span className="text-xs text-gray-600">
                                {experience.duration}
                              </span>
                            )}

                          </div>

                          {experience.company && (
                            <p className="mt-1 text-sm text-[#22D3EE]">
                              {experience.company}
                            </p>
                          )}

                          {experience.description && (
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                              {experience.description}
                            </p>
                          )}

                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p className="mt-6 text-sm text-gray-600">
                  No experience added yet.
                </p>

              )}

            </section>

          </div>


          {/* =================================================
              CERTIFICATIONS + ACHIEVEMENTS
          ================================================= */}

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            {/* CERTIFICATIONS */}

            <section className="profile-card p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.10] hover:shadow-xl hover:shadow-black/20 animate-[profileSlideUp_0.65s_ease-out_0.16s_both]">

              <SectionHeading>
                CERTIFICATIONS
              </SectionHeading>


              {certifications.length > 0 ? (

                <div className="mt-5 space-y-4">

                  {certifications.map(
                    (certificate, index) => (

                      <div
                        key={certificate.id || index}
                        style={{ animationDelay: `${index * 70}ms` }}
                        className="profile-row group flex gap-3"
                      >

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-[#22D3EE] transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-[#22D3EE]/10">
                          ✦
                        </div>

                        <div>

                          <h3 className="text-sm font-medium">
                            {certificate.name}
                          </h3>

                          {certificate.issuer && (
                            <p className="mt-1 text-xs text-gray-600">
                              {certificate.issuer}
                            </p>
                          )}

                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p className="mt-5 text-sm text-gray-600">
                  No certifications added yet.
                </p>

              )}

            </section>


            {/* ACHIEVEMENTS */}

            <section className="profile-card p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.10] hover:shadow-xl hover:shadow-black/20 animate-[profileSlideUp_0.65s_ease-out_0.16s_both]">

              <SectionHeading>
                ACHIEVEMENTS
              </SectionHeading>


              {achievements.length > 0 ? (

                <div className="mt-5 space-y-5">

                  {achievements.map(
                    (achievement, index) => (

                      <div
                        key={achievement.id || index}
                        className="group flex gap-4 transition-all duration-300 ease-out hover:translate-x-1"
                      >

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#22D3EE]/10 text-[#22D3EE] transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-[#22D3EE]/15">
                          ✦
                        </div>

                        <div>

                          <h3 className="text-sm font-medium">
                            {achievement.title}
                          </h3>

                          {achievement.description && (
                            <p className="mt-1 text-xs leading-5 text-gray-600">
                              {achievement.description}
                            </p>
                          )}

                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p className="mt-5 text-sm text-gray-600">
                  No achievements added yet.
                </p>

              )}

            </section>

          </div>


          {/* Bottom spacing */}

          <div className="h-10" />

        </div>

      </main>

    </div>
  );
}


/* =============================================================
   SIDEBAR ITEM
============================================================= */

function SidebarLink({ to, icon: Icon, label }) {
  const location = useLocation();

  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`group flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 ${
        active
          ? "bg-[#22D3EE]/10 text-[#22D3EE]"
          : "text-gray-300 hover:bg-white/[0.04] hover:text-white"
      }`}
    >

      <Icon
        size={19}
        strokeWidth={1.8}
        className={`shrink-0 transition-colors ${
          active
            ? "text-[#22D3EE]"
            : "text-gray-300 group-hover:text-white"
        }`}
      />

      <span>
        {label}
      </span>

    </Link>
  );
}


/* =============================================================
   SECTION HEADING
============================================================= */

function SectionHeading({ children }) {
  return (
    <h2 className="text-sm font-medium tracking-wide text-[#22D3EE]">
      {children}
    </h2>
  );
}



  /* =========================================================
     MODERN PROFILE ANIMATION SYSTEM
     ========================================================= */

  <style>
    {`
      [data-reveal] {
        opacity: 0;
        transform: translateY(28px) scale(0.985);
        filter: blur(3px);
        transition:
          opacity 700ms cubic-bezier(.22,1,.36,1),
          transform 700ms cubic-bezier(.22,1,.36,1),
          filter 700ms cubic-bezier(.22,1,.36,1);
      }

      [data-reveal].is-visible {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }

      [data-reveal][data-delay="1"] {
        transition-delay: 70ms;
      }

      [data-reveal][data-delay="2"] {
        transition-delay: 140ms;
      }

      [data-reveal][data-delay="3"] {
        transition-delay: 210ms;
      }

      [data-reveal][data-delay="4"] {
        transition-delay: 280ms;
      }

      [data-reveal][data-delay="5"] {
        transition-delay: 350ms;
      }

      [data-reveal][data-delay="6"] {
        transition-delay: 420ms;
      }

      .profile-modern-card {
        transform-style: preserve-3d;
        transition:
          transform 450ms cubic-bezier(.22,1,.36,1),
          border-color 350ms ease,
          box-shadow 450ms ease,
          background-color 350ms ease;
      }

      .profile-modern-card:hover {
        transform: translateY(-5px);
        border-color: rgba(255,255,255,.11);
        box-shadow:
          0 24px 60px rgba(0,0,0,.22),
          0 0 35px rgba(34,211,238,.025);
      }

      .profile-chip {
        animation: chipIn 600ms cubic-bezier(.22,1,.36,1) both;
        transition:
          transform 250ms ease,
          border-color 250ms ease,
          background-color 250ms ease,
          color 250ms ease;
      }

      .profile-chip:hover {
        transform: translateY(-3px) scale(1.03);
      }

      .profile-row {
        opacity: 0;
        transform: translateX(-12px);
        animation: rowIn 600ms cubic-bezier(.22,1,.36,1) forwards;
        transition: transform 250ms ease, background-color 250ms ease;
      }

      .profile-row:hover {
        transform: translateX(5px);
      }

      @keyframes chipIn {
        from {
          opacity: 0;
          transform: translateY(8px) scale(.96);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes rowIn {
        from {
          opacity: 0;
          transform: translateX(-12px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [data-reveal],
        .profile-chip,
        .profile-row {
          animation: none !important;
          transition: none !important;
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
        }
      }
    `}
  </style>


export default Profile;