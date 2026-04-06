"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// ────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────

/** Detect coarse-pointer (touch) devices for disabling heavy effects */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

// ────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────

/** Custom cursor dot that follows the mouse (desktop only) */
function FloatingCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 w-4 h-4 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 mix-blend-difference ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full h-full rounded-full bg-white" />
      <div className="absolute inset-0 w-full h-full rounded-full bg-white/30 animate-ping" />
    </div>
  );
}

// ────────────────────────────────────────────
// Main Hero
// ────────────────────────────────────────────

export default function Hero({ isLoaded }: { isLoaded?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Track mouse position (normalized -1 … 1) for parallax
  const mouse = useRef({ x: 0, y: 0 });

  // ── Parallax on mouse move ──
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile) return;
      const { innerWidth, innerHeight } = window;
      mouse.current.x = (e.clientX / innerWidth - 0.5) * 2; // -1 → 1
      mouse.current.y = (e.clientY / innerHeight - 0.5) * 2;
    },
    [isMobile]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // GSAP ticker for silky-smooth parallax interpolation
  useEffect(() => {
    if (isMobile) return;
    const content = contentRef.current;
    if (!content) return;

    const pos = { x: 0, y: 0 };

    const tick = () => {
      // Ease toward target
      pos.x += (mouse.current.x * 12 - pos.x) * 0.08;
      pos.y += (mouse.current.y * 12 - pos.y) * 0.08;
      gsap.set(content, { x: pos.x, y: pos.y });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [isMobile]);

  // ── Scroll-based opacity + translate for content ──
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionH = section.offsetHeight;
      // Fraction 0 → 1 as user scrolls through the hero
      const progress = Math.min(scrollY / sectionH, 1);

      // Fade out (1 → 0.15) and translate upwards (0 → -40px)
      const opacity = 1 - progress * 0.85;
      const translateY = -progress * 40;

      content.style.opacity = String(opacity);
      content.style.transform = `translate(${isMobile ? 0 : "var(--px-x, 0px)"}, calc(${translateY}px + ${isMobile ? "0px" : "var(--px-y, 0px)"}))`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // ── Subtle video zoom animation (1 → 1.05 over 20s, yoyo) ──
  useEffect(() => {
    if (isMobile) return;
    const video = videoRef.current;
    if (!video) return;

    gsap.to(video, {
      scale: 1.05,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      gsap.killTweensOf(video);
    };
  }, [isMobile]);

  // ── Entrance animation (GSAP timeline) ──
  useGSAP(
    () => {
      if (!isLoaded) return;

      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.5 },
      });

      tl.from(".hero-text", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        skewY: 5,
      })
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power2.out",
          },
          "-=1"
        )
        .from(
          ".hero-video-wrap",
          {
            opacity: 0,
            scale: 1.1,
            duration: 2,
          },
          0 // start at beginning
        );
    },
    { scope: sectionRef, dependencies: [isLoaded] }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* ── Custom cursor (desktop) ── */}
      {!isMobile && <FloatingCursor />}

      {/* ── Background video ── */}
      <div className="hero-video-wrap absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/profile.jpg"
        >
          <source src="/hero_background_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Dark gradient overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.80) 100%)",
        }}
      />

      {/* ── Subtle grain texture overlay for depth ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.035] hero-grain" />

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center will-change-transform"
      >
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent hero-subtitle" />
        <div className="absolute bottom-1/4 right-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent hero-subtitle" />

        {/* Name */}
        <div className="overflow-hidden mb-2">
          <h1 className="hero-text text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.9] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-500 cursor-default">
            Aaqil
          </h1>
        </div>
        <div className="overflow-hidden mb-6">
          <h1 className="hero-text text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 leading-[0.9] pb-2 hover:from-blue-300 hover:via-purple-400 hover:to-pink-400 transition-all duration-500 cursor-default">
            Khan
          </h1>
        </div>

        {/* Tagline */}
        <p className="hero-subtitle text-lg md:text-2xl text-gray-300/90 max-w-xl mx-auto font-light tracking-wide hover:text-gray-200 transition-colors duration-300 cursor-default">
          Full Stack Engineer specializing in scalable web applications &amp;
          AI-driven workflows.
        </p>

        {/* CTA Buttons */}
        <div className="hero-subtitle flex gap-4 mt-8 pointer-events-auto">
          <a
            href="#projects"
            className="group px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
          >
            View Work
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-subtitle pointer-events-none z-10">
        <span className="text-xs tracking-[0.3em] uppercase text-gray-400 animate-pulse">
          Scroll
        </span>
        <div className="relative w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
}
