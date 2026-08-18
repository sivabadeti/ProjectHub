import { useState, useEffect, useRef } from "react";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  X,
} from "lucide-react";


function LoginModal({
  onClose,
  onRegister,
  onLoginSuccess,
}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const googleButtonRef = useRef(null);


  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();


      if (!response.ok) {

        setError(
          data.message || "Invalid email or password."
        );

        return;
      }


      // Save authentication data

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      setSuccess("Login successful!");


      setTimeout(() => {

        onLoginSuccess(data.user);

      }, 1200);


    } catch (error) {

      console.error(
        "Login error:",
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
  // GOOGLE LOGIN
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
          "Google login failed."
        );

        return;
      }


      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      setSuccess(
        "Google login successful!"
      );


      setTimeout(() => {

        onLoginSuccess(data.user);

      }, 1200);


    } catch (error) {

      console.error(
        "Google login error:",
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
  // GOOGLE BUTTON
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
      }

    );

  }, []);


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

        animate-[loginOverlayIn_300ms_ease-out]
      "
      onClick={onClose}
    >


      {/* =====================================================
          MODAL
      ===================================================== */}

      <div
        className="
          relative

          w-full
          max-w-[390px]
          max-h-[90vh]

          overflow-y-auto

          rounded-[26px]

          border
          border-white/[0.09]

          bg-[#0b0e14]

          p-6
          sm:p-7

          shadow-[0_30px_100px_rgba(0,0,0,0.7)]

          animate-[loginModalIn_500ms_cubic-bezier(.22,1,.36,1)]
        "
        onClick={(e) => e.stopPropagation()}
      >


        {/* =================================================
            TOP GRADIENT LINE
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
            via-cyan-300/50
            to-transparent
          "
        />


        {/* =================================================
            AMBIENT GLOW
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

            bg-cyan-400/[0.035]

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

            bg-violet-500/[0.035]

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
          aria-label="Close login"
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
              shadow-cyan-400/[0.08]

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
            mt-7
            pr-6
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

                bg-cyan-300

                shadow-[0_0_10px_rgba(103,232,249,.7)]

                animate-pulse
              "
            />

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.16em]
                text-cyan-300/70
              "
            >
              Welcome back
            </span>

          </div>


          <h2
            className="
              text-[28px]
              font-semibold

              leading-tight

              tracking-[-0.035em]

              text-white
            "
          >
            Continue building.
          </h2>


          <p
            className="
              mt-2

              text-sm
              leading-6

              text-gray-500
            "
          >
            Sign in to access your projects,
            datasets and developer network.
          </p>

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleLogin}
          className="
            relative
            mt-6
            space-y-4
          "
        >


          {/* =================================================
              EMAIL
          ================================================= */}

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
              Email address
            </label>


            <div className="group relative">

              <Mail
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

                  group-focus-within:text-cyan-300
                "
              />


              <input
                type="email"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                placeholder="you@example.com"

                autoComplete="email"

                required

                className="
                  h-[49px]
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

                  focus:border-cyan-300/30
                  focus:bg-cyan-300/[0.025]

                  focus:shadow-[0_0_0_4px_rgba(103,232,249,0.035)]
                "
              />

            </div>

          </div>


          {/* =================================================
              PASSWORD
          ================================================= */}

          <div>

            <div
              className="
                mb-2

                flex
                items-center
                justify-between
              "
            >

              <label
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.14em]

                  text-gray-500
                "
              >
                Password
              </label>


              <button
                type="button"

                className="
                  text-[11px]
                  text-gray-600

                  transition-colors
                  duration-200

                  hover:text-cyan-300
                "
              >
                Forgot password?
              </button>

            </div>


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

                  group-focus-within:text-cyan-300
                "
              />


              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

                placeholder="Enter your password"

                autoComplete="current-password"

                required

                className="
                  h-[49px]
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

                  focus:border-cyan-300/30
                  focus:bg-cyan-300/[0.025]

                  focus:shadow-[0_0_0_4px_rgba(103,232,249,0.035)]
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

                animate-[messageIn_250ms_ease-out]
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

                animate-[messageIn_250ms_ease-out]
              "
            >
              ✓ {success}
            </div>

          )}


          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <button
            type="submit"

            disabled={loading}

            className="
              group

              relative

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
              shadow-indigo-500/[0.10]

              transition-all
              duration-300

              hover:-translate-y-[2px]

              hover:shadow-xl
              hover:shadow-indigo-500/[0.16]

              active:translate-y-0
              active:scale-[0.99]

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            {/* Animated shine */}

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
                ? "Logging in..."
                : "Continue to ProjectHub"
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
            REGISTER
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
            New to ProjectHub?
          </span>


          <button
            type="button"

            onClick={onRegister}

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
            Create Account
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

          <LockKeyhole
            size={10}
          />

          Secure authentication

        </div>

      </div>


      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>
        {`

          @keyframes loginOverlayIn {

            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }

          }


          @keyframes loginModalIn {

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


          @keyframes messageIn {

            from {
              opacity: 0;
              transform: translateY(-5px);
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


export default LoginModal;