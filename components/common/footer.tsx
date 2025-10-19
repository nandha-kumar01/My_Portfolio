"use client";
import { FaGithub, FaLinkedin, FaHeart, FaCode, FaRocket, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiMail, HiLocationMarker } from "react-icons/hi";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const handleEmailClick = () => {
    const email = "marinandhu659@gmail.com";
    const subject = "Let's Collaborate - Project Inquiry";
    const body = `Hi Nandha Kumar,

I visited your portfolio and would like to discuss a potential collaboration.

Project Details:
- 

Best regards`;
    
    // Create mailto link for default email client
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Use their default email application (Gmail, Outlook, Apple Mail, etc.)
    window.location.href = mailtoLink;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const quickLinks = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/nandha-kumar01",
      icon: FaGithub,
      color: "hover:text-purple-400",
      bgColor: "hover:bg-purple-500/20",
      glowColor: "rgba(168, 85, 247, 0.4)"
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/nandha-kumar-m-4bb751186/",
      icon: FaLinkedin,
      color: "hover:text-blue-400",
      bgColor: "hover:bg-blue-500/20",
      glowColor: "rgba(59, 130, 246, 0.4)"
    },
    {
      name: "Twitter",
      href: "https://x.com/nandhamari03",
      icon: FaXTwitter,
      color: "hover:text-gray-300",
      bgColor: "hover:bg-gray-500/20",
      glowColor: "rgba(156, 163, 175, 0.4)"
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/my_sweet_royal_enfield/zf",
      icon: FaInstagram,
      color: "hover:text-pink-400",
      bgColor: "hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-purple-500/20",
      glowColor: "rgba(236, 72, 153, 0.4)"
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/nandhakumar.nandhakumar.735507/",
      icon: FaFacebook,
      color: "hover:text-blue-500",
      bgColor: "hover:bg-blue-600/20",
      glowColor: "rgba(37, 99, 235, 0.4)"
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/918754949307?text=Hi%20Nandha%20Kumar,%20I%20would%20like%20to%20connect%20with%20you!",
      icon: FaWhatsapp,
      color: "hover:text-green-400",
      bgColor: "hover:bg-green-500/20",
      glowColor: "rgba(34, 197, 94, 0.4)"
    },
  ];

  return (
    <footer 
      id="footer"
      className="relative w-full mt-auto overflow-hidden perspective-1000"
      onMouseMove={handleMouseMove}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {/* 3D Background Layer */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900"
        style={{
          transform: `rotateX(${(mousePosition.y - 50) * 0.1}deg) rotateY(${(mousePosition.x - 50) * 0.1}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out',
        }}
      />
      
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 opacity-40">
        {/* Floating 3D Orbs */}
        <div 
          className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full blur-xl animate-float-slow"
          style={{
            transform: `translateZ(50px) rotateY(${mousePosition.x * 0.5}deg)`,
          }}
        />
        <div 
          className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-full blur-xl animate-float-medium"
          style={{
            transform: `translateZ(30px) rotateX(${mousePosition.y * 0.3}deg)`,
          }}
        />
        <div 
          className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-green-500/30 to-cyan-500/30 rounded-full blur-xl animate-float-fast"
          style={{
            transform: `translateZ(70px) rotateZ(${mousePosition.x * 0.2}deg)`,
          }}
        />
        
        {/* Geometric 3D Shapes */}
        <div 
          className="absolute top-1/3 left-1/4 w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rotate-45 animate-spin-slow"
          style={{
            transform: `translateZ(40px) rotateY(${mousePosition.x * 0.4}deg) rotateX(${mousePosition.y * 0.3}deg)`,
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-8 h-16 bg-gradient-to-t from-indigo-500/20 to-purple-500/20 rounded-full animate-pulse-3d"
          style={{
            transform: `translateZ(60px) rotateX(${mousePosition.y * 0.5}deg)`,
          }}
        />
      </div>

      {/* Dynamic Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translateZ(20px) rotateX(${mousePosition.y * 0.05}deg)`,
          animation: 'gridMove 20s linear infinite',
        }}
      />

      {/* Interactive Light Effect */}
      <div 
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '200px',
          height: '200px',
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%) translateZ(100px)',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          transition: 'all 0.3s ease-out',
        }}
      />

      {/* Border Gradient with 3D effect */}
      <div 
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        style={{
          transform: 'translateZ(10px)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section with 3D effects */}
          <div 
            className="lg:col-span-1 space-y-4 transform-gpu"
            style={{
              transform: `translateY(${isVisible ? 0 : 30}px) rotateY(${mousePosition.x * 0.02}deg)`,
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease-out 0.1s',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform-gpu hover:scale-110 transition-all duration-300"
                style={{
                  transform: `rotateY(${mousePosition.x * 0.1}deg) rotateX(${mousePosition.y * 0.1}deg)`,
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                }}
              >
                <FaCode className="text-white text-sm" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-gradient">
                Nandha Kumar
              </h3>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed transform-gpu hover:translateZ-4 transition-transform duration-300">
              Front-End Developer passionate about creating innovative solutions and beautiful user experiences.
            </p>
            <a
              href="https://www.google.com/maps/place/Karaikudi,+Tamil+Nadu/@10.0580998,78.768793,3a,75y,108.73h,80.46t/data=!3m10!1e1!3m8!1szUqx8EU3eWQQJEiXD9xc_Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D9.5444488372857%26panoid%3DzUqx8EU3eWQQJEiXD9xc_Q%26yaw%3D108.73390387099506!7i13312!8i6656!9m2!1b1!2i40!4m6!3m5!1s0x3b005d8b08de4f3b:0x1f24fc0ab84584f8!8m2!3d10.07354!4d78.773198!16zL20vMDMyajU5?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-neutral-400 text-sm group hover:text-blue-400 transition-all duration-300 cursor-pointer w-fit"
            >
              <HiLocationMarker className="text-blue-400 group-hover:animate-bounce group-hover:text-blue-300 transition-colors duration-300" />
              <span className="group-hover:underline group-hover:underline-offset-2">Karaikudi, Tamil Nadu, India</span>
              <svg 
                className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Quick Links with 3D hover effects */}
          <div 
            className="space-y-4"
            style={{
              transform: `translateY(${isVisible ? 0 : 30}px) rotateX(${mousePosition.y * 0.01}deg)`,
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease-out 0.2s',
            }}
          >
            <h4 className="text-lg font-semibold text-white mb-4 relative">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
            </h4>
            <nav className="space-y-2">
              {quickLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-neutral-400 hover:text-blue-400 transition-all duration-300 text-sm relative group transform-gpu"
                  style={{
                    transform: `translateY(${isVisible ? 0 : 20}px)`,
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.6s ease-out ${0.3 + index * 0.1}s`,
                  }}
                >
                  <span className="relative z-10 block py-2 px-3 rounded-lg group-hover:bg-blue-500/10 group-hover:transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300">
                    {link.name}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info with 3D cards */}
          <div 
            className="space-y-4"
            style={{
              transform: `translateY(${isVisible ? 0 : 30}px) rotateY(${mousePosition.x * -0.01}deg)`,
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease-out 0.3s',
            }}
          >
            <h4 className="text-lg font-semibold text-white mb-4 relative">
              Get In Touch
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </h4>
            <div className="space-y-3">
              <button
                onClick={handleEmailClick}
                className="flex items-center space-x-3 text-neutral-400 hover:text-blue-400 transition-all duration-300 text-sm group relative p-3 rounded-xl transform-gpu hover:scale-105 hover:-translate-y-2 cursor-pointer w-full"
                style={{
                  background: 'linear-gradient(145deg, rgba(23, 23, 23, 0.8), rgba(38, 38, 38, 0.4))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(59, 130, 246, 0.1)',
                }}
              >
                <div 
                  className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-purple-600/40 transition-all duration-300 transform-gpu group-hover:rotateY-12"
                  style={{
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.2)',
                  }}
                >
                  <HiMail className="text-base text-blue-400" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Let&apos;s collaborate</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <div 
                className="flex items-center space-x-3 text-neutral-400 text-sm p-3 rounded-xl relative transform-gpu hover:scale-105 transition-all duration-300"
                style={{
                  background: 'linear-gradient(145deg, rgba(23, 23, 23, 0.6), rgba(38, 38, 38, 0.3))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(34, 197, 94, 0.1)',
                }}
              >
                <div 
                  className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center"
                  style={{
                    boxShadow: '0 8px 25px rgba(34, 197, 94, 0.2)',
                  }}
                >
                  <FaRocket className="text-base text-green-400 animate-bounce" />
                </div>
                <span>Available for projects</span>
              </div>
            </div>
          </div>

          {/* Social Links with 3D floating effect */}
          <div 
            className="space-y-4"
            style={{
              transform: `translateY(${isVisible ? 0 : 30}px) rotateX(${mousePosition.y * -0.01}deg)`,
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease-out 0.4s',
            }}
          >
            <h4 className="text-lg font-semibold text-white mb-4 relative">
              Connect
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full" />
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-16 h-16 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all duration-500 transform-gpu ${social.color} text-neutral-300`}
                    title={social.name}
                    style={{
                      background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.95), rgba(45, 45, 45, 0.8))',
                      border: '2px solid rgba(255, 255, 255, 0.15)',
                      transform: `translateY(${isVisible ? 0 : 20}px) rotateY(${mousePosition.x * 0.05}deg) rotateX(${mousePosition.y * 0.05}deg)`,
                      opacity: isVisible ? 1 : 0,
                      transition: `all 0.8s ease-out ${0.5 + index * 0.1}s`,
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = `translateY(-12px) rotateY(15deg) rotateX(-10deg) scale(1.15)`;
                      e.currentTarget.style.boxShadow = `0 25px 50px ${social.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
                      e.currentTarget.style.border = `2px solid ${social.glowColor}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = `translateY(0) rotateY(0deg) rotateX(0deg) scale(1)`;
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.15)';
                    }}
                  >
                    <Icon size={24} className="relative z-10 transition-all duration-300 group-hover:scale-110" />
                    
                    {/* Enhanced 3D Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Ripple Effect */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </div>
                    
                    {/* Enhanced Floating particles effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <div className="absolute w-2 h-2 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" style={{top: '15%', right: '15%'}} />
                      <div className="absolute w-1.5 h-1.5 bg-blue-400/60 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300 delay-100" style={{bottom: '20%', left: '20%'}} />
                      <div className="absolute w-1 h-1 bg-purple-400/50 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300 delay-200" style={{top: '60%', right: '25%'}} />
                    </div>

                    {/* Social Platform Specific Styling */}
                    {social.name === 'Instagram' && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/0 via-purple-500/0 to-orange-500/0 group-hover:from-pink-500/10 group-hover:via-purple-500/10 group-hover:to-orange-500/10 transition-all duration-500" />
                    )}
                    {social.name === 'Facebook' && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/15 group-hover:to-blue-600/15 transition-all duration-500" />
                    )}
                    {social.name === 'GitHub' && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-purple-600/0 group-hover:from-purple-500/15 group-hover:to-purple-600/15 transition-all duration-500" />
                    )}
                    {social.name === 'LinkedIn' && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/0 to-blue-500/0 group-hover:from-blue-400/15 group-hover:to-blue-500/15 transition-all duration-500" />
                    )}
                    {social.name === 'Twitter' && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-400/0 to-gray-500/0 group-hover:from-gray-400/15 group-hover:to-gray-500/15 transition-all duration-500" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section with Enhanced 3D Design */}
        <div 
          className="relative mt-8 pt-8"
          style={{
            borderImage: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5), transparent) 1',
            borderTop: '1px solid',
          }}
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" />
            <div className="absolute top-0 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{animationDelay: '1s'}} />
          </div>

          <div className="flex justify-center relative z-10 px-4">
            
            {/* Responsive Copyright Section - Single line on web, two lines on mobile */}
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-3 sm:space-y-0 py-6 group">
              
              {/* Copyright, Year and Name */}
              <div className="flex items-center justify-center gap-3">
                {/* Animated Copyright Symbol */}
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full flex items-center justify-center border border-blue-500/40 group-hover:border-blue-400/70 transition-all duration-300">
                    <span className="text-blue-400 text-xs font-bold group-hover:scale-110 transition-transform duration-300">©</span>
                  </div>
                  <div className="absolute inset-0 bg-blue-400/30 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  {/* Rotating ring */}
                  <div className="absolute inset-0 border-2 border-blue-400/20 rounded-full animate-spin-slow" />
                </div>
                
                {/* Year and Name */}
                <span className="text-neutral-200 text-sm font-medium">
                  {currentYear} 
                </span>
                <span className="text-white text-base font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  Nandha Kumar
                </span>
              </div>
              
              {/* Separator - only visible on larger screens */}
              <span className="text-neutral-500 text-sm hidden sm:inline">•</span>
              
              {/* Made with love section */}
              <div className="flex items-center justify-center gap-2 text-neutral-300 text-sm">
                <span>Made with</span>
                <div className="relative group/heart">
                  <FaHeart className="text-red-500 animate-pulse group-hover/heart:scale-125 transition-transform duration-300" size={14} />
                  {/* Heart particles */}
                  <div className="absolute inset-0 opacity-0 group-hover/heart:opacity-100 transition-opacity duration-300">
                    <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-red-400/60 rounded-full animate-ping" />
                    <div className="absolute -top-1 -right-1 w-1 h-1 bg-pink-400/60 rounded-full animate-ping" style={{animationDelay: '0.5s'}} />
                    <div className="absolute -bottom-1 left-0 w-0.5 h-0.5 bg-red-300/60 rounded-full animate-ping" style={{animationDelay: '1s'}} />
                  </div>
                </div>
                <span>and lots of</span>
                <div className="relative group/coffee">
                  <span className="text-amber-400 text-base group-hover/coffee:animate-bounce">☕</span>
                  {/* Steam effect */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/coffee:opacity-100 transition-opacity duration-300">
                    <div className="w-0.5 h-3 bg-gray-300/50 rounded-full animate-pulse" />
                    <div className="w-0.5 h-2 bg-gray-400/40 rounded-full animate-pulse ml-1 -mt-2" style={{animationDelay: '0.3s'}} />
                    <div className="w-0.5 h-1.5 bg-gray-300/30 rounded-full animate-pulse ml-0.5 -mt-1.5" style={{animationDelay: '0.6s'}} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform translate-x-[-100%] animate-slide-right" />
          </div>
        </div>

        {/* 3D Scroll to top button - Fixed Position */}
        <div className="fixed bottom-8 right-4 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all duration-500 transform-gpu group"
            title="Scroll to top"
            style={{
              background: 'linear-gradient(145deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9))',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transform: `translateY(${isVisible ? 0 : 100}px) scale(${isVisible ? 1 : 0.8})`,
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) rotateY(15deg) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) rotateY(0deg) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }}
          >
            <svg 
              className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            
            {/* Pulsing ring effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-white/20 scale-100 group-hover:scale-125 opacity-100 group-hover:opacity-0 transition-all duration-500" />
            
            {/* Background glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </button>
        </div>
      </div>
    </footer>
  );
}
