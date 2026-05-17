// components/landing/TechnologySection.jsx

function TechnologySection() {

  return (

    <section
      id="technology"
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

            w-[400px]
            h-[400px]

            bg-cyan-500/10

            blur-[140px]

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

            AI Technology Stack

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

                max-w-5xl
              "
            >
              Advanced AI Infrastructure
              for{" "}

              <span className="text-cyan-400">
                MRI Intelligence
              </span>

            </h2>

            <p
              className="
                mt-8

                max-w-4xl

                text-slate-300

                text-lg

                leading-relaxed
              "
            >
              Turing Body combines deep
              learning, MRI
              segmentation, real-time
              analytics, and modern web
              technologies to create an
              intelligent neurological
              diagnostic platform for
              modern healthcare
              systems.
            </p>

          </div>

          {/* TECHNOLOGY GRID */}
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
                🤖
              </div>

              <h3
                className="
                  mt-8

                  text-2xl

                  font-bold

                  text-white
                "
              >
                Deep Learning
              </h3>

              <p
                className="
                  mt-5

                  text-slate-300

                  leading-relaxed
                "
              >
                AI-powered lesion
                segmentation and MRI
                classification using
                neural network models.
              </p>

            </div>

            {/* CARD 2 */}
            <div
              className="
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
                MRI Segmentation
              </h3>

              <p
                className="
                  mt-5

                  text-slate-300

                  leading-relaxed
                "
              >
                Intelligent MRI
                visualization with
                lesion overlays and
                real-time neurological
                analysis.
              </p>

            </div>

            {/* CARD 3 */}
            <div
              className="
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
                Real-Time Analytics
              </h3>

              <p
                className="
                  mt-5

                  text-slate-300

                  leading-relaxed
                "
              >
                Fast MRI processing,
                AI prediction
                confidence, and
                healthcare analytics
                dashboards.
              </p>

            </div>

            {/* CARD 4 */}
            <div
              className="
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
                🌐
              </div>

              <h3
                className="
                  mt-8

                  text-2xl

                  font-bold

                  text-white
                "
              >
                Full Stack Platform
              </h3>

              <p
                className="
                  mt-5

                  text-slate-300

                  leading-relaxed
                "
              >
                React frontend, Spring
                Boot backend, AI
                integration, and secure
                healthcare data
                management.
              </p>

            </div>

          </div>

          {/* WORKFLOW SECTION */}
          <div
            className="
              mt-16

              rounded-[36px]

              border border-cyan-500/20

              bg-[#020817]

              p-8 sm:p-10
            "
          >

            {/* TITLE */}
            <h3
              className="
                text-3xl

                font-black

                text-white
              "
            >
              AI Diagnostic Workflow
            </h3>

            {/* STEPS */}
            <div
              className="
                mt-10

                grid grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4

                gap-6
              "
            >

              {/* STEP 1 */}
              <div>

                <div
                  className="
                    w-14 h-14

                    rounded-2xl

                    bg-cyan-500/10

                    border border-cyan-500/20

                    flex items-center justify-center

                    text-cyan-400

                    text-xl

                    font-black
                  "
                >
                  01
                </div>

                <h4
                  className="
                    mt-6

                    text-xl

                    font-bold

                    text-white
                  "
                >
                  MRI Upload
                </h4>

                <p
                  className="
                    mt-3

                    text-slate-300

                    leading-relaxed
                  "
                >
                  Upload patient MRI
                  scans securely into
                  the AI diagnostic
                  system.
                </p>

              </div>

              {/* STEP 2 */}
              <div>

                <div
                  className="
                    w-14 h-14

                    rounded-2xl

                    bg-cyan-500/10

                    border border-cyan-500/20

                    flex items-center justify-center

                    text-cyan-400

                    text-xl

                    font-black
                  "
                >
                  02
                </div>

                <h4
                  className="
                    mt-6

                    text-xl

                    font-bold

                    text-white
                  "
                >
                  AI Processing
                </h4>

                <p
                  className="
                    mt-3

                    text-slate-300

                    leading-relaxed
                  "
                >
                  Deep learning models
                  analyze MRI scans and
                  identify lesion
                  patterns.
                </p>

              </div>

              {/* STEP 3 */}
              <div>

                <div
                  className="
                    w-14 h-14

                    rounded-2xl

                    bg-cyan-500/10

                    border border-cyan-500/20

                    flex items-center justify-center

                    text-cyan-400

                    text-xl

                    font-black
                  "
                >
                  03
                </div>

                <h4
                  className="
                    mt-6

                    text-xl

                    font-bold

                    text-white
                  "
                >
                  Lesion Detection
                </h4>

                <p
                  className="
                    mt-3

                    text-slate-300

                    leading-relaxed
                  "
                >
                  MRI lesions are
                  highlighted with
                  intelligent overlay
                  visualization.
                </p>

              </div>

              {/* STEP 4 */}
              <div>

                <div
                  className="
                    w-14 h-14

                    rounded-2xl

                    bg-cyan-500/10

                    border border-cyan-500/20

                    flex items-center justify-center

                    text-cyan-400

                    text-xl

                    font-black
                  "
                >
                  04
                </div>

                <h4
                  className="
                    mt-6

                    text-xl

                    font-bold

                    text-white
                  "
                >
                  Clinical Report
                </h4>

                <p
                  className="
                    mt-3

                    text-slate-300

                    leading-relaxed
                  "
                >
                  AI-generated reports
                  provide clinical
                  insights and
                  prediction confidence.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}

export default TechnologySection;