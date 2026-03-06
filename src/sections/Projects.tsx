"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
    {
        id: 1,
        title: "Solutions with Aaqil",
        category: "Next.js, Tailwind, Framer motion, Email.js",
        description: "My personal B2B portfolio with Auth control of my own projects.",
        image: "sol.png",
        link: "https://solutions-with-aaqil.vercel.app/"
    },
    {
        id: 2,
        title: "Zayka-Darbar",
        category: "Next.js, Supabase, NestJS",
        description: "Multi-role food ordering platform with real-time tracking.",
        image: "zayka.png",
        link: "https://zaykadarbar.vercel.app/"
    },
    {
        id: 3,
        title: "MyCerts",
        category: "Next.js, NestJS, PostgreSQL",
        description: "Secure digital credential hub for verifiable certificates.",
        image: "certshare.png",
        link: "https://mycerts99.vercel.app/"
    },
    {
        id: 4,
        title: "Stepper.ai",
        category: "Next.js, FastAPI, Supabase",
        description: "AI chatbot to debug code step by step.",
        image: "stepperai.png",
        link: "https://stepperai.vercel.app/"
    },
    // {
    //     id: 3,
    //     title: "MyResumeAI",
    //     category: "React, Tailwind, Gemini AI",
    //     description: "Intelligent resume builder powered by AI.",
    //     image: "bg-neutral-800",
    //     link: "https://myresumeai.vercel.app/"
    // },
];

export default function Projects() {
    const container = useRef<HTMLDivElement>(null);
    const scrollWrapper = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const projects = gsap.utils.toArray(".project-card");

            // Horizontal scroll animation
            gsap.to(projects, {
                xPercent: -100 * (projects.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: scrollWrapper.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (projects.length - 1),
                    start: "top top",
                    end: () => "+=" + (scrollWrapper.current?.offsetWidth || 0),
                },
            });

            // Title reveal
            gsap.from(".projects-title", {
                scrollTrigger: {
                    trigger: ".projects-title",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} id="projects" className="relative bg-black overflow-hidden">
            {/* Title section - stays fixed during scroll */}
            <div className="absolute top-0 w-full z-10 p-6 md:p-12 pointer-events-none">
                <h2 className="projects-title text-4xl md:text-6xl font-bold tracking-tight">
                    Selected <span className="text-gray-500">Works</span>
                </h2>
            </div>

            {/* Pinning wrapper */}
            <div ref={scrollWrapper} className="h-screen flex items-center">
                {/* Horizontal scrolling container */}
                <div className="flex gap-8 px-6 md:px-32 h-[60vh] md:h-[70vh]">
                    {PROJECTS.map((project, i) => (
                        <a
                            key={project.id}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-full flex flex-col group cursor-pointer block"
                        >
                            <div className="relative w-full h-full bg-neutral-900 rounded-xl overflow-hidden mb-6">
                                {project.image && !project.image.startsWith('bg-') ? (
                                    <img
                                        src={`/${project.image}`}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                ) : (
                                    <div className={`absolute inset-0 w-full h-full ${project.image || 'bg-neutral-800'}`} />
                                )}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>

                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{project.category}</p>
                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 group-hover:text-gray-300 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-500 max-w-sm">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
