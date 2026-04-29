"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const EXPERIENCES = [
    {
        id: 1,
        role: "MERN Stack Developer",
        company: "Hammoq Infotech Pvt. Ltd",
        period: "April 2026 - Present",
        description:
            "Developing and shipping full-stack features for MERN-based products using React, Node.js, Express, and MongoDB. Own end-to-end workflows including REST API design, authentication (JWT), database modeling, and UI performance improvements. Collaborate with stakeholders to translate requirements into scalable components, and maintain production readiness through testing and observability.",
        highlights: ["React + Node", "JWT Auth", "MongoDB & REST APIs"],
        color: "from-green-500 to-emerald-500"
    },
    {
        id: 2,
        role: "Software Development Engineer",
        company: "Techdome Solutions Pvt. Ltd",
        period: "May 2024 - April 2026",
        description: "Engineered modular frontend architectures and optimized backend performance, reducing latency by 25%. Architected an AI-powered recruitment tool and hardened infrastructure security.",
        highlights: ["Frontend Architecture", "25% Latency Reduction", "AI Integration"],
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 3,
        role: "Full-Stack Developer Intern",
        company: "Blaccskull Platforms Pvt. Ltd",
        period: "March 2023 - Feb 2024",
        description: "Developed a high-performance user search engine and led real-time multimedia feature development. Enhanced runtime performance by 50% and mentored junior developers.",
        highlights: ["Search Engine", "50% Performance Boost", "Mentorship"],
        color: "from-purple-500 to-pink-500"
    },
    {
        id: 4,
        role: "Full-stack Developer",
        company: "Royal IT Service",
        period: "May 2021 - Feb 2023",
        description: "Built responsive interfaces using React, Node.js, and PostgreSQL. Improved frontend performance, maintained code quality through Git workflows, and contributed to data-driven web applications within an Agile environment.",
        highlights: ["React", "PostgreSQL", "Agile"],
        color: "from-emerald-500 to-teal-500"
    }
];

// Interactive experience card with 3D tilt effect
function ExperienceCard({ exp, index, isLeft }: { exp: typeof EXPERIENCES[0]; index: number; isLeft: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };

    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
        setIsHovered(false);
    };

    return (
        <div className={`exp-node relative flex items-center mb-16 last:mb-0 ${isLeft ? "md:flex-row-reverse" : ""}`}>
            {/* Timeline Dot with pulse effect */}
            <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 z-10">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} shadow-[0_0_15px_rgba(255,255,255,0.5)]`}>
                    {isHovered && (
                        <div className={`absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} animate-ping`} />
                    )}
                </div>
            </div>

            <div className={`ml-16 md:ml-0 md:w-1/2 ${isLeft ? "md:pl-16" : "md:pr-16 text-left md:text-right"}`}>
                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    style={{ transform, transition: "transform 0.1s ease-out" }}
                    className={`p-6 md:p-8 bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl transition-all duration-300 cursor-pointer group ${
                        isHovered ? "bg-neutral-900 border-white/20 shadow-2xl" : ""
                    }`}
                >
                    {/* Gradient accent line */}
                    <div className={`absolute top-0 ${isLeft ? "left-0" : "right-0"} w-1 h-full bg-gradient-to-b ${exp.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <span className="text-sm font-bold tracking-widest text-[#a8a8a8] uppercase block mb-2">{exp.period}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                        {exp.role}
                    </h3>
                    <h4 className="text-lg md:text-xl text-gray-400 mb-4">{exp.company}</h4>
                    <p className="text-gray-400 font-light leading-relaxed mb-4">
                        {exp.description}
                    </p>
                    
                    {/* Highlight tags */}
                    <div className={`flex flex-wrap gap-2 ${isLeft ? "" : "md:justify-end"}`}>
                        {exp.highlights.map((highlight, i) => (
                            <span 
                                key={i}
                                className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${exp.color} text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
                            >
                                {highlight}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

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
                    {/* Vertical Line with gradient */}
                    <div
                        ref={lineRef}
                        className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2"
                    />

                    {EXPERIENCES.map((exp, i) => (
                        <ExperienceCard key={exp.id} exp={exp} index={i} isLeft={i % 2 === 0} />
                    ))}
                </div>
            </div>
        </section>
    );
}
