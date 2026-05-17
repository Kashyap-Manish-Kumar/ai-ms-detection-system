import {
  FaTachometerAlt,
  FaUsers,
  FaUpload,
  FaHistory,
  FaChartBar,
  FaCog,
  FaClipboardCheck,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { Brain } from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Patients",
      path: "/patients",
      icon: <FaUsers />,
    },
    {
      name: "Upload MRI",
      path: "/upload",
      icon: <FaUpload />,
    },
    {
      name: "Results",
      path: "/results",
      icon: <FaClipboardCheck />,
    },
    {
      name: "History",
      path: "/history",
      icon: <FaHistory />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartBar />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        className="
          lg:hidden
          fixed top-5 right-5 z-50
          bg-cyan-500 hover:bg-cyan-400
          text-slate-950
          w-10 h-10
          flex items-center justify-center
          rounded-xl shadow-lg shadow-cyan-500/30
          transition-all duration-300
        "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="
            fixed inset-0
            bg-black/60 backdrop-blur-sm
            z-30
            lg:hidden
          "
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0
          h-screen
          w-[210px] sm:w-64

          bg-gradient-to-b
          from-[#081028]
          via-[#0B1739]
          to-[#132D6B]

          text-white
          border-r border-cyan-500/20

          z-40
          flex flex-col

          shadow-2xl shadow-cyan-500/10

          transform transition-all duration-300 ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* LOGO SECTION */}
        <div
          className="
            px-6 py-8
            border-b border-white/10
            mt-1 lg:mt-0
          "
        >
          <div
            className="
              flex items-center gap-4
              border-1
              shadow-[0_0_25px_rgba(34,211,238,0.35)]
              rounded-3xl
              px-2 py-2
              bg-gradient-to-br from-[#163263] to-[#092851]
            "
          >
            {/* BRAIN ICON */}
            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-[#07152E]
                border border-cyan-400/20
                flex items-center justify-center
                shadow-lg shadow-cyan-500/20
              "
            >
              <Brain
                className="
                  w-8 h-8
                  text-cyan-400
                  drop-shadow-[0_0_12px_#22d3ee]
                "
              />
            </div>

            {/* TITLE */}
            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-wider

                  bg-gradient-to-r
                  from-cyan-300
                  via-blue-400
                  to-indigo-300
                  bg-clip-text
                  text-transparent

                  
          
                "
              >
                TURING
                <br />
                <span
                  className="
                    text-2xl
                    font-medium

                    bg-gradient-to-r
                    from-cyan-300
                    via-blue-400
                    to-indigo-300
                    bg-clip-text
                    text-transparent

                    text-center
                    w-full
                    flex
                    justify-center
                    items-center
                  "
                >
                  BODY
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* MENU SECTION */}
        <div
          className="
            flex-1 overflow-y-auto
            px-4 py-0
          "
        >
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive =
                location.pathname === item.path;

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      group
                      relative

                      flex items-center gap-4

                      px-4 py-3

                      rounded-2xl

                      transition-all duration-300

                      text-sm sm:text-base

                      overflow-hidden

                      ${
                        isActive
                          ? `
                            bg-gradient-to-r
                            from-cyan-500
                            to-blue-600

                            text-white

                            shadow-lg
                            shadow-cyan-500/30

                            border border-cyan-300/20
                          `
                          : `
                            text-slate-300

                            hover:bg-white/5
                            hover:text-cyan-300
                            hover:translate-x-1
                          `
                      }
                    `}
                  >
                    {/* Glow Effect */}
                    {isActive && (
                      <div
                        className="
                          absolute inset-0
                          bg-cyan-400/10
                          blur-xl
                        "
                      />
                    )}

                    {/* ICON */}
                    <span
                      className="
                        relative z-10
                        text-lg sm:text-xl
                        transition-all duration-300
                        group-hover:scale-110
                      "
                    >
                      {item.icon}
                    </span>

                    {/* TEXT */}
                    <span
                      className="
                        relative z-10
                        font-medium tracking-wide
                      "
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* FOOTER */}
        <div
          className="
            border-t border-white/10
            p-4
            text-center
            text-sm
            text-slate-400
            bg-black/10
            backdrop-blur-sm
          "
        >
          <span className="text-cyan-300 font-medium">
            AI Healthcare
          </span>{" "}
          Platform
        </div>
      </div>
    </>
  );
}

export default Sidebar;