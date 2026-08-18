import { useState, useEffect, useRef } from "react";

import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  MapPin,
  Sparkles,
  User,
  X,
} from "lucide-react";


function RegisterModal({
  onClose,
  onLogin,
  onRegisterSuccess,
}) {

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    branch: "",
    year: "",
    password: "",
    confirmPassword: "",
    location: "",
  });


  // =====================================================
  // STATES
  // =====================================================

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const googleButtonRef = useRef(null);


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // =====================================================
  // NORMAL REGISTER
  // =====================================================

  const handleRegister = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");


    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        setError(
          data.message ||
          "Unable to create account."
        );

        return;
      }


      // Save authentication data

      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );

      }


      if (data.user) {

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

      }


      setSuccess(
        "Account created successfully!"
      );


      // Tell Navbar authentication changed

      window.dispatchEvent(
        new Event("authChange")
      );


      setTimeout(() => {

        if (data.user) {

          onRegisterSuccess(data.user);

        } else {

          onRegisterSuccess();

        }

      }, 1200);


    } catch (error) {

      console.error(
        "Register error:",
        error
      );

      setError(
        "Unable to connect to the server."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // GOOGLE AUTHENTICATION
  // =====================================================

  const sendGoogleCredential = async (
    credential
  ) => {

    setLoading(true);
    setError("");
    setSuccess("");


    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/google",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            credential,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        setError(
          data.message ||
          "Google registration failed."
        );

        return;
      }


      // Save JWT

      localStorage.setItem(
        "token",
        data.token
      );


      // Save user

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      // Update Navbar

      window.dispatchEvent(
        new Event("authChange")
      );


      setSuccess(
        data.user.profileCompleted
          ? "Google login successful!"
          : "Google account created successfully!"
      );


      setTimeout(() => {

        onRegisterSuccess(data.user);

      }, 1200);


    } catch (error) {

      console.error(
        "Google authentication error:",
        error
      );

      setError(
        "Unable to connect to the server."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // GOOGLE INITIALIZATION
  // =====================================================

  useEffect(() => {

    if (
      !window.google ||
      !googleButtonRef.current
    ) {
      return;
    }


    window.google.accounts.id.initialize({

      client_id:
        import.meta.env.VITE_GOOGLE_CLIENT_ID,

      callback: async (response) => {

        await sendGoogleCredential(
          response.credential
        );

      },

    });


    window.google.accounts.id.renderButton(

      googleButtonRef.current,

      {
        theme: "outline",
        size: "large",
        width: 350,
        text: "continue_with",
        shape: "rectangular",
      }

    );

  }, []);


  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="
        fixed inset-0
        z-[100]

        flex items-center justify-center

        bg-black/70

        px-4 py-5
        sm:px-6

        backdrop-blur-lg

        animate-[registerOverlayIn_300ms_ease-out]
      "

      onClick={onClose}
    >


      {/* =================================================
          MODAL
      ================================================= */}

      <div
        className="
          relative

          w-full
          max-w-[420px]
          max-h-[90vh]

          overflow-y-auto

          rounded-[26px]

          border
          border-white/[0.09]

          bg-[#0b0e14]

          p-6
          sm:p-7

          shadow-[0_30px_100px_rgba(0,0,0,0.7)]

          animate-[registerModalIn_500ms_cubic-bezier(.22,1,.36,1)]
        "

        onClick={(e) =>
          e.stopPropagation()
        }
      >


        {/* =================================================
            TOP ACCENT
        ================================================= */}

        <div
          className="
            pointer-events-none

            absolute
            left-[12%]
            right-[12%]
            top-0

            h-px

            bg-gradient-to-r
            from-transparent
            via-violet-400/60
            to-transparent
          "
        />


        {/* =================================================
            BACKGROUND GLOW
        ================================================= */}

        <div
          className="
            pointer-events-none

            absolute
            -right-20
            -top-20

            h-40
            w-40

            rounded-full

            bg-violet-500/[0.035]

            blur-[70px]
          "
        />


        <div
          className="
            pointer-events-none

            absolute
            -bottom-20
            -left-20

            h-40
            w-40

            rounded-full

            bg-cyan-400/[0.035]

            blur-[70px]
          "
        />


        {/* =================================================
            CLOSE
        ================================================= */}

        <button
          type="button"

          onClick={onClose}

          className="
            absolute
            right-4
            top-4

            z-20

            flex
            h-8
            w-8

            items-center
            justify-center

            rounded-full

            text-gray-600

            transition-all
            duration-300

            hover:rotate-90
            hover:bg-white/[0.05]
            hover:text-white

            active:scale-90
          "

          aria-label="Close registration"
        >

          <X size={17} />

        </button>


        {/* =================================================
            BRAND
        ================================================= */}

        <div
          className="
            relative

            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-xl

              bg-gradient-to-br
              from-violet-400
              to-cyan-300

              text-black

              shadow-lg
              shadow-violet-500/[0.08]

              transition-all
              duration-500

              hover:scale-110
              hover:rotate-3
            "
          >

            <Sparkles size={17} />

          </div>


          <div>

            <p
              className="
                text-sm
                font-semibold
                tracking-tight
                text-gray-200
              "
            >
              ProjectHub
            </p>

            <p
              className="
                text-[10px]
                tracking-wide
                text-gray-600
              "
            >
              Developer discovery platform
            </p>

          </div>

        </div>


        {/* =================================================
            HEADING
        ================================================= */}

        <div
          className="
            relative

            mt-6
            pr-7
          "
        >

          <div
            className="
              mb-2.5

              flex
              items-center
              gap-2
            "
          >

            <span
              className="
                h-1.5
                w-1.5

                rounded-full

                bg-violet-300

                shadow-[0_0_10px_rgba(196,181,253,.7)]

                animate-pulse
              "
            />

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.16em]

                text-violet-300/70
              "
            >
              Join the community
            </span>

          </div>


          <h2
            className="
              text-[27px]

              font-semibold
              leading-tight

              tracking-[-0.035em]

              text-white
            "
          >
            Build something together.
          </h2>


          <p
            className="
              mt-2

              text-sm
              leading-6

              text-gray-500
            "
          >
            Create your profile and connect
            with developers, projects and ideas.
          </p>

        </div>


        {/* =================================================
            REGISTER FORM
        ================================================= */}

        <form
          onSubmit={handleRegister}

          className="
            relative
            mt-6
            space-y-3.5
          "
        >


          {/* =================================================
              NAME
          ================================================= */}

          <ModernInput
            icon={<User size={16} />}
            label="Full name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            autoComplete="name"
            required
          />


          {/* =================================================
              EMAIL
          ================================================= */}

          <ModernInput
            icon={<Mail size={16} />}
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />


          {/* =================================================
              COLLEGE
          ================================================= */}

          <ModernInput
            icon={<GraduationCap size={16} />}
            label="College / University"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="Your college or university"
            required
          />


          {/* =================================================
              LOCATION
          ================================================= */}

          <ModernInput
            icon={<MapPin size={16} />}
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Hyderabad, India"
            required
          />


          {/* =================================================
              BRANCH + YEAR
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-3.5

              sm:grid-cols-2
            "
          >

            {/* BRANCH */}

            <ModernInput
              icon={
                <GraduationCap
                  size={16}
                />
              }

              label="Branch"

              name="branch"

              value={formData.branch}

              onChange={handleChange}

              placeholder="e.g. CSE"

              required
            />


            {/* YEAR */}

            <div>

              <label
                className="
                  mb-2

                  block

                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.14em]

                  text-gray-500
                "
              >
                Year
              </label>


              <div className="relative">

                <GraduationCap
                  size={16}

                  className="
                    pointer-events-none

                    absolute
                    left-3.5
                    top-1/2

                    z-10

                    -translate-y-1/2

                    text-gray-600
                  "
                />


                <select
                  name="year"

                  value={formData.year}

                  onChange={handleChange}

                  required

                  className="
                    h-[47px]
                    w-full

                    appearance-none

                    rounded-xl

                    border
                    border-white/[0.08]

                    bg-white/[0.025]

                    pl-10
                    pr-3

                    text-sm
                    text-gray-400

                    outline-none

                    transition-all
                    duration-300

                    focus:border-violet-300/30
                    focus:bg-violet-300/[0.025]

                    focus:shadow-[0_0_0_4px_rgba(167,139,250,0.035)]
                  "
                >

                  <option
                    value=""
                    disabled
                    className="bg-[#0b0e14]"
                  >
                    Select year
                  </option>

                  <option
                    value="1"
                    className="bg-[#0b0e14]"
                  >
                    1st Year
                  </option>

                  <option
                    value="2"
                    className="bg-[#0b0e14]"
                  >
                    2nd Year
                  </option>

                  <option
                    value="3"
                    className="bg-[#0b0e14]"
                  >
                    3rd Year
                  </option>

                  <option
                    value="4"
                    className="bg-[#0b0e14]"
                  >
                    4th Year
                  </option>

                  <option
                    value="graduate"
                    className="bg-[#0b0e14]"
                  >
                    Graduate
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* =================================================
              PASSWORD
          ================================================= */}

          <ModernPasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            autoComplete="new-password"
            required
          />


          {/* =================================================
              CONFIRM PASSWORD
          ================================================= */}

          <ModernPasswordInput
            label="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            autoComplete="new-password"
            required
          />


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div
              className="
                rounded-xl

                border
                border-red-400/10

                bg-red-400/[0.045]

                px-3.5
                py-2.5

                text-xs
                leading-5

                text-red-400

                animate-[registerMessageIn_250ms_ease-out]
              "
            >
              {error}
            </div>

          )}


          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (

            <div
              className="
                rounded-xl

                border
                border-emerald-400/10

                bg-emerald-400/[0.045]

                px-3.5
                py-2.5

                text-center

                text-xs
                font-medium

                text-emerald-400

                animate-[registerMessageIn_250ms_ease-out]
              "
            >
              ✓ {success}
            </div>

          )}


          {/* =================================================
              CREATE ACCOUNT BUTTON
          ================================================= */}

          <button
            type="submit"

            disabled={loading}

            className="
              group

              relative

              mt-1

              h-[49px]
              w-full

              overflow-hidden

              rounded-xl

              bg-gradient-to-r
              from-violet-500
              via-indigo-500
              to-cyan-400

              text-sm
              font-semibold
              text-white

              shadow-lg
              shadow-violet-500/[0.10]

              transition-all
              duration-300

              hover:-translate-y-[2px]

              hover:shadow-xl
              hover:shadow-violet-500/[0.15]

              active:translate-y-0
              active:scale-[0.99]

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            {/* Shine */}

            <span
              className="
                pointer-events-none

                absolute
                inset-0

                -translate-x-full

                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent

                transition-transform
                duration-700

                group-hover:translate-x-full
              "
            />


            <span
              className="
                relative

                flex
                items-center
                justify-center
                gap-2
              "
            >

              {loading
                ? "Creating account..."
                : "Create your account"
              }


              {!loading && (

                <ArrowRight
                  size={16}

                  className="
                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                />

              )}

            </span>

          </button>

        </form>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <div
          className="
            my-5

            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              h-px
              flex-1

              bg-gradient-to-r
              from-transparent
              to-white/[0.08]
            "
          />


          <span
            className="
              text-[10px]

              uppercase

              tracking-[0.15em]

              text-gray-700
            "
          >
            or
          </span>


          <div
            className="
              h-px
              flex-1

              bg-gradient-to-l
              from-transparent
              to-white/[0.08]
            "
          />

        </div>


        {/* =================================================
            GOOGLE
        ================================================= */}

        <div
          ref={googleButtonRef}

          className="
            flex

            min-h-[40px]

            justify-center

            overflow-hidden

            rounded-xl

            transition-all
            duration-300

            hover:-translate-y-[1px]
          "
        />


        {/* =================================================
            LOGIN
        ================================================= */}

        <div
          className="
            mt-5

            flex
            items-center
            justify-center
            gap-1.5

            text-xs
            text-gray-600
          "
        >

          <span>
            Already part of ProjectHub?
          </span>


          <button
            type="button"

            onClick={() => {

              onClose();

              onLogin();

            }}

            className="
              font-medium

              text-cyan-300

              transition-all
              duration-200

              hover:text-cyan-200

              hover:underline
              hover:underline-offset-4
            "
          >
            Sign in
          </button>

        </div>


        {/* =================================================
            SECURITY
        ================================================= */}

        <div
          className="
            mt-5

            flex

            items-center
            justify-center
            gap-1.5

            text-[9px]

            uppercase

            tracking-[0.12em]

            text-gray-700
          "
        >

          <LockKeyhole size={10} />

          Your account is securely protected

        </div>

      </div>


      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>
        {`

          @keyframes registerOverlayIn {

            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }

          }


          @keyframes registerModalIn {

            from {
              opacity: 0;

              transform:
                translateY(18px)
                scale(.97);

              filter: blur(4px);
            }

            to {
              opacity: 1;

              transform:
                translateY(0)
                scale(1);

              filter: blur(0);
            }

          }


          @keyframes registerMessageIn {

            from {
              opacity: 0;

              transform:
                translateY(-5px);
            }

            to {
              opacity: 1;

              transform:
                translateY(0);
            }

          }


          @media (prefers-reduced-motion: reduce) {

            *,
            *::before,
            *::after {

              animation-duration: .01ms !important;

              animation-iteration-count: 1 !important;

              transition-duration: .01ms !important;

            }

          }

        `}
      </style>

    </div>
  );
}


