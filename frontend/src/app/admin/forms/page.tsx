"use client";
import { useState, useEffect } from "react";
import { Plus, Search, Filter, MoreVertical, LayoutGrid, Eye, Download, Trash2 } from "lucide-react";
import Link from "next/link";
import { fetchWithAuth } from "@/lib/api/config";

export default function FormsAdminPage() {
    const [forms, setForms] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const res = await fetchWithAuth("/forms/admin/templates");
                const data = await res.json();

                if (res.ok && Array.isArray(data)) {
                    setForms(data);
                } else {
                    console.error("API returned an error or invalid data format:", data);
                    setForms([]);
                }
            } catch (err) {
                console.error("Failed to fetch forms", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchForms();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this form and ALL its submissions? This cannot be undone.")) return;

        try {
            const res = await fetchWithAuth(`/forms/templates/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setForms(forms.filter(f => f._id !== id));
            } else {
                alert("Failed to delete form.");
            }
        } catch (err) {
            console.error("Delete error", err);
            alert("An error occurred while deleting.");
        }
    };

    const handleExportForm = async (formId: string, formTitle: string) => {
        try {
            const res = await fetchWithAuth(`/forms/submissions?formId=${formId}`);
            if (!res.ok) { alert("Failed to fetch submissions."); return; }
            const subs: any[] = await res.json();
            if (!Array.isArray(subs) || subs.length === 0) { alert("No submissions for this form."); return; }

            const headers = ["Submission ID", "Submitted At", "Status", ...Object.keys(subs[0]?.submittedData || {})];
            const rows = subs.map(s => {
                const base = [
                    `"${s._id}"`,
                    `"${new Date(s.submittedAt || s.createdAt).toLocaleString()}"`,
                    `"${s.status || 'Pending'}"`,
                ];
                const dataVals = Object.values(s.submittedData || {}).map(v => `"${String(v).replace(/"/g, '""')}"`);
                return [...base, ...dataVals].join(",");
            });

            const csv = "\uFEFF" + headers.map(h => `"${h}"`).join(",") + "\n" + rows.join("\n");
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${formTitle.replace(/\s+/g, '-')}-submissions.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Export error", err);
            alert("Export failed.");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-slate-800 mb-1">Form Management</h1>
                    <p className="text-slate-500">Create templates and view submissions.</p>
                </div>
                <Link href="/admin/forms/builder" className="px-5 py-2.5 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-light transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" /> Create New Form
                </Link>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 flex gap-8">
                <button className="px-2 py-4 border-b-2 border-primary text-primary font-bold text-sm">Active Templates</button>
                <button className="px-2 py-4 border-b-2 border-transparent text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors">Submissions</button>
                <button className="px-2 py-4 border-b-2 border-transparent text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors">Archived</button>
            </div>

            {/* Filters/Search */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 focus-within:border-primary flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 mr-2" />
                    <input type="text" placeholder="Search forms..." className="bg-transparent border-none outline-none w-full text-sm" />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
                        <LayoutGrid className="w-4 h-4" /> Grid
                    </button>
                </div>
            </div>

            {/* Templates List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Form Name</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Submissions</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Deadline</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-500">Loading forms from database...</td>
                                </tr>
                            ) : forms.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-500">No forms found. Create one to get started.</td>
                                </tr>
                            ) : (
                                forms.map((form) => (
                                    <tr key={form._id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-slate-800">{form.title}</div>
                                            <div className="text-xs text-slate-500 mt-1">ID: {form._id}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${form.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                                                }`}>
                                                {form.isActive ? 'Active' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-medium text-primary">
                                            <Link href={`/admin/forms/${form._id}`} className=" hover:underline">View</Link>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-600">
                                            {form.deadline ? new Date(form.deadline).toLocaleDateString() : 'No Deadline'}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/admin/forms/${form._id}`} className="p-2 text-slate-400 hover:text-primary bg-white rounded-lg hover:bg-slate-100 border border-slate-200 shadow-sm" title="View Submissions">
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button onClick={() => handleExportForm(form._id, form.title)} className="p-2 text-slate-400 hover:text-emerald-600 bg-white rounded-lg hover:bg-slate-100 border border-slate-200 shadow-sm" title="Download Submissions CSV">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <Link href={`/admin/forms/builder?id=${form._id}`} className="p-2 text-slate-400 hover:text-blue-600 bg-white rounded-lg hover:bg-slate-100 border border-slate-200 shadow-sm" title="Edit Form">
                                                    <LayoutGrid className="w-4 h-4" />
                                                </Link>
                                                <button onClick={() => handleDelete(form._id)} className="p-2 text-slate-400 hover:text-red-600 bg-white rounded-lg hover:bg-slate-100 border border-slate-200 shadow-sm" title="Delete">
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
