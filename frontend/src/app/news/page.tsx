import Link from "next/link";
import { Calendar, ArrowRight, BellRing } from "lucide-react";

export default function NewsPage() {
    const newsItems = [
        { title: "Annual International Science Innovation Fair", date: "October 12, 2025", type: "News", img: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=2069&auto=format&fit=crop", desc: "Our students took home top honors at this year's global science fair with groundbreaking projects in renewable energy. The exhibition saw participation from over 50 schools." },
        { title: "Varsity Basketball Team Secures State Championship", date: "September 28, 2025", type: "Sports", img: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop", desc: "In a thrilling final match, the GPM Knights emerged victorious to claim their third consecutive title. Captain John Doe led the scoring." },
        { title: "New Robotics Lab Inauguration", date: "September 15, 2025", type: "Campus", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop", desc: "State-of-the-art AI and Robotics lab inaugurated by the Mayor. The facility features 3D printers, CNC machines, and collaborative workspaces." },
    ];

    return (
        <div className="flex flex-col min-h-screen pt-24">
            {/* Hero Header */}
            <section className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 -skew-x-12 transform origin-top-right mix-blend-overlay" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
                    <BellRing className="w-12 h-12 text-secondary mb-6" />
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">News & Announcements</h1>
                    <p className="text-xl max-w-2xl mx-auto font-light text-slate-300">
                        Stay connected with the latest updates from our academy.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl flex flex-col lg:flex-row gap-12">

                    {/* News List */}
                    <div className="lg:w-2/3 space-y-12">
                        {newsItems.map((news, idx) => (
                            <article key={idx} className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col md:flex-row group cursor-pointer border border-slate-100">
                                <div className="md:w-2/5 aspect-video md:aspect-auto h-full overflow-hidden shrink-0">
                                    <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="p-8 md:p-10 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full">{news.type}</span>
                                        <span className="text-slate-500 text-sm flex items-center gap-1"><Calendar className="w-4 h-4" /> {news.date}</span>
                                    </div>
                                    <h2 className="text-2xl font-serif font-bold text-primary mb-4 group-hover:text-secondary transition-colors line-clamp-2">{news.title}</h2>
                                    <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">{news.desc}</p>
                                    <span className="text-primary font-semibold flex items-center gap-2 text-sm group-hover:text-secondary transition-colors mt-auto">
                                        Read Full Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </article>
                        ))}

                        {/* Pagination */}
                        <div className="flex justify-center gap-2 pt-8">
                            <button className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">1</button>
                            <button className="w-10 h-10 rounded-full bg-white text-slate-600 shadow-sm border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors">2</button>
                            <button className="w-10 h-10 rounded-full bg-white text-slate-600 shadow-sm border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors">3</button>
                        </div>
                    </div>

                    {/* Sidebar (Events Calendar) */}
                    <div className="lg:w-1/3">
                        <div className="bg-primary-dark rounded-3xl p-8 text-white sticky top-32 shadow-xl shadow-primary-dark/20 border-t-4 border-secondary">
                            <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                                <Calendar className="text-secondary w-6 h-6" /> Upcoming Events
                            </h3>

                            <div className="space-y-6">
                                {[
                                    { day: "15", month: "NOV", title: "Fall Admissions Open House", time: "09:00 AM - 02:00 PM" },
                                    { day: "22", month: "NOV", title: "Parent-Teacher Conferences", time: "04:00 PM - 07:00 PM" },
                                    { day: "05", month: "DEC", title: "Winter Choir Concert", time: "06:30 PM - 08:30 PM" },
                                ].map((event, idx) => (
                                    <div key={idx} className="flex gap-4 group cursor-pointer pb-6 border-b border-white/10 last:border-0 last:pb-0">
                                        <div className="w-14 h-14 shrink-0 bg-white/10 rounded-xl overflow-hidden flex flex-col border border-white/10 group-hover:bg-secondary group-hover:border-secondary transition-colors">
                                            <div className="bg-black/20 text-[10px] font-bold text-center py-1">{event.month}</div>
                                            <div className="flex-1 flex items-center justify-center font-bold text-xl">{event.day}</div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg leading-tight mb-1 group-hover:text-secondary transition-colors">{event.title}</h4>
                                            <p className="text-slate-400 text-sm">{event.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-8 py-3 bg-secondary text-primary-dark font-bold rounded-xl hover:bg-secondary-light transition-colors">
                                View Full Calendar
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
