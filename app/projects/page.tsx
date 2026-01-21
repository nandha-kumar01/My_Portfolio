"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import Head from "next/head";
import { SafeImage } from "@/components/ui/safe-image";

import { Project } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

// SEO keywords and descriptions
const SEO = {
  title: "Nandha Kumar | Projects Portfolio",
  description:
    "Explore my portfolio of web development and software engineering projects. Featuring Next.js, React, TypeScript, and blockchain applications.",
  keywords:
    "portfolio, portfolio-template, web developer portfolio, software engineer, React projects, Next.js portfolio, TypeScript, blockchain projects, GitHub contributions, developer showcase, open source, frontend developer, full stack developer, responsive design, UI/UX, modern portfolio",
};

const projects: Project[] = [
  {
    id: 1,
    title: "PeoplePlus.press",
    description:
      "People Plus Press is a reliable Indian news website covering global, national, state, politics, and sports news. It delivers accurate, unbiased, and timely updates to keep readers well-informed. With a clean, user-friendly design and news in both English and Tamil, People Plus Press is your go-to source for trustworthy information and daily headlines.",
    media: {
      type: "image",
      src: ["/projects/PeoplePlus_1.png", "/projects/PeoplePlus_2.png", "/projects/PeoplePlus_3.png"],
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS" , "AWS Lambda", "Boostrap", "Node.js"],
    link: "https://www.peopleplus.press/en",
    github: "https://github.com/login",
  },
  {
    id: 2,
    title: "Gemtrove",
    description:
      "Gemtrove is a premium Australian-owned online diamond and gemstone e-commerce platform, offering a curated collection of loose diamonds, loose gemstones, and diamond-related jewellery. Customers across Australia can seamlessly browse, book, and place orders through the platform. With a focus on quality, transparency, and convenience, Gemtrove brings an elegant digital experience to fine jewellery shopping—trusted and tailored for the Australian market.",
    media: {
      type: "image",
      src: ["/projects/Gemtrove 1.png", "/projects/Gemtrove 2.jpeg", "/projects/Gemtrove 3.png"],
    },
    tags: ["React", "Next.js", "Tailwind", "TypeScript", "Node.js", "AWS Lambda" , "PHP", ],
    link: "https://gemtrove.vercel.app/",
    github: "https://github.com/login",
  },
  {
    id: 3,
    title: "S2S Taxi AdminPanel",
    description:
      "S2S Taxi Admin Panel is a powerful backend management system for handling both local and outstation taxi services. It seamlessly connects the Customer App, Owner App, and Driver App under one platform. The admin can add/manage customers, car owners, and drivers, assign drivers, and track vehicles live via GPS. Designed for efficiency and control, the panel ensures smooth operation, real-time monitoring, and complete oversight of the S2S taxi ecosystem.",
    media: {
      type: "image",
      src: ["/projects/S2S 1.png", "/projects/S2S 2.png", "/projects/S2S 3.png"],
    },
    tags: ["Next.js", "Tailwind CSS", "CSS", "TypeScript", "Firebase", "AWS Lambda", "PostgreSQL"],
    link: "https://cr.s2staxi.com/",
    github: "https://github.com/login",
  },
   {
    id: 4,
    title: "Cabscript",
    description:
      "CabScript is a website that sells ready-made Taxi App and Admin Panel source code only.With a one-time payment, you can launch your own taxi booking business quickly and easily",
    media: {
      type: "image",
      src: ["/projects/Cabscript 1.png", "/projects/Cabscript 2.png", "/projects/Cabscript 3.png"],
    },
    tags: ["Next.js", "Tailwind CSS", "CSS", "TypeScript", "Material UI","Express.js", "PostgreSQL"],
    link: "https://www.cabscript.com/",
    github: "https://github.com/login",
  },
  {
    id: 5,
    title: "Tamil Travel",
    description:
"Tamil Travel is a static travel website designed for Tamil-speaking explorers. It features essential travel details including food, accommodation, tour packages, and available services. With a clean and simple layout, it helps users easily explore travel options and plan their trips. Ideal for those looking for a quick overview of travel essentials—all in one place.",
    media: {
      type: "image",
      src: ["/projects/Tamil-Travel 1.png", "/projects/Tamil-Travel 2.png", "/projects/Tamil-Travel 3.png"],
    },
    tags: ["React.js", "CSS", "Tailwind CSS", "JavaScript"],
    link: "https://traveltamil.vercel.app/",
    github: "https://github.com/login",
  },
    {
    id: 6,
    title: "Palani-pathaiyathirai AdminPanel",
    description:
"Palani Pathayathiri Admin Panel is a centralized management system to monitor and manage users, groups, temples, stays, food spots, and devotional songs. It features real-time location tracking of each participant via map, sends notifications, and helps organize group travels. The panel ensures smooth coordination, data access, and user activity monitoring for a well-managed pilgrimage experience.",
    media: {
      type: "image",
     src: ["/projects/palani-admin1.png", "/projects/palani-admin2.png", "/projects/palani-admin3.png"],
    },
    tags: ["Next.js", "Tailwind CSS", "TypeScript" , "MongoDB" , "Express.js", "Firebase" , "Cloudinary"],
    link: "https://palani-admin.vercel.app/",
    github: "https://github.com/login",
  },
   {
    id: 7,
    title: "Jewelra",
    description:
      "Jewelra is a luxurious online jewellery destination, showcasing an exquisite collection of 2000+ timeless designs across Gold, Silver, Diamond, Coins & Bars. The platform offers a refined browsing experience with high-definition visuals, detailed product insights, and curated collections to suit every style. Users can effortlessly create wishlists, manage their shopping cart, and enjoy a secure, user-friendly login/signup process. Jewelra blends elegance with technology, making premium jewellery accessible with just a click—where tradition meets modern convenience.",
    media: {
      type: "image",
      src: ["/projects/Jewelra 1.png", "/projects/Jewelra 2.png", "/projects/Jewelra 3.png"],
    },
      tags: ["Next.js", "Tailwind CSS", "TypeScript" , "MongoDB" , "Express.js" , "Cloudinary", "Framer Motion"],
    link: "https://jewelra.vercel.app/",
    github: "https://github.com/login",
  },
];

// Function to extract YouTube video ID from URL
const extractYouTubeId = (url: string): string => {
  if (url.includes("youtu.be")) {
    return url.split("/").pop() || "";
  }
  const match = url.match(/[?&]v=([^&]+)/);
  if (match) return match[1];
  const embedMatch = url.match(/youtube\.com\/embed\/([^/?]+)/);
  if (embedMatch) return embedMatch[1];
  return url;
};

// Helper to get YouTube thumbnail from video URL or ID
const getYouTubeThumbnail = (url: string): string => {
  const id = extractYouTubeId(url);
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
};

// YouTube embed component with autoplay
const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
  const id = extractYouTubeId(videoId);
  return (
    <div className="relative w-full aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`}
        className="absolute inset-0 w-full h-full rounded-lg"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

// 1. Grid Container Variants: For staggering the project cards
const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Time delay between each child animation
    },
  },
};

