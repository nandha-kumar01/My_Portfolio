"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import Head from "next/head";

const glitchAnimation = {
  textShadow: [
    "0 0 0 #00ffff",
    "2px 2px 0 #ff00ff, -2px -2px 0 #00ffff, 2px 2px 0 #ff00ff",
    "0 0 0 #00ffff",
  ],
  opacity: [1, 0.8, 1],
  x: [0, -1, 1, 0],
};

// Typing Animation Component
const TypingAnimation = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

  useEffect(() => {
    const texts = [
      "Front-End Developer",
      "React JS Developer"
    ];
    const handleType = () => {
      const fullText = texts[currentTextIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypeSpeed(75);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypeSpeed(150);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, typeSpeed]);

  return (
    <span className="inline-flex items-center">
      {currentText}
      <motion.span
        className="ml-1 text-blue-500"
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        |
      </motion.span>
    </span>
  );
};

// Define image metadata for SEO
const imageMetadata = {
  profile1: {
    url: "/my 2.jpg",
    alt: "Nandha Kumar - Full Stack Developer Primary Profile",
    width: 800,
    height: 800,
  },
  profile2: {
    url: "/my.jpg",
    alt: "Nandha Kumar - Full Stack Developer Alternate Profile",
    width: 800,
    height: 800,
  },
};

export default function HomePage() {
  const [activeImage, setActiveImage] = useState(1); // 1 or 2
  const [marginTop, setMarginTop] = useState('0px');

  useEffect(() => {
    // Check screen size and set margin-top conditionally
    const updateMarginTop = () => {
      if (window.innerWidth >= 640) {
        setMarginTop('-2px'); // Web screen
      } else {
        setMarginTop('3%'); // Mobile screen
      }
    };

    // Initial check
    updateMarginTop();

    // Add resize listener
    window.addEventListener('resize', updateMarginTop);

    // Image transition every 5 seconds
    const imageInterval = setInterval(() => {
      // After transition duration, switch the active image
      setTimeout(() => {
        setActiveImage((prev) => (prev === 1 ? 2 : 1));
      }, 1800); // Transition takes 1.8 seconds (slightly longer for smoother effect)
    }, 5000); // Change image every 5 seconds

    return () => {
      clearInterval(imageInterval);
      window.removeEventListener('resize', updateMarginTop);
    };
  }, []);

  return (
    <>
      {/* Add structured data for images to be indexed by Google */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nandha Kumar",
              url: "https://rushikeshnimkar.com",
              image: [
                `https://rushikeshnimkar.com${imageMetadata.profile1.url}`,
                `https://rushikeshnimkar.com${imageMetadata.profile2.url}`,
              ],
              jobTitle: "Front-End Developer",
              description:
                "Front-End Developer specializing in Next.js, TypeScript, and Blockchain development.",
            }),
          }}
        />
      </Head>

      <main
        id="home"
        className="relative container mx-auto px-4 min-h-screen flex items-start sm:items-center justify-center pt-16 sm:pt-20 md:pt-16 lg:pt-8"
      >
        <div
          id="home-content-wrapper"
          className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 sm:gap-8 md:gap-12 lg:gap-16 max-w-6xl w-full py-4 sm:py-6 md:py-8 lg:py-0 px-4 sm:px-6 mt-4 sm:mt-0"
        >
          {/* Profile Image Section - 3D Animated Design */}
          <div
            id="home-profile-section"
            className="flex-1 flex justify-center items-center relative order-1 md:order-2 mb-3 sm:mb-8 md:mb-0"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              id="home-profile-image-container"
              initial={{ opacity: 0, scale: 0.3, y: 100, rotateX: -45 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotateX: 0,
                rotateY: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 2, 
                ease: "easeOut",
                rotateY: {
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ 
                scale: 1.15,
                rotateY: 15,
                rotateX: -10,
                y: -20,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="relative w-80 h-96 xs:w-88 xs:h-[400px] sm:w-96 sm:h-[450px] md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Trendy Neon Glow Effects */}
              <motion.div 
                className="absolute -inset-8 bg-gradient-to-br from-cyan-500/20 via-purple-500/30 to-pink-500/20 rounded-3xl blur-3xl" 
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -inset-6 bg-gradient-to-tr from-blue-500/25 via-indigo-500/35 to-violet-500/25 rounded-3xl blur-2xl" 
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.8, 0.4],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-bl from-emerald-500/20 via-teal-500/30 to-cyan-500/20 rounded-3xl blur-xl" 
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.6, 0.2],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />

              {/* Trendy Floating UI Elements - Hidden on Mobile */}
              <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl shadow-2xl hidden md:block"
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                  y: [0, -30, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotateX: { duration: 15, repeat: Infinity, ease: "linear" },
                  rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="absolute inset-2 bg-gradient-to-tr from-white/20 to-transparent rounded-xl backdrop-blur-sm"></div>
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -left-10 w-16 h-16 bg-gradient-to-tr from-pink-500 via-rose-500 to-orange-500 rounded-full shadow-2xl hidden sm:block"
                animate={{
                  rotateZ: [0, -360],
                  scale: [1, 1.4, 1],
                  x: [0, 15, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  rotateZ: { duration: 12, repeat: Infinity, ease: "linear" },
                  scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="absolute inset-1 bg-gradient-to-bl from-white/30 to-transparent rounded-full backdrop-blur-sm"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
              </motion.div>

              {/* Main Trendy Image Container */}
              <motion.div
                className="relative w-full h-full rounded-3xl overflow-hidden border-2 shadow-2xl"
                animate={{
                  borderColor: [
                    "rgba(6, 182, 212, 0.8)",
                    "rgba(139, 92, 246, 0.8)",
                    "rgba(236, 72, 153, 0.8)",
                    "rgba(34, 197, 94, 0.8)",
                    "rgba(6, 182, 212, 0.8)"
                  ],
                  boxShadow: [
                    "0 25px 50px -12px rgba(6, 182, 212, 0.3)",
                    "0 25px 50px -12px rgba(139, 92, 246, 0.3)",
                    "0 25px 50px -12px rgba(236, 72, 153, 0.3)",
                    "0 25px 50px -12px rgba(34, 197, 94, 0.3)",
                    "0 25px 50px -12px rgba(6, 182, 212, 0.3)"
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: "translateZ(0px)",
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4), 0 15px 35px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)"
                }}
              >
                {/* Profile Images with Transition */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 1 }}
                  animate={{ 
                    opacity: activeImage === 1 ? 1 : 0,
                    scale: activeImage === 1 ? 1 : 1.1,
                    rotateY: activeImage === 1 ? 0 : 15
                  }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeInOut" 
                  }}
                >
                  <Image
                    src={imageMetadata.profile1.url}
                    alt={imageMetadata.profile1.alt}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: activeImage === 2 ? 1 : 0,
                    scale: activeImage === 2 ? 1 : 1.1,
                    rotateY: activeImage === 2 ? 0 : -15
                  }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeInOut" 
                  }}
                >
                  <Image
                    src={imageMetadata.profile2.url}
                    alt={imageMetadata.profile2.alt}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </motion.div>
                
                {/* Trendy Holographic Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20" 
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    background: [
                      "linear-gradient(135deg, rgba(6, 182, 212, 0.2), transparent, rgba(168, 85, 247, 0.2))",
                      "linear-gradient(135deg, rgba(168, 85, 247, 0.2), transparent, rgba(236, 72, 153, 0.2))",
                      "linear-gradient(135deg, rgba(236, 72, 153, 0.2), transparent, rgba(34, 197, 94, 0.2))",
                      "linear-gradient(135deg, rgba(34, 197, 94, 0.2), transparent, rgba(6, 182, 212, 0.2))"
                    ]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Breathing Light Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"
                  animate={{
                    opacity: [0, 0.3, 0],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                />
                
                {/* Trendy Scan Lines */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/50"
                  animate={{
                    x: ["-100%", "100%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 2,
                  }}
                />
                
                <motion.div
                  className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-transparent via-purple-400 to-transparent shadow-lg shadow-purple-400/50"
                  animate={{
                    y: ["100%", "-100%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 2,
                    delay: 1.5,
                  }}
                />

                {/* Digital Particles - Hidden on Mobile */}
                <motion.div
                  className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/80 hidden md:block"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, 50, 100],
                    y: [0, -30, -60],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeOut",
                    repeatDelay: 1,
                  }}
                />
                
                <motion.div
                  className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full shadow-lg shadow-purple-400/80 hidden md:block"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, -40, -80],
                    y: [0, 20, 40],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeOut",
                    repeatDelay: 0.5,
                    delay: 2,
                  }}
                />

                {/* 3D Border Frame */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-gradient-to-r from-cyan-400 via-purple-500 to-blue-400"
                  animate={{
                    scale: [1, 1.02, 1],
                    rotateZ: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: `conic-gradient(from 0deg, 
                      rgba(6, 182, 212, 0.3), 
                      rgba(168, 85, 247, 0.3), 
                      rgba(59, 130, 246, 0.3), 
                      rgba(6, 182, 212, 0.3))`,
                    padding: "2px",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "subtract",
                    WebkitMaskComposite: "subtract",
                  }}
                />
              </motion.div>



              {/* 3D Floating Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"
                    style={{
                      left: `${20 + i * 12}%`,
                      top: `${10 + i * 15}%`,
                      transform: `translateZ(${20 + i * 5}px)`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, Math.sin(i) * 20, 0],
                      rotateZ: [0, 360],
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Text Content Section */}
          <motion.div
            id="home-text-content"
            className="flex-1 text-center md:text-left space-y-3 sm:space-y-6 md:space-y-8 order-2 md:order-1 px-0 max-w-lg md:max-w-none mx-auto md:mx-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1
              id="home-title"
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Hi, I&apos;m <br className="hidden sm:block" />
              <motion.span
                className="text-cyan-400 inline-block"
                animate={glitchAnimation}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  repeatDelay: 5,
                }}
              >
                Nandha Kumar
              </motion.span>
            </motion.h1>

            <motion.div
              id="home-subtitle"
              className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 sm:text-gray-300 md:text-gray-400 h-6 xs:h-7 sm:h-8 md:h-10 lg:h-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TypingAnimation />
            </motion.div>

            <motion.p
              id="home-description"
              className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-100 sm:text-gray-200 md:text-gray-300 max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-xl mx-auto md:mx-0 leading-relaxed text-justify mt-0"
              style={{ marginTop: marginTop }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              &quot;I turn designs into interactive experiences and bugs into features. A frontend developer who loves crafting beautiful, responsive interfaces while exploring new web technologies.&quot;
            </motion.p>

            <motion.div
              id="home-action-buttons"
              className="flex flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 mt-4 sm:mt-5 md:mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div
                id="home-main-buttons"
                className="flex flex-row gap-2 xs:gap-3 sm:gap-4 items-center"
                style={{ perspective: "1000px" }}
              >
                {/* 3D Impressive CV Button */}
                <motion.div
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.button
                    onClick={() => (window.location.href = "/resume")}
                    className="relative flex items-center gap-2 px-6 py-3.5 w-36 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white font-medium rounded-lg shadow-lg overflow-hidden text-sm justify-center whitespace-nowrap"
                    whileHover={{ 
                      scale: 1.05,
                      rotateX: -10,
                      rotateY: 10,
                      z: 30,
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      rotateX: 5,
                      rotateY: -5
                    }}
                    initial={{ opacity: 0, y: 50, rotateX: -30 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      rotateX: 0,
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ 
                      delay: 0.8,
                      backgroundPosition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      backgroundSize: "200% 100%",
                      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    {/* 3D Floating Icon */}
                    <motion.div
                      className="relative z-10"
                      animate={{
                        rotateY: [0, 360],
                        y: [0, -2, 0],
                      }}
                      transition={{
                        rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                      style={{ transform: "translateZ(10px)" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 drop-shadow-lg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <line x1="9" y1="15" x2="15" y2="15" />
                      </svg>
                    </motion.div>
                    
                    {/* 3D Text */}
                    <motion.span 
                      className="relative z-10 text-sm tracking-wide drop-shadow-lg"
                      style={{ transform: "translateZ(5px)" }}
                    >
                      View CV
                    </motion.span>

                    {/* 3D Floating Particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/60 rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`,
                            transform: `translateZ(${10 + i * 5}px)`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>

                    {/* 3D Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{
                        x: ["-200%", "200%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }}
                      style={{ transform: "translateZ(15px)" }}
                    />
                  </motion.button>

                  {/* 3D Button Shadow/Reflection */}
                  <motion.div
                    className="absolute top-full left-0 w-full h-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-xl blur-sm opacity-50"
                    style={{
                      transform: "rotateX(180deg) translateZ(-10px)",
                      transformOrigin: "center top",
                    }}
                    animate={{
                      scaleY: [0.3, 0.4, 0.3],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>

              {/* 3D Impressive Social Links */}
              <motion.div
                id="home-social-links"
                className="flex gap-3 items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                style={{ perspective: "1000px" }}
              >
                {/* GitHub 3D Button with Text */}
                <motion.a
                  href="https://github.com/nandha-kumar01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-6 py-3.5 w-36 h-12 bg-gradient-to-br from-gray-800 to-gray-900 text-gray-300 hover:text-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 8,
                    rotateX: -5,
                    z: 20,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(75, 85, 99, 0.6)"
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    rotateY: -5,
                    rotateX: 3
                  }}
                  initial={{ opacity: 0, y: 30, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 1.1 }}
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  }}
                >
                  {/* Animated Background Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gray-600/30 to-transparent"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Button Content */}
                  <motion.div
                    className="relative flex items-center gap-2 xs:gap-3 z-10"
                    animate={{
                      y: [0, -1, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ transform: "translateZ(10px)" }}
                  >
                    <motion.div
                      animate={{
                        rotateZ: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <FaGithub size={18} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6 drop-shadow-lg" />
                    </motion.div>
                    <span className="font-semibold text-sm xs:text-base sm:text-lg tracking-wide drop-shadow-lg">
                      GitHub
                    </span>
                  </motion.div>

                  {/* Hover Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0"
                    whileHover={{
                      opacity: 1,
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      x: { duration: 0.6, ease: "easeInOut" },
                      opacity: { duration: 0.3 }
                    }}
                  />
                </motion.a>


              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
