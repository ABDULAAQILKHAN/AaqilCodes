"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Tooltip from "@/components/Tooltip";

function InteractiveImage() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate max rotation of 15 degrees
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform, transition: "transform 0.1s ease-out" }}
            className="about-image relative w-full aspect-[4/5] max-w-md bg-neutral-900 rounded-3xl overflow-hidden group shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] ring-1 ring-white/10"
        >
            {/* Glassmorphism shine overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <Image
                src="/profile.jpg"
                alt="Aaqil Khan - Full Stack Developer specializing in React, Next.js, and Node.js"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
            />

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-2xl font-bold tracking-tight text-white cursor-help">
                    <Tooltip content="Software engineering & Design">
                        <span>Let&apos;s build something.</span>
                    </Tooltip>
                </p>
            </div>
        </div>
    );
}

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
                scale: 0.9,
                rotateY: 15,
                y: 100,
                opacity: 0,
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} id="about" className="relative min-h-screen w-full flex flex-col items-center px-6 py-6 md:px-12 md:py-10 lg:px-24 lg:py-16 bg-transparent">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
                {/* Text Column */}
                <div className="flex flex-col gap-8 order-2 lg:order-1">
                    <h2 className="about-text text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md will-change-transform">
                        Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">scalable</span> web applications.
                    </h2>
                    <div className="h-[1px] w-1/4 bg-gradient-to-r from-purple-500 to-transparent about-text" />
                    <p className="about-text text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                        I am a Results-oriented Full Stack Engineer with expertise in <Tooltip content="Frontend Architecture">React</Tooltip>, <Tooltip content="Server-side Rendering">Next.js</Tooltip>, and <Tooltip content="Python Backend API">FastAPI</Tooltip>. I specialize in optimizing system performance, reducing latency, and integrating AI-driven workflows to automate business processes.
                    </p>
                    <p className="about-text text-lg md:text-xl text-gray-400 font-light leading-relaxed will-change-transform">
                        With a strong foundation in modern engineering principles, I excel at developing modular architectures, ensuring robust infrastructure security, and delivering production-ready, feature-rich solutions.
                    </p>
                </div>

                {/* Image Column */}
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end perspective-1000">
                    <InteractiveImage />
                </div>
            </div>

            {/* SEO Content Section - hidden visually, minimal layout impact */}
            <div className="sr-only about-text">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed">
                        <strong className="text-gray-400">Aaqil Khan</strong> is a <strong className="text-gray-400">Full Stack Developer</strong> based in India,
                        specializing in <strong className="text-gray-400">React</strong>, <strong className="text-gray-400">Next.js</strong>, <strong className="text-gray-400">Node.js</strong>, <strong className="text-gray-400">PostgreSQL</strong>,
                        and building scalable <strong className="text-gray-400">SaaS applications</strong>. With expertise in modern web technologies including
                        TypeScript, NestJS, FastAPI, and cloud platforms, Aaqil delivers high-performance, production-ready solutions
                        for businesses worldwide. From real-time applications to AI-powered tools, discover how cutting-edge
                        development can transform your digital presence.
                    </p>
                </div>
            </div>
        </section>
    );
}
