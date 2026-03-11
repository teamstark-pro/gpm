"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";

export function Footer() {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();
    const [socialLinks, setSocialLinks] = useState<{ facebook?: string; twitter?: string; instagram?: string; linkedin?: string }>({});

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/settings`)
            .then(r => r.ok ? r.json() : {})
            .then(data => setSocialLinks(data || {}))
            .catch(() => {});
    }, []);

    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="bg-primary-dark text-slate-300 pt-16 pb-8 border-t-[6px] border-t-secondary">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Col */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3 text-white">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary shrink-0">
                                <Image src="/img/logo.jpg" alt="GPM Educational Academy Logo" width={40} height={40} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif font-bold text-xl leading-tight">GPM Educational Academy</span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Excellence in education since 16 years. Nursery, LKG - UKG, & Grades 1 - 8. Nurturing the innovative leaders of tomorrow.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"><Facebook className="h-4 w-4" /></a>}
                            {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"><Twitter className="h-4 w-4" /></a>}
                            {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"><Instagram className="h-4 w-4" /></a>}
                            {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"><Linkedin className="h-4 w-4" /></a>}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-serif font-bold text-lg mb-6 flex items-center gap-2">
                            <div className="w-2 h-2 bg-secondary rounded-full" /> Quick Links
                        </h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-sm hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary" /> About Us</Link></li>
                            <li><Link href="/academics" className="text-sm hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary" /> Academics</Link></li>
                            <li><Link href="/admissions" className="text-sm hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary" /> Admissions</Link></li>
                            <li><Link href="/gallery" className="text-sm hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary" /> Media & Gallery</Link></li>
                            <li><Link href="/news" className="text-sm hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary" /> News & Events</Link></li>
                        </ul>
                    </div>

                    {/* Academics */}
                    <div>
                        <h4 className="text-white font-serif font-bold text-lg mb-6 flex items-center gap-2">
                            <div className="w-2 h-2 bg-secondary rounded-full" /> Programs
                        </h4>
                        <ul className="space-y-3">
                            <li><Link href="/academics" className="text-sm hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary" /> Kindergarten</Link></li>
                            <li><Link href="/academics" className="text-sm hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary" /> Primary School</Link></li>
                            <li><Link href="/academics" className="text-sm hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary" /> Middle School</Link></li>
                            <li><Link href="/academics" className="text-sm hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary" /> High School</Link></li>
                            <li><Link href="/academics" className="text-sm hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary" /> Advanced Placement (AP)</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-serif font-bold text-lg mb-6 flex items-center gap-2">
                            <div className="w-2 h-2 bg-secondary rounded-full" /> Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                                <span className="text-sm leading-relaxed">
                                    Nakaha Bashant Balpur<br />
                                    Gonda UP
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-secondary shrink-0" />
                                <span className="text-sm">9277084811</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-secondary shrink-0" />
                                <span className="text-sm">info@gpmacademy.edu</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>&copy; {currentYear} GPM Educational Academy. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/admin" className="hover:text-white transition-colors">Admin Login</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
