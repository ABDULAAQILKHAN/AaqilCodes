"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

/**
 * Custom cursor dot that follows the real cursor across the entire site.
 * Disabled on touch devices. Uses `left`/`top` via GSAP so the dot
 * stays perfectly centred on the native pointer.
 */
export default function FloatingCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default hidden until check

  // Detect touch devices
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const dot = dotRef.current;
    if (!dot) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(dot, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseenter", handleEnter);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={dotRef}
      className="fixed z-[9999] pointer-events-none"
      style={{
        /* start off-screen so there's no flash at (0,0) */
        left: -40,
        top: -40,
        /* centre the dot on the cursor position */
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Main dot */}
      <div className="w-4 h-4 rounded-full bg-white mix-blend-difference" />
      {/* Ping ring */}
      <div className="absolute inset-0 w-4 h-4 rounded-full bg-white/30 mix-blend-difference animate-ping" />
    </div>
  );
}
