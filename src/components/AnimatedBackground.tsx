"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function AnimatedBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Animate the gradient orbs with gentle floating motion
        const orbs = containerRef.current.querySelectorAll(".gradient-orb");
        orbs.forEach((orb, i) => {
            gsap.to(orb, {
                x: `random(-30, 30)`,
                y: `random(-30, 30)`,
                duration: gsap.utils.random(8, 12),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.5,
            });
        });

        // Animate floating shapes
        const shapes = containerRef.current.querySelectorAll(".floating-shape");
        shapes.forEach((shape, i) => {
            gsap.to(shape, {
                y: `random(-20, 20)`,
                rotateX: `random(-15, 15)`,
                rotateY: `random(-15, 15)`,
                duration: gsap.utils.random(6, 10),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.3,
            });
        });

        return () => {
            gsap.killTweensOf(orbs);
            gsap.killTweensOf(shapes);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden">
            {/* Aurora/Gradient Mesh Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />
            
            {/* Animated Gradient Orbs */}
            <div className="gradient-orb absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-500/20 blur-[100px] animate-pulse-slow" />
            <div className="gradient-orb absolute top-[40%] right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-600/25 to-pink-500/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
            <div className="gradient-orb absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full bg-gradient-to-r from-indigo-600/20 to-violet-500/15 blur-[80px] animate-pulse-slow" style={{ animationDelay: "4s" }} />

            {/* Floating 3D-like Shapes using CSS */}
            <div className="absolute inset-0" style={{ perspective: "1000px" }}>
                {/* Glass Icosahedron-like shape */}
                <div 
                    className="floating-shape absolute top-[20%] left-[20%] w-24 h-24 md:w-32 md:h-32"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="relative w-full h-full animate-spin-slow">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
                             style={{ transform: "rotateX(45deg) rotateY(45deg)" }} />
                        <div className="absolute inset-2 bg-gradient-to-tr from-blue-400/10 to-cyan-400/5 rounded-xl" 
                             style={{ transform: "rotateX(45deg) rotateY(45deg)" }} />
                    </div>
                </div>

                {/* Glass Torus-like shape */}
                <div 
                    className="floating-shape absolute top-[60%] right-[15%] w-20 h-20 md:w-28 md:h-28"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="relative w-full h-full animate-spin-slow-reverse">
                        <div className="absolute inset-0 rounded-full border-[8px] md:border-[12px] border-purple-400/20 shadow-[0_0_40px_rgba(168,85,247,0.2),inset_0_0_20px_rgba(168,85,247,0.1)]"
                             style={{ transform: "rotateX(60deg)" }} />
                    </div>
                </div>

                {/* Glass Octahedron-like shape */}
                <div 
                    className="floating-shape absolute bottom-[25%] left-[10%] w-16 h-16 md:w-24 md:h-24"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="relative w-full h-full animate-spin-medium">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/15 to-rose-400/10 backdrop-blur-sm rotate-45 border border-pink-300/20 shadow-[0_0_25px_rgba(236,72,153,0.15)]" />
                    </div>
                </div>

                {/* Glass Capsule-like shape */}
                <div 
                    className="floating-shape absolute top-[15%] right-[25%] w-14 h-28 md:w-20 md:h-40"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="relative w-full h-full animate-spin-slow">
                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/10 to-teal-400/5 backdrop-blur-sm rounded-full border border-emerald-300/20 shadow-[0_0_30px_rgba(52,211,153,0.15)]"
                             style={{ transform: "rotateX(20deg) rotateY(-15deg)" }} />
                    </div>
                </div>

                {/* Additional decorative elements */}
                <div className="floating-shape absolute top-[45%] left-[40%] w-12 h-12 md:w-16 md:h-16">
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-yellow-400/10 to-orange-400/5 border border-yellow-300/10 animate-spin-slow shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                         style={{ transform: "rotate(45deg)" }} />
                </div>

                <div className="floating-shape absolute bottom-[40%] right-[30%] w-10 h-10 md:w-14 md:h-14">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-400/5 border border-cyan-300/15 animate-spin-slow-reverse shadow-[0_0_20px_rgba(34,211,238,0.1)]" />
                </div>
            </div>

            {/* Grid overlay for depth */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

            {/* Particle dots */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white/30 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${8 + Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* Vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>
    );
}
