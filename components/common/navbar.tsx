"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, X } from "lucide-react";

// Apple-like spring configurations
const appleSpring = {
  type: "spring",
  mass: 0.4,
  damping: 15,
  stiffness: 300,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const appleWobbleSpring = {
  type: "spring",
  mass: 0.6,
  damping: 12,
  stiffness: 400,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const appleBounceSpring = {
  type: "spring",
  mass: 0.3,
  damping: 20,
  stiffness: 500,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// Custom easing curves

const appleEaseOut = [0.16, 1, 0.3, 1];

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Client-side only effect to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const windowHeight = window.innerHeight;
      
      let currentActiveSection = "";
      
      // Check sections in the correct order
      const sectionsToCheck = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      
      for (const sectionId of sectionsToCheck) {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;
          
          // Check if this section is currently being viewed
          if (scrollPosition >= elementTop - 150 && scrollPosition < elementTop + elementHeight - 50) {
            currentActiveSection = sectionId;
            break;
          }
        }
      }
      
      // Special case: if we're at the very top, always show home
      if (window.scrollY < 50) {
        currentActiveSection = "home";
      }
      
      // Special case: if we're at the very bottom, show contact
      if (window.scrollY + windowHeight >= document.documentElement.scrollHeight - 50) {
        currentActiveSection = "contact";
      }

      // Update state only if section changed
      if (currentActiveSection && currentActiveSection !== currentSection) {
        setCurrentSection(currentActiveSection);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [currentSection, isClient]);

  useEffect(() => {
    const handleToggleNavbar = (event: CustomEvent) => {
      setIsVisible(event.detail.visible);
    };

    window.addEventListener(
      "toggleNavbar",
      handleToggleNavbar as EventListener
    );

    return () => {
      window.removeEventListener(
        "toggleNavbar",
        handleToggleNavbar as EventListener
      );
    };
  }, []);

  // Determine if a main menu item is active - fixed section order
  const sectionOrder = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
  
  // Improved: Always fill all previous sections, and smoothly unfill when scrolling up
  const getCurrentSectionIndex = () => {
    if (!isClient || typeof window === 'undefined') return -1;
    const scrollPosition = window.scrollY + 100; // Offset for better detection
    let currentIndex = -1;
    for (let i = 0; i < sectionOrder.length; i++) {
      const element = document.getElementById(sectionOrder[i]);
      if (element) {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        // If scroll is above this section, break
        if (scrollPosition < elementTop - 120) {
          break;
        }
        // If scroll is within this section, set currentIndex
        if (scrollPosition >= elementTop - 120 && scrollPosition < elementTop + elementHeight - 80) {
          currentIndex = i;
          break;
        }
        // If scroll is past this section, update currentIndex
        if (scrollPosition >= elementTop + elementHeight - 80) {
          currentIndex = i;
        }
      }
    }
    // At top, always Home
    if (window.scrollY < 50) return 0;
    // At bottom, always Contact
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50) return sectionOrder.length - 1;
    return currentIndex;
  };

  const isActive = (sectionId: string) => {
    if (!isClient) return false; // Prevent hydration mismatch
    const currentIndex = getCurrentSectionIndex();
    const sectionIndex = sectionOrder.indexOf(sectionId.replace('#', ''));
    
    // Return true if current section index is greater than or equal to this section index
    return currentIndex >= sectionIndex && sectionIndex !== -1 && currentIndex !== -1;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (active) setActive(null);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.95,
              transition: { duration: 0.2, ease: appleEaseOut },
            }}
            transition={appleWobbleSpring}
            className={cn(
              "fixed top-4 inset-x-0 max-w-5xl mx-auto z-50 hidden md:block"
            )}
          >
            <Menu setActive={setActive}>

