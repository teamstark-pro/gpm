"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, LayoutTemplate, Globe } from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export default function EditPageBuilder() {
    const router = useRouter();
    const params = useParams();
    const pageId = params.id as string;

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("draft");
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/pages`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                const page = data.find((p: any) => p._id === pageId);
                if (page) {
                    setTitle(page.title);
                    setSlug(page.slug);
                    setContent(page.content);
                    setStatus(page.status);
                }
            } catch (error) {
                console.error(error);
                alert("Could not load page details.");
            } finally {
                setIsLoading(false);
            }
        };

        if (pageId) {
            fetchPage();
        }
    }, [pageId]);

    const handleSave = async () => {
        if (!title || !slug) {
            alert("Title and Slug are required.");
            return;
        }

        setIsSaving(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/pages/${pageId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title, slug, content, status })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to update page");
            }

            alert("Page saved successfully!");
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-10 text-center animate-pulse">Loading editor...</div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/pages" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-primary transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold font-serif text-slate-800 mb-1">Edit Page</h1>
                        <p className="text-sm text-slate-500">Update your dynamic page.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href={`/p/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <Globe className="w-4 h-4" /> View Public
                    </a>
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
                        {isSaving ? "Saving..." : <><Save className="w-5 h-5" /> Save Updates</>}
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
                                    onChange={(e) => setTitle(e.target.value)}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
