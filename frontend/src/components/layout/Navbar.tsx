"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Admissions", href: "/admissions" },
    { name: "Gallery", href: "/gallery" },
    { name: "News & Events", href: "/news" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (pathname.startsWith("/admin")) return null;

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                (isScrolled || pathname !== "/")
                    ? "bg-white shadow-md py-3 text-slate-800"
                    : "bg-transparent py-5 text-white"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary shrink-0">
                            <Image src="/img/logo.jpg" alt="GPM Educational Academy Logo" width={40} height={40} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif font-bold text-xl leading-tight tracking-tight">GPM Educational Academy</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-secondary",
                                    (isScrolled || pathname !== "/") ? "text-slate-600 hover:text-primary" : "text-white/90 hover:text-white"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/admissions"
                            className={cn(
                                "px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 active:scale-95",
                                (isScrolled || pathname !== "/")
                                    ? "bg-primary text-white hover:bg-primary-light hover:shadow-lg shadow-primary/20"
                                    : "bg-white text-primary hover:bg-slate-50 hover:shadow-lg shadow-white/20"
                            )}
                        >
                            Apply Now
                        </Link>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className={cn("h-6 w-6", (isScrolled || pathname !== "/") ? "text-slate-800" : "text-white")} />
                        ) : (
                            <Menu className={cn("h-6 w-6", (isScrolled || pathname !== "/") ? "text-slate-800" : "text-white")} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-primary z-40 lg:hidden flex flex-col justify-center px-6 transition-all duration-300 ease-in-out",
                    mobileMenuOpen ? "opacity-100 visible h-screen" : "opacity-0 invisible h-0"
                )}
            >
                <div className="absolute top-6 right-6">
                    <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2">
                        <X className="h-8 w-8" />
                    </button>
                </div>
                <nav className="flex flex-col gap-6 text-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-2xl font-serif text-white/80 hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="mt-8">
                        <Link
                            href="/admissions"
                            className="inline-block bg-secondary text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-secondary-light transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Apply Now
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
