// AnalyticsPage.jsx

import DashboardLayout from "../layouts/DashboardLayout";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AnalyticsPage() {

  /* LINE CHART DATA */
  const trendData = [
    { month: "Jan", scans: 120 },
    { month: "Feb", scans: 150 },
    { month: "Mar", scans: 180 },
    { month: "Apr", scans: 210 },
    { month: "May", scans: 240 },
    { month: "Jun", scans: 280 },
  ];

  return (

    <DashboardLayout>

      <div className="space-y-6">

        {/* ANALYTICS CARDS */}
        <div
          className="
            grid

            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4

            gap-5
          "
        >

          {/* TOTAL MRI */}
          <div
            className="
              bg-gradient-to-br
              from-[#0f172a]
              to-[#111827]

              border border-cyan-400/20

              rounded-3xl

              p-5 sm:p-6

              shadow-[0_0_40px_rgba(6,182,212,0.08)]
            "
          >

            <p className="text-cyan-200 text-sm">
              Total MRI Scans
            </p>

            <h2
              className="
                text-3xl sm:text-4xl

                font-bold

                text-white

                mt-3
              "
            >
              1,284  <span
    className="
      text-cyan-400

      text-sm

      whitespace-nowrap
    "
  >
    +12% this month
  </span>
            </h2>

           
             
           

          </div>

          {/* HIGH RISK */}
          <div
            className="
              bg-gradient-to-br
              from-[#111827]
              to-[#1f2937]

              border border-red-400/20

              rounded-3xl

              p-5 sm:p-6

              shadow-[0_0_40px_rgba(239,68,68,0.08)]
            "
          >

            <p className="text-red-200 text-sm">
              High Risk Cases
            </p>

            <h2
              className="
                text-3xl sm:text-4xl

                font-bold

                text-red-400

                mt-3
              "
            >
              342
              <span
                className="
                  text-cyan-400

                  text-sm

                  whitespace-nowrap
                "
              >
                Critical detections
              </span>
            </h2>

            

          </div>

          {/* MEDIUM RISK */}
          <div
            className="
              bg-gradient-to-br
              from-[#111827]
              to-[#172033]

              border border-yellow-400/20

              rounded-3xl

              p-5 sm:p-6

              shadow-[0_0_40px_rgba(250,204,21,0.08)]
            "
          >

            <p className="text-yellow-200 text-sm">
              Medium Risk Cases
            </p>

            <h2
              className="
                text-3xl sm:text-4xl

                font-bold

                text-yellow-300

                mt-3
              "
            >
              511
              <span
    className="
      text-cyan-400

      text-sm

      whitespace-nowrap
    "
  >
     Moderate detections
  </span>
            </h2>

            
          </div>

          {/* LOW RISK */}
          <div
            className="
              bg-gradient-to-br
              from-[#0f172a]
              to-[#1a2e2a]

              border border-green-400/20

              rounded-3xl

              p-5 sm:p-6

              shadow-[0_0_40px_rgba(34,197,94,0.08)]
            "
          >

            <p className="text-green-200 text-sm">
              Low Risk Cases
            </p>

            <h2
              className="
                text-3xl sm:text-4xl

                font-bold

                text-green-400

                mt-3
              "
            >
              431
              <span
                className="
                  text-cyan-400

                  text-sm

                  whitespace-nowrap
                "
              >
                Low-risk predictions
              </span>
            </h2>

            

          </div>

        </div>

        {/* CHART + AI INSIGHTS */}
        <div
          className="
            grid

            grid-cols-1
            2xl:grid-cols-2

            items-stretch

            gap-6
          "
        >

          {/* LINE CHART */}
          <div
            className="
              bg-gradient-to-br
              from-[#0f172a]
              via-[#111827]
              to-[#172554]

              border border-cyan-400/20

              rounded-3xl

              p-5 sm:p-6

              shadow-[0_0_50px_rgba(6,182,212,0.08)]
            "
          >

            <h2
              className="
                text-xl sm:text-2xl lg:text-3xl

                font-bold

                text-white

                mb-5
              "
            >
              MRI Prediction Trends
            </h2>

            <div className="h-[280px] sm:h-[320px] pt-1">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={trendData}
                  margin={{
                    top: 10,
                    right: 20,
                    left: -10,
                    bottom: 10,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                  />

                  <XAxis
                    dataKey="month"
                    stroke="#67e8f9"

                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    stroke="#67e8f9"

                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #06b6d4",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="scans"
                    stroke="#22d3ee"
                    strokeWidth={4}

                    dot={{
                      r: 4,
                      fill: "#06b6d4",
                    }}

                    activeDot={{
                      r: 7,
                    }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* AI INSIGHTS */}
          <div
            className="
              bg-gradient-to-br
              from-[#111827]
              via-[#0f172a]
              to-[#172554]

              border border-cyan-400/20

              rounded-3xl

              p-5 sm:p-7

              shadow-[0_0_50px_rgba(6,182,212,0.08)]

              flex flex-col

              justify-center

              min-h-[300px]
            "
          >

            <h2
              className="
                text-2xl sm:text-3xl

                font-bold

                text-white

                mb-7
              "
            >
              AI Insights
            </h2>

            <div
              className="
                space-y-5

                text-cyan-100

                text-sm
                sm:text-base
                lg:text-lg

                leading-relaxed
              "
            >

              <div
                className="
                  bg-white/5

                  border border-cyan-400/10

                  rounded-2xl

                  px-4 py-3
                "
              >
                • High-risk lesions increased by 12%
              </div>

              <div
                className="
                  bg-white/5

                  border border-cyan-400/10

                  rounded-2xl

                  px-4 py-3
                "
              >
                • Most affected age group: 30–45
              </div>

              <div
                className="
                  bg-white/5

                  border border-cyan-400/10

                  rounded-2xl

                  px-4 py-3
                "
              >
                • AI confidence improved to 96%
              </div>

              <div
                className="
                  bg-white/5

                  border border-cyan-400/10

                  rounded-2xl

                  px-4 py-3
                "
              >
                • MRI detection latency reduced by 18%
              </div>


            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );
}

export default AnalyticsPage;