// 2. Project Card Variants: For individual card animations
const projectCardVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

// 3. Modal Content Variants: For animating content inside the modal
const modalContentVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: SEO.title,
      description: SEO.description,
      keywords: SEO.keywords,
      mainEntity: {
        "@type": "Person",
        name: "Nandha Kumar",
        url: "https://github.com/nandha-kumar01",
        sameAs: ["https://github.com/nandha-kumar01"],
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Separate useEffect for handling modal and image index
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0); // Reset image index when project changes
    } else {
      document.body.style.overflow = "auto";
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Separate useEffect for handling modal and image index
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0); // Reset image index when project changes
    } else {
      document.body.style.overflow = "auto";
    }

    // Keyboard navigation
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedProject && Array.isArray(selectedProject.media.src) && selectedProject.media.src.length > 1) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setCurrentImageIndex((prev) => 
            prev === 0 ? (selectedProject.media.src as string[]).length - 1 : prev - 1
          );
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setCurrentImageIndex((prev) => 
            (prev + 1) % (selectedProject.media.src as string[]).length
          );
        }
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedProject]);

  return (
    <>
      <Head>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <meta name="keywords" content={SEO.keywords} />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.title} />
        <meta name="twitter:description" content={SEO.description} />
      </Head>

      <div
        id="projects-page"
        className="min-h-screen w-full text-white mt-10 relative z-10"
      >
        <div id="projects-container" className="max-w-7xl mx-auto px-4 py-8">
          <motion.h1
            id="projects-title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="text-4xl mb-6 text-center sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500"
          >
            Projects
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 text-base max-w-3xl mx-auto text-center mb-12"
          >
            Transforming ideas into innovative digital solutions with modern web technologies
          </motion.p>

          {/* Project Grid Layout with new variants */}
         <Swiper
  modules={[Autoplay, Navigation]}
  spaceBetween={24}
  slidesPerView={3}
  loop={true}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  navigation
  breakpoints={{
    0: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
>

   {projects.map((project, index) => (
 <SwiperSlide className="h-auto flex">

    <motion.div

                key={project.id}
                id={`project-card-${project.id}`}
                layoutId={`project-${project.id}`}
                variants={projectCardVariants} // Apply card animation
                className="bg-neutral-700/30 rounded-xl overflow-hidden border flex flex-col h-full group cursor-pointer will-change-transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2"
                style={{ 
                  borderColor: '#354e5a',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
  WebkitFontSmoothing: "antialiased",
  transform: "translateZ(0)"

                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(209, 213, 219, 0.3), 0 0 40px rgba(209, 213, 219, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Media */}
                <div
                  id={`project-media-${project.id}`}
                  className="relative w-full aspect-video overflow-hidden bg-neutral-950"
                >
                  {project.media.type === "image" ? (
                    <SafeImage
                      src={Array.isArray(project.media.src) ? project.media.src[0] : project.media.src}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-110 contrast-110"
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      fallbackSrc="/projects/placeholder.svg"
                    />
                  ) : (
                    <div className="relative w-full h-full cursor-pointer">
                      <Image
                        src={getYouTubeThumbnail(project.media.src as string)}
                        alt={project.title + " video thumbnail"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-110 contrast-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg
                          width="64"
                          height="64"
                          viewBox="0 0 64 64"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="32"
                            cy="32"
                            r="32"
                            fill="rgba(0,0,0,0.5)"
                          />
                          <polygon points="26,20 48,32 26,44" fill="#fff" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div
                  id={`project-details-${project.id}`}
                  className="p-4 sm:p-6 flex flex-col flex-grow"
                >
                  <h2
                    id={`project-title-${project.id}`}
                    className="text-base sm:text-lg md:text-xl font-semibold text-neutral-200 mb-2"
                  >
                    {project.title}
                  </h2>

                  {/* Enhanced 3-line description with better ellipsis handling */}
                  <div
                    id={`project-description-${project.id}`}
                    className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-3 flex-grow relative"
                  >
                    <p
                      className="overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.5",
                        maxHeight: "4.5em", // 3 lines * 1.5 line-height
                      }}
                      title={project.description} // Show full text on hover
                    >
                      {project.description}
                    </p>

                    {/* Gradient fade effect for better visual indication of truncation */}
                    {project.description.length > 150 && (
                      <div className="absolute bottom-0 right-0 w-8 h-6 bg-gradient-to-l from-neutral-700/30 to-transparent pointer-events-none" />
                    )}
                  </div>

                  <div
                    id={`project-tags-${project.id}`}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs sm:text-sm rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div
                    id={`project-links-${project.id}`}
                    className="flex flex-wrap gap-3 mt-auto"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, "_blank");
                      }}
                      className="flex items-center gap-2 text-white/80 hover:text-white bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm"
                      aria-label={`View source code for ${project.title} on GitHub`}
                      title="View on GitHub"
                    >
                      <FiGithub className="w-4 h-4" />
                      <span>GitHub</span>
                    </button>
                    {project.link && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.link, "_blank");
                        }}
                        className="flex items-center gap-2 text-white/90 hover:text-white bg-blue-600/80 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm"
                        aria-label={`View live demo of ${project.title}`}
                        title="View Live Demo"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </button>
                    )}
                  </div>
                </div>
                </motion.div>
  </SwiperSlide>
))}
</Swiper>


          <footer className="mt-20 text-center text-sm text-neutral-600 hidden">
            <p>
              Portfolio template showcasing web development and software
              engineering projects. Built with Next.js, React, TypeScript, and
              Tailwind CSS.
            </p>
          </footer>
        </div>
      </div>

      {/* Enhanced Modal with better transitions */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            id="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 pt-20 md:p-12 md:pt-24"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              id={`project-modal-${selectedProject.id}`}
              layoutId={`project-${selectedProject.id}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
              }}
              className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl overflow-hidden shadow-2xl border border-neutral-700/50 w-full max-w-7xl max-h-[80vh] flex flex-col md:flex-row will-change-transform"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(null);
                }}
                className="absolute top-6 right-6 z-20 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-3 transition-all duration-200 hover:scale-110"
              >
                <FiX className="w-6 h-6" />
              </button>

              <div className="relative w-full md:w-[60%] bg-black/20 flex items-center justify-center p-6 md:p-8">
                <div className="w-full max-w-4xl relative">
                  {selectedProject.media.type === "image" ? (
                    <div className="relative">
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-950 shadow-2xl">
                        <SafeImage
                          key={`${selectedProject.id}-${currentImageIndex}`} // Force re-render on image change
                          src={Array.isArray(selectedProject.media.src) 
                            ? selectedProject.media.src[currentImageIndex] 
                            : selectedProject.media.src}
                          alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                          fill
                          className="object-cover transition-opacity duration-300"
                          priority
                          sizes="60vw"
                          fallbackSrc="/projects/placeholder.svg"
                        />
                      </div>
                      
                      {/* Navigation arrows - only show if multiple images */}
                      {Array.isArray(selectedProject.media.src) && selectedProject.media.src.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              const srcArray = selectedProject.media.src as string[];
                              setCurrentImageIndex((prev) => 
                                prev === 0 ? srcArray.length - 1 : prev - 1
                              );
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
                            aria-label="Previous image"
                            type="button"
                          >
                            <FiChevronLeft className="w-6 h-6" />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              const srcArray = selectedProject.media.src as string[];
                              setCurrentImageIndex((prev) => 
                                (prev + 1) % srcArray.length
                              );
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
                            aria-label="Next image"
                            type="button"
                          >
                            <FiChevronRight className="w-6 h-6" />
                          </button>
                          
                          {/* Image indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {(selectedProject.media.src as string[]).map((_, index) => (
                              <button
                                key={index}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  setCurrentImageIndex(index);
                                }}
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                  index === currentImageIndex 
                                    ? 'bg-white scale-110 shadow-lg' 
                                    : 'bg-white/50 hover:bg-white/80'
                                }`}
                                aria-label={`Go to image ${index + 1}`}
                                type="button"
                              />
                            ))}
                          </div>
                          
                          {/* Image counter */}
                          <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                            {currentImageIndex + 1} / {(selectedProject.media.src as string[]).length}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                      <YouTubeEmbed videoId={selectedProject.media.src as string} />
                    </div>
                  )}
                </div>
              </div>

              {/* Animated Modal Content */}
              <motion.div
                className="p-8 md:p-12 overflow-y-auto md:w-[40%] flex flex-col bg-gradient-to-b from-neutral-900/95 to-neutral-800/95 backdrop-blur-sm"
                variants={gridContainerVariants} // Reuse container for staggering
                initial="hidden"
                animate="show"
              >
                <div className="space-y-8">
                  <motion.div variants={modalContentVariants}>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                      {selectedProject.title}
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </motion.div>

                  <motion.div
                    variants={modalContentVariants}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-neutral-200 uppercase tracking-wide">
                      About
                    </h3>
                    <p className="text-neutral-300 leading-relaxed text-lg" style={{textAlign: "justify"}}>
                      {selectedProject.description}
                    </p>
                  </motion.div>

                  <motion.div
                    variants={modalContentVariants}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-neutral-200 uppercase tracking-wide">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-neutral-800 to-neutral-700 text-neutral-200 border border-neutral-600/50 hover:border-neutral-500/50 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    variants={modalContentVariants}
                    className="space-y-4 pt-4"
                  >
                    <h3 className="text-lg font-semibold text-neutral-200 uppercase tracking-wide">
                      Links
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() =>
                          window.open(selectedProject.github, "_blank")
                        }
                        className="flex items-center justify-center gap-3 text-white bg-gradient-to-r from-neutral-800 to-neutral-700 hover:from-neutral-700 hover:to-neutral-600 px-6 py-3 rounded-xl transition-all duration-200 font-medium border border-neutral-600/50 hover:border-neutral-500/50 hover:scale-105 shadow-lg"
                      >
                        <FiGithub className="w-5 h-5" />
                        <span>View Source</span>
                      </button>
                      {selectedProject.link && (
                        <button
                          onClick={() =>
                            window.open(selectedProject.link, "_blank")
                          }
                          className="flex items-center justify-center gap-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:scale-105"
                        >
                          <FiExternalLink className="w-5 h-5" />
                          <span>Live Demo</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
