"use client";

import { useRef, useEffect, useState, ReactNode, Children, isValidElement, cloneElement } from "react";
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
            className={`depth-section ${skipDepthEffect ? 'normal-scroll' : ''}`} 
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

export default function DepthScrollContainer({ children }: DepthScrollContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentSection, setCurrentSection] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const sections = container.querySelectorAll('.depth-section:not(.normal-scroll)');
        
        const ctx = gsap.context(() => {
            sections.forEach((section, i) => {
                // Initial state - sections after the first one start scaled down and blurred
                if (i > 0) {
                    gsap.set(section, {
                        scale: 0.85,
                        opacity: 0,
                        filter: "blur(8px)",
                        zIndex: sections.length - i,
                    });
                } else {
                    gsap.set(section, {
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px)",
                        zIndex: sections.length,
                    });
                }

                // Create scroll trigger for each section
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    onEnter: () => {
                        // Current section scales up and fades out to foreground
                        if (i > 0) {
                            const prevSection = sections[i - 1];
                            gsap.to(prevSection, {
                                scale: 1.3,
                                opacity: 0,
                                filter: "blur(15px)",
                                duration: 0.8,
                                ease: "power2.inOut",
                            });
                        }
                        
                        // New section comes from background
                        gsap.to(section, {
                            scale: 1,
                            opacity: 1,
                            filter: "blur(0px)",
                            duration: 0.8,
                            ease: "power2.inOut",
                        });
                        
                        setCurrentSection(i);
                    },
                    onLeaveBack: () => {
                        // Going back up - current section goes back to background
                        gsap.to(section, {
                            scale: 0.85,
                            opacity: 0,
                            filter: "blur(8px)",
                            duration: 0.8,
                            ease: "power2.inOut",
                        });
                        
                        // Previous section comes back from foreground
                        if (i > 0) {
                            const prevSection = sections[i - 1];
                            gsap.to(prevSection, {
                                scale: 1,
                                opacity: 1,
                                filter: "blur(0px)",
                                duration: 0.8,
                                ease: "power2.inOut",
                            });
                            setCurrentSection(i - 1);
                        }
                    },
                });
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="depth-scroll-container relative">
            {children}

            {/* Section indicators */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 hidden md:flex">
                {Children.map(children, (child, i) => {
                    if (!isValidElement(child)) return null;
                    const props = child.props as DepthSectionProps;
                    if (props.skipDepthEffect) return null;
                    
                    return (
                        <button
                            key={i}
                            className={`group relative w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                                i === currentSection
                                    ? "bg-white scale-150 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    : "bg-white/20 hover:bg-white/50"
                            }`}
                            onClick={() => {
                                const sections = containerRef.current?.querySelectorAll('.depth-section');
                                sections?.[i]?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            aria-label={`Go to ${props.id}`}
                        >
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-medium bg-black/90 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm border border-white/10">
                                {props.id?.charAt(0).toUpperCase() + props.id?.slice(1)}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

