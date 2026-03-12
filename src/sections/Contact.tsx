"use client"

import type React from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, MapPin } from "lucide-react"
import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
// const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const WELCOME_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_WELCOME_TEMPLATE_ID || "";

export default function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSending, setIsSending] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    // Reduced the intense scroll parallax effect to fit the layout better
    const y = useTransform(scrollYProgress, [0, 1], [50, -50])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) newErrors.name = "Name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
        if (!formData.message.trim()) newErrors.message = "Message is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(false); // Reset submission status on a new attempt
        if (!validateForm()) return;

        setIsSending(true);
        setErrors({}); // Clear previous submission errors

        // 2. Parameters for the welcome email (to the user)
        const welcomeParams = {
            from_name: formData.name,   // Used for the greeting, e.g., "Hi {{from_name}}"
            to_email: formData.email,
            message: formData.message,
        };

        try {
            // Send the second email (welcome message to user)
            await emailjs.send(SERVICE_ID, WELCOME_TEMPLATE_ID, welcomeParams, PUBLIC_KEY);

            setIsSubmitted(true);
            setFormData({ name: "", email: "", message: "" }); // Clear form on success

        } catch (error) {
            console.error("EmailJS send error:", error);
            setErrors({ submit: "Failed to send message. Please try again." });
        } finally {
            setIsSending(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" })
        }
    }

    return (
        <section id="contact" className="relative py-24 md:py-32 w-full bg-neutral-950 flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
            {/* Added background atmospheric lights from previous layout */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

            <div className="container mx-auto px-4 z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center mb-6">
                        <Mail className="w-8 h-8 text-white mr-4" />
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
                            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Connect</span>
                        </h2>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto">Ready to build something amazing together?</p>
                </motion.div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ y }}
                        className="space-y-8"
                    >
                        <div className="bg-white/5 dark:bg-black/40 backdrop-blur-xl ring-1 ring-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                            {/* Subtle glass shine */}
                            <div className="absolute top-0 left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full" />

                            <h3 className="text-3xl font-bold text-white mb-6">
                                Get In Touch
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light">
                                I'm always interested in hearing about new opportunities and exciting projects. Whether you have a
                                question or just want to say hi, feel free to reach out!
                            </p>

                            <div className="space-y-6">
                                <motion.a
                                    href="mailto:aaqilkhan.work@gmail.com"
                                    className="flex items-center p-4 bg-white/5 rounded-2xl ring-1 ring-white/5 hover:bg-white/10 hover:ring-white/20 transition-all duration-300 group"
                                    whileHover={{ scale: 1.02, x: 10 }}
                                >
                                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-5 group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300 shadow-lg">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-1">Email</p>
                                        <p className="text-gray-200 font-medium">aaqilkhan.work@gmail.com</p>
                                    </div>
                                </motion.a>

                                <motion.a
                                    href="tel:+918989680289"
                                    className="flex items-center p-4 bg-white/5 rounded-2xl ring-1 ring-white/5 hover:bg-white/10 hover:ring-white/20 transition-all duration-300 group"
                                    whileHover={{ scale: 1.02, x: 10 }}
                                >
                                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-5 group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300 shadow-lg">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-1">Phone</p>
                                        <p className="text-gray-200 font-medium">+91-8989680289</p>
                                    </div>
                                </motion.a>

                                <motion.div
                                    className="flex items-center p-4 bg-white/5 rounded-2xl ring-1 ring-white/5 hover:bg-white/10 transition-all duration-300 group"
                                    whileHover={{ scale: 1.02, x: 10 }}
                                >
                                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-5 shadow-lg">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-1">Location</p>
                                        <p className="text-gray-200 font-medium">Indore, Madhya Pradesh, India</p>
                                    </div>
                                </motion.div>

                                <div className="flex space-x-4 pt-6 mt-4 border-t border-white/10">
                                    <motion.a
                                        href="https://www.linkedin.com/in/aaqil-khan-b45135170"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 bg-white/5 ring-1 ring-white/10 rounded-xl hover:bg-blue-600 hover:ring-blue-600 transition-all duration-300"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Linkedin className="w-6 h-6 text-white" />
                                    </motion.a>
                                    <motion.a
                                        href="https://github.com/ABDULAAQILKHAN"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 bg-white/5 ring-1 ring-white/10 rounded-xl hover:bg-white/20 transition-all duration-300"
                                        whileHover={{ scale: 1.1, rotate: -5 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Github className="w-6 h-6 text-white" />
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white/5 dark:bg-black/40 backdrop-blur-xl ring-1 ring-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
                    >
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-16"
                            >
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                                    <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                                </motion.div>
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    Message Sent!
                                </h3>
                                <p className="text-gray-400 text-lg mb-8 font-light">Thank you for reaching out. I'll get back to you soon.</p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 ring-1 ring-white/20"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-5 py-4 bg-black/40 border rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-600 backdrop-blur-sm shadow-inner ${errors.name ? "border-red-500" : "border-white/10"
                                            }`}
                                        placeholder="Your name"
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-400 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-400" />{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-5 py-4 bg-black/40 border rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-600 backdrop-blur-sm shadow-inner ${errors.email ? "border-red-500" : "border-white/10"
                                            }`}
                                        placeholder="hello@example.com"
                                    />
                                    {errors.email && <p className="mt-2 text-sm text-red-400 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-400" />{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full px-5 py-4 bg-black/40 border rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-600 backdrop-blur-sm resize-none shadow-inner ${errors.message ? "border-red-500" : "border-white/10"
                                            }`}
                                        placeholder="Tell me about your project..."
                                    />
                                    {errors.message && <p className="mt-2 text-sm text-red-400 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-400" />{errors.message}</p>}

                                    {errors.submit && (
                                        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">
                                            {errors.submit}
                                        </div>
                                    )}
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSending}
                                    className="w-full flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                                    whileHover={!isSending ? { scale: 1.02 } : {}}
                                    whileTap={!isSending ? { scale: 0.98 } : {}}
                                >
                                    <span>{isSending ? "Sending..." : "Send Message"}</span>
                                    {!isSending && <Send className="w-5 h-5 ml-2" />}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
