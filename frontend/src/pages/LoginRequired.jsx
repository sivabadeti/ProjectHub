import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import LoginModal from "../components/LoginModal";

import {
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";


const LoginRequired = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [showLogin, setShowLogin] = useState(false);


  const handleLoginSuccess = (user) => {

    setShowLogin(false);

    // Return to the page the user originally wanted
    const from =
      location.state?.from || "/";

    navigate(from, {
      replace: true,
    });

  };


  return (
    <div
      className="
        min-h-screen bg-[#090b10] text-white
        flex items-center justify-center
        px-6 py-20
      "
    >

      {/* Background glow */}

      <div
        className="
          pointer-events-none fixed left-1/2 top-1/2
          h-[420px] w-[420px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-cyan-400/[0.04]
          blur-[130px]
        "
      />


      {/* Card */}

      <div
        className="
          relative w-full max-w-md
          rounded-3xl
          border border-white/10
          bg-[#0d1017]
          p-8 text-center
          shadow-2xl shadow-black/40
          animate-[loginRequiredIn_0.6s_ease-out_both]
        "
      >

        {/* Icon */}

        <div
          className="
            mx-auto flex h-16 w-16
            items-center justify-center
            rounded-2xl
            border border-cyan-400/10
            bg-cyan-400/[0.05]
            text-cyan-300
            transition-all duration-300
            hover:scale-105
            hover:bg-cyan-400/[0.08]
          "
        >
          <LockKeyhole size={27} />
        </div>


        {/* Heading */}

        <h1
          className="
            mt-7 text-2xl font-semibold
            tracking-tight text-white
            sm:text-3xl
          "
        >
          Login Required
        </h1>


        {/* Description */}

        <p
          className="
            mx-auto mt-4 max-w-sm
            text-sm leading-7
            text-gray-500
          "
        >
          Please login to your ProjectHub account
          to access this page and use all the
          features available to you.
        </p>


        <p
          className="
            mx-auto mt-3 max-w-sm
            text-xs leading-6
            text-gray-700
          "
        >
          Your account helps us connect your
          profile, projects, datasets, and
          collaboration activities in one place.
        </p>


        {/* Login button */}

        <button
          type="button"
          onClick={() => setShowLogin(true)}
          className="
            group mt-8
            inline-flex w-full
            items-center justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-indigo-500
            to-blue-500
            px-5 py-3
            text-sm font-semibold
            text-white
            transition-all duration-300
            ease-out
            hover:-translate-y-1
            hover:from-indigo-400
            hover:to-blue-400
            hover:shadow-lg
            hover:shadow-blue-500/10
            active:scale-[0.98]
          "
        >

          Login to Continue

          <ArrowRight
            size={16}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />

        </button>


        {/* Small security message */}

        <div
          className="
            mt-6 flex items-center
            justify-center gap-2
            text-[11px] text-gray-600
          "
        >
          <ShieldCheck size={14} />

          Your account information stays protected.

        </div>

      </div>


      {/* Login Modal */}

      {showLogin && (

        <LoginModal

          onClose={() => {
            setShowLogin(false);
          }}

          onRegister={() => {
            // Connect your RegisterModal here
          }}

          onLoginSuccess={handleLoginSuccess}

        />

      )}


      {/* Animation */}

      <style>
        {`
          @keyframes loginRequiredIn {

            from {
              opacity: 0;
              transform:
                translateY(20px)
                scale(0.97);
            }

            to {
              opacity: 1;
              transform:
                translateY(0)
                scale(1);
            }

          }

          @media (prefers-reduced-motion: reduce) {

            * {
              animation-duration: 0.01ms !important;
              transition-duration: 0.01ms !important;
            }

          }
        `}
      </style>

    </div>
  );
};


export default LoginRequired;