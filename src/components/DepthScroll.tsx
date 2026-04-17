"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface DepthSectionProps {
    children: ReactNode;
    id: string;
    skipDepthEffect?: boolean;
}

export function DepthSection({ children, id, skipDepthEffect = false }: DepthSectionProps) {
    return (
        <div
            className={`depth-section ${skipDepthEffect ? "normal-scroll" : ""}`}
            data-section-id={id}
            data-skip-depth={skipDepthEffect}
        >
            {children}
        </div>
    );
}

interface DepthScrollContainerProps {
    children: ReactNode;
}

// ── Transition flash helper ───────────────────────────────────
// Called on every depth-section enter / leave to fill the brief
// black gap while one section scales out and the next scales in.
function flashTransition() {
    const flash = document.getElementById("depth-transition-flash");
    const line  = document.getElementById("depth-transition-line");

    // Radial glow pulse
    if (flash) {
        gsap.killTweensOf(flash);
        gsap.timeline()
            .set(flash, { opacity: 0 })
            .to(flash,  { opacity: 1, duration: 0.18, ease: "power2.out" })
            .to(flash,  { opacity: 0, duration: 0.55, ease: "power2.in"  });
    }

    // Horizontal sweep line across the top edge
    if (line) {
        gsap.killTweensOf(line);
        gsap.timeline()
            .set(line,  { opacity: 0.7, scaleX: 0, transformOrigin: "left center" })
            .to(line,   { scaleX: 1, duration: 0.45, ease: "power2.inOut" })
            .to(line,   { opacity: 0, duration: 0.25, ease: "power2.out"  });
    }
}

export default function DepthScrollContainer({ children }: DepthScrollContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const sections = container.querySelectorAll(".depth-section:not(.normal-scroll)");

        const ctx = gsap.context(() => {
            sections.forEach((section, i) => {
                if (i > 0) {
                    gsap.set(section, {
                        scale:   0.85,
                        opacity: 0,
                        filter:  "blur(8px)",
                        zIndex:  sections.length - i,
                    });
                } else {
                    gsap.set(section, {
                        scale:   1,
                        opacity: 1,
                        filter:  "blur(0px)",
                        zIndex:  sections.length,
                    });
                }

                ScrollTrigger.create({
                    trigger: section,
                    start:   "top 80%",
                    end:     "bottom 20%",
                    onEnter: () => {
                        flashTransition();

                        if (i > 0) {
                            gsap.to(sections[i - 1], {
                                scale:    1.3,
                                opacity:  0,
                                filter:   "blur(15px)",
                                duration: 0.8,
                                ease:     "power2.inOut",
                            });
                        }
                        gsap.to(section, {
                            scale:    1,
                            opacity:  1,
                            filter:   "blur(0px)",
                            duration: 0.8,
                            ease:     "power2.inOut",
                        });
                    },
                    onLeaveBack: () => {
                        flashTransition();

                        gsap.to(section, {
                            scale:    0.85,
                            opacity:  0,
                            filter:   "blur(8px)",
                            duration: 0.8,
                            ease:     "power2.inOut",
                        });
                        if (i > 0) {
                            gsap.to(sections[i - 1], {
                                scale:    1,
                                opacity:  1,
                                filter:   "blur(0px)",
                                duration: 0.8,
                                ease:     "power2.inOut",
                            });
                        }
                    },
                });
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/*
             * ── Section-transition flash overlay ──────────────────
             * A very subtle radial glow that briefly brightens the
             * viewport during depth-scroll transitions, masking the
             * black gap while sections scale in / scale out.
             * z-index 35 = above depth sections (max ~4) but below
             * the skills overlay (40) and the header (50).
             */}
            <div
                id="depth-transition-flash"
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex:     35,
                    opacity:    0,
                    background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(255,255,255,0.07) 0%, transparent 70%)",
                }}
            />

            {/* Thin sweep-line that animates across the top edge on transition */}
            <div
                id="depth-transition-line"
                className="fixed top-0 left-0 right-0 pointer-events-none"
                style={{
                    zIndex:     36,
                    height:     "1.5px",
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.5) 60%, transparent 100%)",
                    opacity:    0,
                    transform:  "scaleX(0)",
                    transformOrigin: "left center",
                }}
            />

            <div ref={containerRef} className="depth-scroll-container relative">
                {children}
            </div>
        </>
    );
}