// =========================================================
// MODERN TEXT INPUT
// =========================================================

const ModernInput = ({
  icon,
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
}) => {

  return (

    <div>

      <label
        className="
          mb-2

          block

          text-[10px]
          font-medium
          uppercase
          tracking-[0.14em]

          text-gray-500
        "
      >
        {label}
      </label>


      <div className="group relative">

        <span
          className="
            pointer-events-none

            absolute
            left-3.5
            top-1/2

            -translate-y-1/2

            text-gray-600

            transition-colors
            duration-300

            group-focus-within:text-violet-300
          "
        >
          {icon}
        </span>


        <input
          type={type}

          name={name}

          value={value}

          onChange={onChange}

          placeholder={placeholder}

          autoComplete={autoComplete}

          required={required}

          className="
            h-[47px]
            w-full

            rounded-xl

            border
            border-white/[0.08]

            bg-white/[0.025]

            pl-10
            pr-4

            text-sm
            text-white

            outline-none

            placeholder:text-gray-700

            transition-all
            duration-300

            focus:border-violet-300/30

            focus:bg-violet-300/[0.025]

            focus:shadow-[0_0_0_4px_rgba(167,139,250,0.035)]
          "
        />

      </div>

    </div>

  );
};


// =========================================================
// MODERN PASSWORD INPUT
// =========================================================

const ModernPasswordInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  showPassword,
  setShowPassword,
  autoComplete,
  required,
}) => {

  return (

    <div>

      <label
        className="
          mb-2

          block

          text-[10px]
          font-medium
          uppercase
          tracking-[0.14em]

          text-gray-500
        "
      >
        {label}
      </label>


      <div className="group relative">

        <LockKeyhole
          size={16}

          strokeWidth={1.7}

          className="
            pointer-events-none

            absolute
            left-3.5
            top-1/2

            -translate-y-1/2

            text-gray-600

            transition-colors
            duration-300

            group-focus-within:text-violet-300
          "
        />


        <input
          type={
            showPassword
              ? "text"
              : "password"
          }

          name={name}

          value={value}

          onChange={onChange}

          placeholder={placeholder}

          autoComplete={autoComplete}

          required={required}

          className="
            h-[47px]
            w-full

            rounded-xl

            border
            border-white/[0.08]

            bg-white/[0.025]

            pl-10
            pr-11

            text-sm
            text-white

            outline-none

            placeholder:text-gray-700

            transition-all
            duration-300

            focus:border-violet-300/30

            focus:bg-violet-300/[0.025]

            focus:shadow-[0_0_0_4px_rgba(167,139,250,0.035)]
          "
        />


        <button
          type="button"

          onClick={() =>
            setShowPassword(
              !showPassword
            )
          }

          className="
            absolute
            right-3.5
            top-1/2

            -translate-y-1/2

            text-gray-600

            transition-all
            duration-200

            hover:scale-110
            hover:text-gray-300
          "
        >

          {showPassword ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}

        </button>

      </div>

    </div>

  );
};


export default RegisterModal;