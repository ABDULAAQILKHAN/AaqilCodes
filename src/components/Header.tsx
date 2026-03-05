"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "py-4 bg-black/50 backdrop-blur-md border-b border-white/10" : "py-6 bg-transparent"
            )}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tighter text-white">
                    AAQIL.
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
                    <Link href="#projects" className="text-sm text-gray-400 hover:text-white transition-colors">Projects</Link>
                    <Link href="#experience" className="text-sm text-gray-400 hover:text-white transition-colors">Experience</Link>
                    <Link href="#contact" className="text-sm text-black bg-white px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">Get in touch</Link>
                </nav>
            </div>
        </header>
    );
}
