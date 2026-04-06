"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SKILLS = [
    { name: "React.js", color: "from-cyan-400 to-blue-500" },
    { name: "Next.js", color: "from-gray-400 to-gray-600" },
    { name: "TypeScript", color: "from-blue-400 to-blue-600" },
    { name: "Tailwind CSS", color: "from-teal-400 to-cyan-500" },
    { name: "FastAPI", color: "from-green-400 to-emerald-500" },
    { name: "PostgreSQL", color: "from-blue-500 to-indigo-600" },
    { name: "Redux Toolkit", color: "from-purple-400 to-purple-600" },
    { name: "NestJS", color: "from-red-400 to-pink-500" },
    { name: "Node.js", color: "from-green-500 to-lime-500" },
    { name: "Docker", color: "from-blue-400 to-cyan-500" },
    { name: "MongoDB", color: "from-green-500 to-emerald-600" },
    { name: "OpenAI API", color: "from-emerald-400 to-teal-500" },
    { name: "Git/GitHub", color: "from-orange-400 to-red-500" },
    { name: "Nginx", color: "from-green-500 to-green-600" },
    { name: "Linux", color: "from-yellow-400 to-orange-500" },
    { name: "System Design", color: "from-violet-400 to-purple-500" },
    { name: "Microservices", color: "from-pink-400 to-rose-500" },
    { name: "CI/CD", color: "from-blue-400 to-indigo-500" },
];

function MagneticTag({ children, color }: { children: React.ReactNode; color: string }) {
    const tagRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const tag = tagRef.current;
        const container = containerRef.current;
        if (!tag || !container) return;

        const xTo = gsap.quickTo(tag, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(tag, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const calcX = e.clientX - (rect.left + rect.width / 2);
            const calcY = e.clientY - (rect.top + rect.height / 2);

            xTo(calcX * 0.5);
            yTo(calcY * 0.5);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="skill-tag-container p-2 relative touch-manipulation will-change-transform"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                ref={tagRef}
                className={`skill-tag px-6 py-4 rounded-full bg-neutral-900/80 backdrop-blur-sm border border-white/5 text-gray-300 font-medium tracking-wide cursor-pointer shadow-lg z-10 relative will-change-transform transition-all duration-300 ${
                    isHovered ? `bg-gradient-to-r ${color} text-white border-transparent shadow-2xl scale-110` : ""
                }`}
            >
                {children}
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-0 blur-xl transition-opacity duration-300 -z-10 ${
                    isHovered ? "opacity-50" : ""
                }`} />
            </div>
        </div>
    );
}

// Animated counter component
function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let start = 0;
                    const increment = end / (duration * 60);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 1000 / 60);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={counterRef}>{count}</span>;
}

export default function Skills() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Title animation
            gsap.from(".skills-title", {
                scrollTrigger: {
                    trigger: ".skills-title",
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Tags stagger animation
            gsap.from(".skill-tag-container", {
                scrollTrigger: {
                    trigger: ".skills-grid",
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                stagger: {
                    amount: 1.5,
                    grid: "auto",
                    from: "random"
                },
                ease: "back.out(1.2)"
            });

            // Stats animation
            gsap.from(".stat-item", {
                scrollTrigger: {
                    trigger: ".stats-container",
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} id="skills" className="relative min-h-screen w-full flex items-center justify-center py-24 bg-transparent">
            <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">

                <div className="text-center mb-16 md:mb-20">
                    <h2 className="skills-title text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white drop-shadow-md">
                        Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Competencies</span>
                    </h2>
                    <p className="skills-title text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        A comprehensive toolkit for crafting modern, high-performance web applications with a focus on user experience and animation.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 w-full max-w-4xl">
                    <div className="stat-item text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                            <AnimatedCounter end={4} />+
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider">Years Experience</div>
                    </div>
                    <div className="stat-item text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                            <AnimatedCounter end={50} />+
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider">Projects Done</div>
                    </div>
                    <div className="stat-item text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                            <AnimatedCounter end={18} />+
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider">Technologies</div>
                    </div>
                    <div className="stat-item text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                            <AnimatedCounter end={25} />%
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider">Latency Reduced</div>
                    </div>
                </div>

                <div className="skills-grid flex flex-wrap justify-center gap-2 md:gap-4 max-w-5xl mx-auto perspective-1000">
                    {SKILLS.map((skill) => (
                        <MagneticTag key={skill.name} color={skill.color}>{skill.name}</MagneticTag>
                    ))}
                </div>

            </div>
        </section>
    );
}
