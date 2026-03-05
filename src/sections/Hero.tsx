"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Scene from "@/components/Scene";

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
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
        { scope: container }
    );

    return (
        <section ref={container} id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* 3D Background */}
            <div className="scene-container absolute inset-0 z-0">
                <Scene />
            </div>

            {/* Content */}
            <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center pointer-events-none">
                <div className="overflow-hidden mb-2">
                    <h1 className="hero-text text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.9]">
                        Creative
                    </h1>
                </div>
                <div className="overflow-hidden mb-6">
                    <h1 className="hero-text text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase text-transparent w-full leading-[0.9]" style={{ WebkitTextStroke: "2px white" }}>
                        Technologist
                    </h1>
                </div>

                <p className="hero-subtitle text-lg md:text-2xl text-gray-400 max-w-xl mx-auto font-light tracking-wide pointer-events-auto">
                    Crafting immersive digital experiences through code and design.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-subtitle pointer-events-none">
                <span className="text-xs tracking-[0.3em] uppercase text-gray-400">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
            </div>
        </section>
    );
}
