"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export default function NewPageBuilder() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("<div className=\"py-24\"><div className=\"container mx-auto px-4\">\n  <h1 className=\"text-5xl font-serif font-bold text-primary mb-6\">New Page</h1>\n  <p className=\"text-slate-600 text-lg leading-relaxed\">Start writing your content here...</p>\n</div></div>");
    const [status, setStatus] = useState("draft");
    const [isSaving, setIsSaving] = useState(false);

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    };

    const handleSave = async () => {
        if (!title || !slug) {
            alert("Title and Slug are required.");
            return;
        }

        setIsSaving(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/pages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title, slug, content, status })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to save page");
            }

            // Redirect back to pages list
            router.push("/admin/pages");
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/pages" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-primary transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold font-serif text-slate-800 mb-1">Create New Page</h1>
                        <p className="text-sm text-slate-500">Draft your new dynamic page.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-primary"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-light transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isSaving ? "Saving..." : <><Save className="w-5 h-5" /> Save Page</>}
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Editor Content Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Page Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={handleTitleChange}
                                    className="w-full px-5 py-4 text-xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="Enter page title..."
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-bold text-slate-700">Page Content</label>
                                </div>
                                <RichTextEditor value={content} onChange={setContent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Setup */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                        <h3 className="font-bold font-serif text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
                            <LayoutTemplate className="w-4 h-4 text-primary" /> Page Properties
                        </h3>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">URL Slug</label>
                            <div className="flex items-center">
                                <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-slate-500 text-sm">/p/</span>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, ''))}
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-r-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Unique identifier for the URL.</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                        <h3 className="font-bold font-serif text-slate-800 pb-2 border-b border-slate-100">SEO Settings (Optional)</h3>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700">Meta Title</label>
                                <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700">Meta Description</label>
                                <textarea rows={3} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
