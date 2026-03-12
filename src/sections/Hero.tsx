import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Tooltip from "@/components/Tooltip";

// Interactive floating text that follows cursor
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

// Interactive glowing orb that responds to hover
function GlowOrb({ className, delay = 0 }: { className: string; delay?: number }) {
    const orbRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        gsap.to(orbRef.current, {
            scale: 1.2,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(orbRef.current, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    return (
        <div
            ref={orbRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`absolute rounded-full blur-3xl transition-colors duration-1000 cursor-pointer ${className}`}
            style={{ animationDelay: `${delay}s` }}
        />
    );
}

export default function Hero({ isLoaded }: { isLoaded?: boolean }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!isLoaded) return;

            const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });

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
                    ".scene-container",
                    {
                        opacity: 0,
                        scale: 0.8,
                        duration: 2,
                    },
                    "-=1.5"
                );
        },
        { scope: container, dependencies: [isLoaded] }
    );

    return (
        <section ref={container} id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Custom cursor */}
            <FloatingCursor />

            {/* Animated Background */}
            <div className="scene-container absolute inset-0 z-0">
                <AnimatedBackground />
            </div>

            {/* Interactive glow orbs */}
            <GlowOrb className="w-96 h-96 bg-blue-500/20 top-20 left-10 animate-pulse-slow hover:bg-blue-400/30" delay={0} />
            <GlowOrb className="w-80 h-80 bg-purple-500/20 bottom-20 right-10 animate-pulse-slow hover:bg-purple-400/30" delay={2} />
            <GlowOrb className="w-64 h-64 bg-pink-500/15 top-1/3 right-1/4 animate-pulse-slow hover:bg-pink-400/25" delay={4} />

            {/* Content */}
            <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center">
                {/* Decorative lines */}
                <div className="absolute top-1/4 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent hero-subtitle" />
                <div className="absolute bottom-1/4 right-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent hero-subtitle" />
                
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

                <Tooltip content="Software Engineering Expert">
                    <p className="hero-subtitle text-lg md:text-2xl text-gray-400 max-w-xl mx-auto font-light tracking-wide pointer-events-auto cursor-help hover:text-gray-300 transition-colors duration-300">
                        Full Stack Engineer specializing in scalable web applications and AI-driven workflows.
                    </p>
                </Tooltip>

                {/* CTA Buttons */}
                <div className="hero-subtitle flex gap-4 mt-8 pointer-events-auto">
                    <a 
                        href="#projects" 
                        className="group px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
                    >
                        View Work
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                    <a 
                        href="#contact" 
                        className="px-6 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                    >
                        Contact Me
                    </a>
                </div>
            </div>

            {/* Scroll Indicator with animation */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-subtitle pointer-events-none">
                <span className="text-xs tracking-[0.3em] uppercase text-gray-400 animate-pulse">Scroll</span>
                <div className="relative w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll-indicator" />
                </div>
            </div>
        </section>
    );
}
