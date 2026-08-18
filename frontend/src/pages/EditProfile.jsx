import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Camera,
  X,
  Pencil,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";


function EditProfile() {

  const navigate = useNavigate();

  const [resumeFile, setResumeFile] = useState(null);

  // ================= PROFILE PICTURE =================

  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");

  // ================= STATUS =================

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  // ================= FORM DATA =================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    about: "",
    college: "",
    branch: "",
    location: "",

    github: "",
    linkedin: "",

    resume: "",

    skills: [],
    experience: [],
    projects: [],
    certifications: [],
    achievements: [],
  });


  // =========================================================
  // EXPERIENCE
  // =========================================================

  const addExperience = () => {

    setFormData({
      ...formData,

      experience: [
        ...formData.experience,

        {
          company: "",
          role: "",
          location: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    });

  };


  const updateExperience = (
    index,
    field,
    value
  ) => {

    const updated = [
      ...formData.experience,
    ];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      experience: updated,
    });

  };


  const removeExperience = (index) => {

    setFormData({
      ...formData,

      experience:
        formData.experience.filter(
          (_, i) => i !== index
        ),
    });

  };


  // =========================================================
  // LOAD USER
  // =========================================================

  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");


    if (!savedUser) {

      navigate("/");
      return;

    }


    const user =
      JSON.parse(savedUser);


    // Existing profile picture
    setProfilePicPreview(
      user.profilePic || ""
    );


    setFormData({

      name: user.name || "",

      email: user.email || "",

      role:
        user.role ||
        "Role not Specified",

      about:
        user.about || "",

      college:
        user.college || "",

      branch:
        user.branch || "",

      location:
        user.location || "",


      github:
        user.github || "",

      linkedin:
        user.linkedin || "",


      resume:
        user.resume || "",


      skills:
        user.skills || [],

      projects:
        user.projects || [],

      certifications:
        user.certifications || [],

      achievements:
        user.achievements || [],

      experience:
        user.experience || [],

    });

  }, [navigate]);


  // =========================================================
  // BASIC INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };


  // =========================================================
  // PROFILE PICTURE
  // =========================================================

  const handleProfilePicChange = (e) => {

    const file =
      e.target.files[0];


    if (!file) return;


    // 5MB limit

    if (
      file.size >
      5 * 1024 * 1024
    ) {

      setError(
        "Profile picture must be less than 5MB."
      );

      setProfilePicFile(null);

      return;

    }


    // Allowed image types

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];


    if (
      !allowedTypes.includes(
        file.type
      )
    ) {

      setError(
        "Only JPG, PNG, and WEBP images are allowed."
      );

      setProfilePicFile(null);

      return;

    }


    setError("");


    setProfilePicFile(file);


    // Create preview

    const previewUrl =
      URL.createObjectURL(file);


    setProfilePicPreview(
      previewUrl
    );

  };


  // =========================================================
  // REMOVE PROFILE PICTURE
  // =========================================================

  const removeProfilePic = () => {

    setProfilePicFile(null);

    setProfilePicPreview("");

  };


  // =========================================================
  // SKILLS
  // =========================================================

  const addSkill = () => {

    setFormData({

      ...formData,

      skills: [
        ...formData.skills,
        "",
      ],

    });

  };


  const updateSkill = (
    index,
    value
  ) => {

    const updated = [
      ...formData.skills,
    ];

    updated[index] = value;


    setFormData({

      ...formData,

      skills: updated,

    });

  };


  const removeSkill = (
    index
  ) => {

    setFormData({

      ...formData,

      skills:
        formData.skills.filter(
          (_, i) => i !== index
        ),

    });

  };


  // =========================================================
  // PROJECTS
  // =========================================================

  const addProject = () => {

    setFormData({

      ...formData,

      projects: [

        ...formData.projects,

        {
          name: "",
          githubLink: "",
          liveLink: "",
          description: "",
        },

      ],

    });

  };


  const updateProject = (
    index,
    field,
    value
  ) => {

    const updated = [
      ...formData.projects,
    ];


    updated[index] = {

      ...updated[index],

      [field]: value,

    };


    setFormData({

      ...formData,

      projects: updated,

    });

  };


  const removeProject = (
    index
  ) => {

    setFormData({

      ...formData,

      projects:
        formData.projects.filter(
          (_, i) => i !== index
        ),

    });

  };


  // =========================================================
  // CERTIFICATIONS
  // =========================================================

  const addCertification = () => {

    setFormData({

      ...formData,

      certifications: [

        ...formData.certifications,

        {
          name: "",
          issuer: "",
          certificateLink: "",
          year: "",
        },

      ],

    });

  };


  const updateCertification = (
    index,
    field,
    value
  ) => {

    const updated = [
      ...formData.certifications,
    ];


    updated[index] = {

      ...updated[index],

      [field]: value,

    };


    setFormData({

      ...formData,

      certifications: updated,

    });

  };


  const removeCertification = (
    index
  ) => {

    setFormData({

      ...formData,

      certifications:
        formData.certifications.filter(
          (_, i) => i !== index
        ),

    });

  };


  // =========================================================
  // ACHIEVEMENTS
  // =========================================================

  const addAchievement = () => {

    setFormData({

      ...formData,

      achievements: [

        ...formData.achievements,

        {
          title: "",
          description: "",
          year: "",
        },

      ],

    });

  };


  const updateAchievement = (
    index,
    field,
    value
  ) => {

    const updated = [
      ...formData.achievements,
    ];


    updated[index] = {

      ...updated[index],

      [field]: value,

    };


    setFormData({

      ...formData,

      achievements: updated,

    });

  };


  const removeAchievement = (
    index
  ) => {

    setFormData({

      ...formData,

      achievements:
        formData.achievements.filter(
          (_, i) => i !== index
        ),

    });

  };


  // =========================================================
  // RESUME
  // =========================================================

  const handleResumeChange = (e) => {

    const file =
      e.target.files[0];


    if (!file) return;


    // 5MB limit

    if (
      file.size >
      5 * 1024 * 1024
    ) {

      setError(
        "Resume must be less than 5MB."
      );

      setResumeFile(null);

      return;

    }


    const allowedTypes = [

      "application/pdf",

      "application/msword",

      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    ];


    if (
      !allowedTypes.includes(
        file.type
      )
    ) {

      setError(
        "Only PDF, DOC, and DOCX files are allowed."
      );

      setResumeFile(null);

      return;

    }


    setError("");

    setResumeFile(file);

  };


  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();


    setLoading(true);

    setError("");

    setMessage("");


    // GitHub and LinkedIn required

    if (
      !formData.github ||
      !formData.linkedin
    ) {

      setError(
        "GitHub and LinkedIn links are required."
      );

      setLoading(false);

      return;

    }


    // Resume required

    if (
      !resumeFile &&
      !formData.resume
    ) {

      setError(
        "Please upload your resume."
      );

      setLoading(false);

      return;

    }


    try {

      const token =
        localStorage.getItem(
          "token"
        );


      if (!token) {

        setError(
          "You are not logged in."
        );

        setLoading(false);

        return;

      }


      const dataToSend =
        new FormData();


      // =====================================================
      // BASIC INFORMATION
      // =====================================================

      dataToSend.append(
        "name",
        formData.name
      );

      dataToSend.append(
        "email",
        formData.email
      );

      dataToSend.append(
        "role",
        formData.role
      );

      dataToSend.append(
        "about",
        formData.about
      );

      dataToSend.append(
        "college",
        formData.college
      );

      dataToSend.append(
        "branch",
        formData.branch
      );

      dataToSend.append(
        "location",
        formData.location
      );


      // =====================================================
      // SOCIAL LINKS
      // =====================================================

      dataToSend.append(
        "github",
        formData.github
      );

      dataToSend.append(
        "linkedin",
        formData.linkedin
      );


      // =====================================================
      // ARRAYS
      // =====================================================

      dataToSend.append(
        "skills",
        JSON.stringify(
          formData.skills
        )
      );


      dataToSend.append(
        "projects",
        JSON.stringify(
          formData.projects
        )
      );


      dataToSend.append(
        "experience",
        JSON.stringify(
          formData.experience
        )
      );


      dataToSend.append(
        "certifications",
        JSON.stringify(
          formData.certifications
        )
      );


      dataToSend.append(
        "achievements",
        JSON.stringify(
          formData.achievements
        )
      );


      // =====================================================
      // RESUME
      // =====================================================

      if (resumeFile) {
        dataToSend.append(
          "resume",
          resumeFile
        );
      }


      // =====================================================
      // PROFILE PICTURE
      // =====================================================

      if (profilePicFile) {
        dataToSend.append(
          "profilePicture",
          profilePicFile
        );
      }



      // =====================================================
      // API REQUEST
      // =====================================================

      const response =
        await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            method: "PUT",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            body: dataToSend,
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        setError(
          data.message ||
          "Unable to update profile."
        );

        return;

      }


      // =====================================================
      // UPDATE LOCAL STORAGE
      // =====================================================

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );


      // Notify Navbar

      window.dispatchEvent(
        new Event("authChange")
      );


      setMessage(
        "Profile updated successfully."
      );


      setTimeout(() => {

        navigate("/profile");

      }, 1200);


    } catch (error) {

      console.error(
        "Update profile error:",
        error
      );


      setError(
        "Unable to connect to the server."
      );


    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // RETURN
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
          max-w-5xl
        "
      >

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            mb-8
            flex
            items-center
            gap-4
          "
        >

          <button
            type="button"
            onClick={() =>
              navigate("/profile")
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              text-gray-400

              transition

              hover:bg-white/5
              hover:text-white
            "
          >

            <ArrowLeft size={18} />

          </button>


          <div>

            <h1
              className="
                text-2xl
                font-semibold
              "
            >
              Edit Profile
            </h1>


            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              Update your ProjectHub profile.
            </p>

          </div>

        </div>


        {/* =====================================================
            FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >


          {/* ===================================================
              PROFILE PICTURE
          =================================================== */}

          <section
            className="
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              p-5

              sm:p-7
            "
          >

            <div>

              <h2
                className="
                  text-lg
                  font-semibold
                "
              >
                Profile Picture
              </h2>


              <p
                className="
                  mt-1
                  text-sm
                  text-gray-500
                "
              >
                Add a professional profile picture
                to help others recognize you.
              </p>

            </div>


            <div
              className="
                mt-6
                flex
                flex-col
                items-center
                gap-6

                sm:flex-row
              "
            >

              {/* PROFILE IMAGE */}

          <div className="relative shrink-0">

            {/* Profile Picture */}

            <div
              className="
                flex
                h-28
                w-28
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
                border-white/10
                bg-[#11151c]
                shadow-xl

                transition-all
                duration-300

                hover:border-white/20
              "
            >

              {profilePicPreview ? (

                <img
                  src={profilePicPreview}
                  alt="Profile preview"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

              ) : (

                <span
                  className="
                    text-3xl
                    font-semibold
                    text-gray-500
                  "
                >
                  {formData.name
                    ? formData.name.charAt(0).toUpperCase()
                    : "U"}
                </span>

              )}

            </div>


            {/* =====================================================
                EDIT PROFILE PICTURE BUTTON
            ===================================================== */}

            <label
              htmlFor="profile-picture"
              title="Change profile picture"
              className="
                absolute
                bottom-0
                right-0

                flex
                h-9
                w-9
                cursor-pointer
                items-center
                justify-center

                rounded-full

                border-[3px]
                border-[#090b10]

                bg-white
                text-black

                shadow-lg

                transition-all
                duration-200

                hover:scale-110
                hover:bg-gray-100

                active:scale-95
              "
            >

              <Pencil
                size={15}
                strokeWidth={2.2}
              />

            </label>


            {/* Hidden file input */}

            <input
              id="profile-picture"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleProfilePicChange}
              className="hidden"
            />

          </div>


              {/* IMAGE DETAILS */}

              <div className="min-w-0 flex-1">

  <p
    className="
      text-sm
      font-medium
      text-gray-300
    "
  >
    Update your profile picture
  </p>

  <p
    className="
      mt-2
      max-w-lg
      text-xs
      leading-5
      text-gray-600
    "
  >
    Choose a clear and professional image that
    represents you on ProjectHub.
  </p>

  <p
    className="
      mt-2
      text-[11px]
      text-gray-700
    "
  >
    JPG, PNG or WEBP · Maximum size: 5MB
  </p>


  {profilePicFile && (

    <div className="mt-3 flex items-center gap-2">

      <span
        className="
          truncate
          text-xs
          text-cyan-300
        "
      >
        {profilePicFile.name}
      </span>

      <button
        type="button"
        onClick={removeProfilePic}
        className="
          flex
          h-6
          w-6
          shrink-0
          items-center
          justify-center
          rounded-full
          text-gray-600

          transition

          hover:bg-white/5
          hover:text-red-400
        "
      >

        <X size={13} />

      </button>

    </div>

  )}

</div>

            </div>

          </section>


          {/* ===================================================
              BASIC INFORMATION
          =================================================== */}

          <section
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              p-5

              sm:p-7
            "
          >

            <h2
              className="
                text-lg
                font-semibold
              "
            >
              Basic Information
            </h2>


            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              Your personal and academic information.
            </p>


            <div
              className="
                mt-6
                grid
                gap-5

                sm:grid-cols-2
              "
            >

              {/* USERNAME */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-xs
                    text-gray-400
                  "
                >
                  Username
                </label>


                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="profile-input"
                />

              </div>


              {/* EMAIL */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-xs
                    text-gray-400
                  "
                >
                  Email
                </label>


                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="
                    profile-input
                    cursor-not-allowed
                    opacity-50
                  "
                />


                <p
                  className="
                    mt-1
                    text-[11px]
                    text-gray-600
                  "
                >
                  Email editing will be available later.
                </p>

              </div>


              {/* ROLE */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    text-gray-400
                  "
                >
                  Professional Role
                </label>


                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Full Stack Developer, Data Analyst"
                  className="profile-input"
                />

              </div>


              {/* COLLEGE */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-xs
                    text-gray-400
                  "
                >
                  College / Company
                </label>


                <input
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="College or company"
                  className="profile-input"
                />

              </div>


              {/* BRANCH */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-xs
                    text-gray-400
                  "
                >
                  Branch
                </label>


                <input
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science"
                  className="profile-input"
                />

              </div>


              {/* LOCATION */}

              <div
                className="sm:col-span-2"
              >

                <label
                  className="
                    mb-2
                    block
                    text-xs
                    text-gray-400
                  "
                >
                  Location
                </label>


                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Hyderabad, India"
                  className="profile-input"
                />

              </div>


              {/* ABOUT */}

              <div
                className="sm:col-span-2"
              >

                <label
                  className="
                    mb-2
                    block
                    text-xs
                    text-gray-400
                  "
                >
                  About
                </label>


                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell people about yourself..."
                  className="
                    profile-input
                    resize-none
                  "
                />

              </div>

            </div>

          </section>


          {/* ===================================================
              SOCIAL LINKS
          =================================================== */}

          <section
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              p-5

              sm:p-7
            "
          >

            <h2
              className="
                text-lg
                font-semibold
              "
            >
              Social Links
            </h2>


            <div
              className="
                mt-6
                grid
                gap-5

                sm:grid-cols-2
              "
            >

              {/* GITHUB */}

              <div>

                <label
                  className="
                    mb-2
                    flex
                    items-center
                    gap-1
                    text-xs
                    text-gray-400
                  "
                >
                  GitHub

                  <span className="text-red-400">
                    *
                  </span>

                </label>


                <div className="relative">

                  <FaGithub
                    size={17}
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      z-10
                      -translate-y-1/2
                      text-gray-500
                    "
                  />


                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className="
                      h-16
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.025]
                      pl-12
                      pr-4
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-gray-600
                      focus:border-cyan-300/40
                    "
                  />

                </div>

              </div>


              {/* LINKEDIN */}

              <div>

                <label
                  className="
                    mb-2
                    flex
                    items-center
                    gap-1
                    text-xs
                    text-gray-400
                  "
                >
                  LinkedIn

                  <span className="text-red-400">
                    *
                  </span>

                </label>


                <div className="relative">

                  <FaLinkedin
                    size={17}
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      z-10
                      -translate-y-1/2
                      text-gray-500
                    "
                  />


                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="
                      h-16
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.025]
                      pl-12
                      pr-4
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-gray-600
                      focus:border-cyan-300/40
                    "
                  />

                </div>

              </div>

            </div>

          </section>


          {/* ===================================================
              SKILLS
          =================================================== */}

          <section
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              p-5

              sm:p-7
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <h2
                  className="
                    text-lg
                    font-semibold
                  "
                >
                  Skills
                </h2>


                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                  "
                >
                  Add technologies and skills you know.
                </p>

              </div>


              <button
                type="button"
                onClick={addSkill}
                className="
                  flex
                  items-center
                  gap-1
                  rounded-lg
                  border
                  border-white/10
                  px-3
                  py-2
                  text-xs
                  text-gray-300

                  transition

                  hover:bg-white/5
                "
              >

                <Plus size={14} />

                Add

              </button>

            </div>


            <div
              className="
                mt-5
                grid
                gap-3

                sm:grid-cols-2
              "
            >

              {formData.skills.map(
                (skill, index) => (

                  <div
                    key={index}
                    className="
                      flex
                      gap-2
                    "
                  >

                    <input
                      value={skill}
                      onChange={(e) =>
                        updateSkill(
                          index,
                          e.target.value
                        )
                      }
                      placeholder="e.g. React"
                      className="profile-input"
                    />


                    <button
                      type="button"
                      onClick={() =>
                        removeSkill(index)
                      }
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-red-500/10
                        text-red-400

                        transition

                        hover:bg-red-500/10
                      "
                    >

                      <Trash2 size={15} />

                    </button>

                  </div>

                )
              )}

            </div>

          </section>


          {/* ===================================================
              RESUME
          =================================================== */}

          <section
            className="
              rounded-2xl
              border
              border-white/10
              bg-[#0d1017]
              p-6
            "
          >

            <h2
              className="
                text-lg
                font-semibold
                text-white
              "
            >
              Resume{" "}

              <span className="text-red-400">
                *
              </span>

            </h2>


            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              Upload your latest resume.
            </p>


            <div
              className="
                mt-5
                rounded-2xl
                border
                border-dashed
                border-white/10
                bg-white/[0.02]
                p-6
              "
            >

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                className="
                  block
                  w-full
                  text-sm
                  text-gray-400

                  file:mr-4
                  file:rounded-lg
                  file:border-0
                  file:bg-white/5
                  file:px-4
                  file:py-2
                  file:text-sm
                  file:text-gray-300

                  hover:file:bg-white/10
                "
              />


              <p
                className="
                  mt-3
                  text-xs
                  text-gray-600
                "
              >
                PDF, DOC, DOCX · Maximum size: 5MB
              </p>


              {resumeFile && (

                <p
                  className="
                    mt-3
                    text-sm
                    text-cyan-300
                  "
                >
                  Selected: {resumeFile.name}
                </p>

              )}


              {!resumeFile &&
                formData.resume && (

                  <p
                    className="
                      mt-3
                      text-sm
                      text-gray-400
                    "
                  >
                    Current resume is already uploaded.
                  </p>

                )}

            </div>

          </section>


          {/* ===================================================
              PROJECTS
          =================================================== */}

          <section
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              p-5

              sm:p-7
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <h2
                  className="
                    text-lg
                    font-semibold
                  "
                >
                  Projects
                </h2>


                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                  "
                >
                  Showcase your best projects.
                </p>

              </div>


              <button
                type="button"
                onClick={addProject}
                className="
                  flex
                  items-center
                  gap-1
                  rounded-lg
                  border
                  border-white/10
                  px-3
                  py-2
                  text-xs
                  text-gray-300

                  transition

                  hover:bg-white/5
                "
              >

                <Plus size={14} />

                Add Project

              </button>

            </div>


            <div
              className="
                mt-6
                space-y-5
              "
            >

              {formData.projects.map(
                (project, index) => (

                  <div
                    key={index}
                    className="
                      rounded-xl
                      border
                      border-white/10
                      bg-black/20
                      p-4

                      sm:p-5
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

                      <span
                        className="
                          text-sm
                          font-medium
                          text-gray-300
                        "
                      >
                        Project {index + 1}
                      </span>


                      <button
                        type="button"
                        onClick={() =>
                          removeProject(index)
                        }
                        className="
                          text-red-400
                          transition

                          hover:text-red-300
                        "
                      >

                        <Trash2 size={16} />

                      </button>

                    </div>


                    <div
                      className="
                        grid
                        gap-4

                        sm:grid-cols-2
                      "
                    >

                      <input
                        value={project.name}
                        onChange={(e) =>
                          updateProject(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Project name"
                        className="profile-input"
                      />


                      <input
                        value={project.githubLink}
                        onChange={(e) =>
                          updateProject(
                            index,
                            "githubLink",
                            e.target.value
                          )
                        }
                        placeholder="GitHub link *"
                        className="profile-input"
                        required
                      />


                      <input
                        value={project.liveLink}
                        onChange={(e) =>
                          updateProject(
                            index,
                            "liveLink",
                            e.target.value
                          )
                        }
                        placeholder="Live project link"
                        className="profile-input"
                      />


                      <textarea
                        value={project.description}
                        onChange={(e) =>
                          updateProject(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Project description"
                        rows={3}
                        className="
                          profile-input
                          resize-none

                          sm:col-span-2
                        "
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </section>


          {/* ===================================================
              EXPERIENCE
          =================================================== */}

          <section
            className="
              rounded-2xl
              border
              border-white/10
              bg-[#0d1017]
              p-6
            "
          >

            <div
              className="
                mb-6
                flex
                items-center
                justify-between
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
                  Experience
                </h2>


                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                  "
                >
                  Add your professional experience.
                </p>

              </div>


              <button
                type="button"
                onClick={addExperience}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-2
                  text-sm
                  text-gray-300

                  transition

                  hover:border-cyan-300/30
                  hover:text-cyan-300
                "
              >

                <Plus size={16} />

                Add Experience

              </button>

            </div>


            <div className="space-y-5">

              {formData.experience.map(
                (exp, index) => (

                  <div
                    key={index}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.02]
                      p-5
                    "
                  >

                    <div
                      className="
                        mb-5
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <h3
                        className="
                          text-sm
                          font-medium
                          text-cyan-300
                        "
                      >
                        Experience {index + 1}
                      </h3>


                      <button
                        type="button"
                        onClick={() =>
                          removeExperience(index)
                        }
                        className="
                          text-gray-500
                          transition

                          hover:text-red-400
                        "
                      >

                        <Trash2 size={17} />

                      </button>

                    </div>


                    <div
                      className="
                        grid
                        gap-4

                        md:grid-cols-2
                      "
                    >

                      {/* COMPANY */}

                      <div>

                        <label
                          className="
                            mb-2
                            block
                            text-sm
                            text-gray-400
                          "
                        >
                          Company
                        </label>


                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              "company",
                              e.target.value
                            )
                          }
                          placeholder="Company name"
                          className="profile-input"
                        />

                      </div>


                      {/* ROLE */}

                      <div>

                        <label
                          className="
                            mb-2
                            block
                            text-sm
                            text-gray-400
                          "
                        >
                          Role
                        </label>


                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              "role",
                              e.target.value
                            )
                          }
                          placeholder="Full Stack Developer"
                          className="profile-input"
                        />

                      </div>


                      {/* LOCATION */}

                      <div>

                        <label
                          className="
                            mb-2
                            block
                            text-sm
                            text-gray-400
                          "
                        >
                          Location
                        </label>


                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              "location",
                              e.target.value
                            )
                          }
                          placeholder="Hyderabad, India"
                          className="profile-input"
                        />

                      </div>


                      {/* START DATE */}

                      <div>

                        <label
                          className="
                            mb-2
                            block
                            text-sm
                            text-gray-400
                          "
                        >
                          Start Date
                        </label>


                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              "startDate",
                              e.target.value
                            )
                          }
                          className="profile-input"
                        />

                      </div>


                      {/* END DATE */}

                      {!exp.currentlyWorking && (

                        <div>

                          <label
                            className="
                              mb-2
                              block
                              text-sm
                              text-gray-400
                            "
                          >
                            End Date
                          </label>


                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) =>
                              updateExperience(
                                index,
                                "endDate",
                                e.target.value
                              )
                            }
                            className="profile-input"
                          />

                        </div>

                      )}

                    </div>


                    {/* CURRENTLY WORKING */}

                    <label
                      className="
                        mt-5
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        text-sm
                        text-gray-400
                      "
                    >

                      <input
                        type="checkbox"
                        checked={
                          exp.currentlyWorking
                        }
                        onChange={(e) =>
                          updateExperience(
                            index,
                            "currentlyWorking",
                            e.target.checked
                          )
                        }
                        className="
                          h-4
                          w-4
                          accent-cyan-400
                        "
                      />

                      I currently work here

                    </label>


                    {/* DESCRIPTION */}

                    <div className="mt-5">

                      <label
                        className="
                          mb-2
                          block
                          text-sm
                          text-gray-400
                        "
                      >
                        Description
                      </label>


                      <textarea
                        rows="4"
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Describe your responsibilities, achievements and technologies used..."
                        className="
                          w-full
                          resize-none
                          rounded-xl
                          border
                          border-white/10
                          bg-white/[0.025]
                          px-4
                          py-3
                          text-sm
                          text-white
                          outline-none
                          transition
                          placeholder:text-gray-600
                          focus:border-cyan-300/40
                        "
                      />

                    </div>

                  </div>

                )
              )}

            </div>


            {formData.experience.length === 0 && (

              <div
                className="
                  rounded-xl
                  border
                  border-dashed
                  border-white/10
                  py-10
                  text-center
                "
              >

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  No experience added yet.
                </p>


                <button
                  type="button"
                  onClick={addExperience}
                  className="
                    mt-3
                    text-sm
                    text-cyan-300
                    transition

                    hover:text-cyan-200
                  "
                >
                  + Add your first experience
                </button>

              </div>

            )}

          </section>


          {/* ===================================================
              CERTIFICATIONS
          =================================================== */}

          <section
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              p-5

              sm:p-7
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <h2
                  className="
                    text-lg
                    font-semibold
                  "
                >
                  Certifications
                </h2>


                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                  "
                >
                  Add your certifications.
                </p>

              </div>


              <button
                type="button"
                onClick={addCertification}
                className="
                  flex
                  items-center
                  gap-1
                  rounded-lg
                  border
                  border-white/10
                  px-3
                  py-2
                  text-xs
                  text-gray-300

                  transition

                  hover:bg-white/5
                "
              >

                <Plus size={14} />

                Add

              </button>

            </div>


            <div
              className="
                mt-6
                space-y-5
              "
            >

              {formData.certifications.map(
                (certificate, index) => (

                  <div
                    key={index}
                    className="
                      rounded-xl
                      border
                      border-white/10
                      bg-black/20
                      p-4
                    "
                  >

                    <div
                      className="
                        mb-4
                        flex
                        justify-between
                      "
                    >

                      <span
                        className="
                          text-sm
                          text-gray-300
                        "
                      >
                        Certification {index + 1}
                      </span>


                      <button
                        type="button"
                        onClick={() =>
                          removeCertification(
                            index
                          )
                        }
                        className="
                          text-red-400
                          transition

                          hover:text-red-300
                        "
                      >

                        <Trash2 size={16} />

                      </button>

                    </div>


                    <div
                      className="
                        grid
                        gap-4

                        sm:grid-cols-2
                      "
                    >

                      <input
                        value={certificate.name}
                        onChange={(e) =>
                          updateCertification(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Certificate name"
                        className="profile-input"
                      />


                      <input
                        value={certificate.issuer}
                        onChange={(e) =>
                          updateCertification(
                            index,
                            "issuer",
                            e.target.value
                          )
                        }
                        placeholder="Issued by"
                        className="profile-input"
                      />


                      <input
                        value={certificate.year}
                        onChange={(e) =>
                          updateCertification(
                            index,
                            "year",
                            e.target.value
                          )
                        }
                        placeholder="Year"
                        className="profile-input"
                      />


                      <input
                        value={
                          certificate.certificateLink
                        }
                        onChange={(e) =>
                          updateCertification(
                            index,
                            "certificateLink",
                            e.target.value
                          )
                        }
                        placeholder="Certificate link"
                        className="profile-input"
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </section>


          {/* ===================================================
              ACHIEVEMENTS
          =================================================== */}

          <section
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              p-5

              sm:p-7
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <h2
                  className="
                    text-lg
                    font-semibold
                  "
                >
                  Achievements
                </h2>


                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                  "
                >
                  Highlight your achievements.
                </p>

              </div>


              <button
                type="button"
                onClick={addAchievement}
                className="
                  flex
                  items-center
                  gap-1
                  rounded-lg
                  border
                  border-white/10
                  px-3
                  py-2
                  text-xs
                  text-gray-300

                  transition

                  hover:bg-white/5
                "
              >

                <Plus size={14} />

                Add

              </button>

            </div>


            <div
              className="
                mt-6
                space-y-5
              "
            >

              {formData.achievements.map(
                (achievement, index) => (

                  <div
                    key={index}
                    className="
                      rounded-xl
                      border
                      border-white/10
                      bg-black/20
                      p-4
                    "
                  >

                    <div
                      className="
                        mb-4
                        flex
                        justify-between
                      "
                    >

                      <span
                        className="
                          text-sm
                          text-gray-300
                        "
                      >
                        Achievement {index + 1}
                      </span>


                      <button
                        type="button"
                        onClick={() =>
                          removeAchievement(
                            index
                          )
                        }
                        className="
                          text-red-400
                          transition

                          hover:text-red-300
                        "
                      >

                        <Trash2 size={16} />

                      </button>

                    </div>


                    <div
                      className="
                        grid
                        gap-4

                        sm:grid-cols-2
                      "
                    >

                      <input
                        value={
                          achievement.title
                        }
                        onChange={(e) =>
                          updateAchievement(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Achievement title"
                        className="profile-input"
                      />


                      <input
                        value={
                          achievement.year
                        }
                        onChange={(e) =>
                          updateAchievement(
                            index,
                            "year",
                            e.target.value
                          )
                        }
                        placeholder="Year"
                        className="profile-input"
                      />


                      <textarea
                        value={
                          achievement.description
                        }
                        onChange={(e) =>
                          updateAchievement(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Describe your achievement"
                        rows={3}
                        className="
                          profile-input
                          resize-none

                          sm:col-span-2
                        "
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </section>


          {/* ===================================================
              MESSAGES
          =================================================== */}

          {error && (

            <div
              className="
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-3
                text-sm
                text-red-400
              "
            >
              {error}
            </div>

          )}


          {message && (

            <div
              className="
                rounded-xl
                border
                border-green-500/20
                bg-green-500/10
                px-4
                py-3
                text-sm
                text-green-400
              "
            >
              ✓ {message}
            </div>

          )}


          {/* ===================================================
              ACTIONS
          =================================================== */}

          <div
            className="
              flex
              flex-col-reverse
              gap-3

              sm:flex-row
              sm:justify-end
            "
          >

            <button
              type="button"
              onClick={() =>
                navigate("/profile")
              }
              className="
                rounded-xl
                border
                border-white/10
                px-6
                py-3
                text-sm
                text-gray-400

                transition

                hover:bg-white/5
                hover:text-white
              "
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={loading}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                px-6
                py-3
                text-sm
                font-semibold
                text-black

                transition

                hover:bg-gray-200

                disabled:opacity-50
              "
            >

              <Save size={16} />

              {loading
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}


export default EditProfile;