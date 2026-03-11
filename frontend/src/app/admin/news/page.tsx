import { Plus, Search, Filter, Edit3, Trash2 } from "lucide-react";

export default function NewsAdminPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-slate-800 mb-1">News & Articles</h1>
                    <p className="text-slate-500">Manage public announcements and school events.</p>
                </div>
                <button className="px-5 py-2.5 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-light transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" /> Compose Article
                </button>
            </div>

            {/* Filters/Search */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 focus-within:border-primary flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 mr-2" />
                    <input type="text" placeholder="Search articles..." className="bg-transparent border-none outline-none w-full text-sm" />
                </div>
                <div className="flex gap-2">
                    <select className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 bg-white cursor-pointer outline-none">
                        <option>All Types</option>
                        <option>News</option>
                        <option>Event</option>
                    </select>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Science Fair Winners Announced", type: "News", date: "Oct 12, 2025", author: "Dr. Smith", status: "Published" },
                    { title: "Varsity Basketball Finals", type: "Sports", date: "Oct 10, 2025", author: "Coach Davis", status: "Published" },
                    { title: "Fall Open House Details", type: "Event", date: "Oct 05, 2025", author: "Admin", status: "Published" },
                    { title: "New Library Policy Integration", type: "Notice", date: "Oct 01, 2025", author: "Admin", status: "Draft" },
                ].map((article, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                        <div className="h-40 bg-slate-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-multiply transition-transform group-hover:scale-105 duration-700" />
                            <div className="absolute top-3 left-3 flex gap-2">
                                <span className="px-3 py-1 bg-white/90 backdrop-blur text-primary text-xs font-bold rounded-full">{article.type}</span>
                                {article.status === 'Draft' && <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">Draft</span>}
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold font-serif text-slate-800 mb-2 line-clamp-2">{article.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                                <span>{article.date}</span>
                                <span>•</span>
                                <span>By {article.author}</span>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                                <button className="text-slate-500 hover:text-primary text-sm font-semibold flex items-center gap-1 transition-colors">
                                    <Edit3 className="w-4 h-4" /> Edit
                                </button>
                                <button className="text-slate-400 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
