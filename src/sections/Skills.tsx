"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const COMPETENCIES = [
    {
        id: "frontend",
        title: "Frontend",
        subtitle: "Development",
        gradient: "from-cyan-400 via-blue-500 to-indigo-500",
        accentColor: "#06b6d4",
        bgRadial: "rgba(6,182,212,0.10)",
        description:
            "Crafting pixel-perfect, performant interfaces with immersive animations and cutting-edge web technologies.",
        concepts: [
            "Component Architecture", "State Management", "Responsive Design",
            "Web Accessibility", "Performance & Core Web Vitals", "SEO Optimization",
            "Progressive Web Apps", "Animation & Motion Design", "Build Tooling", "Web APIs",
        ],
        skills: [
            { name: "React.js",      color: "from-cyan-400 to-blue-500" },
            { name: "Next.js",       color: "from-gray-300 to-gray-500" },
            { name: "TypeScript",    color: "from-blue-400 to-blue-600" },
            { name: "Tailwind CSS",  color: "from-teal-400 to-cyan-500" },
            { name: "Redux Toolkit", color: "from-purple-400 to-purple-600" },
            { name: "GSAP",          color: "from-green-400 to-emerald-500" },
            { name: "Framer Motion", color: "from-pink-400 to-rose-500" },
            { name: "Three.js",      color: "from-blue-500 to-indigo-600" },
            { name: "Vite",          color: "from-yellow-400 to-orange-500" },
            { name: "HTML5 / CSS3",  color: "from-orange-400 to-red-500" },
        ],
    },
    {
        id: "backend",
        title: "Backend",
        subtitle: "Development",
        gradient: "from-emerald-400 via-green-500 to-teal-600",
        accentColor: "#10b981",
        bgRadial: "rgba(16,185,129,0.10)",
        description:
            "Building robust, scalable server-side architectures with clean API design and efficient data pipelines.",
        concepts: [
            "RESTful API Design", "GraphQL", "JWT & OAuth 2.0",
            "Middleware Pipelines", "WebSockets & Real-time", "Rate Limiting & Throttling",
            "Server-side Caching", "SSR & SSG", "Microservices Architecture", "Message Queues",
        ],
        skills: [
            { name: "Node.js",    color: "from-green-500 to-lime-500" },
            { name: "NestJS",     color: "from-red-400 to-pink-500" },
            { name: "FastAPI",    color: "from-green-400 to-emerald-500" },
            { name: "Express.js", color: "from-gray-300 to-gray-500" },
            { name: "Python",     color: "from-yellow-400 to-blue-500" },
            { name: "Socket.io",  color: "from-gray-300 to-gray-500" },
            { name: "Redis",      color: "from-red-500 to-rose-600" },
            { name: "Nginx",      color: "from-green-500 to-green-700" },
            { name: "tRPC",       color: "from-blue-400 to-indigo-500" },
        ],
    },
    {
        id: "cybersecurity",
        title: "Cyber",
        subtitle: "Security",
        gradient: "from-red-500 via-rose-500 to-orange-500",
        accentColor: "#ef4444",
        bgRadial: "rgba(239,68,68,0.10)",
        description:
            "Securing systems, networks, and industrial infrastructure through proactive defense, SCADA hardening, and secure-by-design development.",
        concepts: [
            "SCADA / ICS Security", "Network Security", "Secure Development (SSDLC)",
            "Penetration Testing", "Vulnerability Assessment", "OWASP Top 10",
            "Zero Trust Architecture", "Incident Response", "Cryptography & PKI", "Compliance & Governance",
        ],
        skills: [
            { name: "Wireshark",     color: "from-blue-400 to-indigo-500" },
            { name: "Nmap / Nessus", color: "from-green-400 to-emerald-500" },
            { name: "Burp Suite",    color: "from-orange-400 to-red-500" },
            { name: "Metasploit",    color: "from-red-500 to-rose-600" },
            { name: "SCADA / ICS",   color: "from-yellow-400 to-orange-500" },
            { name: "Kali Linux",    color: "from-gray-300 to-gray-500" },
            { name: "Firewalls / VPN", color: "from-blue-500 to-indigo-600" },
            { name: "SSL / TLS",     color: "from-green-500 to-teal-600" },
            { name: "OWASP ZAP",     color: "from-purple-400 to-violet-500" },
            { name: "Snort / Zeek",  color: "from-red-400 to-rose-500" },
        ],
    },
    {
        id: "devops",
        title: "DevOps",
        subtitle: "& Infrastructure",
        gradient: "from-sky-400 via-blue-500 to-cyan-500",
        accentColor: "#0ea5e9",
        bgRadial: "rgba(14,165,233,0.10)",
        description:
            "Streamlining software delivery through automation, container orchestration, and cloud-native infrastructure as code.",
        concepts: [
            "Infrastructure as Code", "Container Orchestration", "CI/CD Automation",
            "Monitoring & Observability", "Log Aggregation", "Service Mesh",
            "Blue-Green Deployments", "Auto-scaling", "DevSecOps", "Config Management",
        ],
        skills: [
            { name: "Docker",          color: "from-blue-400 to-cyan-500" },
            { name: "Kubernetes",      color: "from-blue-500 to-indigo-600" },
            { name: "GitHub Actions",  color: "from-gray-300 to-gray-500" },
            { name: "Terraform",       color: "from-violet-400 to-purple-500" },
            { name: "Ansible",         color: "from-red-500 to-rose-600" },
            { name: "AWS / GCP",       color: "from-orange-400 to-amber-500" },
            { name: "Prometheus",      color: "from-orange-500 to-red-500" },
            { name: "Grafana",         color: "from-orange-400 to-yellow-500" },
            { name: "ArgoCD",          color: "from-pink-400 to-rose-500" },
            { name: "Nginx / Traefik", color: "from-green-500 to-teal-600" },
        ],
    },
    {
        id: "databases",
        title: "Databases",
        subtitle: "& Data Layer",
        gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
        accentColor: "#8b5cf6",
        bgRadial: "rgba(139,92,246,0.10)",
        description:
            "Designing efficient data architectures with expertise in relational, NoSQL, and in-memory storage solutions.",
        concepts: [
            "Relational Data Modeling", "Schema Design & Migrations", "Query Optimization",
            "Indexing Strategies", "ACID Transactions", "ORM & ODM",
            "Database Replication", "Backup & Recovery", "Connection Pooling", "Data Normalization",
        ],
        skills: [
            { name: "PostgreSQL",    color: "from-blue-500 to-indigo-600" },
            { name: "MongoDB",       color: "from-green-500 to-emerald-600" },
            { name: "Redis",         color: "from-red-500 to-rose-600" },
            { name: "Prisma ORM",    color: "from-indigo-400 to-violet-500" },
            { name: "SQLAlchemy",    color: "from-red-400 to-orange-500" },
            { name: "TypeORM",       color: "from-orange-400 to-amber-500" },
            { name: "MySQL",         color: "from-blue-400 to-cyan-500" },
            { name: "Elasticsearch", color: "from-yellow-400 to-amber-500" },
        ],
    },
    {
        id: "agile",
        title: "Agile",
        subtitle: "Development",
        gradient: "from-orange-400 via-amber-500 to-yellow-400",
        accentColor: "#f97316",
        bgRadial: "rgba(249,115,22,0.10)",
        description:
            "Delivering value through iterative development, collaborative workflows, and battle-tested engineering practices.",
        concepts: [
            "Scrum & Kanban", "Sprint Planning & Retrospectives", "User Story Mapping",
            "Test-Driven Development", "Code Review Culture", "CI/CD Pipelines",
            "Pair Programming", "Story Point Estimation", "Definition of Done", "Release Planning",
        ],
        skills: [
            { name: "Git / GitHub",   color: "from-orange-400 to-red-500" },
            { name: "Docker",         color: "from-blue-400 to-cyan-500" },
            { name: "GitHub Actions", color: "from-gray-300 to-gray-500" },
            { name: "Jest & Testing", color: "from-red-400 to-rose-500" },
            { name: "Linux",          color: "from-yellow-400 to-orange-500" },
            { name: "CI/CD",          color: "from-blue-400 to-indigo-500" },
            { name: "Postman / REST", color: "from-orange-400 to-amber-500" },
            { name: "Jira / Linear",  color: "from-blue-500 to-indigo-600" },
        ],
    },
    {
        id: "communication",
        title: "Communication",
        subtitle: "& Collaboration",
        gradient: "from-pink-400 via-rose-500 to-red-500",
        accentColor: "#ec4899",
        bgRadial: "rgba(236,72,153,0.10)",
        description:
            "Bridging technical complexity with human understanding through clear, empathetic, impactful communication.",
        concepts: [
            "Technical Documentation", "Code Review Culture", "Stakeholder Management",
            "Async-first Communication", "Presentation & Demo Skills", "Cross-team Collaboration",
            "Mentoring & Knowledge Transfer", "Active Listening", "Conflict Resolution", "Written Communication",
        ],
        skills: [
            { name: "Notion",           color: "from-gray-300 to-gray-500" },
            { name: "Figma",            color: "from-pink-400 to-rose-500" },
            { name: "Slack",            color: "from-purple-400 to-indigo-500" },
            { name: "Loom",             color: "from-violet-400 to-purple-500" },
            { name: "Confluence",       color: "from-blue-400 to-indigo-500" },
            { name: "Technical Writing",color: "from-gray-400 to-gray-600" },
        ],
    },
    {
        id: "quicklearning",
        title: "Quick",
        subtitle: "Learning",
        gradient: "from-yellow-300 via-amber-400 to-orange-500",
        accentColor: "#eab308",
        bgRadial: "rgba(234,179,8,0.10)",
        description:
            "Rapidly mastering emerging technologies through first-principles thinking and a relentless growth mindset.",
        concepts: [
            "Adaptability & Flexibility", "Self-directed Learning", "Pattern Recognition",
            "First-principles Thinking", "Deep Research Skills", "Framework-agnostic Mindset",
            "Open Source Contribution", "Rapid Prototyping", "Knowledge Synthesis", "Growth Mindset",
        ],
        skills: [
            { name: "OpenAI API",      color: "from-emerald-400 to-teal-500" },
            { name: "LangChain",       color: "from-green-400 to-emerald-500" },
            { name: "System Design",   color: "from-violet-400 to-purple-500" },
            { name: "Cloud (AWS/GCP)", color: "from-orange-400 to-amber-500" },
            { name: "Microservices",   color: "from-pink-400 to-rose-500" },
            { name: "AI/ML Integration",color: "from-blue-400 to-indigo-500" },
        ],
    },
] as const;

