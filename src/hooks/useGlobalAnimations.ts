"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function useGlobalAnimations() {
    useEffect(() => {
        // ── Site-wide parallax on elements marked with .parallax-slow / .parallax-fast ──
        // These classes are applied to decorative bg layers in individual sections.
        // GSAP picks them up here so each section doesn't need its own ScrollTrigger.
        const slowEls = document.querySelectorAll<HTMLElement>(".parallax-slow");
        const fastEls = document.querySelectorAll<HTMLElement>(".parallax-fast");

        slowEls.forEach((el) => {
            gsap.to(el, {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: el.closest("section") ?? el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });

        fastEls.forEach((el) => {
            gsap.to(el, {
                yPercent: -40,
                ease: "none",
                scrollTrigger: {
                    trigger: el.closest("section") ?? el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);
}
