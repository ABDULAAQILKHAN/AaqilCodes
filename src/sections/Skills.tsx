"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SKILLS = [
    "React.js", "Next.js", "TypeScript", "Tailwind CSS", "FastAPI",
    "PostgreSQL", "Redux Toolkit", "NestJS", "Node.js", "Docker",
    "MongoDB", "OpenAI API", "Git/GitHub Actions", "Nginx", "Linux",
    "System Design", "Microservices", "CI/CD"
];

function MagneticTag({ children }: { children: React.ReactNode }) {
    const tagRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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
        <div ref={containerRef} className="skill-tag-container p-2 relative touch-none will-change-transform">
            <div
                ref={tagRef}
                className="skill-tag px-6 py-4 rounded-full bg-neutral-900 border border-white/5 text-gray-300 font-medium tracking-wide hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-colors duration-300 cursor-pointer shadow-lg z-10 relative will-change-transform"
            >
                {children}
            </div>
        </div>
    );
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
        },
        { scope: container }
    );

    return (
        <section ref={container} id="skills" className="relative min-h-screen w-full flex items-center justify-center py-24 bg-transparent">
            <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">

                <div className="text-center mb-16 md:mb-24">
                    <h2 className="skills-title text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white drop-shadow-md">
                        Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Competencies</span>
                    </h2>
                    <p className="skills-title text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        A comprehensive toolkit for crafting modern, high-performance web applications with a focus on user experience and animation.
                    </p>
                </div>

                <div className="skills-grid flex flex-wrap justify-center gap-2 md:gap-4 max-w-4xl mx-auto perspective-1000">
                    {SKILLS.map((skill) => (
                        <MagneticTag key={skill}>{skill}</MagneticTag>
                    ))}
                </div>

            </div>
        </section>
    );
}
