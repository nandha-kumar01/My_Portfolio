"use client";
import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import { SparklesCore } from "@/components/ui/sparkles";

export default function About() {
  return (
    <div
      id="about-page"
      className="min-h-screen w-full text-white overflow-x-hidden relative"
      data-theme-target="about-page"
    >
      {/* Pure Black Background */}
      <div
        id="about-background"
        className="absolute inset-0"
        data-theme-target="about-background"
      />

      {/* Animated Sparkles */}
      <div
        id="about-sparkles-container"
        className="absolute inset-0 w-full h-full"
      >
        <SparklesCore
          id="about-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
          data-theme-target="about-sparkles"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        id="about-overlay"
        className="absolute inset-0"
        data-theme-target="about-overlay"
      />

      <div className="relative z-10 min-h-screen">
        <main
          id="about-content"
          className="container mx-auto px-4 py-8 md:py-16 flex items-center justify-center min-h-screen"
        >
          <div id="about-container" className="max-w-4xl w-full">
            <motion.div
              id="about-title-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 md:mb-12"
            >
              <h1
                id="about-title"
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500"
                data-theme-target="about-title"
              >
                About Me
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-400 font-medium px-4 sm:px-0">
                Developer. Innovator. Solution Builder – Bridging Ideas &
                Technology.
              </p>
            </motion.div>

            <motion.div
              id="about-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6 md:space-y-8 text-left backdrop-blur-sm bg-neutral-900/20 p-4 sm:p-6 md:p-8 rounded-2xl border border-neutral-800"
              data-theme-target="about-card"
            >
             <p
  id="about-intro"
  className="text-xl sm:text-2xl md:text-3xl font-semibold text-neutral-200 leading-relaxed"
>
  I&apos;m <span className="text-white">Nandha</span>, a passionate
  Frontend Developer.
</p>

<p
  id="about-description-1"
  className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed"
  style={{ textAlign: "justify" }}
>
  I specialize in building modern, responsive, and user-friendly web
  applications using{" "}
  <span className="text-white font-medium">
    React, Next.js, Javascript, TypeScript, Tailwind CSS, Material UI, Bootstrap, MongoDB and PostgreSQL
  </span>
  .
</p>

<p
  id="about-description-2"
  className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed"
  style={{ textAlign: "justify" }}
>
  My focus is on writing clean code, creating intuitive designs, and
  delivering solutions that bring real value to businesses and users.
</p>

<p
  id="about-description-3"
  className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed"
  style={{ textAlign: "justify" }}
>
  Currently, I&apos;m expanding into Full-Stack Development while exploring
  new technologies to grow as a complete solution builder.
</p>

              {/* FlipWords */}
              <div
                id="about-hobbies"
                className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed"
              >
                Beyond coding, I love to{" "}
                <FlipWords
                  words={[
                    "craft impactful solutions",
                    "design meaningful interfaces",
                    "explore creative ideas",
                    "deliver business value",
                  ]}
                  className="text-white"
                />
              </div>

              <motion.div
                id="about-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-6"
              />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
