"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Bell, Shield, Globe, Users, Facebook, Twitter, Instagram, Linkedin, CheckCircle2 } from "lucide-react";
import { fetchWithAuth } from "@/lib/api/config";

const TABS = [
    { name: "General", icon: <Settings className="w-4 h-4" /> },
    { name: "Social Media", icon: <Globe className="w-4 h-4" /> },
    { name: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { name: "Security", icon: <Shield className="w-4 h-4" /> },
    { name: "User Roles", icon: <Users className="w-4 h-4" /> },
];

export default function SettingsAdminPage() {
    const [activeTab, setActiveTab] = useState("General");
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // General settings (local state only – for display)
    const [siteName, setSiteName] = useState("GPM Educational Academy");
    const [contactEmail, setContactEmail] = useState("gpmeducationalacademy@gmail.com");
    const [address, setAddress] = useState("Nakaha Bashant Balpur\nGonda UP");
    const [admissionsStatus, setAdmissionsStatus] = useState("Open (Accepting Applications)");
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    // Social media settings (persisted in DB)
    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");

    useEffect(() => {
        // Load social settings from backend
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        fetch(`${apiBase}/settings`)
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (data) {
                    setFacebook(data.facebook || "");
                    setTwitter(data.twitter || "");
                    setInstagram(data.instagram || "");
                    setLinkedin(data.linkedin || "");
                }
            })
            .catch(() => {});
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveSuccess(false);
        try {
            if (activeTab === "Social Media") {
                const res = await fetchWithAuth("/settings", {
                    method: "PUT",
                    body: JSON.stringify({ facebook, twitter, instagram, linkedin }),
                });
                if (!res.ok) throw new Error("Failed to save.");
            }
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            alert("Failed to save settings. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-slate-800 mb-1">Global Settings</h1>
                    <p className="text-slate-500">Manage site configuration, social media, and more.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-5 py-2.5 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-light transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                    {isSaving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : saveSuccess ? (
                        <CheckCircle2 className="w-5 h-5" />
                    ) : (
                        <Save className="w-5 h-5" />
                    )}
                    {saveSuccess ? "Saved!" : "Save Changes"}
                </button>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
                {/* Settings Navigation */}
                <div className="md:col-span-1 space-y-2">
                    {TABS.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                activeTab === tab.name
                                    ? "bg-primary text-white shadow-sm"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                        >
                            {tab.icon} {tab.name}
                        </button>
                    ))}
                </div>

                {/* Settings Form */}
                <div className="md:col-span-3 space-y-8">

                    {/* --- GENERAL TAB --- */}
                    {activeTab === "General" && (
                        <>
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold font-serif text-slate-800 mb-6 pb-4 border-b border-slate-100">Site Information</h3>
                                <div className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Site Name</label>
                                            <input
                                                type="text"
                                                value={siteName}
                                                onChange={e => setSiteName(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Contact Email</label>
                                            <input
                                                type="email"
                                                value={contactEmail}
                                                onChange={e => setContactEmail(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">School Address</label>
                                        <textarea
                                            rows={3}
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Admissions Status</label>
                                        <select
                                            value={admissionsStatus}
                                            onChange={e => setAdmissionsStatus(e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
                                        >
                                            <option>Open (Accepting Applications)</option>
                                            <option>Waitlist Only</option>
                                            <option>Closed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold font-serif text-slate-800 mb-6 pb-4 border-b border-slate-100">Maintenance Mode</h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-slate-700">Enable Maintenance Mode</p>
                                        <p className="text-sm text-slate-500">When enabled, the public website will show a "Coming Soon" page.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={maintenanceMode}
                                            onChange={e => setMaintenanceMode(e.target.checked)}
                                        />
                                        <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary border border-slate-300" />
                                    </label>
                                </div>
                            </div>
                        </>
                    )}

                    {/* --- SOCIAL MEDIA TAB --- */}
                    {activeTab === "Social Media" && (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold font-serif text-slate-800 mb-2 pb-4 border-b border-slate-100">Social Media Handles</h3>
                            <p className="text-sm text-slate-500 mb-6">These links appear in the website footer. Leave blank to hide an icon.</p>

                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                                        <Facebook className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Facebook URL</label>
                                        <input
                                            type="url"
                                            value={facebook}
                                            onChange={e => setFacebook(e.target.value)}
                                            placeholder="https://facebook.com/yourpage"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-sky-400 flex items-center justify-center shrink-0">
                                        <Twitter className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Twitter / X URL</label>
                                        <input
                                            type="url"
                                            value={twitter}
                                            onChange={e => setTwitter(e.target.value)}
                                            placeholder="https://twitter.com/yourhandle"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shrink-0">
                                        <Instagram className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Instagram URL</label>
                                        <input
                                            type="url"
                                            value={instagram}
                                            onChange={e => setInstagram(e.target.value)}
                                            placeholder="https://instagram.com/yourpage"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center shrink-0">
                                        <Linkedin className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <label className="text-sm font-bold text-slate-700">LinkedIn URL</label>
                                        <input
                                            type="url"
                                            value={linkedin}
                                            onChange={e => setLinkedin(e.target.value)}
                                            placeholder="https://linkedin.com/company/yourschool"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-500">
                                💡 After saving, the footer on the public website will automatically show/hide icons based on URLs you've entered.
                            </div>
                        </div>
                    )}

                    {/* Placeholder tabs */}
                    {(activeTab === "Notifications" || activeTab === "Security" || activeTab === "User Roles") && (
                        <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                {TABS.find(t => t.name === activeTab)?.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">{activeTab} Settings</h3>
                            <p className="text-slate-500">This section is coming soon.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
