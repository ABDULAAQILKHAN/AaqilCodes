"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function useGlobalAnimations() {
    useEffect(() => {
        // Basic setup if needed
        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);
}
