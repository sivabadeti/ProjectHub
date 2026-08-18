import { useState } from "react";

import {
  Search,
  Mail,
  MessageCircle,
  UserRound,
  FolderKanban,
  Database,
  UsersRound,
  AlertCircle,
  ChevronDown,
  Send,
  ArrowRight,
  HelpCircle,
} from "lucide-react";


function CustomerService() {

  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const [formData, setFormData] = useState({
    category: "General Question",
    subject: "",
    message: "",
  });


  // =========================================================
  // SUPPORT CATEGORIES
  // =========================================================

  const categories = [
    {
      title: "Account & Profile",
      description:
        "Issues with your account, profile, or login.",
      icon: UserRound,
    },

    {
      title: "Projects",
      description:
        "Help with project discovery and ideas.",
      icon: FolderKanban,
    },

    {
      title: "Datasets",
      description:
        "Questions about dataset search and sources.",
      icon: Database,
    },

    {
      title: "Teams & Recruitment",
      description:
        "Need help finding or recruiting teammates?",
      icon: UsersRound,
    },

    {
      title: "Technical Issue",
      description:
        "Report something that isn't working correctly.",
      icon: AlertCircle,
    },

    {
      title: "General Question",
      description:
        "Anything else you need help with.",
      icon: HelpCircle,
    },
  ];


  // =========================================================
  // FAQ
  // =========================================================

  const faqs = [
    {
      question:
        "What is ProjectHub?",

      answer:
        "ProjectHub is a platform designed to help students and developers discover project ideas, find relevant datasets, connect with teammates, and build projects together.",
    },

    {
      question:
        "How can I find project ideas?",

      answer:
        "Go to the Project Discovery section and describe what you want to build. You can explore ideas based on technologies, categories, and difficulty levels.",
    },

    {
      question:
        "Where can I find datasets?",

      answer:
        "Use the Dataset Discovery section to search for datasets from supported sources such as Kaggle and Hugging Face.",
    },

    {
      question:
        "How can I find teammates?",

      answer:
        "You can explore user profiles and find people based on their skills, interests, and experience. Team recruitment features can then be used to connect with suitable collaborators.",
    },

    {
      question:
        "I found a problem with ProjectHub. What should I do?",
      
      answer:
        "Use the support form on this page and provide as much information as possible about the issue. Include what you were trying to do and what happened.",
    },
  ];


  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // =========================================================
  // FORM SUBMIT
  // =========================================================

  const handleSubmit = (e) => {

    e.preventDefault();

    /*
      Backend can be connected later.

      For now this only prevents
      the page from refreshing.
    */

    alert(
      "Thank you for contacting ProjectHub Support. We'll get back to you soon."
    );

  };


  // =========================================================
  // FAQ TOGGLE
  // =========================================================

  const toggleFaq = (index) => {

    setOpenFaq(
      openFaq === index
        ? null
        : index
    );

  };


  return (

    <main
      className="
        min-h-screen
        bg-[#070a0f]
        px-5
        pb-20
        pt-28
        text-white
      "
    >

      <section className="mx-auto max-w-6xl">


        {/* =====================================================
            HERO
        ===================================================== */}

        <div
          className="
            mx-auto
            max-w-3xl
            text-center

            animate-[fadeUp_0.7s_ease-out_both]
          "
        >

          <div
            className="
              mx-auto
              mb-4
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-violet-500/20
              bg-violet-500/[0.06]
              px-3
              py-1.5
              text-xs
              font-medium
              text-violet-300
            "
          >

            <MessageCircle
              size={14}
            />

            PROJECTHUB SUPPORT

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
            How can we help?
          </h1>


          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-gray-500

              md:text-base
            "
          >
            Find answers, explore helpful resources,
            or get in touch with the ProjectHub
            support team.
          </p>


          {/* SEARCH */}

          

        </div>


        {/* =====================================================
            SUPPORT CATEGORIES
        ===================================================== */}

        <section
          className="
            mt-16

            animate-[fadeUp_0.7s_ease-out_0.15s_both]
          "
        >

          <div className="mb-6">

            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-wider
                text-violet-400
              "
            >
              Support Center
            </p>


            <h2
              className="
                mt-1
                text-xl
                font-semibold
                text-white
              "
            >
              What can we help you with?
            </h2>

          </div>


          <div
            className="
              grid
              gap-4

              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {categories.map(
              (item, index) => {

                const Icon = item.icon;

                return (

                  <button
                    key={item.title}
                    type="button"
                    onClick={() => {

                      setFormData((prev) => ({
                        ...prev,
                        category: item.title,
                      }));

                    }}
                    style={{
                      animationDelay:
                        `${index * 70}ms`,
                    }}
                    className="
                      group
                      rounded-2xl
                      border
                      border-white/[0.07]
                      bg-[#0c1017]
                      p-5
                      text-left

                      opacity-0
                      animate-[fadeUp_0.55s_ease-out_forwards]

                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:border-white/[0.13]
                      hover:bg-[#0e131c]
                      hover:shadow-[0_15px_35px_rgba(0,0,0,0.18)]
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/[0.07]
                        bg-white/[0.025]

                        transition-all
                        duration-300

                        group-hover:border-violet-500/20
                        group-hover:bg-violet-500/[0.05]
                      "
                    >

                      <Icon
                        size={18}
                        strokeWidth={1.6}
                        className="
                          text-gray-400

                          transition-all
                          duration-300

                          group-hover:text-violet-300
                          group-hover:-translate-y-0.5
                        "
                      />

                    </div>


                    <h3
                      className="
                        mt-4
                        text-sm
                        font-semibold
                        text-gray-200

                        transition-colors
                        duration-300

                        group-hover:text-white
                      "
                    >
                      {item.title}
                    </h3>


                    <p
                      className="
                        mt-2
                        text-xs
                        leading-5
                        text-gray-600
                      "
                    >
                      {item.description}
                    </p>


                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        gap-1.5
                        text-xs
                        text-gray-600

                        transition-all
                        duration-300

                        group-hover:gap-2
                        group-hover:text-violet-300
                      "
                    >

                      Get help

                      <ArrowRight
                        size={13}
                      />

                    </div>

                  </button>

                );

              }
            )}

          </div>

        </section>

        {/* =====================================================
    SUPPORT INFORMATION
===================================================== */}

<section
  className="
    mt-14
    overflow-hidden
    rounded-2xl
    border
    border-white/[0.07]
    bg-[#0c1017]

    animate-[fadeUp_0.7s_ease-out_0.25s_both]
  "
>
  <div
    className="
      grid
      gap-8
      p-7

      md:p-9
      lg:grid-cols-[1.15fr_0.85fr]
      lg:items-center
    "
  >

    {/* LEFT */}

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
        ProjectHub Help Center
      </p>


      <h2
        className="
          mt-2
          max-w-2xl
          text-2xl
          font-semibold
          leading-tight
          tracking-tight
          text-white

          md:text-3xl
        "
      >
        We're here to help you
        build with confidence.
      </h2>


      <p
        className="
          mt-5
          max-w-2xl
          text-sm
          leading-7
          text-gray-500

          md:text-[15px]
        "
      >
        ProjectHub is built to make the process of
        discovering, planning, and building projects
        easier. Whether you're looking for the right
        dataset, exploring a new project idea, or
        trying to connect with people who share your
        interests, our support center is here to help
        you get the most out of the platform.
      </p>


      <p
        className="
          mt-4
          max-w-2xl
          text-sm
          leading-7
          text-gray-500

          md:text-[15px]
        "
      >
        If something doesn't work as expected, let us
        know what happened and provide as much detail
        as possible. This helps us understand the
        problem and improve the experience for everyone
        using ProjectHub.
      </p>


      <p
        className="
          mt-4
          max-w-2xl
          text-sm
          leading-7
          text-gray-500

          md:text-[15px]
        "
      >
        For account-related questions, technical issues,
        project discovery, datasets, or team-related
        concerns, you can choose the category that best
        describes your request below and send a message
        to our support team.
      </p>

    </div>


    {/* RIGHT */}

    <div
      className="
        rounded-2xl
        border
        border-white/[0.06]
        bg-white/[0.02]
        p-6
      "
    >

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
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-violet-500/20
            bg-violet-500/[0.06]
          "
        >

          <MessageCircle
            size={18}
            className="text-violet-300"
          />

        </div>


        <div>

          <h3
            className="
              text-sm
              font-semibold
              text-gray-200
            "
          >
            Need assistance?
          </h3>

          <p
            className="
              mt-0.5
              text-xs
              text-gray-600
            "
          >
            We're listening.
          </p>

        </div>

      </div>


      <div
        className="
          my-6
          h-px
          bg-white/[0.06]
        "
      />


      <div className="space-y-5">

        <div>

          <p
            className="
              text-xs
              font-medium
              text-gray-300
            "
          >
            01. Find an answer
          </p>

          <p
            className="
              mt-1.5
              text-xs
              leading-5
              text-gray-600
            "
          >
            Browse common questions and helpful
            information before contacting support.
          </p>

        </div>


        <div>

          <p
            className="
              text-xs
              font-medium
              text-gray-300
            "
          >
            02. Tell us what's wrong
          </p>

          <p
            className="
              mt-1.5
              text-xs
              leading-5
              text-gray-600
            "
          >
            Choose the category that best matches
            your question or issue.
          </p>

        </div>


        <div>

          <p
            className="
              text-xs
              font-medium
              text-gray-300
            "
          >
            03. Get the right support
          </p>

          <p
            className="
              mt-1.5
              text-xs
              leading-5
              text-gray-600
            "
          >
            Provide the details we need so your
            request can be handled efficiently.
          </p>

        </div>

      </div>

    </div>

  </div>


  {/* BOTTOM STRIP */}

  <div
    className="
      border-t
      border-white/[0.06]
      bg-white/[0.012]
      px-7
      py-4

      md:px-9
    "
  >

    <div
      className="
        flex
        flex-col
        gap-2

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >

      <p
        className="
          text-xs
          leading-5
          text-gray-600
        "
      >
        Before submitting a request, please include
        relevant details such as the page you're using,
        what you expected to happen, and what happened
        instead.
      </p>


      <span
        className="
          shrink-0
          text-[10px]
          font-medium
          uppercase
          tracking-wider
          text-gray-700
        "
      >
        ProjectHub Support
      </span>

    </div>

  </div>

</section>

        {/* =====================================================
            CONTACT + FAQ
        ===================================================== */}

        <section
          className="
            mt-16
            grid
            gap-6
            lg:grid-cols-[1fr_1.1fr]

            animate-[fadeUp_0.7s_ease-out_0.3s_both]
          "
        >


          {/* =================================================
              CONTACT FORM
          ================================================= */}

          <div
            className="
              rounded-2xl
              border
              border-white/[0.07]
              bg-[#0c1017]
              p-6

              transition-all
              duration-300

              hover:border-white/[0.11]
            "
          >

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
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
                  Contact Support
                </p>


                <h2
                  className="
                    mt-1
                    text-xl
                    font-semibold
                    text-white
                  "
                >
                  Still need help?
                </h2>


                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-gray-600
                  "
                >
                  Tell us what you're experiencing
                  and we'll help you find a solution.
                </p>

              </div>


              <div
                className="
                  hidden
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]

                  sm:flex
                "
              >

                <Mail
                  size={18}
                  className="text-gray-400"
                />

              </div>

            </div>


            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-4"
            >


              {/* CATEGORY */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-xs
                    font-medium
                    text-gray-400
                  "
                >
                  Category
                </label>


                <div className="relative">

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="
                      h-11
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-[#10151d]
                      px-3
                      pr-9
                      text-sm
                      text-gray-300
                      outline-none

                      transition-all
                      duration-300

                      focus:border-violet-500/40
                    "
                  >

                    {categories.map(
                      (item) => (

                        <option
                          key={item.title}
                          value={item.title}
                        >
                          {item.title}
                        </option>

                      )
                    )}

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
                    "
                  />

                </div>

              </div>


              {/* SUBJECT */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-xs
                    font-medium
                    text-gray-400
                  "
                >
                  Subject
                </label>


                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Briefly describe your issue"
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-[#10151d]
                    px-3
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-gray-600

                    transition-all
                    duration-300

                    focus:border-violet-500/40
                    focus:bg-[#111720]
                  "
                />

              </div>


              {/* MESSAGE */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-xs
                    font-medium
                    text-gray-400
                  "
                >
                  Message
                </label>


                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us more about what you need help with..."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-[#10151d]
                    px-3
                    py-3
                    text-sm
                    leading-6
                    text-white
                    outline-none
                    placeholder:text-gray-600

                    transition-all
                    duration-300

                    focus:border-violet-500/40
                    focus:bg-[#111720]
                  "
                />

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white
                  text-sm
                  font-semibold
                  text-black

                  transition-all
                  duration-200

                  hover:-translate-y-[1px]
                  hover:bg-gray-100
                  hover:shadow-[0_8px_25px_rgba(255,255,255,0.08)]

                  active:translate-y-0
                  active:scale-[0.98]
                "
              >

                <Send size={15} />

                Send Message

              </button>

            </form>

          </div>


          {/* =================================================
              FAQ
          ================================================= */}

          <div
            className="
              rounded-2xl
              border
              border-white/[0.07]
              bg-[#0c1017]
              p-6

              transition-all
              duration-300

              hover:border-white/[0.11]
            "
          >

            <div>

              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-wider
                  text-cyan-400
                "
              >
                Help Center
              </p>


              <h2
                className="
                  mt-1
                  text-xl
                  font-semibold
                  text-white
                "
              >
                Frequently asked questions
              </h2>


              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-gray-600
                "
              >
                Quick answers to common questions
                about ProjectHub.
              </p>

            </div>


            <div className="mt-7 space-y-2">

              {faqs.map(
                (faq, index) => {

                  const isOpen =
                    openFaq === index;

                  return (

                    <div
                      key={faq.question}
                      className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-white/[0.015]

                        transition-all
                        duration-300

                        hover:border-white/[0.10]
                      "
                    >

                      <button
                        type="button"
                        onClick={() =>
                          toggleFaq(index)
                        }
                        className="
                          flex
                          w-full
                          items-center
                          justify-between
                          gap-4
                          px-4
                          py-4
                          text-left
                        "
                      >

                        <span
                          className="
                            text-sm
                            font-medium
                            text-gray-300
                          "
                        >
                          {faq.question}
                        </span>


                        <ChevronDown
                          size={16}
                          className={`
                            shrink-0
                            text-gray-500

                            transition-transform
                            duration-300

                            ${
                              isOpen
                                ? "rotate-180 text-violet-300"
                                : ""
                            }
                          `}
                        />

                      </button>


                      <div
                        className={`
                          grid
                          transition-all
                          duration-300
                          ease-out

                          ${
                            isOpen
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

                          <p
                            className="
                              border-t
                              border-white/[0.05]
                              px-4
                              py-4
                              text-xs
                              leading-6
                              text-gray-600
                            "
                          >
                            {faq.answer}
                          </p>

                        </div>

                      </div>

                    </div>

                  );

                }
              )}

            </div>

          </div>

        </section>


        {/* =====================================================
            EMAIL SUPPORT
        ===================================================== */}

        <section
          className="
            mt-8
            rounded-2xl
            border
            border-white/[0.07]
            bg-[#0c1017]
            p-6
            text-center

            transition-all
            duration-300

            hover:border-white/[0.11]

            animate-[fadeUp_0.7s_ease-out_0.45s_both]
          "
        >

          <div
            className="
              mx-auto
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.025]
            "
          >

            <Mail
              size={19}
              className="text-gray-400"
            />

          </div>


          <h3
            className="
              mt-4
              text-sm
              font-semibold
              text-gray-200
            "
          >
            Prefer email?
          </h3>


          <p
            className="
              mt-1
              text-xs
              text-gray-600
            "
          >
            You can also reach the ProjectHub
            support team directly.
          </p>


          <a
            href="mailto:sivabadeti2005@gmail.com"
            className="
              mt-3
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-violet-300

              transition-all
              duration-200

              hover:gap-3
              hover:text-violet-200
            "
          >

            ProjectHub-support@gmail.com

            <ArrowRight
              size={14}
            />

          </a>

        </section>


        {/* =====================================================
            FOOTER NOTE
        ===================================================== */}

        <p
          className="
            mt-8
            text-center
            text-[11px]
            text-gray-700
          "
        >
          ProjectHub Support · We're here to help
          you build better projects.
        </p>

      </section>


      {/* =======================================================
          ANIMATIONS
      ======================================================= */}

      <style>{`

        @keyframes fadeUp {

          from {
            opacity: 0;
            transform: translateY(14px);
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
          }

        }

      `}</style>

    </main>

  );

}


export default CustomerService;