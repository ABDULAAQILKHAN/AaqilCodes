"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";

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
                <div className="flex gap-8 px-6 md:px-32 h-[60vh] md:h-[70vh] will-change-transform">
                    {PROJECTS.map((project, i) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className="project-card flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-full flex flex-col group cursor-pointer block"
                        >
                            <div className="relative w-full h-full bg-neutral-900 rounded-xl overflow-hidden mb-6">
                                {project.openSource && (
                                    <span className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase bg-emerald-500/90 text-black rounded-full shadow-lg shadow-emerald-500/30">
                                        Open Source
                                    </span>
                                )}
                                {project.image && !project.image.startsWith('bg-') ? (
                                    <Image
                                        src={`/${project.image}`}
                                        alt={`${project.title} - ${project.description}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 45vw"
                                        loading={i === 0 ? "eager" : "lazy"}
                                        priority={i === 0}
                                    />
                                ) : (
                                    <div className={`absolute inset-0 w-full h-full ${project.image || 'bg-neutral-800'}`} />
                                )}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>

                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <p className="text-xs uppercase tracking-widest text-gray-400">{project.category}</p>
                                        {project.openSource && (
                                            <span className="md:hidden px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                                                Open Source
                                            </span>
                                        )}
                                    </div>
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
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
