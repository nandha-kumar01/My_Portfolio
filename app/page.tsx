"use client";

import ExperiencePage from "./experience/page";
import HeroPage from "./home/page";
import About from "./about/page";
import Skills from "./skills/page";
import Contact from "./contact/page";
import Projects from "./projects/page";
import { useEffect } from "react";
import EducationPage from "./education/page";

export default function Home() {

  // Create grid pattern effect with CSS
  useEffect(() => {
    // Create a grid pattern element in the background
    const gridOverlay = document.createElement("div");
    gridOverlay.className = "absolute inset-0 z-[-1]";
    gridOverlay.style.backgroundImage =
      "linear-gradient(rgba(20, 255, 140, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 255, 140, 0.1) 1px, transparent 1px)";
    gridOverlay.style.backgroundSize = "40px 40px";
    gridOverlay.style.opacity = "0.15";

    const bgElement = document.getElementById("gradient-background");
    if (bgElement) {
      bgElement.appendChild(gridOverlay);
    }

    return () => {
      if (bgElement && bgElement.contains(gridOverlay)) {
        bgElement.removeChild(gridOverlay);
      }
    };
  }, []);

  return (
    <main
      className="relative main-content"
      id="main-content"
      data-theme-target="main-content"
    >
      {/* Dark tech background */}
      <div
        className="fixed inset-0 bg-black z-[-2]"
        id="page-background-base"
        data-theme-target="page-background-base"
      ></div>

      <div className="h-auto md:min-h-screen w-full text-white overflow-x-hidden relative">
        {/* Gradient cyberpunk background */}
        <div
          className="fixed inset-0 z-[-1] overflow-hidden"
          data-theme-target="gradient-background"
          id="gradient-background"
        >
          {/* Cyberpunk theme gradient blobs */}
          <div
            className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-emerald-600 to-teal-900 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob"
            data-theme-target="gradient-blob-1"
            id="gradient-blob-1"
          />
          <div
            className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-bl from-violet-700 to-purple-900 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000"
            data-theme-target="gradient-blob-2"
            id="gradient-blob-2"
          />
          <div
            className="absolute bottom-10 left-1/3 w-96 h-96 bg-gradient-to-tl from-cyan-800 to-cyan-950 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"
            data-theme-target="gradient-blob-3"
            id="gradient-blob-3"
          />

          {/* Overlay scanlines effect */}
          <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none"></div>
        </div>

        <section
          id="home"
          className="relative z-10 pb-0 mb-0"
          data-theme-target="home-section"
        >
          <HeroPage />
        </section>
      </div>

      {/* Main Sections with clear data attributes */}
      <section
        id="about"
        className="relative scroll-mt-20 md:mt-0 pt-0"
        data-theme-target="about-section"
      >
        <About />
      </section>

  <section
        id="skills"
        className="relative scroll-mt-20"
        data-theme-target="skills-section"
      >
        <Skills />
      </section>

      <section
        id="experience"
        className="relative scroll-mt-20"
        data-theme-target="experience-section"
        style={{marginTop:"0%"}}
        // Mobile: 0%, Desktop: -10%
      >
        <ExperiencePage />
      </section>

     <section
        id="projects"
        className="relative scroll-mt-20"
        data-theme-target="projects-section"
      >
        <Projects />
      </section>


 <section
        id="education"
        className="relative scroll-mt-20"
        data-theme-target="education-section"
      >
        <EducationPage/>
      </section>
      <section
        id="contact"
        className="relative scroll-mt-20"
        data-theme-target="contact-section"
      >
        <Contact />
      </section>

     


      <style jsx global>{`
        /* Scanlines effect */
        .bg-scanlines {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(32, 255, 177, 0.05) 50%,
            transparent 51%,
            rgba(32, 255, 177, 0.05) 100%
          );
          background-size: 100% 4px;
          height: 100%;
        }

        /* Responsive margin for experience section */
        #experience {
          margin-top: -8% !important; /* Mobile default */
        }

        @media (min-width: 768px) {
          #experience {
            margin-top: -10% !important; /* Desktop/tablet */
          }
        }

        /* Reset some animations */
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(-30px, 30px) scale(1.05);
          }
          50% {
            transform: translate(20px, -20px) scale(0.95);
          }
          75% {
            transform: translate(-20px, -20px) scale(1.05);
          }
        }

        .animate-blob {
          animation: blob 15s infinite alternate;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}
