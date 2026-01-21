"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiPostgresql,
  SiGit,
  SiLinux,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiHtml5,
  SiCss3,
  SiMui,
  SiGithub,
  SiNpm,
  SiPostman,
  SiVercel,
} from "react-icons/si";
import { FiCode, FiDatabase, FiTool } from "react-icons/fi";
import { TbBrain } from "react-icons/tb";

const skills = {
  "Frontend Development": [
     { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
    { name: "HTML", icon: <SiHtml5 className="text-[#E34F26]" /> },
    { name: "CSS", icon: <SiCss3 className="text-[#1572B6]" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: "Tailwind CSS",icon: <SiTailwindcss className="text-[#06B6D4]" />,},
  { name: "Material UI", icon: <SiMui className="text-[#007FFF]" /> },
  ],
  "Backend Development": [
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
    { name: "Express.js", icon: <SiExpress className="text-white" /> },
  ],
  "Databases Management": [
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
  ],
 "Tools & Technologies": [
  { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
  { name: "GitHub", icon: <SiGithub className="text-white" /> },
  { name: "Linux", icon: <SiLinux className="text-[#FCC624]" /> },
  { name: "npm", icon: <SiNpm className="text-[#CB3837]" /> },
  { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
  { name: "Vercel", icon: <SiVercel className="text-white" /> },
]

};

const categoryIcons = {
  "Frontend Development": <FiCode className="w-6 h-6" />,
  "Backend Development": <TbBrain className="w-6 h-6" />,
  "Databases Management": <FiDatabase className="w-6 h-6" />,
  "Tools & Technologies": <FiTool className="w-6 h-6" />,
};

export default function Skills() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div id="skills-page" className="min-h-screen w-full text-white">
      <div id="skills-container" className="container mx-auto px-4 py-16">
        <motion.div
          id="skills-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 id="skills-title" className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500">
              Skills & Technologies
            </span>
          </h1>
          <p
            id="skills-subtitle"
            className="text-neutral-400 text-base max-w-2xl mx-auto"
          >
            My technical toolkit for building modern applications
          </p>
        </motion.div>

        <div
          id="skills-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {Object.keys(skills).map((category, index) => (
            <motion.div
              key={category}
              id={`skill-category-${category
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-neutral-700/30 backdrop-blur-lg rounded-2xl border border-neutral-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
            >
              <div
                id={`category-header-${category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="p-6 border-b border-neutral-800 group-hover:border-cyan-500/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <div
                    id={`category-icon-${category
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 group-hover:from-cyan-500/40 group-hover:to-purple-600/40 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-110"
                  >
                    {categoryIcons[category as keyof typeof categoryIcons]}
                  </div>
                  <h2
                    id={`category-title-${category
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300"
                  >
                    {category}
                  </h2>
                </div>
              </div>

              <div
                id={`skills-list-${category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="p-6"
              >
                <div className="flex flex-wrap gap-3">
                  {skills[category as keyof typeof skills].map(
                    (skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        id={`skill-item-${skill.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.2 + skillIndex * 0.05,
                        }}
                        whileHover={{ y: -5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50 hover:bg-neutral-700/70 hover:border-cyan-500/40 transition-all duration-200"
                      >
                        <div
                          id={`skill-icon-${skill.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="text-xl"
                        >
                          {skill.icon}
                        </div>
                        <span
                          id={`skill-name-${skill.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="text-sm font-medium"
                        >
                          {skill.name}
                        </span>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          id="skills-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div
            id="skills-footer-container"
            className="inline-block relative max-w-2xl"
          >
            <div
              id="skills-footer-glow"
              className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl opacity-20 blur-sm"
            />
          
          </div>
        </motion.div>
      </div>
    </div>
  );
}
