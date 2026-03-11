"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, MoreVertical, Edit, FileText, Globe, Trash2, CheckCircle, XCircle } from "lucide-react";

export default function AdminPagesList() {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/pages`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error("Failed to fetch pages");
            const data = await res.json();
            setPages(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deletePage = async (id: string) => {
        if (!confirm("Are you sure you want to delete this page?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/pages/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                setPages(pages.filter(p => p._id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-slate-800 mb-1">Pages</h1>
                    <p className="text-slate-500">Manage dynamic pages and content.</p>
                </div>
                <Link href="/admin/pages/new" className="px-5 py-2.5 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-light transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" /> Create New Page
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
                    <div className="flex items-center gap-2">
                        <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-primary">
                            <option>All Status</option>
                            <option>Published</option>
                            <option>Draft</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search pages..."
                            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-primary w-full sm:w-64 transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="p-4 text-sm font-bold text-slate-600">Title</th>
                                <th className="p-4 text-sm font-bold text-slate-600">URL path</th>
                                <th className="p-4 text-sm font-bold text-slate-600">Status</th>
                                <th className="p-4 text-sm font-bold text-slate-600">Last Modified</th>
                                <th className="p-4 text-sm font-bold text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">Loading pages...</td>
                                </tr>
                            ) : pages.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">No pages found. Create your first page!</td>
                                </tr>
                            ) : (
                                pages.map((page) => (
                                    <tr key={page._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div className="font-bold text-slate-800">{page.title}</div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-600 text-sm">
                                            /p/{page.slug}
                                        </td>
                                        <td className="p-4">
                                            {page.status === 'published' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                                                    <CheckCircle className="w-3.5 h-3.5" /> Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                                                    <XCircle className="w-3.5 h-3.5" /> Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-slate-500 text-sm">
                                            {new Date(page.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <Link href={`/admin/pages/${page._id}`} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <a href={`/p/${page.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors" title="View Public">
                                                    <Globe className="w-4 h-4" />
                                                </a>
                                                <button onClick={() => deletePage(page._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
