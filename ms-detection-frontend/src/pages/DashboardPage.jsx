import DashboardLayout from "../layouts/DashboardLayout";

import StatsCard from "../components/StatsCard";
import ChartCard from "../components/ChartCard";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
 Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const uploadsData = [
  { day: "Mon", uploads: 4 },
  { day: "Tue", uploads: 7 },
  { day: "Wed", uploads: 5 },
  { day: "Thu", uploads: 8 },
  { day: "Fri", uploads: 6 },
  { day: "Sat", uploads: 9 },
];

function DashboardPage() {
  const quickActionRef = useRef(null);
  const recentActivityRef = useRef(null);

  const navigate = useNavigate();

  // Scroll Functions
  const scrollToQuickActions = () => {
    quickActionRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToRecentActivity = () => {
    recentActivityRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <DashboardLayout
      onQuickActionsClick={scrollToQuickActions}
      onRecentActivityClick={scrollToRecentActivity}
    >

      {/* MAIN DASHBOARD GRID */}
      <div
        className="
          grid grid-cols-1
          2xl:grid-cols-2
          gap-5 sm:gap-6
        "
      >

        {/* LEFT SIDE */}
        <div className="space-y-5 sm:space-y-6">

          {/* STATISTICS CARDS */}
          <div
            className="
              grid grid-cols-2
              gap-4 sm:gap-6
            "
          >

            <div
              className="
                bg-gradient-to-br
                from-[#0f172a]
                to-[#172554]

                border border-cyan-400/20

                rounded-2xl

                shadow-xl
              "
            >
              <StatsCard
                title="Total Patients"
                value="128"
                color="text-cyan-300"
              />
            </div>

            <div
              className="
                bg-gradient-to-br
                from-[#0f172a]
                to-[#1a2e2a]

                border border-green-400/20

                rounded-2xl

                shadow-xl
              "
            >
              <StatsCard
                title="MRI Uploads"
                value="342"
                color="text-green-300"
              />
            </div>

            <div
              className="
                bg-gradient-to-br
                from-[#111827]
                to-[#2b0b12]

                border border-red-400/20

                rounded-2xl

                shadow-xl
              "
            >
              <StatsCard
                title="Positive Cases"
                value="89"
                color="text-red-300"
              />
            </div>

            <div
              className="
                bg-gradient-to-br
                from-[#111827]
                to-[#3b2f0d]

                border border-yellow-400/20

                rounded-2xl

                shadow-xl
              "
            >
              <StatsCard
                title="Prediction Accuracy"
                value="95%"
                color="text-yellow-300"
              />
            </div>

          </div>

          {/* QUICK ACTIONS */}
          <div
            ref={quickActionRef}
            className="
              bg-gradient-to-br
              from-[#0f172a]
              via-[#111827]
              to-[#172554]

              border border-cyan-400/20

              rounded-2xl shadow-md

              p-4 sm:p-5 lg:p-6

              transition-all duration-300
              hover:shadow-2xl
              hover:-translate-y-1
            "
          >

            <h2
              className="
                text-xl sm:text-2xl
                font-semibold text-white
                mb-5 sm:mb-6
              "
            >
              Quick Actions
            </h2>

            {/* BUTTONS */}
            <div
              className="
                flex flex-col
                sm:flex-row
                flex-wrap
                gap-4
              "
            >

              <button
                onClick={() => navigate("/patients")}
                className="
                  bg-blue-600 hover:bg-blue-700
                  hover:scale-105
                  transition-all duration-300

                  text-white

                  px-5 py-3
                  rounded-xl

                  text-sm sm:text-base
                "
              >
                Add Patient
              </button>

              <button
                onClick={() => navigate("/upload")}
                className="
                  bg-green-600 hover:bg-green-700
                  hover:scale-105
                  transition-all duration-300

                  text-white

                  px-5 py-3
                  rounded-xl

                  text-sm sm:text-base
                "
              >
                Upload MRI
              </button>

              <button
                onClick={() => navigate("/results")}
                className="
                  bg-purple-600 hover:bg-purple-700
                  hover:scale-105
                  transition-all duration-300

                  text-white

                  px-5 py-3
                  rounded-xl

                  text-sm sm:text-base
                "
              >
                Generate Report
              </button>

            </div>

            {/* SYSTEM STATUS */}
            <div className="mt-8 border-t border-cyan-400/10 pt-6">

              <h3
                className="
                  text-lg sm:text-xl
                  font-semibold text-white
                  mb-5
                "
              >
                System Status
              </h3>

              <div
                className="
                  grid grid-cols-2
                  lg:grid-cols-4
                  gap-4
                "
              >

                {/* AI SERVER */}
                <div
                  className="
                    bg-white/5 rounded-xl

                    border border-cyan-400/10

                    p-4

                    min-h-[130px]

                    flex flex-col
                    justify-center
                    items-center

                    text-center

                    shadow-sm
                    hover:shadow-md

                    transition-all duration-300
                  "
                >

                  <p
                    className="
                      text-xs sm:text-sm
                      text-slate-300
                      min-h-[40px]

                      flex items-center
                    "
                  >
                    AI Server
                  </p>

                  <h4
                    className="
                      text-xl sm:text-2xl
                      font-bold text-green-300
                      mt-2
                    "
                  >
                    Online
                  </h4>

                </div>

                {/* MRI PROCESSING */}
                <div
                  className="
                    bg-white/5 rounded-xl

                    border border-cyan-400/10

                    p-4

                    min-h-[130px]

                    flex flex-col
                    justify-center
                    items-center

                    text-center

                    shadow-sm
                    hover:shadow-md

                    transition-all duration-300
                  "
                >

                  <p
                    className="
                      text-xs sm:text-sm
                      text-slate-300
                      min-h-[40px]

                      flex items-center
                    "
                  >
                    MRI Processing
                  </p>

                  <h4
                    className="
                      text-xl sm:text-2xl
                      font-bold text-cyan-300
                      mt-2
                    "
                  >
                    Active
                  </h4>

                </div>

                {/* LAST SCAN */}
                <div
                  className="
                    bg-white/5 rounded-xl

                    border border-cyan-400/10

                    p-4

                    min-h-[130px]

                    flex flex-col
                    justify-center
                    items-center

                    text-center

                    shadow-sm
                    hover:shadow-md

                    transition-all duration-300
                  "
                >

                  <p
                    className="
                      text-xs sm:text-sm
                      text-slate-300
                      min-h-[40px]

                      flex items-center
                    "
                  >
                    Last Scan
                  </p>

                  <h4
                    className="
                      text-lg sm:text-2xl
                      font-bold text-white
                      mt-2
                    "
                  >
                    2 mins ago
                  </h4>

                </div>

                {/* ACTIVE DOCTORS */}
                <div
                  className="
                    bg-white/5 rounded-xl

                    border border-cyan-400/10

                    p-4

                    min-h-[130px]

                    flex flex-col
                    justify-center
                    items-center

                    text-center

                    shadow-sm
                    hover:shadow-md

                    transition-all duration-300
                  "
                >

                  <p
                    className="
                      text-xs sm:text-sm
                      text-slate-300
                      min-h-[40px]

                      flex items-center
                    "
                  >
                    Active Doctors
                  </p>

                  <h4
                    className="
                      text-xl sm:text-2xl
                      font-bold text-purple-300
                      mt-2
                    "
                  >
                    12
                  </h4>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5 sm:space-y-6">

          {/* WEEKLY CHART */}
          <div
            className="
              bg-gradient-to-br
              from-[#0f172a]
              via-[#111827]
              to-[#172554]

              border border-cyan-400/20

              rounded-2xl

              shadow-xl
            "
          >
            <ChartCard title="Weekly MRI Uploads">

              <div className="w-full h-[250px] sm:h-[300px]">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart data={uploadsData}>

                    <XAxis
                      dataKey="day"
                      stroke="#67e8f9"
                    />

                    <YAxis stroke="#67e8f9" />

                    <Tooltip />

                    <Bar
                      dataKey="uploads"
                      fill="#22d3ee"
                      radius={[5, 5, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </ChartCard>
          </div>

          {/* RECENT ACTIVITY */}
          <div
            ref={recentActivityRef}
            className="
              bg-gradient-to-br
              from-[#0f172a]
              via-[#111827]
              to-[#172554]

              border border-cyan-400/20

              rounded-2xl shadow-md

              p-4 sm:p-5 lg:p-6

              transition-all duration-300
              hover:shadow-2xl
              hover:-translate-y-1
            "
          >

            <h2
              className="
                text-xl sm:text-2xl
                font-semibold text-white
                mb-5 sm:mb-6
              "
            >
              Recent Activity
            </h2>

            <div className="space-y-4">

              <div
                className="
                  border-b border-cyan-400/10 pb-3

                  hover:text-cyan-300
                  transition-all duration-300

                  cursor-pointer

                  text-sm sm:text-base

                  text-slate-200
                "
              >
                MRI uploaded for Patient #1023
              </div>

              <div
                className="
                  border-b border-cyan-400/10 pb-3

                  hover:text-cyan-300
                  transition-all duration-300

                  cursor-pointer

                  text-sm sm:text-base

                  text-slate-200
                "
              >
                AI Prediction generated with 92% confidence
              </div>

              <div
                className="
                  border-b border-cyan-400/10 pb-3

                  hover:text-cyan-300
                  transition-all duration-300

                  cursor-pointer

                  text-sm sm:text-base

                  text-slate-200
                "
              >
                PDF report downloaded by Doctor
              </div>

              <div
                className="
                  hover:text-cyan-300
                  transition-all duration-300

                  cursor-pointer

                  text-sm sm:text-base

                  text-slate-200
                "
              >
                New patient registered in the system
              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default DashboardPage;