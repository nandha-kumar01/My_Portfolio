import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { FiMapPin, FiBriefcase } from "react-icons/fi";

export default function ExperiencePage() {
  const data = [
    {
      title: "March 2024 - Dec 2025",
      content: (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-shrink-0 pt-1">
            <FiBriefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          </div>
          <div className="space-y-2 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
             Front-End Developer
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-neutral-400 text-xs sm:text-sm">
              <span className="font-medium">Laabamone Business Solutions</span>
            </div>
           <div className="flex items-center gap-2 text-neutral-400 text-xs sm:text-sm">
  <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
  <span>On-site — Madurai, Tamil Nadu</span>
</div>

            <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
             <p className="leading-relaxed">
  Front-end development role focused on building responsive and user-friendly web interfaces.
  Contributed to developing scalable UI components, integrating APIs, and optimizing performance. 
  Collaborated with cross-functional teams in a fast-paced environment.
</p>

              
              <div className="space-y-2">
                <h4 className="text-white font-medium">Key Responsibilities:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                    <span className="leading-relaxed">
                      Developed responsive and accessible UI components using Next js , React.js, HTML, CSS, and JavaScript
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                    <span className="leading-relaxed">
                    Integrated RESTful APIs and handled dynamic data rendering on the front end
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                    <span className="leading-relaxed">
                     Created and consumed APIs using middleware for efficient data handling and integration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                    <span className="leading-relaxed">
                    Optimized front-end performance for faster load times and improved user experience                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                    <span className="leading-relaxed">
                      Styled applications using Tailwind CSS, Material UI, and Bootstrap
                    </span>
                  </li>

                   <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                    <span className="leading-relaxed">
                    Utilized Git for version control and collaborated through team-based workflows                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-medium">Technologies Used:</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full whitespace-nowrap">
                    Next.js
                  </span>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full whitespace-nowrap">
                    React.js
                  </span>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full whitespace-nowrap">
                    JavaScript (ES6+)
                  </span>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full whitespace-nowrap">
                    CSS
                  </span>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full whitespace-nowrap">
                    Tailwind CSS
                  </span>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full whitespace-nowrap">
                    Material UI 
                  </span>
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full whitespace-nowrap">
                    Bootstrap
                  </span>
                   <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full whitespace-nowrap">
                    PostgreSQL
                  </span>
                   <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full whitespace-nowrap">
                  Node.js
                  </span>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full whitespace-nowrap">
                    GitHub Actions
                  </span>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full whitespace-nowrap">
                    Playwright
                  </span>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full whitespace-nowrap">
                    AWS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
   {
  title: "Sept 2023 - Feb 2024",
  content: (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <div className="flex-shrink-0 pt-1">
        <FiBriefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
      </div>
      <div className="space-y-2 min-w-0">
        <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
          Full Stack React Developer Intern
        </h3>
        <div className="flex items-center gap-2 text-neutral-400 text-xs sm:text-sm">
          <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span>On-site • Wiselearnz, Madurai</span>
        </div>
        <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
          <p className="leading-relaxed">
            Completed a 6-month full stack development internship focused on building web applications 
            using React.js and related technologies. Gained hands-on experience working from the Madurai office.
          </p>

          <div className="space-y-2">
            <h4 className="text-white font-medium">Technologies & Tools Learned:</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                <span className="leading-relaxed">React.js, JavaScript, HTML, CSS,Bootstrap</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                <span className="leading-relaxed">MySQL database integration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                <span className="leading-relaxed">Microsoft Word & Excel for documentation and reports</span>
              </li>
            </ul>
          </div>
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
          Work Experience
        </h1>
        <p className="text-neutral-400 text-base max-w-2xl mx-auto">
          My professional journey and career milestones
        </p>
      </div>
      <Timeline data={data} />
    </div>
  );
}
