"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SKILLS = [
    "TypeScript", "React", "Next.js", "Node.js", "GraphQL",
    "Tailwind CSS", "GSAP", "Three.js", "Framer Motion",
    "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS",
    "Figma", "Web Performance", "Accessibility", "SEO"
];

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
            gsap.from(".skill-tag", {
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
        <section ref={container} id="skills" className="relative min-h-screen w-full flex items-center justify-center py-24 bg-neutral-950">
            <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">

                <div className="text-center mb-16 md:mb-24">
                    <h2 className="skills-title text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Core <span className="text-gray-500">Competencies</span>
                    </h2>
                    <p className="skills-title text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        A comprehensive toolkit for crafting modern, high-performance web applications with a focus on user experience and animation.
                    </p>
                </div>

                <div className="skills-grid flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
                    {SKILLS.map((skill) => (
                        <div
                            key={skill}
                            className="skill-tag px-6 py-4 rounded-full bg-neutral-900 border border-white/5 text-gray-300 font-medium tracking-wide hover:bg-white hover:text-black transition-colors duration-300 cursor-default"
                        >
                            {skill}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
