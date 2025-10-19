"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Send,
  Mail,
  User,
  MessageSquare,
  CheckCircle,
  XCircle,
} from "lucide-react";
// Glitch animation similar to home page
const glitchAnimation = {
  textShadow: [
    "0 0 0 #00ffff",
    "2px 2px 0 #ff00ff, -2px -2px 0 #00ffff, 2px 2px 0 #ff00ff",
    "0 0 0 #00ffff",
  ],
  opacity: [1, 0.8, 1],
  x: [0, -1, 1, 0],
};

export default function Contact() {
  const [emailContent, setEmailContent] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [shouldHideNavbar, setShouldHideNavbar] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (status === "error" || status === "success") {
      setShouldHideNavbar(true);
      setIslandExpanded(true);

      timer = setTimeout(() => {
        setIslandExpanded(false);

        setTimeout(() => {
          setStatus("idle");
          setErrorMessage("");
          setShouldHideNavbar(false);
        }, 500);
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [status]);

  useEffect(() => {
    const event = new CustomEvent("toggleNavbar", {
      detail: { visible: !shouldHideNavbar },
    });
    window.dispatchEvent(event);
  }, [shouldHideNavbar]);

  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    if (e.isTrusted) {
      callback();
    } else {
      setStatus("error");
      setErrorMessage("Automated clicks are not allowed(Nice try kiddo)");
    }
  };



  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };



  const handleSendEmail = async () => {
    if (!emailContent || isSending) return;

    // Manual mode validation: require name, email, and subject
    if (!senderName.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your name");
      return;
    }
    if (!senderEmail.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your email");
      return;
    }
    if (!validateEmail(senderEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (!subject.trim()) {
      setStatus("error");
      setErrorMessage("Please enter a subject");
      return;
    }

    setIsSending(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      // Send actual email using API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          subject: subject,
          message: emailContent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setStatus("success");
      setErrorMessage("Message sent successfully! You should receive a confirmation email shortly.");
      
      // Reset form after success
      setTimeout(() => {
        setEmailContent("");
        setSenderName("");
        setSenderEmail("");
        setSubject("");
        setStatus("idle");
        setErrorMessage("");
      }, 3000);
    } catch (error) {
      setStatus("error");
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to send message. Please try again.");
      }
    } finally {
      setIsSending(false);
    }
  };



  // Check if send button should be enabled
  const canSendEmail = () => {
    return emailContent && senderName.trim() && senderEmail.trim() && subject.trim();
  };

  return (
    <div className="min-h-screen w-full text-white relative">
      {/* Background subtle glow similar to home page */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-cyan-500/5 filter blur-[80px] -z-10" />

      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            initial={{
              width: "120px",
              height: "40px",
              y: -100,
              x: "-50%",
              borderRadius: "20px",
              opacity: 0,
            }}
            animate={{
              width: islandExpanded ? "300px" : "120px",
              height: islandExpanded ? "60px" : "40px",
              y: islandExpanded ? 30 : 20,
              x: "-50%",
              borderRadius: islandExpanded ? "16px" : "20px",
              opacity: 1,
            }}
            exit={{
              width: "120px",
              height: "40px",
              y: -100,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
            className={`fixed top-0 left-1/2 z-[60] flex items-center justify-center shadow-xl backdrop-blur-lg border ${
              status === "success"
                ? "bg-green-950/80 border-green-500/30"
                : "bg-red-950/80 border-red-500/30"
            }`}
          >
            <AnimatePresence>
              {islandExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 px-4"
                >
                  {status === "success" ? (
                    <>
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm font-medium text-green-300"
                      >
                        Email sent successfully!
                      </motion.p>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <XCircle className="w-6 h-6 text-red-400" />
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm font-medium text-red-300"
                      >
                        {errorMessage}
                      </motion.p>
                    </>
                  )}
                </motion.div>
              )}
              {!islandExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  {status === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full">
        {/* Hero Section - Updated with cyberpunk styles */}
        <div className="relative overflow-hidden z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-4xl md:text-6xl font-bold text-center relative"
            >
              Let&apos;s{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500"
                animate={glitchAnimation}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  repeatDelay: 5,
                }}
              >
                Connect
              </motion.span>
            </motion.h1>
            <div className="flex items-center justify-center gap-4 mt-6">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-center text-gray-400"
              >
                Send me a message directly
              </motion.p>
            </div>

            {/* Decorative element similar to home page */}
            <motion.div
              className="absolute -bottom-2 -right-2 opacity-70 hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                className="h-4 w-[200px] bg-gradient-to-r from-transparent via-indigo-500/40 to-cyan-500/40"
                animate={{
                  x: [0, 10, 0],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16">

          <div className="max-w-6xl mx-auto">
            {/* Contact Form Card - Glass Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl shadow-black/20 overflow-hidden"
            >
              {/* Glass morphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02]" />
              
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="relative z-10 p-8 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Left Column - Your Details with 3D Effects */}
                  <motion.div
                    initial={{ opacity: 0, x: -50, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                    className="relative space-y-6"
                    style={{ perspective: "1000px" }}
                  >
                    {/* 3D Floating Background */}
                    <motion.div
                      className="absolute -inset-6 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 rounded-3xl blur-2xl"
                      animate={{
                        rotateX: [0, 3, 0],
                        rotateY: [0, -3, 0],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />
                    {/* 3D Enhanced Header */}
                    <motion.div
                      className="relative z-10"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <motion.div
                          className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-2xl"
                          whileHover={{
                            rotateY: 360,
                            scale: 1.1,
                            rotateX: 15,
                          }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 300,
                            rotateY: { duration: 0.6 }
                          }}
                          style={{
                            transformStyle: "preserve-3d",
                            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)",
                          }}
                        >
                          <User className="w-6 h-6 text-white" />
                          
                          {/* 3D Floating Particles */}
                          <motion.div
                            className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full opacity-60"
                            animate={{
                              y: [-2, -8, -2],
                              x: [0, 3, 0],
                              scale: [1, 0.8, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          />
                          <motion.div
                            className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-300 rounded-full opacity-40"
                            animate={{
                              y: [2, 8, 2],
                              x: [0, -2, 0],
                              scale: [0.8, 1, 0.8],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          />
                        </motion.div>
                        
                        <div>
                          <motion.h2
                            className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent"
                            animate={{
                              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            style={{
                              backgroundSize: "200% 200%",
                            }}
                          >
                            Your Details
                          </motion.h2>
                          <motion.p
                            className="text-sm text-gray-400 mt-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                          >
                            Let me know who you are
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>

                    {/* 3D Enhanced Form Fields */}
                    <div className="relative z-10 space-y-8">
                      {/* Name Field with 3D Effects */}
                      <motion.div
                        className="group"
                        initial={{ opacity: 0, y: 30, rotateX: -15 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ delay: 0.7, type: "spring" }}
                        whileHover={{ z: 10 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <motion.label
                          htmlFor="name"
                          className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-3"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <motion.div
                            className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/30 backdrop-blur-sm"
                            whileHover={{
                              rotateZ: 360,
                              scale: 1.2,
                              boxShadow: "0 10px 20px rgba(16, 185, 129, 0.3)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <User className="w-4 h-4 text-emerald-400" />
                          </motion.div>
                          Full Name *
                        </motion.label>
                        
                        <motion.div
                          className="relative group"
                          whileHover={{ y: -1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="relative bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-focus-within:border-emerald-400/50">
                            {/* Subtle glass overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent rounded-xl" />
                            
                            <input
                              type="text"
                              id="name"
                              value={senderName}
                              onChange={(e) => setSenderName(e.target.value)}
                              className="w-full bg-transparent border-0 px-5 py-4 text-white placeholder-gray-400 focus:outline-none text-base font-normal relative z-10"
                              placeholder="Enter your full name"
                            />
                            
                            {/* Simple focus indicator */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300"
                              initial={{ width: "0%" }}
                              animate={{ width: senderName ? "100%" : "0%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Email Field with 3D Effects */}
                      <motion.div
                        className="group"
                        initial={{ opacity: 0, y: 30, rotateX: -15 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ delay: 0.8, type: "spring" }}
                        whileHover={{ z: 10 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <motion.label
                          htmlFor="email"
                          className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-3"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <motion.div
                            className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-500/30 backdrop-blur-sm"
                            whileHover={{
                              rotateZ: 360,
                              scale: 1.2,
                              boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Mail className="w-4 h-4 text-blue-400" />
                          </motion.div>
                          Email Address *
                        </motion.label>
                        
                        <motion.div
                          className="relative group"
                          whileHover={{ y: -1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="relative bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-focus-within:border-blue-400/50">
                            {/* Subtle glass overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent rounded-xl" />
                            
                            <input
                              type="email"
                              id="email"
                              value={senderEmail}
                              onChange={(e) => setSenderEmail(e.target.value)}
                              className="w-full bg-transparent border-0 px-5 py-4 text-white placeholder-gray-400 focus:outline-none text-base font-normal relative z-10"
                              placeholder="your.email@example.com"
                            />
                            
                            {/* Simple focus indicator */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300"
                              initial={{ width: "0%" }}
                              animate={{ width: senderEmail ? "100%" : "0%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Subject Field with 3D Effects */}
                      <motion.div
                        className="group"
                        initial={{ opacity: 0, y: 30, rotateX: -15 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ delay: 0.9, type: "spring" }}
                        whileHover={{ z: 10 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <motion.label
                          htmlFor="subject"
                          className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-3"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <motion.div
                            className="w-7 h-7 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30 backdrop-blur-sm"
                            whileHover={{
                              rotateZ: 360,
                              scale: 1.2,
                              boxShadow: "0 10px 20px rgba(168, 85, 247, 0.3)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <MessageSquare className="w-4 h-4 text-purple-400" />
                          </motion.div>
                          Subject *
                        </motion.label>
                        
                        <motion.div
                          className="relative group"
                          whileHover={{ y: -1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="relative bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-focus-within:border-purple-400/50">
                            {/* Subtle glass overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent rounded-xl" />
                            
                            <input
                              type="text"
                              id="subject"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              className="w-full bg-transparent border-0 px-5 py-4 text-white placeholder-gray-400 focus:outline-none text-base font-normal relative z-10"
                              placeholder="What's this about?"
                            />
                            
                            {/* Simple focus indicator */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-300"
                              initial={{ width: "0%" }}
                              animate={{ width: subject ? "100%" : "0%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Floating Decorative Elements */}
                    <motion.div
                      className="absolute top-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-xl"
                      animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                        x: [0, 10, 0],
                        y: [0, -5, 0],
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, repeatType: "reverse" },
                        x: { duration: 8, repeat: Infinity, repeatType: "reverse" },
                        y: { duration: 6, repeat: Infinity, repeatType: "reverse" },
                      }}
                    />
                    
                    <motion.div
                      className="absolute bottom-6 left-6 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-xl"
                      animate={{
                        rotate: -360,
                        scale: [1.2, 1, 1.2],
                        x: [0, -8, 0],
                        y: [0, 8, 0],
                      }}
                      transition={{
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        scale: { duration: 3, repeat: Infinity, repeatType: "reverse" },
                        x: { duration: 7, repeat: Infinity, repeatType: "reverse" },
                        y: { duration: 5, repeat: Infinity, repeatType: "reverse" },
                      }}
                    />
                  </motion.div>

                  {/* Right Column - Your Message with 3D Effects */}
                  <motion.div
                    initial={{ opacity: 0, x: 50, rotateY: 15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                    className="relative space-y-6"
                    style={{ perspective: "1000px" }}
                  >
                    {/* 3D Floating Background */}
                    <motion.div
                      className="absolute -inset-6 bg-gradient-to-l from-purple-600/5 via-pink-600/5 to-indigo-600/5 rounded-3xl blur-2xl"
                      animate={{
                        rotateX: [0, -3, 0],
                        rotateY: [0, 3, 0],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />
                    {/* 3D Enhanced Header */}
                    <motion.div
                      className="relative z-10"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <motion.div
                            className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center shadow-2xl"
                            whileHover={{
                              rotateY: -360,
                              scale: 1.1,
                              rotateX: -15,
                            }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 300,
                              rotateY: { duration: 0.6 }
                            }}
                            style={{
                              transformStyle: "preserve-3d",
                              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3), 0 0 0 1px rgba(168, 85, 247, 0.1)",
                            }}
                          >
                            <MessageSquare className="w-6 h-6 text-white" />
                            
                            {/* 3D Floating Particles */}
                            <motion.div
                              className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full opacity-60"
                              animate={{
                                y: [-2, -8, -2],
                                x: [0, -3, 0],
                                scale: [1, 0.8, 1],
                              }}
                              transition={{
                                duration: 2.2,
                                repeat: Infinity,
                                repeatType: "reverse",
                              }}
                            />
                            <motion.div
                              className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-300 rounded-full opacity-40"
                              animate={{
                                y: [2, 8, 2],
                                x: [0, 2, 0],
                                scale: [0.8, 1, 0.8],
                              }}
                              transition={{
                                duration: 2.8,
                                repeat: Infinity,
                                repeatType: "reverse",
                              }}
                            />
                          </motion.div>
                          
                          <div>
                            <motion.h2
                              className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
                              animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              style={{
                                backgroundSize: "200% 200%",
                              }}
                            >
                              Your Message
                            </motion.h2>
                            <motion.p
                              className="text-sm text-gray-400 mt-1"
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.9 }}
                            >
                              Share your thoughts with me
                            </motion.p>
                          </div>
                        </div>

                      </div>
                    </motion.div>

                    {/* Message Textarea */}
                    <motion.div
                      className="relative group"
                      whileHover={{ y: -1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="relative bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-focus-within:border-blue-400/50">
                        {/* Subtle glass overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent rounded-xl" />
                        
                        <textarea
                          value={emailContent}
                          onChange={(e) => setEmailContent(e.target.value)}
                          className="w-full h-80 bg-transparent border-0 px-5 py-4 text-white placeholder-gray-400 focus:outline-none text-base font-normal leading-relaxed resize-none relative z-10"
                          placeholder="Write your message here... Share your thoughts, ideas, questions, or just say hello!"
                        />
                        
                        {/* Character counter */}
                        <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-300 border border-white/20">
                          {emailContent.length} characters
                        </div>
                        
                        {/* Simple focus indicator */}
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300"
                          initial={{ width: "0%" }}
                          animate={{ width: emailContent ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>

                    {/* Send Button */}
                    <div className="flex justify-end">
                      {canSendEmail() && (
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={(e) => handleButtonClick(e, handleSendEmail)}
                          disabled={isSending}
                          className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 overflow-hidden ${
                            isSending
                              ? "bg-gray-700/50 text-gray-400 cursor-not-allowed border-2 border-gray-600/50"
                              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 border-2 border-blue-500/50"
                          }`}
                        >
                          {/* Animated background */}
                          {!isSending && (
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}

                          <div className="relative z-10 flex items-center gap-3">
                            {isSending ? (
                              <>
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce [animation-delay:-0.3s]" />
                                  <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce [animation-delay:-0.15s]" />
                                  <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" />
                                </div>
                                <span>Sending...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-5 h-5" />
                                <span>Send Message</span>
                              </>
                            )}
                          </div>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  );
}
