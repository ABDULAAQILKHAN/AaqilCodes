"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const EXPERIENCES = [
    {
        id: 1,
        role: "Software Development Engineer",
        company: "Techdome Solutions Pvt. Ltd",
        period: "May 2024 - Present",
        description: "Engineered modular frontend architectures and optimized backend performance, reducing latency by 25%. Architected an AI-powered recruitment tool and hardened infrastructure security."
    },
    {
        id: 2,
        role: "Full-Stack Developer Intern",
        company: "Blaccskull Platforms Pvt. Ltd",
        period: "March 2023 - Feb 2024",
        description: "Developed a high-performance user search engine and led real-time multimedia feature development. Enhanced runtime performance by 50% and mentored junior developers."
    },
    {
        id: 3,
        role: "Full-stack Developer",
        company: "Royal IT Service",
        period: "May 2021 - Feb 2023",
        description: "During my part-time role at Royal IT Service, I worked as a Full Stack Developer using React, Node.js, and PostgreSQL to build responsive interfaces and integrate scalable APIs. I improved frontend performance, maintained code quality through Git workflows, and contributed to data-driven web applications within an Agile environment. I also debugged and enhanced existing modules, strengthening my transition from bug fixing to mentoring while applying skills developed through projects like Stepper.ai and MyResumeAI."
    }
];

export default function Experience() {
    const container = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Animate the central timeline line
            gsap.fromTo(
                lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    transformOrigin: "top center",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1,
                    },
                }
            );

            // Animate each experience node
            const nodes = gsap.utils.toArray(".exp-node");
            nodes.forEach((node, i) => {
                const isLeft = i % 2 === 0;

                gsap.from(node as Element, {
                    scrollTrigger: {
                        trigger: node as Element,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    x: isLeft ? -50 : 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                });
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} id="experience" className="relative py-24 md:py-32 w-full bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-24 text-white drop-shadow-md">
                    Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Journey</span>
                </h2>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div
                        ref={lineRef}
                        className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/20 -translate-x-1/2"
                    />

                    {EXPERIENCES.map((exp, i) => (
                        <div key={exp.id} className={`exp-node relative flex items-center mb-16 last:mb-0 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>

                            {/* Timeline Dot */}
                            <div className="absolute left-[24px] md:left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />

                            <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-16" : "md:pr-16 text-left md:text-right"}`}>
                                <div className="p-6 md:p-8 bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl hover:bg-neutral-900 transition-colors duration-300">
                                    <span className="text-sm font-bold tracking-widest text-[#a8a8a8] uppercase block mb-2">{exp.period}</span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{exp.role}</h3>
                                    <h4 className="text-lg md:text-xl text-gray-400 mb-4">{exp.company}</h4>
                                    <p className="text-gray-400 font-light leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
