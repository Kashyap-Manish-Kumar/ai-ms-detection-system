// components/landing/ProblemSection.jsx

function ProblemSection() {

  return (

    <section
      id="problem"
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

            left-0 bottom-0

            w-[350px]
            h-[350px]

            bg-red-500/10

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

              bg-red-500/10

              border border-red-500/20

              text-red-300

              text-sm

              font-medium
            "
          >

            <div
              className="
                w-2.5 h-2.5

                rounded-full

                bg-red-400

                animate-pulse
              "
            />

            Healthcare Challenges

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
              The Challenge of{" "}

              <span className="text-red-400">
                Early Multiple Sclerosis Detection
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
              Multiple Sclerosis is a
              complex neurological
              disease that often
              remains undetected during
              its early stages due to
              subtle MRI lesion
              patterns, delayed
              clinical workflows, and
              the limitations of manual
              diagnosis systems.
            </p>

          </div>

          {/* PROBLEM GRID */}
          <div
            className="
              mt-14

              grid grid-cols-1
              md:grid-cols-2

              gap-6
            "
          >

            {/* CARD 1 */}
            <div
              className="
                bg-[#020817]

                border border-red-500/20

                rounded-[32px]

                p-7
              "
            >

              {/* ICON */}
              <div
                className="
                  w-16 h-16

                  rounded-2xl

                  bg-red-500/10

                  border border-red-500/20

                  flex items-center justify-center

                  text-3xl

                  text-red-400
                "
              >
                ⏳
              </div>

              <h3
                className="
                  mt-8

                  text-2xl

                  font-bold

                  text-white
                "
              >
                Delayed Diagnosis
              </h3>

              <p
                className="
                  mt-5

                  text-slate-300

                  leading-relaxed
                "
              >
                Manual MRI analysis can
                take significant time,
                delaying critical
                treatment decisions and
                increasing uncertainty
                for patients.
              </p>

            </div>

            {/* CARD 2 */}
            <div
              className="
                bg-[#020817]

                border border-red-500/20

                rounded-[32px]

                p-7
              "
            >

              {/* ICON */}
              <div
                className="
                  w-16 h-16

                  rounded-2xl

                  bg-red-500/10

                  border border-red-500/20

                  flex items-center justify-center

                  text-3xl

                  text-red-400
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
                Hidden Lesions
              </h3>

              <p
                className="
                  mt-5

                  text-slate-300

                  leading-relaxed
                "
              >
                Early-stage lesions are
                often difficult to
                identify manually,
                making accurate
                diagnosis extremely
                challenging.
              </p>

            </div>

            {/* CARD 3 */}
            <div
              className="
                bg-[#020817]

                border border-red-500/20

                rounded-[32px]

                p-7
              "
            >

              {/* ICON */}
              <div
                className="
                  w-16 h-16

                  rounded-2xl

                  bg-red-500/10

                  border border-red-500/20

                  flex items-center justify-center

                  text-3xl

                  text-red-400
                "
              >
                🏥
              </div>

              <h3
                className="
                  mt-8

                  text-2xl

                  font-bold

                  text-white
                "
              >
                Overloaded Hospitals
              </h3>

              <p
                className="
                  mt-5

                  text-slate-300

                  leading-relaxed
                "
              >
                Healthcare systems face
                increasing patient
                volume, reducing the
                efficiency of manual MRI
                review workflows.
              </p>

            </div>

            {/* CARD 4 */}
            <div
              className="
                bg-[#020817]

                border border-red-500/20

                rounded-[32px]

                p-7
              "
            >

              {/* ICON */}
              <div
                className="
                  w-16 h-16

                  rounded-2xl

                  bg-red-500/10

                  border border-red-500/20

                  flex items-center justify-center

                  text-3xl

                  text-red-400
                "
              >
                📉
              </div>

              <h3
                className="
                  mt-8

                  text-2xl

                  font-bold

                  text-white
                "
              >
                Diagnostic Uncertainty
              </h3>

              <p
                className="
                  mt-5

                  text-slate-300

                  leading-relaxed
                "
              >
                Traditional systems
                struggle to provide
                predictive confidence,
                real-time insights, and
                intelligent clinical
                assistance.
              </p>

            </div>

          </div>

          {/* CONCLUSION */}
          <div
            className="
              mt-14

              rounded-[32px]

              border border-cyan-500/20

              bg-cyan-500/5

              p-8
            "
          >

            <h3
              className="
                text-3xl

                font-black

                text-cyan-400
              "
            >
              Why Turing Body Matters
            </h3>

            <p
              className="
                mt-5

                text-slate-300

                text-lg

                leading-relaxed

                max-w-4xl
              "
            >
              Turing Body addresses
              these challenges through
              AI-powered MRI
              intelligence, enabling
              faster lesion detection,
              improved diagnostic
              accuracy, predictive
              analytics, and real-time
              clinical support for
              modern neurological
              healthcare systems.
            </p>

          </div>

        </div>

      </div>

    </section>

  );
}

export default ProblemSection;