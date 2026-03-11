"use client";

import { useState, useEffect } from "react";
import { Users, FileText, UploadCloud, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import { fetchWithAuth } from "@/lib/api/config";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalApps: 0,
        pendingReviews: 0,
        activeForms: 0,
    });
    const [recentSubs, setRecentSubs] = useState<any[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [subsRes, formsRes] = await Promise.all([
                    fetchWithAuth("/forms/submissions"),
                    fetchWithAuth("/forms/admin/templates")
                ]);

                if (subsRes.ok && formsRes.ok) {
                    const subs = await subsRes.json();
                    const forms = await formsRes.json();

                    if (Array.isArray(subs) && Array.isArray(forms)) {
                        setStats({
                            totalApps: subs.length,
                            pendingReviews: subs.filter((s: any) => s.status === "Pending" || !s.status).length,
                            activeForms: forms.filter((f: any) => f.isActive).length,
                        });
                        setRecentSubs(subs.slice(0, 5));
                    } else {
                        console.error("Dashboard data is not an array:", { subs, forms });
                        setRecentSubs([]);
                    }
                }
            } catch (error) {
                console.error("Dashboard fetch error", error);
                setRecentSubs([]);
            }
        };

        fetchDashboardData();
    }, []);

    const handleExportReport = async () => {
        try {
            const res = await fetchWithAuth("/forms/submissions");
            if (!res.ok) { alert("Failed to fetch submissions."); return; }
            const subs: any[] = await res.json();
            if (!Array.isArray(subs) || subs.length === 0) { alert("No submissions to export."); return; }

            const headers = ["Submission ID", "Form", "First Response", "Submitted At", "Status"];
            const rows = subs.map(s => {
                const firstVal = s.submittedData ? Object.values(s.submittedData)[0] : "";
                return [
                    `"${s._id}"`,
                    `"${s.formId?.title || 'Unknown'}"`,
                    `"${String(firstVal || '').replace(/"/g, '""')}"`,
                    `"${new Date(s.submittedAt || s.createdAt).toLocaleString()}"`,
                    `"${s.status || 'Pending'}"`,
                ].join(",");
            });

            const csv = "\uFEFF" + headers.map(h => `"${h}"`).join(",") + "\n" + rows.join("\n");
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `all-submissions-report.csv`;
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
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-slate-800 mb-1">Dashboard Overview</h1>
                    <p className="text-slate-500">Welcome back, Admin. Here is what's happening today.</p>
                </div>
                <button
                    onClick={handleExportReport}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm w-max"
                >
                    <FileText className="w-4 h-4" /> Export Report (CSV)
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Total Applications", value: stats.totalApps, trend: "+12%", color: "text-blue-600", bg: "bg-blue-50", icon: <Users className="w-6 h-6" /> },
                    { title: "Pending Reviews", value: stats.pendingReviews, trend: "-5%", color: "text-amber-600", bg: "bg-amber-50", icon: <Calendar className="w-6 h-6" /> },
                    { title: "Active Forms", value: stats.activeForms, trend: "Stable", color: "text-emerald-600", bg: "bg-emerald-50", icon: <FileText className="w-6 h-6" /> },
                    { title: "Site Visitors (30d)", value: "45.2K", trend: "+24%", color: "text-indigo-600", bg: "bg-indigo-50", icon: <TrendingUp className="w-6 h-6" /> },
                ].map((kpi, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start justify-between group hover:shadow-md transition-all">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">{kpi.title}</p>
                            <h3 className="text-3xl font-bold text-slate-800 mb-2">{kpi.value}</h3>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : kpi.trend.startsWith('-') ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                                {kpi.trend} from last month
                            </span>
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                            {kpi.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Applications */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 font-serif text-xl">Recent Applications</h3>
                        <a href="/admin/forms" className="text-sm text-primary font-semibold flex items-center gap-1 hover:text-secondary">View All <ArrowUpRight className="w-4 h-4" /></a>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Applicant Name</th>
                                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Form Template</th>
                                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Submitted</th>
                                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {!Array.isArray(recentSubs) || recentSubs.length === 0 ? (
                                    <tr><td colSpan={4} className="py-8 text-center text-slate-500">No submissions found.</td></tr>
                                ) : (
                                    recentSubs.map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6 font-medium text-slate-800">
                                                {/* Assuming the first field might be a name, or fallback to object ID */}
                                                {row.submittedData && Object.values(row.submittedData)[0] ? Object.values(row.submittedData)[0] as string : 'Unknown Applicant'}
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-600">{row.formId?.title || 'Unknown Form'}</td>
                                            <td className="py-4 px-6 text-sm text-slate-500">{new Date(row.submittedAt || row.createdAt).toLocaleDateString()}</td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${row.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' : row.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {row.status || 'Pending'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions / System Status */}
                <div className="space-y-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-6">
                        <h3 className="font-bold text-slate-800 font-serif text-xl mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-primary hover:text-white group transition-colors border border-slate-100 hover:border-transparent text-slate-700 text-sm font-medium gap-2">
                                <FileText className="w-6 h-6 text-primary group-hover:text-white" />
                                New Form
                            </button>
                            <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-primary hover:text-white group transition-colors border border-slate-100 hover:border-transparent text-slate-700 text-sm font-medium gap-2">
                                <UploadCloud className="w-6 h-6 text-primary group-hover:text-white" />
                                Upload Media
                            </button>
                            <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-primary hover:text-white group transition-colors border border-slate-100 hover:border-transparent text-slate-700 text-sm font-medium gap-2">
                                <TrendingUp className="w-6 h-6 text-primary group-hover:text-white" />
                                Post News
                            </button>
                            <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-primary hover:text-white group transition-colors border border-slate-100 hover:border-transparent text-slate-700 text-sm font-medium gap-2">
                                <Users className="w-6 h-6 text-primary group-hover:text-white" />
                                Add User
                            </button>
                        </div>
                    </div>

                    <div className="bg-primary hover:bg-primary-light transition-colors cursor-pointer rounded-2xl p-6 text-white shadow-xl flex items-center gap-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-[50px] opacity-40 group-hover:opacity-70 transition-opacity" />
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                            <TrendingUp className="w-6 h-6 text-secondary" />
                        </div>
                        <div className="relative z-10">
                            <h4 className="font-bold font-serif text-lg leading-tight mb-1">View Full Analytics Report</h4>
                            <p className="text-white/80 text-sm">Traffic is up 24% this week.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
