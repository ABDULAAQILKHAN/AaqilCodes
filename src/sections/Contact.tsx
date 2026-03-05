"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Github, Linkedin, Mail, Phone } from "lucide-react";

export default function Contact() {
    const container = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useGSAP(
        () => {
            gsap.from(".contact-elem", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%",
                },
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
            });
        },
        { scope: container }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setFormState({ name: "", email: "", message: "" });
            alert("Message sent! (Mock)");
        }, 1500);
    };

    return (
        <section ref={container} id="contact" className="relative py-24 md:py-32 w-full bg-neutral-950 flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10">

                {/* Text and Links Column */}
                <div className="flex flex-col gap-8">
                    <div className="contact-elem">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                            Let's create something <span className="text-white">extraordinary.</span>
                        </h2>
                        <p className="text-lg text-gray-400 font-light max-w-md">
                            Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>
                    </div>

                    <div className="contact-elem flex flex-col gap-4 mt-4">
                        <a href="mailto:aaqilkhan.work@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white group w-fit transition-colors">
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <Mail className="w-5 h-5" />
                            </div>
                            <span className="text-xl tracking-wide">aaqilkhan.work@gmail.com</span>
                        </a>
                    </div>

                    <div className="contact-elem flex gap-6 mt-8">
                        <a href="https://github.com/ABDULAAQILKHAN" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                            <Github className="w-6 h-6" />
                        </a>
                        <a href="https://www.linkedin.com/in/aaqil-khan-b45135170" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href="tel:+918989680289" className="text-gray-500 hover:text-white transition-colors">
                            <Phone className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                {/* Form Column */}
                <div className="contact-elem lg:pl-16">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md mx-auto lg:mx-0">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                className="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors"
                                placeholder="What's your name?"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                className="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors"
                                placeholder="hello@example.com"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                className="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 flex items-center justify-between bg-white text-black px-8 py-4 rounded-full font-bold tracking-wide hover:bg-gray-200 transition-colors disabled:opacity-70"
                        >
                            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </div>

            </div>

            {/* Abstract Background Element for Contact */}
            <div className="absolute -bottom-64 -right-64 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none z-0" />
        </section>
    );
}
