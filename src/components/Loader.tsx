"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 15) + 5;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                
                // Animate out
                gsap.to(".loader-container", {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut",
                    delay: 0.2,
                    onComplete: onComplete,
                });
            }
            setProgress(currentProgress);
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="loader-container fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white">
            <div className="relative flex flex-col items-center">
                {/* IT/Code bracket animation */}
                <div className="flex items-center text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-8">
                    <span className="opacity-70 animate-pulse">&lt;</span>
                    <span className="mx-4 text-white">System.Init</span>
                    <span className="opacity-70 animate-pulse">&gt;</span>
                </div>
                
                {/* Progress bar container */}
                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
                    {/* The animated bar */}
                    <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                
                {/* Percentage text */}
                <div className="mt-4 text-xs font-mono text-gray-400 tracking-widest">
                    {progress.toString().padStart(3, '0')}%
                </div>
            </div>
        </div>
    );
}
