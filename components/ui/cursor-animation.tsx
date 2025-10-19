'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

interface TrailDot {
  x: number;
  y: number;
  id: number;
  opacity: number;
  scale: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const CursorAnimation: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const createParticle = useCallback((x: number, y: number): Particle => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 30,
      maxLife: 30,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 3 + 1,
    };
  }, []);

  const updateCursorPosition = useCallback((e: MouseEvent) => {
    const newPos = { x: e.clientX, y: e.clientY };
    setCursorPosition(newPos);
    setIsVisible(true);
    setIsMoving(true);
    
    // Clear previous timeout
    if (moveTimeoutRef.current) {
      clearTimeout(moveTimeoutRef.current);
    }
    
    // Set moving to false after 100ms of no movement
    moveTimeoutRef.current = setTimeout(() => {
      setIsMoving(false);
    }, 100);
    
    // Add new trail dot
    const newDot: TrailDot = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now() + Math.random(),
      opacity: 1,
      scale: 1,
    };
    
    setTrail(prevTrail => [...prevTrail.slice(-20), newDot]);
    
    // Add particles when moving
    if (Math.random() > 0.7) {
      const newParticles = Array.from({ length: 2 }, () => createParticle(e.clientX, e.clientY));
      setParticles(prev => [...prev.slice(-20), ...newParticles]);
    }
  }, [createParticle]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setIsMoving(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Animation loop
    const intervalId = setInterval(() => {
      // Update trail
      setTrail(prevTrail => 
        prevTrail
          .map(dot => ({ 
            ...dot, 
            opacity: dot.opacity - 0.06,
            scale: dot.scale * 0.95
          }))
          .filter(dot => dot.opacity > 0)
      );
      
      // Update particles
      setParticles(prevParticles =>
        prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 1,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98,
          }))
          .filter(particle => particle.life > 0)
      );
    }, 16); // ~60fps

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(intervalId);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, [updateCursorPosition, handleMouseLeave, handleMouseEnter]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 cursor-animation">
      {/* Main cursor - larger when moving */}
      <div
        className="absolute rounded-full transition-all duration-200 ease-out"
        style={{
          left: cursorPosition.x - (isMoving ? 12 : 8),
          top: cursorPosition.y - (isMoving ? 12 : 8),
          width: isMoving ? 24 : 16,
          height: isMoving ? 24 : 16,
          background: isMoving 
            ? 'radial-gradient(circle, rgba(255, 107, 107, 0.8) 0%, rgba(78, 205, 196, 0.6) 50%, rgba(69, 183, 209, 0.4) 100%)'
            : 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, rgba(79, 70, 229, 0.4) 50%, transparent 70%)',
          boxShadow: isMoving 
            ? '0 0 20px rgba(255, 107, 107, 0.5), 0 0 40px rgba(78, 205, 196, 0.3)' 
            : '0 0 15px rgba(147, 51, 234, 0.4)',
        }}
      />
      
      {/* Outer ring - animated */}
      <div
        className="absolute rounded-full border-2 transition-all duration-300 ease-out"
        style={{
          left: cursorPosition.x - (isMoving ? 20 : 16),
          top: cursorPosition.y - (isMoving ? 20 : 16),
          width: isMoving ? 40 : 32,
          height: isMoving ? 40 : 32,
          borderColor: isMoving ? '#FF6B6B' : '#9333EA',
          borderWidth: isMoving ? 3 : 2,
          animation: isMoving ? 'pulse 0.5s ease-in-out infinite alternate' : 'none',
        }}
      />

      {/* Trail dots with rainbow colors */}
      {trail.map((dot, index) => (
        <div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: dot.x - 3,
            top: dot.y - 3,
            width: 6 * dot.scale,
            height: 6 * dot.scale,
            background: `hsl(${(index * 25 + 180) % 360}, 80%, 65%)`,
            opacity: dot.opacity,
            boxShadow: `0 0 10px hsl(${(index * 25 + 180) % 360}, 80%, 65%)`,
            transform: `scale(${dot.scale})`,
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            opacity: particle.life / particle.maxLife,
            boxShadow: `0 0 8px ${particle.color}`,
          }}
        />
      ))}

      {/* Dynamic sparkles */}
      {isMoving && (
        <>
          <div
            className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
            style={{
              left: cursorPosition.x + Math.sin(Date.now() * 0.01) * 30 - 4,
              top: cursorPosition.y + Math.cos(Date.now() * 0.01) * 30 - 4,
              animationDuration: '0.8s',
            }}
          />
          <div
            className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping"
            style={{
              left: cursorPosition.x + Math.sin(Date.now() * 0.015 + 2) * 25 - 3,
              top: cursorPosition.y + Math.cos(Date.now() * 0.015 + 2) * 25 - 3,
              animationDuration: '1s',
            }}
          />
          <div
            className="absolute w-1 h-1 bg-pink-300 rounded-full animate-ping"
            style={{
              left: cursorPosition.x + Math.sin(Date.now() * 0.008 + 4) * 20 - 2,
              top: cursorPosition.y + Math.cos(Date.now() * 0.008 + 4) * 20 - 2,
              animationDuration: '1.2s',
            }}
          />
        </>
      )}
    </div>
  );
};

export default CursorAnimation;