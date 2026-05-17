// components/landing/HeroSection.jsx

import turingVideo from "../../assets/turing_into_video.mp4";
import { useState, useRef } from "react";

function HeroSection() {
  const [isMuted, setIsMuted] =
    useState(true);

  const videoRef = useRef(null);

  return (
    <section
      className="
        w-full
        space-y-8
      "
    >
      {/* ================================================= */}
      {/* VIDEO CARD */}
      {/* ================================================= */}

      <div
        className="
          relative

          w-full

          h-[320px]
          sm:h-[380px]
          xl:h-[430px]

          overflow-hidden

          rounded-[40px]

          border border-cyan-500/20

          bg-[#0B1120]

          shadow-2xl

          shadow-cyan-500/10
        "
      >
        {/* VIDEO */}
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="
            w-full h-full
            object-cover
          "
        >
          <source
            src={turingVideo}
            type="video/mp4"
          />
        </video>

        {/* SOUND BUTTON */}
        <button
          onClick={() =>
            setIsMuted(!isMuted)
          }
          className="
            absolute bottom-5 right-5

            z-30

            bg-black/60

            backdrop-blur-xl

            border border-cyan-500/20

            px-5 py-3

            rounded-2xl

            text-white

            font-medium

            hover:bg-cyan-500/20

            transition-all duration-300
          "
        >
          {isMuted
            ? "Enable Sound"
            : "Mute"}
        </button>

        {/* DARK OVERLAY */}
        <div
          className="
            absolute inset-0

            bg-gradient-to-t
            from-[#020817]/90
            via-transparent
            to-transparent
          "
        />

        {/* LIVE BADGE */}
        <div
          className="
            absolute top-5 left-5

            bg-black/50

            backdrop-blur-xl

            border border-cyan-500/20

            rounded-full

            px-5 py-2

            flex items-center

            gap-3

            z-20
          "
        >
          {/* DOT */}
          <div
            className="
              w-3 h-3

              rounded-full

              bg-cyan-400

              animate-pulse
            "
          />

          <span
            className="
              text-sm

              font-medium

              text-white
            "
          >
            AI MRI Detection Live
          </span>
        </div>

        {/* VIDEO LABEL */}
        <div
          className="
            absolute bottom-6 left-6

            z-20
          "
        >
          <h3
            className="
              text-3xl
              sm:text-4xl

              font-black

              text-white
            "
          >
            Turing Body
          </h3>

          <p
            className="
              mt-2

              text-cyan-300

              text-sm sm:text-base
            "
          >
            AI-Powered Multiple Sclerosis Detection
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* CONTENT SECTION */}
      {/* ================================================= */}

      <div
        className="
          space-y-8
        "
      >
        {/* HEADING */}
        <div>
          <h1
            className="
              text-4xl
              sm:text-5xl
              xl:text-4xl

              leading-tight

              font-black
               ml-4
               text-cyan-400
            "
          >
            Early Detection. Smarter Decisions. Better Outcomes.

            
          </h1>

        </div>
      

        
      </div>
    </section>
  );
}

export default HeroSection;