{/* home               */}
              <HoveredLink
                href="/#home"
                className={cn(
                  "transition-all duration-300 relative px-3 py-1 rounded-lg",
                  isClient && isActive("#home")
                    ? "text-blue-400 font-bold bg-blue-400/10 shadow-inner"
                    : "text-neutral-200 hover:bg-neutral-800/30"
                )}
              >
                Home
              </HoveredLink>


 {/* About */}
              <HoveredLink
                href="/#about"
                className={cn(
                  "transition-all duration-300 relative px-3 py-1 rounded-lg",
                  isClient && isActive("#about")
                    ? "text-blue-400 font-bold bg-blue-400/10 shadow-inner"
                    : "text-neutral-200 hover:bg-neutral-800/30"
                )}
              >
               About Me
              </HoveredLink>

{/* Skills */}
              <HoveredLink
                href="/#skills"
                className={cn(
                  "transition-all duration-300 relative px-3 py-1 rounded-lg",
                  isClient && isActive("#skills")
                    ? "text-blue-400 font-bold bg-blue-400/10 shadow-inner"
                    : "text-neutral-200 hover:bg-neutral-800/30"
                )}
              >
                Skills
              </HoveredLink>

              {/* Experience */}
              <HoveredLink
                href="/#experience"
                className={cn(
                  "transition-all duration-300 relative px-3 py-1 rounded-lg",
                  isClient && isActive("#experience")
                    ? "text-blue-400 font-bold bg-blue-400/10 shadow-inner"
                    : "text-neutral-200 hover:bg-neutral-800/30"
                )}
              >
                Experience
              </HoveredLink>

{/* projects */}
              <HoveredLink
                href="/#projects"
                className={cn(
                  "transition-all duration-300 relative px-3 py-1 rounded-lg",
                  isClient && isActive("#projects")
                    ? "text-blue-400 font-bold bg-blue-400/10 shadow-inner"
                    : "text-neutral-200 hover:bg-neutral-800/30"
                )}
              >
                Projects
              </HoveredLink>

               {/* Education */}
              <HoveredLink
                href="/education"
                className={cn(
                  "transition-all duration-300 relative px-3 py-1 rounded-lg",
                  isClient && isActive("#education")
                    ? "text-blue-400 font-bold bg-blue-400/10 shadow-inner"
                    : "text-neutral-200 hover:bg-neutral-800/30"
                )}
              >
                Education
              </HoveredLink>
              
