// pages/LandingPage.jsx

import { useEffect, useState } from "react";

import Navbar from "../components/landing/Navbar";

import HeroSection from "../components/landing/HeroSection";

import AuthSection from "../components/landing/AuthSection";

import ContactSection from "../components/landing/ContactSection";

import FeaturesSection from "../components/landing/FeaturesSection";

import ProblemSection from "../components/landing/ProblemSection";

import TechnologySection from "../components/landing/TechnologySection";

function LandingPage() {

  const [activeSection, setActiveSection] =
    useState("home");

  /*
  ============================================
  DETECT ACTIVE SECTION ON SCROLL
  ============================================
  */

  useEffect(() => {

    const handleScroll = () => {

      const sections = [
        "home",
        "features",
        "problem",
        "technology",
        "contact",
      ];

      const scrollPosition =
        window.scrollY + 200;

      for (const sectionId of sections) {

        const section =
          document.getElementById(sectionId);

        if (section) {

          const offsetTop = section.offsetTop;

          const offsetHeight =
            section.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition <
              offsetTop + offsetHeight
          ) {

            setActiveSection(sectionId);

            break;
          }
        }
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  return (

    <div
      className="
        min-h-screen

        bg-[#020817]

        px-4 sm:px-6

        py-5

        scroll-smooth
      "
    >

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}


      
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* ================================================= */}
      {/* HERO / HOME SECTION */}
      {/* ================================================= */}

      <section
        id="home"
        className="scroll-mt-32"
      >

        <div
          className="
            mt-6

            grid grid-cols-1
            xl:grid-cols-[68%_32%]

            gap-6

            items-start
          "
        >

          {/* HERO SECTION */}
          <HeroSection />

          {/* AUTH SECTION */}
          <div
            className="
              xl:sticky

              xl:top-28
            "
          >

            <AuthSection />

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* FEATURES SECTION */}
      {/* ================================================= */}

      <section
        id="features"
        className="
          mt-24

          scroll-mt-32
        "
      >

        <FeaturesSection />

      </section>

      {/* ================================================= */}
      {/* PROBLEM SECTION */}
      {/* ================================================= */}

      <section
        id="problem"
        className="
          mt-24

          scroll-mt-32
        "
      >

        <ProblemSection />

      </section>

      {/* ================================================= */}
      {/* TECHNOLOGY SECTION */}
      {/* ================================================= */}

      <section
        id="technology"
        className="
          mt-24

          scroll-mt-32
        "
      >

        <TechnologySection />

      </section>

      {/* ================================================= */}
      {/* CONTACT SECTION */}
      {/* ================================================= */}

      <section
        id="contact"
        className="
          mt-24

          scroll-mt-32
        "
      >

        

          <ContactSection />

        

      </section>

    </div>

  );
}

export default LandingPage;