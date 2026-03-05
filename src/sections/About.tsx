"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function About() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const texts = gsap.utils.toArray(".about-text");

            texts.forEach((text) => {
                gsap.from(text as Element, {
                    scrollTrigger: {
                        trigger: text as Element,
                        start: "top 85%",
                        end: "bottom 60%",
                        scrub: 1,
                        toggleActions: "play none none reverse",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                });
            });

            gsap.from(".about-image", {
                scrollTrigger: {
                    trigger: ".about-image",
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: true,
                },
                scale: 1.1,
                y: 100,
                opacity: 0.5,
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} id="about" className="relative min-h-screen w-full flex items-center p-6 md:p-12 lg:p-24 bg-neutral-950">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Text Column */}
                <div className="flex flex-col gap-8 order-2 lg:order-1">
                    <h2 className="about-text text-4xl md:text-6xl font-bold tracking-tight">
                        Architecting <span className="text-gray-400">scalable</span> web applications.
                    </h2>
                    <div className="h-[1px] w-1/4 bg-white/20 about-text" />
                    <p className="about-text text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                        I am a Results-oriented Full Stack Engineer with expertise in React, Next.js, and FastAPI. I specialize in optimizing system performance, reducing latency, and integrating AI-driven workflows to automate business processes.
                    </p>
                    <p className="about-text text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                        With a strong foundation in modern engineering principles, I excel at developing modular architectures, ensuring robust infrastructure security, and delivering production-ready, feature-rich solutions.
                    </p>
                </div>

                {/* Image / Stats Column */}
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                    <div className="about-image relative w-full aspect-[4/5] max-w-md bg-neutral-900 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-black opacity-50 transition-opacity duration-500 group-hover:opacity-30" />

                        {/* Abstract visual since we don't have an image asset supplied */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white/10 hover:text-white/20 transition-colors duration-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>

                        <div className="absolute bottom-6 left-6 p-4">
                            <p className="text-4xl font-light tracking-tighter text-white/80">Aaqil Khan</p>
                            <p className="text-sm text-white/50 tracking-widest uppercase mt-1">Portfolio</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
