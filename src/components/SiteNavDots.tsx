"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

// One unified nav-dot list covering every "stop" on the page:
//   0  Hero
//   1  About
//   2–7  Skills panels (Frontend … Quick Learning)
//   8  Experience
//
// Tracks scroll position independently — no prop drilling needed.

const N_SKILLS = 8;

const DOTS = [
    { label: "Hero",           kind: "section" as const, sectionId: "hero"       },
    { label: "About",          kind: "section" as const, sectionId: "about"      },
    { label: "Frontend",       kind: "skill"   as const, panelIdx: 0, color: "#06b6d4" },
    { label: "Backend",        kind: "skill"   as const, panelIdx: 1, color: "#10b981" },
    { label: "Cyber Security", kind: "skill"   as const, panelIdx: 2, color: "#ef4444" },
    { label: "DevOps",         kind: "skill"   as const, panelIdx: 3, color: "#0ea5e9" },
    { label: "Databases",      kind: "skill"   as const, panelIdx: 4, color: "#8b5cf6" },
    { label: "Agile",          kind: "skill"   as const, panelIdx: 5, color: "#f97316" },
    { label: "Communication",  kind: "skill"   as const, panelIdx: 6, color: "#ec4899" },
    { label: "Quick Learning", kind: "skill"   as const, panelIdx: 7, color: "#eab308" },
    { label: "Experience",     kind: "section" as const, sectionId: "experience" },
] as const;

export default function SiteNavDots() {
    const [active, setActive]   = useState(0);
    const prevRef = useRef(-1);

    // ── Scroll tracker ────────────────────────────────────────
    useEffect(() => {
        const tick = () => {
            const winH = window.innerHeight;
            const mid  = winH * 0.5;
            let next   = 0;

            // About
            const aboutEl = document.querySelector<HTMLElement>('[data-section-id="about"]');
            if (aboutEl && aboutEl.getBoundingClientRect().top < mid) next = 1;

            // Skills panels
            const skillsEl = document.getElementById("skills");
            if (skillsEl) {
                const r      = skillsEl.getBoundingClientRect();
                const travel = skillsEl.offsetHeight - winH;
                const sc     = -r.top;
                if (sc >= 0 && sc <= travel) {
                    next = 2 + Math.min(
                        Math.round((sc / travel) * (N_SKILLS - 1)),
                        N_SKILLS - 1
                    );
                } else if (sc > travel && sc < travel + winH) {
                    next = 2 + N_SKILLS - 1; // tail-end of skills
                }
            }

            // Experience
            const expEl = document.querySelector<HTMLElement>('[data-section-id="experience"]');
            if (expEl && expEl.getBoundingClientRect().top < mid) next = DOTS.length - 1;

            if (next !== prevRef.current) {
                prevRef.current = next;
                setActive(next);
            }
        };

        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
    }, []);

    // ── Navigation ────────────────────────────────────────────
    const navigate = (i: number) => {
        const dot = DOTS[i];
        if (dot.kind === "skill") {
            const el = document.getElementById("skills");
            if (!el) return;
            const travel = el.offsetHeight - window.innerHeight;
            window.scrollTo({
                top:      el.offsetTop + (dot.panelIdx / (N_SKILLS - 1)) * travel,
                behavior: "smooth",
            });
        } else {
            const el = document.querySelector<HTMLElement>(
                `[data-section-id="${dot.sectionId}"]`
            );
            el?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            aria-label="Page navigation"
            className="fixed right-5 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col items-center"
            style={{ gap: 6 }}
        >
            {DOTS.map((dot, i) => {
                const isActive = i === active;
                const isSkill  = dot.kind === "skill";
                const accent   = isSkill ? dot.color : "#ffffff";

                // Visual sizes: skill dots are subtly smaller than section dots
                const sizePx   = isActive
                    ? (isSkill ? 8  : 11)
                    : (isSkill ? 5  : 7);

                // A thin separator line between the "about" dot and skills cluster,
                // and between the skills cluster and "experience" dot,
                // so the eye reads them as sub-items without a hard break.
                const showTopDivider    = i === 2;   // before first skill
                const showBottomDivider = i === 10;  // before experience

                return (
                    <div key={dot.label} className="flex flex-col items-center" style={{ gap: 0 }}>
                        {showTopDivider && (
                            <div className="w-px bg-white/10 my-1" style={{ height: 8 }} />
                        )}

                        <button
                            aria-label={`Go to ${dot.label}`}
                            className="group relative flex items-center justify-center"
                            style={{ width: 16, height: 16 }}
                            onClick={() => navigate(i)}
                        >
                            {/* Dot */}
                            <span
                                className="rounded-full block transition-all duration-300"
                                style={{
                                    width:      sizePx,
                                    height:     sizePx,
                                    background: isActive
                                        ? accent
                                        : isSkill
                                            ? "rgba(255,255,255,0.14)"
                                            : "rgba(255,255,255,0.28)",
                                    boxShadow: isActive
                                        ? `0 0 8px 2px ${accent}55`
                                        : "none",
                                }}
                            />

                            {/* Tooltip */}
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[11px] font-medium bg-black/90 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm border border-white/10 z-10">
                                {dot.label}
                            </span>
                        </button>

                        {showBottomDivider && (
                            <div className="w-px bg-white/10 my-1" style={{ height: 8 }} />
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
