import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { FiMapPin, FiBook } from "react-icons/fi";

export default function EducationPage() {
  const data = [
    {
      title: "2023-2025",
      content: (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-shrink-0 pt-1">
            <FiBook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          </div>
          <div className="space-y-2 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
              Postgraduate Diploma in Computer Applications (PGDCA)
            </h3>
            <div className="flex items-center gap-2 text-neutral-400 text-xs sm:text-sm">
              <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">Madurai Kamarajar University, Madurai</span>
            </div>
          
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Successfully completed Postgraduate Diploma in Computer Applications from Madurai Kamarajar 
              University in March 2025, marking a pivotal transition from physics to technology. This 
              comprehensive program equipped me with essential programming skills, database management 
              expertise, and web development proficiency, bridging theoretical knowledge with practical 
              application development capabilities.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <h4 className="text-white font-medium">Key Subjects:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Programming Languages</span>
                </li>
                 <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Fundamental of Computer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Database Management Systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Web Development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Software Engineering</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2020-2022",
      content: (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-shrink-0 pt-1">
            <FiBook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          </div>
          <div className="space-y-2 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
              Master of Science - Physics
            </h3>
            <div className="flex items-center gap-2 text-neutral-400 text-xs sm:text-sm">
              <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Alagappa University, Karaikudi</span>
            </div>
          
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Earned Master of Science in Physics from Alagappa University, advancing expertise in 
              advanced theoretical concepts and experimental methodologies. This program intensified 
              my analytical thinking, mathematical precision, and research capabilities while fostering 
              a deep appreciation for systematic investigation and data-driven decision making that 
              proves invaluable in software development.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <h4 className="text-white font-medium">Core Subjects:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Quantum Mechanics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Statistical Mechanics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Electromagnetic Theory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Mathematical Physics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Research Methodology</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2017-2020",
      content: (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-shrink-0 pt-1">
            <FiBook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          </div>
          <div className="space-y-2 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
              Bachelor of Science - Physics
            </h3>
            <div className="flex items-center gap-2 text-neutral-400 text-xs sm:text-sm">
              <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Ananda College, Devakottai</span>
            </div>
          
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Graduated with Bachelor of Science in Physics, establishing a solid foundation in 
              scientific methodology, mathematical modeling, and logical problem-solving. 
              This rigorous academic background in physics developed critical analytical skills 
              and systematic thinking approaches that seamlessly translated into programming 
              logic and technological innovation.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <h4 className="text-white font-medium">Core Subjects:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Classical Mechanics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Thermodynamics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Electromagnetism</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Optics & Wave Physics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Properties of Matter</span>
                </li>
                  <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                  <span className="leading-relaxed">Laser Physics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
   
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="text-center pt-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500 mb-4">
          Education & Achievements
        </h1>
        <p className="text-neutral-400 text-base max-w-2xl mx-auto">
          My academic journey and educational milestones
        </p>
      </div>
      <Timeline data={data} />
    </div>
  );
}