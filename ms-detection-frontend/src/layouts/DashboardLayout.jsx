import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({
  children,
  onQuickActionsClick,
  onRecentActivityClick,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="
        flex h-screen
        bg-gray-100
        overflow-hidden
        shadow-[0_0_60px_rgba(34,211,238,0.15)]
       
backdrop-blur-2xl
border border-cyan-400/20
      "
    >

      {/* SIDEBAR */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* MAIN CONTENT AREA */}
      <div
        className="
          flex-1
          lg:ml-64

          flex flex-col

          min-w-0
          w-full
        "
      >

        {/* STICKY NAVBAR */}
        <div
          className="
            sticky top-0 z-30

            bg-gray-100/95
            backdrop-blur-md

            px-3
            sm:px-4
            md:px-5
            lg:px-6

            pt-3
            pb-1

            border-b border-gray-200/40
          "
        >

          <Navbar
            onQuickActionsClick={onQuickActionsClick}
            onRecentActivityClick={onRecentActivityClick}
          />

        </div>

        {/* SCROLLABLE PAGE CONTENT */}
        <main
          className="
            flex-1 overflow-y-auto

            px-3
            sm:px-4
            md:px-5
            lg:px-6

            pt-1
            pb-4

            scroll-smooth
          "
        >

          {/* CONTENT WRAPPER */}
          <div
            className="
              w-full
              max-w-[1800px]
              mx-auto
            "
          >
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;