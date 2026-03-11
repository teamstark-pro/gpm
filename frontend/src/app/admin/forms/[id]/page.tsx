"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Search, Filter, Download, Eye, FileText, X } from "lucide-react";
import Link from "next/link";
import { fetchWithAuth } from "@/lib/api/config";

export default function SubmissionsViewerPage() {
    const params = useParams();
    const templateId = params.id as string;

    const [submissions, setSubmissions] = useState<any[]>([]);
    const [template, setTemplate] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSub, setSelectedSub] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const templateRes = await fetchWithAuth(`/forms/templates/${templateId}`);
                if (templateRes.ok) {
                    setTemplate(await templateRes.json());
                }
                const subsRes = await fetchWithAuth(`/forms/submissions?formId=${templateId}`);
                if (subsRes.ok) {
                    const subsData = await subsRes.json();
                    if (Array.isArray(subsData)) setSubmissions(subsData);
                }
            } catch (err) {
                console.error("Failed to fetch submissions data", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [templateId]);

    const handleStatusChange = async (subId: string, newStatus: string) => {
        try {
            const res = await fetchWithAuth(`/forms/submissions/${subId}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                setSubmissions(submissions.map(s => s._id === subId ? { ...s, status: newStatus } : s));
            }
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status.");
        }
    };

    const handleExportCSV = () => {
        if (submissions.length === 0) {
            alert("No submissions to export.");
            return;
        }

        // Build header row from template fields or from first submission keys
        const fields: string[] = template?.fields?.map((f: any) => f.label) ||
            Object.keys(submissions[0]?.submittedData || {});

        const extraHeaders = ["Submission ID", "Submitted At", "Status"];
        const allHeaders = [...fields, ...extraHeaders];

        const rows = submissions.map((sub) => {
            const data = sub.submittedData || {};
            const fieldValues = fields.map((label: string) => {
                // Try to find value by label or by key
                const key = template?.fields?.find((f: any) => f.label === label)?.name || label;
                const val = data[label] ?? data[key] ?? "";
                return `"${String(val).replace(/"/g, '""')}"`;
            });
            const extra = [
                `"${sub._id}"`,
                `"${new Date(sub.submittedAt || sub.createdAt).toLocaleString()}"`,
                `"${sub.status || 'Pending'}"`,
            ];
            return [...fieldValues, ...extra].join(",");
        });

        const csvContent = "\uFEFF" + allHeaders.map(h => `"${h}"`).join(",") + "\n" + rows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${template?.title || "submissions"}-responses.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const filteredSubs = submissions.filter(sub => {
        if (!searchQuery) return true;
        const dataStr = JSON.stringify(sub.submittedData || {}).toLowerCase();
        return dataStr.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/forms" className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold font-serif text-slate-800 mb-1">
                            {template?.title || "Form Submissions"}
                        </h1>
                        <p className="text-slate-500">
                            {isLoading ? "Loading..." : `${submissions.length} Total Responses`}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleExportCSV}
                    className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-lg shadow-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Download className="w-5 h-5" /> Export to Excel/CSV
                </button>
            </div>

            {/* Filters/Search */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 focus-within:border-primary flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search responses..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none w-full text-sm"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Status
                    </button>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Date
                    </button>
                </div>
            </div>

            {/* Submissions List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Applicant / Response</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted On</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr><td colSpan={4} className="py-8 text-center text-slate-500">Loading submissions...</td></tr>
                            ) : filteredSubs.length === 0 ? (
                                <tr><td colSpan={4} className="py-8 text-center text-slate-500">No responses found.</td></tr>
                            ) : (
                                filteredSubs.map((sub) => {
                                    const firstVal = sub.submittedData ? Object.values(sub.submittedData)[0] as string : null;
                                    return (
                                        <tr key={sub._id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-slate-800">{firstVal || 'Anonymous Entry'}</div>
                                                <div className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-md">
                                                    {Object.entries(sub.submittedData || {}).slice(0, 3).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-600">
                                                {new Date(sub.submittedAt || sub.createdAt).toLocaleString()}
                                            </td>
                                            <td className="py-4 px-6">
                                                <select
                                                    value={sub.status || 'Pending'}
                                                    onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                                                    className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 appearance-none cursor-pointer outline-none transition-colors
                                                        ${sub.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                            sub.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                                                'bg-amber-50 text-amber-700 border-amber-200'}`}
                                                >
                                                    <option value="Pending">Pending Review</option>
                                                    <option value="Accepted">Accepted</option>
                                                    <option value="Rejected">Rejected</option>
                                                </select>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelectedSub(sub)}
                                                        className="p-2 text-slate-400 hover:text-primary bg-white rounded-lg hover:bg-slate-100 border border-slate-200 shadow-sm"
                                                        title="View Full Entry"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Full Response Modal */}
            {selectedSub && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedSub(null)}>
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div>
                                <h2 className="text-xl font-bold font-serif text-slate-800">Full Response</h2>
                                <p className="text-sm text-slate-500 mt-0.5">
                                    Submitted: {new Date(selectedSub.submittedAt || selectedSub.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedSub(null)}
                                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="overflow-y-auto p-6 space-y-4 flex-1">
                            {Object.entries(selectedSub.submittedData || {}).map(([key, value]) => {
                                // Try to find the field label from the template
                                const fieldDef = template?.fields?.find((f: any) => f.name === key || f.label === key);
                                const label = fieldDef?.label || key;
                                return (
                                    <div key={key} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
                                        <p className="text-slate-800 font-medium break-words">{String(value) || <span className="text-slate-400 italic">No response</span>}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
                            <span className={`px-3 py-1.5 text-xs font-bold rounded-full border-2
                                ${selectedSub.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                    selectedSub.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                        'bg-amber-50 text-amber-700 border-amber-200'}`}
                            >
                                {selectedSub.status || 'Pending Review'}
                            </span>
                            <button
                                onClick={() => setSelectedSub(null)}
                                className="px-5 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
