// components/landing/Navbar.jsx
import { useState } from "react";
import { Brain, Menu, X } from "lucide-react";

function Navbar({
  activeSection,
  setActiveSection,
}) {

  /*
  ============================================
  ACTIVE NAVBAR SECTION
  ============================================
  */

  
  /*
  ============================================
  SCROLL FUNCTION
  ============================================
  */
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (sectionId) => {

    setActiveSection(sectionId);

    const section =
      document.getElementById(sectionId);

    if (section) {

      const navbarOffset = 120;

const sectionPosition =
  section.getBoundingClientRect().top +
  window.pageYOffset -
  navbarOffset;

window.scrollTo({
  top: sectionPosition,
  behavior: "smooth",
});

    }

  };

  /*
  ============================================
  NAV ITEMS
  ============================================
  */

  const navItems = [
    "home",
    "features",
    "problem",
    "technology",
    "contact",
  ];

  return (

    <nav
      className="
        w-full

        bg-[#0B1120]/75

        backdrop-blur-2xl

       border border-cyan-500

       

        border-1

        rounded-[34px]

        px-6 sm:px-8

        py-5

        flex items-center justify-between

        shadow-[0_10px_60px_rgba(6,182,212,0.12)]

        sticky top-4

        z-50

        overflow-visible

        before:absolute
        before:inset-0

        before:bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_55%)]

        before:pointer-events-none
      "
    >

      {/* ============================================ */}
      {/* NAVBAR GLOW */}
      {/* ============================================ */}

      <div
        className="
          absolute

          top-0 left-1/2
          -translate-x-1/2

          w-[40%]
          h-[2px]

          bg-cyan-400

          blur-xl

          opacity-70
        "
      />

      {/* ============================================ */}
      {/* LEFT SIDE */}
      {/* ============================================ */}

      <div
        className="
          relative

          flex items-center

          gap-4

          group
        "
      >

        {/* LOGO */}
        <div
          className="
            relative

            w-14 h-14

            rounded-2xl

            bg-gradient-to-br
            from-[#07152E]
            to-[#0F2747]

            border border-cyan-400/20

            flex items-center justify-center

            shadow-[0_0_30px_rgba(34,211,238,0.15)]

            transition-all duration-700

            group-hover:scale-110
            group-hover:-translate-y-1

            group-hover:rotate-3

            group-hover:shadow-[0_0_50px_rgba(34,211,238,0.4)]

            overflow-hidden
          "
        >

          {/* INNER GLOW */}
          <div
            className="
              absolute

              inset-0

              bg-gradient-to-tr
              from-cyan-400/10
              via-transparent
              to-cyan-300/20

              opacity-0

              transition-opacity duration-700

              group-hover:opacity-100
            "
          />

          <Brain
            className="
              relative

              w-8 h-8

              text-cyan-300

              drop-shadow-[0_0_15px_#22d3ee]

              transition-all duration-700

              group-hover:scale-125
              group-hover:rotate-12
            "
          />

        </div>

        {/* BRAND NAME */}
        <div
          className="
            transition-all duration-500

            group-hover:translate-x-1
          "
        >

          <h1
            className="
              text-3xl

              font-black

              text-white

              tracking-tight

              transition-all duration-500

              group-hover:text-cyan-100

              group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]
            "
          >
            Turing Body
          </h1>

          <p
            className="
              text-sm

              text-cyan-400

              
              mt-1

              tracking-[0.25em]

              uppercase

              transition-all duration-500

              group-hover:text-cyan-300
              group-hover:tracking-[0.35em]
            "
          >
            AI MRI Intelligence
          </p>

        </div>

      </div>

      {/* ============================================ */}
      {/* NAV LINKS */}
      {/* ============================================ */}

      <div
        className="
          hidden md:flex

          items-center

          gap-5
        "
      >

        {navItems.map((item) => (

          <button
            key={item}
            onClick={() =>
              handleScroll(item)
            }
            className={`
              relative

              px-7 py-2

              rounded-2xl
              border border-cyan-500

       

    

              overflow-hidden

              border-1

              backdrop-blur-xl

              text-[16px]
              font-semibold

              capitalize

              tracking-wide

              transition-all duration-700 ease-out

              group

              ${
                activeSection  === item
                  ? `
                    text-cyan-300

                   border border-cyan-500

       

        

                    bg-gradient-to-br
                    from-cyan-500/20
                    to-blue-500/10

                    shadow-[0_0_40px_rgba(34,211,238,0.28)]

                    scale-105
                  `
                  : `
                    text-slate-300

                    border-white/10

                    bg-white/[0.03]

                    hover:text-white

                    hover:border-cyan-400/40

                    hover:bg-gradient-to-br
                    hover:from-cyan-500/10
                    hover:to-blue-500/5

                    hover:shadow-[0_0_45px_rgba(34,211,238,0.22)]

                    hover:-translate-y-1.5

                    hover:scale-105
                  `
              }
            `}

          >

            {/* ANIMATED SHINE */}
            <div
              className="
                absolute

                top-0
                -left-[120%]

                w-[80%]
                h-full

                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent

                skew-x-[-25deg]

                transition-all duration-1000

                group-hover:left-[140%]
              "
            />

            {/* BACKGROUND GLOW */}
            <div
              className={`
                absolute

                inset-0

                rounded-2xl

                opacity-0

                blur-xl

                transition-all duration-700

                ${
                  activeSection === item
                    ? `
                      opacity-100

                      bg-cyan-400/10
                    `
                    : `
                      group-hover:opacity-100

                      bg-cyan-400/10
                    `
                }
              `}
            />

            {/* TEXT */}
            <span
              className="
                relative

                z-10

                transition-all duration-500

                group-hover:tracking-[0.12em]
              "
            >
              {item}
            </span>

            {/* BOTTOM GLOW LINE */}
            {/* FULL BORDER GLOW */}
<div
  className={`
    absolute

    inset-0

    rounded-2xl

    pointer-events-none

    transition-all duration-700

    ${
      activeSection === item
        ? `
          opacity-100

          border border-cyan-300/70

          shadow-[0_0_25px_rgba(34,211,238,0.45)]
        `
        : `
          opacity-0

          border border-cyan-300/60

          group-hover:opacity-100

          group-hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]
        `
    }
  `}
/>

          </button>

        ))}

      </div>
        {/* ============================================ */}
{/* MOBILE MENU BUTTON */}
{/* ============================================ */}

<div className="md:hidden">

  <button
    onClick={() =>
      setMobileMenuOpen(!mobileMenuOpen)
    }
    className="
      relative

      w-14 h-14

      rounded-2xl

      bg-gradient-to-br
      from-cyan-400
      to-cyan-500

      flex items-center justify-center

      shadow-[0_0_35px_rgba(34,211,238,0.45)]

      transition-all duration-500

      hover:scale-105
    "
  >

    {mobileMenuOpen ? (
      <X className="w-7 h-7 text-black" />
    ) : (
      <Menu className="w-7 h-7 text-black" />
    )}

  </button>

</div>

{/* ============================================ */}
{/* MOBILE MENU */}
{/* ============================================ */}

{mobileMenuOpen && (

  <div
    className="
      absolute

      top-[110%]
      left-0

      w-full

      rounded-3xl

      border border-cyan-500/30

      bg-[#071120]/95

      backdrop-blur-2xl

      p-5

      flex flex-col

      gap-4

      md:hidden

      shadow-[0_20px_80px_rgba(34,211,238,0.15)]
    "
  >

    {navItems.map((item) => (

      <button
        key={item}
        onClick={() => {
          handleScroll(item);
          setMobileMenuOpen(false);
        }}
        className={`
          w-full

          py-4

          rounded-2xl

          text-lg

          font-semibold

          capitalize

          transition-all duration-500

          ${
            activeSection === item
              ? `
                bg-cyan-500/20
                text-cyan-300
                border border-cyan-400/40
              `
              : `
                bg-white/[0.03]
                text-slate-300
                hover:bg-cyan-500/10
                hover:text-white
              `
          }
        `}
      >
        {item}
      </button>

    ))}

  </div>

)}
    </nav>

    

  );
}

export default Navbar;