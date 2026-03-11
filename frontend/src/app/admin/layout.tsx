"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        } else if (pathname !== "/admin") {
            router.push("/admin");
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/admin");
    };

    // If we are exactly on /admin, we show just the login page (no sidebar)
    if (pathname === "/admin") {
        return <>{children}</>;
    }

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: "Pages", href: "/admin/pages", icon: <FileText className="w-5 h-5" /> },
        { name: "Forms & Admissions", href: "/admin/forms", icon: <FileText className="w-5 h-5" /> },
        { name: "News & Articles", href: "/admin/news", icon: <FileText className="w-5 h-5" /> },
        { name: "Media Library", href: "/admin/media", icon: <ImageIcon className="w-5 h-5" /> },
        { name: "Settings", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden lg:flex flex-col bg-primary-dark text-white transition-all duration-300 h-screen sticky top-0",
                    sidebarOpen ? "w-72" : "w-20"
                )}
            >
                <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-secondary text-primary-dark flex items-center justify-center shrink-0">
                            <GraduationCap className="h-6 w-6" />
                        </div>
                        <div className={cn("flex flex-col transition-all duration-300 whitespace-nowrap", sidebarOpen ? "opacity-100" : "opacity-0 w-0 hidden")}>
                            <span className="font-serif font-bold text-lg leading-tight tracking-tight">GPM ACADEMY</span>
                            <span className="text-[9px] tracking-widest uppercase opacity-70">Admin Portal</span>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 py-8 overflow-y-auto overflow-x-hidden scrollbar-thin">
                    <ul className="space-y-2 px-4">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                                            isActive
                                                ? "bg-secondary text-primary-dark font-bold shadow-lg"
                                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                        )}
                                        title={!sidebarOpen ? item.name : undefined}
                                    >
                                        <div className={cn("shrink-0", isActive ? "text-primary-dark" : "text-slate-400 group-hover:text-white")}>
                                            {item.icon}
                                        </div>
                                        <span className={cn("whitespace-nowrap transition-all duration-300", sidebarOpen ? "opacity-100" : "opacity-0 w-0 hidden")}>
                                            {item.name}
                                        </span>

                                        {/* Tooltip for collapsed state */}
                                        {!sidebarOpen && (
                                            <div className="absolute left-16 bg-white text-primary px-3 py-1 rounded shadow-xl text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                                {item.name}
                                            </div>
                                        )}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="p-4 border-t border-white/10 shrink-0">
                    <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span className={cn("whitespace-nowrap transition-all duration-300 font-medium", sidebarOpen ? "opacity-100" : "opacity-0 w-0 hidden")}>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Topnav */}
                <header className="h-20 bg-white shadow-sm border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 z-20 shrink-0 sticky top-0">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Toggle */}
                        <button className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg" onClick={() => setMobileMenuOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Desktop Sidebar Toggle */}
                        <button className="hidden lg:flex p-2 text-slate-400 hover:bg-slate-100 rounded-lg hover:text-slate-700 transition-colors" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Global Search Placeholder */}
                        <div className="hidden md:flex items-center bg-slate-100 px-4 py-2 rounded-full w-96 border border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all">
                            <Search className="w-4 h-4 text-slate-400 mr-2" />
                            <input type="text" placeholder="Search forms, students, news..." className="bg-transparent border-none outline-none w-full text-sm text-slate-700" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-bold text-slate-700">{user?.name || "Admin User"}</span>
                                <span className="text-xs text-slate-500 text-primary">{user?.role || "Admin"}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
                                {user?.name ? user.name.charAt(0).toUpperCase() : "AD"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-4 lg:p-8">
                    {children}
                </div>
            </main>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div className="fixed inset-0 bg-primary-dark/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
                    <aside className="relative w-72 bg-primary-dark h-full flex flex-col text-white shadow-2xl animate-in slide-in-from-left duration-300">
                        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-secondary text-primary-dark flex items-center justify-center shrink-0">
                                    <GraduationCap className="h-5 w-5" />
                                </div>
                                <span className="font-serif font-bold text-lg">Admin Portal</span>
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)} className="text-white/50 hover:text-white p-2">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-1 py-8 overflow-y-auto">
                            <ul className="space-y-2 px-4">
                                {navItems.map((item) => {
                                    const isActive = pathname.startsWith(item.href);
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                                                    isActive ? "bg-secondary text-primary-dark font-bold" : "text-slate-400 hover:bg-white/10 hover:text-white"
                                                )}
                                            >
                                                {item.icon} {item.name}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="p-6 border-t border-white/10">
                            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-red-400 font-medium">
                                <LogOut className="w-5 h-5" /> Sign Out
                            </Link>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
}
