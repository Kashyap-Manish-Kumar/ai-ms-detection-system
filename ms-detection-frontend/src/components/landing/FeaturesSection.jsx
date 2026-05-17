// components/landing/FeaturesSection.jsx

function FeaturesSection() {

  return (

    <section
      id="features"
      className="
        mt-24

        scroll-mt-32
      "
    >

      <div
        className="
          relative

          overflow-hidden

          rounded-[40px]

          border border-cyan-500/20

          bg-[#0B1120]

          p-8 sm:p-10 lg:p-14

          shadow-2xl

          shadow-cyan-500/5
        "
      >

        {/* BACKGROUND GLOW */}
        <div
          className="
            absolute

            top-0 right-0

            w-[350px]
            h-[350px]

            bg-cyan-500/10

            blur-[120px]

            rounded-full
          "
        />

        {/* CONTENT */}
        <div className="relative z-10">

          {/* SMALL LABEL */}
          <div
            className="
              inline-flex items-center

              gap-3

              px-5 py-2.5

              rounded-full

              bg-cyan-500/10

              border border-cyan-500/20

              text-cyan-300

              text-sm

              font-medium
            "
          >

            <div
              className="
                w-2.5 h-2.5

                rounded-full

                bg-cyan-400

                animate-pulse
              "
            />

            Platform Features

          </div>

          {/* HEADING */}
          <div className="mt-8">

            <h2
              className="
                text-4xl
                sm:text-5xl
                xl:text-6xl

                leading-tight

                font-black

                text-white

                max-w-4xl
              "
            >
              Intelligent MRI Analysis
              Built for{" "}

              <span className="text-cyan-400">
                Modern Healthcare
              </span>

            </h2>

            <p
              className="
                mt-8

                max-w-3xl

                text-slate-300

                text-lg

                leading-relaxed
              "
            >
              Turing Body combines
              advanced AI-powered MRI
              diagnostics, lesion
              segmentation, predictive
              analytics, and clinical
              intelligence into one
              intelligent healthcare
              platform.
            </p>

          </div>

          {/* FEATURES GRID */}
          <div
            className="
              mt-14

              grid grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4

              gap-6
            "
          >

            {/* CARD 1 */}
            <div
              className="
                group

                bg-[#020817]

                border border-cyan-500/20

                rounded-[32px]

                p-7

                hover:border-cyan-400/40

                transition-all duration-300
              "
            >

              {/* ICON */}
              <div
                className="
                  w-16 h-16

                  rounded-2xl

                  bg-cyan-500/10

                  border border-cyan-500/20

                  flex items-center justify-center

                  text-3xl

                  text-cyan-400
                "
              >
                🧠
              </div>

              <h3
                className="
                  mt-8

                  text-2xl

                  font-bold

                  text-white
                "
              >
                MRI Upload
              </h3>

              <p
                className="
                  mt-5

                  text-slate-300

                  leading-relaxed
                "
              >
                Upload neurological MRI
                scans securely with
                intelligent healthcare
                preprocessing workflows.
              </p>

            </div>

            {/* CARD 2 */}
            <div
              className="
                group

                bg-[#020817]

                border border-cyan-500/20

                rounded-[32px]

                p-7

                hover:border-cyan-400/40

                transition-all duration-300
              "
            >

              {/* ICON */}
              <div
                className="
                  w-16 h-16

                  rounded-2xl

                  bg-cyan-500/10

                  border border-cyan-500/20

                  flex items-center justify-center

                  text-3xl

                  text-cyan-400
                "
              >
                ⚡
              </div>

              <h3
                className="
                  mt-8

                  text-2xl

                  font-bold

                  text-white
                "
              >
                AI Detection
              </h3>

              <p
                className="
                  mt-5

                  text-slate-300

                  leading-relaxed
                "
              >
                Real-time lesion
                segmentation powered by
                deep learning and MRI
                intelligence systems.
              </p>

            </div>

            {/* CARD 3 */}
            <div
              className="
                group

                bg-[#020817]

                border border-cyan-500/20

                rounded-[32px]

                p-7

                hover:border-cyan-400/40

                transition-all duration-300
              "
            >

              {/* ICON */}
              <div
                className="
                  w-16 h-16

                  rounded-2xl

                  bg-cyan-500/10

                  border border-cyan-500/20

                  flex items-center justify-center

                  text-3xl

                  text-cyan-400
                "
              >
                📊
              </div>

              <h3
                className="
                  mt-8

                  text-2xl

                  font-bold

                  text-white
                "
              >
                Analytics
              </h3>

              <p
                className="
                  mt-5

                  text-slate-300

                  leading-relaxed
                "
              >
                Advanced healthcare
                analytics with AI
                insights, trends, and
                predictive intelligence.
              </p>

            </div>

            {/* CARD 4 */}
            <div
              className="
                group

                bg-[#020817]

                border border-cyan-500/20

                rounded-[32px]

                p-7

                hover:border-cyan-400/40

                transition-all duration-300
              "
            >

              {/* ICON */}
              <div
                className="
                  w-16 h-16

                  rounded-2xl

                  bg-cyan-500/10

                  border border-cyan-500/20

                  flex items-center justify-center

                  text-3xl

                  text-cyan-400
                "
              >
                📄
              </div>

              <h3
                className="
                  mt-8

                  text-2xl

                  font-bold

                  text-white
                "
              >
                Clinical Reports
              </h3>

              <p
                className="
                  mt-5

                  text-slate-300

                  leading-relaxed
                "
              >
                Generate intelligent
                AI-assisted diagnostic
                reports for modern
                clinical workflows.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}

export default FeaturesSection;