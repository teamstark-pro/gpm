"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function AdmissionPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Only show if user hasn't closed it in this session
        const hasClosed = sessionStorage.getItem("admissionPopupClosed");

        if (!hasClosed) {
            // Delay appearance for elegant intro
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("admissionPopupClosed", "true");
    };

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-primary-dark/60 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Popup Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
                    >
                        {/* Left Side: Image */}
                        <div className="hidden md:block md:w-5/12 relative bg-primary">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                                <span className="inline-block px-3 py-1 bg-secondary text-primary-dark text-xs font-bold rounded-full mb-3 tracking-widest uppercase">Now Open</span>
                                <h3 className="text-3xl font-serif font-bold leading-tight mb-2">Join GPM Academy</h3>
                                <p className="text-white/80 text-sm">16 Years of Excellence in Education</p>
                            </div>
                        </div>

                        {/* Right Side: Content */}
                        <div className="w-full md:w-7/12 p-8 md:p-12 relative flex flex-col">
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex-1 flex flex-col justify-center">
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Admissions 2026-2027</h2>
                                <p className="text-slate-600 mb-8 leading-relaxed">
                                    Give your child the gift of a premier education. We are now accepting applications for the upcoming academic year.
                                </p>

                                <div className="space-y-4 mb-8">
                                    {[
                                        { title: "Nursery", desc: "A strong foundation for our youngest learners." },
                                        { title: "LKG - UKG", desc: "Nurturing curiosity and essential social skills." },
                                        { title: "Classes 1 - 8", desc: "Comprehensive academic and holistic development." },
                                    ].map((item, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-secondary transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-slate-800 pr-2">{item.title}</span>
                                                <span className="text-sm text-slate-500 hidden sm:inline">— {item.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                    <Link
                                        href="/admissions"
                                        onClick={handleClose}
                                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-light transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Apply Now <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