{/* contact */}
              <HoveredLink
                href="/#contact"
                className={cn(
                  "transition-all duration-300 relative px-3 py-1 rounded-lg",
                  isClient && isActive("#contact")
                    ? "text-blue-400 font-bold bg-blue-400/10 shadow-inner"
                    : "text-neutral-200 hover:bg-neutral-800/30"
                )}
              >
                Contact
              </HoveredLink>
            </Menu>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.95,
              transition: { duration: 0.2, ease: appleEaseOut },
            }}
            transition={appleWobbleSpring}
            className="md:hidden fixed top-4 left-6 right-6 z-50"
          >
            <div className="flex items-center justify-between px-2">
              <motion.button
                className="p-3 rounded-xl bg-neutral-900/90 backdrop-blur-xl text-neutral-200 border border-neutral-700/50 relative overflow-hidden"
                onClick={toggleMobileMenu}
                whileHover={{
                  scale: 1.05,
                  transition: appleBounceSpring,
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1 },
                }}
              >
                {/* Enhanced background glow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{
                    opacity: 1,
                    scale: 1,
                    transition: appleSpring,
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl"
                />

                {/* Icon with rotation animation */}
                <motion.div
                  animate={{
                    rotate: isMobileMenuOpen ? 180 : 0,
                    scale: isMobileMenuOpen ? 1.1 : 1,
                  }}
                  transition={appleWobbleSpring}
                  className="relative z-10"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
                </motion.div>
              </motion.button>

              {/* Enhanced current section indicator */}
              <motion.div
                className="text-sm font-medium bg-neutral-900/90 backdrop-blur-xl text-blue-500 py-2 px-4 rounded-xl border border-neutral-700/50 relative overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  transition: appleBounceSpring,
                }}
              >
                {/* Background glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={appleSpring}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"
                />

                {/* Text with subtle animation */}
                <motion.span
                  key={currentSection} // Re-animate when section changes
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={appleBounceSpring}
                  className="relative z-10"
                >
                  {(() => {
                    // If no current section is detected or it's the main-content, show Home
                    if (
                      !currentSection ||
                      currentSection === "main-content" ||
                      currentSection === "about-content"
                    ) {
                      return "Home";
                    }

                    // Special handling for home section
                    if (currentSection === "home") {
                      return "Home";
                    }

                    // For sections with ID containing a dash, extract the first part
                    if (currentSection.includes("-")) {
                      const mainSection = currentSection.split("-")[0];
                      // Capitalize the first letter
                      return (
                        mainSection.charAt(0).toUpperCase() +
                        mainSection.slice(1)
                      );
                    }

                    // Default case: just capitalize the section name
                    return (
                      currentSection.charAt(0).toUpperCase() +
                      currentSection.slice(1)
                    );
                  })()}
                </motion.span>
              </motion.div>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -20,
                    scale: 0.95,
                    rotateX: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                    scale: 0.95,
                    rotateX: -5,
                    transition: { duration: 0.2, ease: appleEaseOut },
                  }}
                  transition={appleWobbleSpring}
                  style={{ transformPerspective: 1000 }}
                  className=" top-6 left-0 right-0 mx-2 rounded-2xl bg-neutral-900/40 backdrop-blur-md p-3 shadow-2xl border border-neutral-700/50 relative overflow-hidden"
                >
                  {/* Enhanced background effects - no delays */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={appleSpring}
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"
                  />

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={appleSpring}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl"
                  />

                  <div className="flex flex-col space-y-2 relative z-10">
                    {[
                      {
                        href: "/#home",
                        label: "Home",
                        active: isClient && isActive("#home"),
                      },
                      {
                        href: "/#about",
                        label: "About Me",
                        active: isClient && isActive("#about"),
                      },
                      {
                        href: "/#skills",
                        label: "Skills",
                        active: isClient && isActive("#skills"),
                      },
                      {
                        href: "/#experience",
                        label: "Experience",
                        active: isClient && isActive("#experience"),
                      },
                      {
                        href: "/#projects",
                        label: "Projects",
                        active: isClient && isActive("#projects"),
                      },
                      {
                        href: "/education",
                        label: "Education",
                        active: isClient && isActive("#education"),
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.1 + index * 0.05,
                          ...appleBounceSpring,
                        }}
                      >
                        <MobileLink
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            item.active
                              ? "text-blue-400 font-medium bg-blue-400/10 shadow-inner"
                              : "text-neutral-200 hover:bg-neutral-800/50"
                          )}
                        >
                          {item.label}
                        </MobileLink>
                      </motion.div>
                    ))}

                    {/* Contact */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.35,
                        ...appleBounceSpring,
                      }}
                    >
                      <MobileLink
                        href="/#contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          isClient && isActive("#contact")
                            ? "text-blue-400 font-medium bg-blue-400/10 shadow-inner"
                            : "text-neutral-200 hover:bg-neutral-800/50"
                        )}
                      >
                        Contact
                      </MobileLink>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



const MobileLink = ({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <motion.div
    whileHover={{
      scale: 1.02,
      x: 4,
      transition: appleBounceSpring,
    }}
    whileTap={{
      scale: 0.98,
      transition: { duration: 0.1 },
    }}
  >
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "block text-sm transition-all duration-300 p-3 rounded-xl relative overflow-hidden",
        className
      )}
    >
      {/* Subtle background animation on hover - only for non-active items */}
      {!className?.includes("text-blue-500") && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{
            opacity: 1,
            scale: 1,
            transition: appleSpring,
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </a>
  </motion.div>
);