// Positions along the left and right edges — never overlapping the centre
const FLOAT_POSITIONS: React.CSSProperties[] = [
    { top: "8%",  left: "1%" },  { top: "8%",  right: "1%" },
    { top: "20%", left: "6%" },  { top: "20%", right: "6%" },
    { top: "33%", left: "1%" },  { top: "33%", right: "1%" },
    { top: "46%", left: "5%" },  { top: "46%", right: "5%" },
    { top: "59%", left: "1%" },  { top: "59%", right: "1%" },
    { top: "72%", left: "6%" },  { top: "72%", right: "6%" },
    { top: "84%", left: "1%" },  { top: "84%", right: "1%" },
    { top: "92%", left: "7%" },  { top: "92%", right: "7%" },
];

// ─────────────────────────────────────────────────────────────
// FloatingSkillTag
// ─────────────────────────────────────────────────────────────
function FloatingSkillTag({
    name, color, style, dur, delay, isMobile,
}: {
    name: string; color: string; style: React.CSSProperties;
    dur: number; delay: number; isMobile: boolean;
}) {
    const tagRef  = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (isMobile) return;
        const tag  = tagRef.current;
        const wrap = wrapRef.current;
        if (!tag || !wrap) return;
        const xTo = gsap.quickTo(tag, "x", { duration: 0.9, ease: "elastic.out(1,0.35)" });
        const yTo = gsap.quickTo(tag, "y", { duration: 0.9, ease: "elastic.out(1,0.35)" });
        const onMove  = (e: MouseEvent) => {
            const r = wrap.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width  / 2)) * 0.4);
            yTo((e.clientY - (r.top  + r.height / 2)) * 0.4);
        };
        const onLeave = () => { xTo(0); yTo(0); };
        wrap.addEventListener("mousemove",  onMove);
        wrap.addEventListener("mouseleave", onLeave);
        return () => {
            wrap.removeEventListener("mousemove",  onMove);
            wrap.removeEventListener("mouseleave", onLeave);
        };
    }, [isMobile]);

    return (
        <div ref={wrapRef} className="absolute select-none touch-manipulation" style={style}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div ref={tagRef}
                className={`relative px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium
                    backdrop-blur-sm border cursor-pointer will-change-transform transition-colors duration-300
                    ${hovered
                        ? `bg-gradient-to-r ${color} text-white border-transparent shadow-lg`
                        : "bg-neutral-900/60 border-white/10 text-gray-500"}`}
                style={{ animation: `skillFloat ${dur}s ease-in-out infinite`, animationDelay: `${delay}s` }}>
                {name}
                {hovered && <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-20 blur-md -z-10`} />}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// AnimatedCounter
// ─────────────────────────────────────────────────────────────
function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            obs.disconnect();
            let v = 0;
            const inc = end / (duration * 60);
            const t = setInterval(() => {
                v += inc;
                if (v >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(v));
            }, 1000 / 60);
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [end, duration]);
    return <span ref={ref}>{count}</span>;
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────
export default function Skills() {
    const outerRef  = useRef<HTMLDivElement>(null);
    const innerRef  = useRef<HTMLDivElement>(null);
    const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    // ── Scroll engine ──────────────────────────────────────────
    //
    // ROOT CAUSE of the previous bug: `position: sticky` is silently
    // broken by `body { overflow-x: hidden }` in many browsers
    // (the body becomes the scroll container, sticky never fires).
    //
    // FIX: use `position: fixed` for the inner container.
    // Fixed is always relative to the viewport — immune to any
    // ancestor overflow, will-change, or transform quirks.
    //
    // The outer div (600 vh) still provides the scroll distance.
    // We show the fixed container only while that outer div is
    // in the "active" scroll window, and hide it otherwise so it
    // doesn't cover unrelated sections.
    // ────────────────────────────────────────────────────────────
    useEffect(() => {
        const outer = outerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner) return;

        // Wait one frame so all panelRefs are mounted
        const raf = requestAnimationFrame(() => {
            const panels = panelRefs.current.filter((p): p is HTMLDivElement => !!p);
            if (!panels.length) return;
            const n = panels.length;

            // ── Set initial state synchronously ──
            // Panel 0 visible at y=0; all others below viewport
            panels.forEach((p, i) =>
                gsap.set(p, { yPercent: i === 0 ? 0 : 100, opacity: 1, force3D: true })
            );
            // Overlay starts hidden
            inner.style.visibility = "hidden";
            inner.style.opacity    = "0";

            let snapTimer: ReturnType<typeof setTimeout>;
            let isSnapping = false;

            // Fade zone at entry/exit:
            // keep it short so the first skills panel appears quickly,
            // especially on mobile where long fade windows feel like blank space.
            const FADE_PX = window.innerWidth < 768 ? 64 : 110;

            // ── Per-frame tick (runs every rAF via GSAP ticker) ──
            const tick = () => {
                const rect        = outer.getBoundingClientRect();
                const outerH      = outer.offsetHeight;
                const winH        = window.innerHeight;
                const totalTravel = outerH - winH;
                if (totalTravel <= 0) return;

                const scrolled = -rect.top;

                // ── Compute overlay opacity with smooth fade at entry / exit ──
                let overlayOpacity = 0;
                if (scrolled >= 0 && scrolled <= totalTravel) {
                    const fadeIn  = Math.min(1, scrolled / FADE_PX);
                    const fadeOut = Math.min(1, (totalTravel - scrolled) / FADE_PX);
                    overlayOpacity = Math.min(fadeIn, fadeOut);
                }

                if (overlayOpacity <= 0) {
                    if (inner.style.visibility !== "hidden") {
                        inner.style.visibility = "hidden";
                        inner.style.opacity    = "0";
                    }
                    return;
                }

                inner.style.visibility = "visible";
                inner.style.opacity    = String(overlayOpacity);
                inner.style.pointerEvents = overlayOpacity > 0.15 ? "auto" : "none";

                // ── Compute progress ──
                const progress = Math.max(0, Math.min(1, scrolled / totalTravel));
                const fp = progress * (n - 1);
                const ci = Math.min(Math.floor(fp), n - 2);
                const tp = fp - ci;

                // ── Update each panel ──
                panels.forEach((panel, i) => {
                    if (i < ci) {
                        // Already passed — resting invisibly above
                        gsap.set(panel, { yPercent: -15, opacity: 0, zIndex: 0 });
                    } else if (i === ci) {
                        // Exiting with parallax: drifts up slowly (0 → -15 %)
                        // Still visible behind the incoming panel → no blank gap
                        gsap.set(panel, {
                            yPercent: tp * -15,
                            opacity:  1 - tp * 0.9,
                            zIndex:   1,
                        });
                    } else if (i === ci + 1) {
                        // Entering: full-height slide from below
                        gsap.set(panel, {
                            yPercent: (1 - tp) * 100,
                            opacity:  1,
                            zIndex:   2,
                        });
                    } else {
                        // Not yet reached
                        gsap.set(panel, { yPercent: 100, opacity: 1, zIndex: 0 });
                    }
                });
            };

            gsap.ticker.add(tick);
            tick(); // run once immediately

            // ── Scroll-end snap ──
            // Fires 200 ms after scrolling stops inside the section.
            // window.scrollTo is intercepted by Lenis for smooth easing.
            const onScroll = () => {
                if (isSnapping) return;
                clearTimeout(snapTimer);
                snapTimer = setTimeout(() => {
                    const r2 = outer.getBoundingClientRect();
                    const travel = outer.offsetHeight - window.innerHeight;
                    const sc = -r2.top;
                    if (sc < 0 || sc > travel) return;      // outside section

                    const fp2  = (sc / travel) * (n - 1);
                    const near = Math.round(fp2);
                    if (Math.abs(fp2 - near) < 0.04) return; // already snapped

                    const targetY = outer.offsetTop + (near / (n - 1)) * travel;
                    isSnapping = true;
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                    setTimeout(() => { isSnapping = false; }, 1600);
                }, 200);
            };

            window.addEventListener("scroll", onScroll, { passive: true });

            // Store cleanup on the outer element so it survives React's ref
            (outer as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
                gsap.ticker.remove(tick);
                window.removeEventListener("scroll", onScroll);
                clearTimeout(snapTimer);
            };
        });

        return () => {
            cancelAnimationFrame(raf);
            const outer2 = outerRef.current;
            (outer2 as HTMLElement & { _cleanup?: () => void })?._cleanup?.();
        };
    }, []);

    const n = COMPETENCIES.length;

    return (
        <>
            <style>{`
                @keyframes skillFloat {
                    0%,100% { transform: translateY(0px)   translateX(0px); }
                    25%      { transform: translateY(-10px) translateX(4px);  }
                    50%      { transform: translateY(-5px)  translateX(-3px); }
                    75%      { transform: translateY(-14px) translateX(6px);  }
                }
            `}</style>

            {/* ── Outer div — provides the 600 vh scroll distance ── */}
            <div ref={outerRef} id="skills" style={{ height: `${n * 100}vh` }} className="relative" />

            {/*
             * ── Fixed overlay — the actual visual content ──
             *
             * position: fixed is ALWAYS relative to the viewport.
             * It cannot be broken by body overflow-x: hidden,
             * will-change: transform on ancestors, or depth-scroll
             * z-index games — unlike position: sticky.
             *
             * z-index: 40 sits above DepthScroll sections (max ~4)
             * but below the fixed Header (z-50).
             */}
            <div
                ref={innerRef}
                style={{
                    position:   "fixed",
                    inset:      0,
                    height:     "100dvh",   // dynamic viewport height — correct on mobile too
                    zIndex:     40,
                    visibility: "hidden",   // JS reveals it when section is in view
                    overflow:   "hidden",
                }}
            >
                {/* Panels */}
                {COMPETENCIES.map((comp, i) => (
                    <div
                        key={comp.id}
                        ref={(el) => { panelRefs.current[i] = el; }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform"
                        style={{ zIndex: 0 }}
                    >
                        {/* Base */}
                        <div className="absolute inset-0 bg-black" />

                        {/* Radial accent glow */}
                        <div className="absolute inset-0 pointer-events-none"
                            style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${comp.bgRadial}, transparent 70%)` }} />

                        {/* Top / bottom accent lines */}
                        <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
                            style={{ background: `linear-gradient(90deg,transparent,${comp.accentColor}80,transparent)` }} />
                        <div className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
                            style={{ background: `linear-gradient(90deg,transparent,${comp.accentColor}40,transparent)` }} />

                        {/* Floating skill tags around the periphery */}
                        {comp.skills.map((skill, si) => (
                            <FloatingSkillTag
                                key={skill.name}
                                name={skill.name}
                                color={skill.color}
                                style={FLOAT_POSITIONS[si % FLOAT_POSITIONS.length]}
                                dur={7 + (si % 4) * 1.5}
                                delay={si * 0.4}
                                isMobile={isMobile}
                            />
                        ))}

                        {/* ── Centre content ── */}
                        <div className="relative z-10 text-center px-8 md:px-28 lg:px-44 max-w-6xl mx-auto select-none">

                            {/* Counter badge */}
                            <p className="text-xs text-gray-600 uppercase tracking-[0.5em] mb-4 font-mono">
                                {String(i + 1).padStart(2, "0")} &mdash; {String(n).padStart(2, "0")}
                            </p>

                            {/* Main title */}
                            <h2 className="font-bold tracking-tight leading-[0.85] mb-2"
                                style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}>
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${comp.gradient}`}>
                                    {comp.title}
                                </span>
                            </h2>

                            {/* Subtitle */}
                            <h3 className="font-light text-white/50 mb-6 tracking-widest"
                                style={{ fontSize: "clamp(1rem, 2.5vw, 2rem)" }}>
                                {comp.subtitle}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed text-sm md:text-base">
                                {comp.description}
                            </p>

                            {/* Concept pills */}
                            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                                {comp.concepts.map((concept) => (
                                    <span key={concept}
                                        className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-gray-400 text-[10px] md:text-xs font-medium hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default">
                                        {concept}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Large ghost number */}
                        <div className="absolute right-8 bottom-20 font-bold text-white/[0.025] pointer-events-none select-none leading-none"
                            style={{ fontSize: "clamp(5rem, 18vw, 14rem)" }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                    </div>
                ))}

                {/* ── Stats bar (bottom gradient strip) ── */}
                <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}>
                    <div className="flex justify-center gap-6 md:gap-14 py-4 px-4">
                        {[
                            { end: 4,  label: "Years Exp",    suffix: "+" },
                            { end: 50, label: "Projects",     suffix: "+" },
                            { end: 30, label: "Technologies", suffix: "+" },
                            { end: 25, label: "Latency Cut",  suffix: "%" },
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="text-lg md:text-2xl font-bold text-white tabular-nums">
                                    <AnimatedCounter end={s.end} />{s.suffix}
                                </div>
                                <div className="text-[9px] md:text-[10px] text-gray-600 uppercase tracking-widest mt-0.5">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Scroll hint (static — always visible, fades with overlay) ── */}
                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-30">
                    <span className="text-[9px] tracking-[0.4em] uppercase text-gray-600">scroll</span>
                    <div className="w-px h-7 bg-gradient-to-b from-white/20 to-transparent" />
                </div>
            </div>
        </>
    );
}
