import React from "react";

import {
  Compass,
  Database,
  Users,
  Lightbulb,
  Code2,
  UserRound,
  Target,
  Heart,
  Sparkles,
  Mail,
  Phone,
  ArrowUpRight,
  ChevronRight,
  Layers3,
  ShieldCheck,
  Rocket,
  MessageCircle,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import { Link } from "react-router-dom";


const About = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[#090b10] text-white">

      {/* =====================================================
          ABOUT HERO
      ===================================================== */}

      <section className="relative px-6 pb-24 pt-32 sm:px-10 lg:px-16">

        <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-violet-500/10 blur-[130px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-[140px]" />

        <div className="relative mx-auto max-w-6xl">

          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.75fr]">

            <div>

              <div
                className="
                  inline-flex items-center gap-2 rounded-full
                  border border-white/10 bg-white/[0.025]
                  px-4 py-2 text-xs font-medium text-gray-400
                  animate-[fadeInUp_0.6s_ease-out_both]
                "
              >
                <Compass size={14} className="text-cyan-300" />
                About @ProjectHub
              </div>


              <h1
                className="
                  mt-7 max-w-3xl text-4xl font-semibold leading-tight
                  tracking-tight sm:text-5xl lg:text-6xl
                  animate-[fadeInUp_0.7s_ease-out_0.1s_both]
                "
              >
                A place to discover,
                <span className="text-cyan-300"> connect,</span>
                {" "}and build.
              </h1>


              <p
                className="
                  mt-6 max-w-2xl text-base leading-8 text-gray-500 sm:text-lg
                  animate-[fadeInUp_0.7s_ease-out_0.2s_both]
                "
              >
                ProjectHub is built around a simple idea: the journey
                from having a project idea to actually building it
                should be easier.
              </p>


              <p
                className="
                  mt-5 max-w-2xl text-sm leading-7 text-gray-600
                  animate-[fadeInUp_0.7s_ease-out_0.3s_both]
                "
              >
                Instead of keeping datasets, inspiration, developer
                profiles, and team discovery separated across different
                platforms, ProjectHub brings these pieces together into
                one developer-focused space.
              </p>

            </div>


            {/* ABSTRACT PRODUCT CARD */}

            <div
              className="
                relative animate-[fadeInUp_0.8s_ease-out_0.2s_both]
              "
            >

              <div
                className="
                  absolute -inset-4 rounded-[2rem]
                  bg-gradient-to-br from-cyan-400/10 to-violet-500/10
                  blur-2xl
                "
              />

              <div
                className="
                  relative overflow-hidden rounded-[2rem]
                  border border-white/10 bg-[#0d1017]
                  p-6 shadow-2xl shadow-black/30
                "
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl bg-gradient-to-br from-violet-400 to-cyan-300
                        text-black
                      "
                    >
                      <Code2 size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-200">
                        ProjectHub
                      </p>
                      <p className="text-xs text-gray-600">
                        Build something meaningful
                      </p>
                    </div>

                  </div>

                  <Sparkles size={17} className="text-cyan-300/70" />

                </div>


                <div className="mt-8 space-y-3">

                  <AboutPreview
                    icon={<Database size={16} />}
                    title="Datasets"
                    text="Find useful data"
                  />

                  <AboutPreview
                    icon={<Lightbulb size={16} />}
                    title="Ideas"
                    text="Discover what to build"
                  />

                  <AboutPreview
                    icon={<Users size={16} />}
                    title="Teammates"
                    text="Find people with the right skills"
                  />

                  <AboutPreview
                    icon={<UserRound size={16} />}
                    title="Profiles"
                    text="Showcase what you can do"
                  />

                </div>


                <div className="mt-6 border-t border-white/5 pt-5">

                  <p className="text-xs leading-6 text-gray-700">
                    One ecosystem. Multiple possibilities.
                    The goal is to make collaboration easier
                    for people who want to build.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          OUR STORY
      ===================================================== */}

      <section className="border-y border-white/5 bg-white/[0.015] px-6 py-24 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/70">
                The idea behind it
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Why ProjectHub exists.
              </h2>

            </div>


            <div className="space-y-6 text-sm leading-8 text-gray-500 sm:text-base">

              <p>
                Every developer eventually reaches the same point:
                you want to build something, but the first step isn't
                always obvious.
              </p>

              <p>
                Maybe you need a dataset for a machine learning idea.
                Maybe you have found an interesting dataset but don't
                know what project would make sense. Maybe you already
                know what you want to build but need another developer
                who understands backend development, React, Python,
                AI, design, or another part of the stack.
              </p>

              <p>
                ProjectHub was designed around these moments. The
                platform connects discovery and collaboration so that
                developers can move through the early stages of a
                project with less friction.
              </p>

              <p className="text-gray-300">
                The bigger goal is not simply to provide another
                collection of resources. It is to create a place where
                people can find the resources, ideas, and people that
                help them build.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHAT PROJECTHUB CONNECTS
      ===================================================== */}

      <section className="px-6 py-24 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-6xl">

          <div className="max-w-2xl">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/70">
              The ecosystem
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Four pieces. One connected experience.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              ProjectHub focuses on the pieces that matter most when
              you're deciding what to build and who to build it with.
            </p>

          </div>


          <div className="mt-12 grid gap-4 md:grid-cols-2">

            <EcosystemCard
              icon={<Database size={21} />}
              label="01 / DATA"
              title="Discover datasets"
              text="Search datasets from sources such as Kaggle and Hugging Face and find data that can become the foundation of your next project."
            />

            <EcosystemCard
              icon={<Lightbulb size={21} />}
              label="02 / IDEAS"
              title="Find project inspiration"
              text="Explore ideas when you know you want to build something but need a direction, problem statement, or starting point."
            />

            <EcosystemCard
              icon={<Users size={21} />}
              label="03 / PEOPLE"
              title="Find the right teammates"
              text="Search developer profiles based on skills, roles, location, education, and other useful information to discover potential collaborators."
            />

            <EcosystemCard
              icon={<UserRound size={21} />}
              label="04 / IDENTITY"
              title="Show what you can do"
              text="Build a profile around your skills, projects, experience, certifications, achievements, GitHub, LinkedIn, and your own story."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          PLATFORM PHILOSOPHY
      ===================================================== */}

      <section className="border-y border-white/5 bg-[#0b0e14] px-6 py-24 sm:px-10 lg:px-16">

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">

          <div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/10 bg-violet-400/5 text-violet-300">
              <Heart size={20} />
            </div>

            <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Built around people who learn by building.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              ProjectHub is especially useful when learning moves beyond
              tutorials and into practical work. A real project forces
              you to make decisions, solve unexpected problems, work
              with data, communicate with others, and understand how
              different technologies fit together.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
              That's why the platform focuses not only on resources,
              but also on the people behind those projects. Your profile
              becomes more than a name — it becomes a way for potential
              collaborators to understand what you know and what you
              want to build.
            </p>

          </div>


          <div className="space-y-3">

            <Principle
              icon={<Target size={18} />}
              title="Purpose over noise"
              text="Keep discovery focused on useful project resources and meaningful collaboration."
            />

            <Principle
              icon={<Layers3 size={18} />}
              title="Skills that complement"
              text="Teams become stronger when people bring different strengths to the same project."
            />

            <Principle
              icon={<Rocket size={18} />}
              title="Learning through execution"
              text="Turn knowledge into practical experience by actually building."
            />

            <Principle
              icon={<ShieldCheck size={18} />}
              title="A profile that represents you"
              text="Give developers a place to present their technical journey clearly."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW A USER CAN USE IT
      ===================================================== */}

      <section className="px-6 py-24 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/70">
              A typical journey
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start anywhere. Keep moving.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600">
              There is no single correct way to use ProjectHub.
              You can start with a dataset, an idea, a skill,
              or even a need for teammates.
            </p>

          </div>


          <div className="relative mt-14">

            <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-white/10 md:block" />

            <div className="grid gap-8 md:grid-cols-4">

              <Journey
                number="01"
                title="Have a question"
                text="What can I build? Which dataset should I use? Who could help?"
              />

              <Journey
                number="02"
                title="Explore"
                text="Search datasets, ideas, and profiles until you find useful possibilities."
              />

              <Journey
                number="03"
                title="Connect"
                text="Reach out to developers whose skills and interests fit your direction."
              />

              <Journey
                number="04"
                title="Create"
                text="Take the next step and turn the discovered pieces into a real project."
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          VISION
      ===================================================== */}

      <section className="px-6 pb-24 sm:px-10 lg:px-16">

        <div
          className="
            relative mx-auto max-w-6xl overflow-hidden rounded-3xl
            border border-white/10 bg-[#0d1017] p-8 sm:p-12
          "
        >

          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />

          <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/70">
                Looking ahead
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                The vision for @ProjectHub.
              </h2>

            </div>


            <div>

              <p className="text-sm leading-8 text-gray-500 sm:text-base">
                The long-term vision is to make ProjectHub a place where
                developers can discover opportunities to build together,
                regardless of whether they are students, self-learners,
                early-career developers, or experienced contributors.
              </p>

              <p className="mt-5 text-sm leading-8 text-gray-600">
                More datasets, richer project discovery, better profiles,
                stronger collaboration features, and a growing developer
                community can gradually turn the platform into an ecosystem
                around building — not just browsing.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT / SUPPORT
      ===================================================== */}

      <section className="border-t border-white/5 bg-white/[0.015] px-6 py-24 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

            <div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/5 text-cyan-300">
                <MessageCircle size={20} />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/70">
                Questions & feedback
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Have something to say?
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                If you have found an issue, have a suggestion, want to
                discuss the platform, or simply want to share feedback,
                you can contact the ProjectHub team directly.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
                Every piece of feedback can help improve the experience
                for the people who use ProjectHub to learn, collaborate,
                and build.
              </p>

            </div>


            <div className="flex flex-col gap-3">

              <ContactCard
                href="mailto:sivabadeti2005@gmail.com"
                icon={<Mail size={18} />}
                label="Email"
                value="sivabadeti2005@gmail.com"
                accent="cyan"
              />

              <ContactCard
                href="tel:+917013419797"
                icon={<Phone size={18} />}
                label="Phone"
                value="+91 7013419797"
                accent="violet"
              />

              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex min-w-[280px] items-center gap-4 rounded-2xl
                  border border-white/10 bg-[#0d1017] p-4
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:scale-[1.01]
                  hover:border-white/20 hover:bg-white/[0.035]
                "
              >

                <div
                  className="
                    flex h-10 w-10 shrink-0 items-center justify-center
                    rounded-xl bg-white/5 text-gray-400
                    transition-all duration-300
                    group-hover:scale-110 group-hover:text-white
                  "
                >
                  <FaGithub size={18} />
                </div>

                <div>

                  <p className="text-xs text-gray-600">
                    GitHub
                  </p>

                  <p className="mt-1 text-sm text-gray-300 transition-colors duration-300 group-hover:text-white">
                    ProjectHub repository
                  </p>

                </div>

                <ArrowUpRight
                  size={16}
                  className="
                    ml-auto text-gray-700
                    transition-all duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-white
                  "
                />

              </a>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/5 bg-[#07090d] px-6 pb-10 pt-14 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">

            <div>

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex h-10 w-10 items-center justify-center rounded-xl
                    bg-gradient-to-br from-violet-400 to-cyan-300 text-black
                  "
                >
                  <Code2 size={19} />
                </div>

                <div>

                  <p className="text-base font-semibold text-gray-200">
                    ProjectHub
                  </p>

                  <p className="text-xs text-gray-600">
                    @ProjectHub
                  </p>

                </div>

              </div>


              <p className="mt-5 max-w-md text-sm leading-7 text-gray-600">
                A connected space for developers to discover datasets,
                explore project ideas, find teammates, and build
                meaningful projects together.
              </p>

            </div>


            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Explore
              </p>

              <div className="mt-5 flex flex-col gap-3">

                <FooterLink to="/datasets" label="Datasets" />
                <FooterLink to="/projects" label="Project Ideas" />
                <FooterLink to="/teams" label="Find Teammates" />
                <FooterLink to="/about" label="About" />

              </div>

            </div>


            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Contact
              </p>

              <div className="mt-5 flex flex-col gap-3">

                <a
                  href="mailto:sivabadeti2005@gmail.com"
                  className="
                    flex items-center gap-3 text-sm text-gray-600
                    transition-all duration-300 hover:translate-x-1 hover:text-gray-300
                  "
                >
                  <Mail size={15} />
                  Email
                </a>

                <a
                  href="tel:+917013419797"
                  className="
                    flex items-center gap-3 text-sm text-gray-600
                    transition-all duration-300 hover:translate-x-1 hover:text-gray-300
                  "
                >
                  <Phone size={15} />
                  +91 7013419797
                </a>

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group flex items-center gap-3 text-sm text-gray-600
                    transition-all duration-300 hover:translate-x-1 hover:text-white
                  "
                >
                  <FaGithub
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  GitHub
                  <ChevronRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>

              </div>

            </div>

          </div>


          <div
            className="
              mt-12 flex flex-col gap-3 border-t border-white/5 pt-6
              text-xs text-gray-700 sm:flex-row sm:items-center sm:justify-between
            "
          >
            <p>
              © {new Date().getFullYear()} ProjectHub. Built for people who build.
            </p>

            <p>
              @ProjectHub
            </p>
          </div>

        </div>

      </footer>


      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(18px);
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


// =========================================================
// ABOUT PREVIEW
// =========================================================

const AboutPreview = ({
  icon,
  title,
  text,
}) => {
  return (
    <div
      className="
        group flex items-center gap-4 rounded-xl border border-white/5
        bg-white/[0.02] p-3.5
        transition-all duration-300 ease-out
        hover:-translate-y-0.5 hover:border-white/10 hover:bg-white/[0.035]
      "
    >

      <div
        className="
          flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
          bg-white/5 text-gray-500
          transition-all duration-300
          group-hover:scale-105 group-hover:text-cyan-300
        "
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-sm font-medium text-gray-300">
          {title}
        </p>

        <p className="mt-0.5 truncate text-xs text-gray-600">
          {text}
        </p>

      </div>

    </div>
  );
};


// =========================================================
// ECOSYSTEM CARD
// =========================================================

const EcosystemCard = ({
  icon,
  label,
  title,
  text,
}) => {
  return (
    <div
      className="
        group rounded-2xl border border-white/10 bg-white/[0.02] p-6
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-cyan-400/15
        hover:bg-white/[0.035] hover:shadow-xl hover:shadow-black/20
      "
    >

      <div className="flex items-start justify-between">

        <div
          className="
            flex h-11 w-11 items-center justify-center rounded-xl
            border border-white/10 bg-white/[0.03] text-gray-400
            transition-all duration-300
            group-hover:scale-110 group-hover:border-cyan-400/20
            group-hover:bg-cyan-400/5 group-hover:text-cyan-300
          "
        >
          {icon}
        </div>

        <span className="text-[10px] font-semibold tracking-[0.18em] text-gray-700">
          {label}
        </span>

      </div>


      <h3 className="mt-7 text-lg font-semibold text-gray-200">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-gray-600">
        {text}
      </p>

    </div>
  );
};


// =========================================================
// PRINCIPLE
// =========================================================

const Principle = ({
  icon,
  title,
  text,
}) => {
  return (
    <div
      className="
        group flex gap-4 rounded-2xl border border-white/10
        bg-black/10 p-4
        transition-all duration-300 ease-out
        hover:border-white/15 hover:bg-white/[0.025]
      "
    >

      <div
        className="
          flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
          bg-white/5 text-gray-400
          transition-all duration-300
          group-hover:scale-105 group-hover:text-violet-300
        "
      >
        {icon}
      </div>

      <div>

        <h3 className="text-sm font-medium text-gray-300">
          {title}
        </h3>

        <p className="mt-1.5 text-xs leading-5 text-gray-600">
          {text}
        </p>

      </div>

    </div>
  );
};


// =========================================================
// JOURNEY
// =========================================================

const Journey = ({
  number,
  title,
  text,
}) => {
  return (
    <div className="relative text-center">

      <div
        className="
          relative z-10 mx-auto flex h-12 w-12 items-center justify-center
          rounded-full border border-cyan-400/20 bg-[#090b10]
          text-xs font-semibold text-cyan-300
          transition-all duration-300
          hover:scale-110 hover:border-cyan-300/40 hover:bg-cyan-400/5
        "
      >
        {number}
      </div>

      <h3 className="mt-5 text-sm font-semibold text-gray-300">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-xs text-xs leading-6 text-gray-600">
        {text}
      </p>

    </div>
  );
};


// =========================================================
// CONTACT CARD
// =========================================================

const ContactCard = ({
  href,
  icon,
  label,
  value,
  accent,
}) => {
  const accentClasses =
    accent === "violet"
      ? "hover:border-violet-400/20 hover:bg-violet-400/[0.03]"
      : "hover:border-cyan-400/20 hover:bg-cyan-400/[0.03]";

  const iconClasses =
    accent === "violet"
      ? "bg-violet-400/5 text-violet-300"
      : "bg-cyan-400/5 text-cyan-300";

  return (
    <a
      href={href}
      className={`
        group flex min-w-[280px] items-center gap-4 rounded-2xl
        border border-white/10 bg-[#0d1017] p-4
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:scale-[1.01]
        ${accentClasses}
      `}
    >

      <div
        className={`
          flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
          transition-all duration-300 group-hover:scale-110
          ${iconClasses}
        `}
      >
        {icon}
      </div>

      <div>

        <p className="text-xs text-gray-600">
          {label}
        </p>

        <p className="mt-1 text-sm text-gray-300">
          {value}
        </p>

      </div>

      <ArrowUpRight
        size={16}
        className="
          ml-auto text-gray-700
          transition-all duration-300
          group-hover:-translate-y-0.5 group-hover:translate-x-0.5
          group-hover:text-gray-300
        "
      />

    </a>
  );
};


// =========================================================
// FOOTER LINK
// =========================================================

const FooterLink = ({
  to,
  label,
}) => {
  return (
    <Link
      to={to}
      className="
        group flex items-center gap-2 text-sm text-gray-600
        transition-all duration-300 hover:translate-x-1 hover:text-gray-300
      "
    >
      {label}

      <ChevronRight
        size={13}
        className="
          opacity-0 transition-all duration-300
          group-hover:translate-x-1 group-hover:opacity-100
        "
      />
    </Link>
  );
};


export default About;