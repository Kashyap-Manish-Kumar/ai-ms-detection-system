// Navbar.jsx

import { useState, useEffect } from "react";


import { sendReport } from "../services/emailService";

import { useLocation } from "react-router-dom";

import DoctorProfileDrawer from "./doctor/DoctorProfileDrawer";

import {
  FaUserMd,
  FaEye,
  FaDownload,
  FaPaperPlane,
} from "react-icons/fa";

function Navbar({
  onQuickActionsClick,
  onRecentActivityClick,
}) {
    
const [doctorName, setDoctorName] =
  useState("Dr. Admin");


const analysis = JSON.parse(
  localStorage.getItem("analysisData")
);
 const userId =
  localStorage.getItem("userId");
  const handleSendReport = async () => {

  try {

    await sendReport(analysis?.id);

    alert("Report Sent Successfully");

  } catch (error) {

    console.error(error);

    alert("Failed To Send Report");

  }

};







  

  const location = useLocation();
 

  const [openDoctorDrawer, setOpenDoctorDrawer] =
    useState(false);

  const pageTitles = {
    "/dashboard": "Dashboard ",

    "/patients": "Patients Management",

    "/upload": "AI MRI Upload System",

    "/results": "AI Prediction Results",

    "/history": "Prediction History",

    "/analytics": "Analytics & Reports",

    "/settings": "Settings",
  };

  const pageDescriptions = {
    "/upload":
      "Upload MRI scans and run AI-powered MS detection analysis.",

    "/results":
      "MRI Analysis & Clinical Diagnostic Report",

    "/history":
      "View previous MRI prediction reports and AI diagnostic records.",

    "/analytics":
      "AI-powered MRI detection analytics and prediction insights.",

    "/patients":
      "Manage patient records, profiles, reports, and clinical details.",

    "/settings":
      "Manage doctor profile, security and system configuration.",
  };

  const currentTitle =
    pageTitles[location.pathname] ||
    "MS Detection System";

  const currentDescription =
    pageDescriptions[location.pathname] || "";

  /* REPORT VIEW */
  const handleReportView = () => {

    const reportSection =
      document.getElementById("report-section");

    if (reportSection) {

      reportSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }

  };

  useEffect(() => {

  const fetchDoctorProfile =
    async () => {

      try {

        const response =
          await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/doctor-profile/${userId}`
          );

        const data =
          await response.json();

        if (
          data &&
          data.fullName
        ) {

          setDoctorName(
            data.fullName
          );
        }

      } catch (error) {

        console.log(error);
      }
    };

  if (userId) {

    fetchDoctorProfile();
  }

}, [userId]);

  /* DOWNLOAD */
  const handleDownload = () => {

    window.print();

  };

  return (
    <>
      <div
        className={`
          rounded-3xl

          p-4 sm:p-5 md:p-6

          flex flex-col

          gap-4

          shadow-[0_0_40px_rgba(15,23,42,0.35)]

          ${
            location.pathname === "/dashboard" ||
            location.pathname === "/upload" ||
            location.pathname === "/results" ||
            location.pathname === "/history" ||
            location.pathname === "/analytics" ||
            location.pathname === "/patients" || 
            location.pathname === "/settings"
              ? `
                bg-gradient-to-br
                from-[#0f172a]
                via-[#111827]
                to-[#172554]

                border border-cyan-400/20
              `
              : `
                bg-gradient-to-br
                from-white
                to-slate-100

                border border-slate-200
              `
          }
        `}
      >

        {/* TOP SECTION */}
        <div
          className="
            flex flex-col lg:flex-row

            gap-4

            lg:items-center
            lg:justify-between
          "
        >

          {/* LEFT SIDE */}
          <div>

            {/* TITLE */}
            <h1
              className={`
                text-xl sm:text-2xl lg:text-3xl

                font-bold

                tracking-tight

                ${
                  location.pathname === "/dashboard" ||
                  location.pathname === "/upload" ||
                  location.pathname === "/results" ||
                  location.pathname === "/history" ||
                  location.pathname === "/analytics" ||
                  location.pathname === "/patients" ||
                  location.pathname === "/settings"
                    ? "text-white"
                    : "text-slate-800"
                }
              `}
            >
              {currentTitle}
            </h1>

            {/* DESCRIPTION */}
            {(location.pathname === "/upload" ||
              location.pathname === "/results" ||
              location.pathname === "/history" ||
              location.pathname === "/analytics" ||
              location.pathname === "/patients"  ||
             location.pathname === "/settings") && (

              <p
                className="
                  text-cyan-200

                  mt-1.5

                  text-xs sm:text-sm

                  leading-relaxed

                  tracking-wide

                  font-[Poppins]
                "
              >
                {currentDescription}
              </p>

            )}

          </div>

          {/* RIGHT SIDE */}
          <div
            className="
              flex items-center

              gap-3

              flex-wrap
            "
          >

            {/* RESULTS PAGE BUTTONS */}
{location.pathname === "/results" && (

<div
  className="
    grid grid-cols-3

    items-center

    gap-2

    w-full

    md:flex
    md:flex-wrap
    md:items-center
    md:gap-2
  "
>

   {/* PATIENT ID DISPLAY */}
<div
  className="
    flex items-center

    max-w-full

    overflow-hidden

    bg-white/5

    border border-cyan-400/20

    text-cyan-200

    backdrop-blur-sm

    px-3 sm:px-4
    py-2.5

    rounded-2xl

    text-xs sm:text-sm md:text-base

    font-medium
  "
>

  <span
    className="
      text-cyan-400

      mr-2

      whitespace-nowrap
    "
  >
    Patient ID:
  </span>

  <span
    className="
      text-white

      font-semibold

      truncate

      max-w-[120px]
      sm:max-w-[180px]
      md:max-w-full
    "
  >
    {analysis?.patientId}
  </span>

</div>
   

    {/* SEND REPORT */}
     <button
      onClick={handleSendReport}
      className="
        flex items-center justify-center gap-2

        bg-emerald-400 hover:bg-emerald-300

        text-slate-900 font-semibold

        px-3 py-2.5
        sm:px-4 sm:py-3

        text-sm sm:text-base

        rounded-xl sm:rounded-2xl

        shadow-lg shadow-emerald-500/10

        transition-all duration-300

        hover:scale-[1.02]
      "
    >

      <FaPaperPlane className="text-sm sm:text-base" />

      <span className="whitespace-nowrap">
        Send Report
      </span>

    </button>

    

    {/* DOWNLOAD */}
   <a
  href={`${import.meta.env.VITE_ML_URL}${analysis?.reportPdf}`}
  target="_blank"
  rel="noreferrer"
  className="
    flex items-center justify-center

    min-w-fit

    whitespace-nowrap

    mt-0

    bg-cyan-500 hover:bg-cyan-400

    text-black

    font-semibold

    px-1 sm:px-2
    py-2

    rounded-2xl
  "
>
  PDF Report
</a>
  </div>

)}

            {/* DASHBOARD PAGE */}
           {location.pathname === "/dashboard" && (

  <div
    className="
      flex items-center

      gap-4

      md:gap-5
    "
  >

    <button
      onClick={onQuickActionsClick}
      className="
        text-slate-300 hover:text-cyan-300

        font-medium

        whitespace-nowrap

        transition-all duration-300
      "
    >
      Quick Actions
    </button>

    <button
      onClick={onRecentActivityClick}
      className="
        text-slate-300 hover:text-cyan-300

        font-medium

        whitespace-nowrap

        transition-all duration-300
      "
    >
      Recent Activity
    </button>

    {/* PROFILE */}
    <div
      className="
        flex flex-col
        items-center

        min-w-[70px]

        text-center
      "
    >

      <button
        onClick={() =>
          setOpenDoctorDrawer(true)
        }
        className="
          w-10 h-10

          bg-gradient-to-br
          from-cyan-500
          to-blue-600

          rounded-full

          flex items-center justify-center

          text-white

          shadow-lg shadow-cyan-500/20
        "
      >
        <FaUserMd />
      </button>

      <span
        className="
          text-sm

          text-slate-200

          mt-1

          whitespace-nowrap
        "
      >
        {doctorName || "Dr. Admin"}
      </span>

    </div>

  </div>

)}

            {/* SETTINGS */}
            {location.pathname === "/settings" && (

              <div
                className="
                  grid
                  grid-cols-3

                  items-center

                  gap-1

                  w-full

                  md:flex
                  md:flex-wrap
                  md:gap-1
                "
              >

                {/* SECURITY */}
                <button
                  onClick={() => {

                    const section =
                      document.getElementById("security-section");

                    if (section) {

                      section.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });

                      section.classList.add(
                        "shadow-2xl",
                        "shadow-cyan-500/20",
                        "-translate-y-1",
                        "border-cyan-400/40"
                      );

                      setTimeout(() => {

                        section.classList.remove(
                          "shadow-2xl",
                          "shadow-cyan-500/20",
                          "-translate-y-1",
                          "border-cyan-400/40"
                        );

                      }, 2000);

                    }

                  }}
                  className="
                    bg-[#0B1120]

                    border border-cyan-500/20

                    hover:bg-cyan-500/10

                    hover:border-cyan-400/40

                    hover:text-cyan-200

                    text-cyan-300

                    px-4 py-2.5

                    rounded-2xl

                    font-medium

                    transition-all duration-300

                    hover:shadow-2xl

                    hover:shadow-cyan-500/20

                    hover:-translate-y-1

                    hover:scale-[1.03]

                    active:scale-95
                  "
                >
                  Security
                </button>

                {/* SYSTEM */}
                <button
                  onClick={() => {

                    const section =
                      document.getElementById("system-section");

                    if (section) {

                      section.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });

                      section.classList.add(
                        "shadow-2xl",
                        "shadow-cyan-500/20",
                        "-translate-y-1",
                        "border-cyan-400/40"
                      );

                      setTimeout(() => {

                        section.classList.remove(
                          "shadow-2xl",
                          "shadow-cyan-500/20",
                          "-translate-y-1",
                          "border-cyan-400/40"
                        );

                      }, 2000);

                    }

                  }}
                  className="
                    bg-[#0B1120]

                    border border-cyan-500/20

                    hover:bg-cyan-500/10

                    hover:border-cyan-400/40

                    hover:text-cyan-200

                    text-cyan-300

                    px-4 py-2.5

                    rounded-2xl

                    font-medium

                    transition-all duration-300

                    hover:shadow-2xl

                    hover:shadow-cyan-500/20

                    hover:-translate-y-1

                    hover:scale-[1.03]

                    active:scale-95
                  "
                >
                  System
                </button>

                {/* LOGOUT */}
                <button
                  onClick={() => {

                    const confirmLogout =
                      window.confirm(
                        "Are you sure you want to logout?"
                      );

                    if (confirmLogout) {

                      localStorage.clear();

                      window.location.href = "/";

                    }

                  }}
                  className="
                    bg-gradient-to-r
                    from-red-500
                    to-rose-600

                    hover:from-red-400
                    hover:to-rose-500

                    text-white

                    px-5 py-2.5

                    rounded-2xl

                    font-semibold

                    shadow-lg shadow-red-500/20

                    transition-all duration-300

                    hover:scale-[1.03]
                  "
                >
                  Logout
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

      <DoctorProfileDrawer
  isOpen={openDoctorDrawer}
  onClose={() =>
    setOpenDoctorDrawer(false)
  }
/>
    </>
  );
}

export default Navbar;