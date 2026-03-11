"use client";

import { useState, useEffect } from "react";
import { UploadCloud, CheckCircle } from "lucide-react";

export default function FormRenderer({ templateId }: { templateId?: string }) {
    const [template, setTemplate] = useState<any>(null);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadForm = async () => {
            try {
                let url = "/api/forms/templates";
                if (templateId) {
                    url = `/api/forms/templates/${templateId}`;
                }

                // Fetch from public API without auth
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}${url.replace('/api', '')}`);
                if (!res.ok) throw new Error("Failed to load form");

                const data = await res.json();

                // If it's the list of templates (no specific ID provided), grab the first active one
                if (Array.isArray(data)) {
                    if (data.length > 0) setTemplate(data[0]);
                    else setError("No active forms available at this time.");
                } else {
                    setTemplate(data);
                }
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Could not load the form.");
            } finally {
                setIsLoading(false);
            }
        };

        loadForm();
    }, [templateId]);

    const handleInputChange = (fieldId: string, value: any) => {
        setFormData((prev) => ({ ...prev, [fieldId]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!template) return;

        setIsSubmitting(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/forms/submit/${template._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ submittedData: formData }),
            });

            if (!res.ok) throw new Error("Failed to submit");

            setIsSuccess(true);
        } catch (err) {
            console.error("Submission error", err);
            alert("Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="py-20 text-center text-slate-500 animate-pulse">Loading form details...</div>;
    }

    if (error || !template) {
        return <div className="py-20 text-center text-slate-500">{error || "No active forms currently."}</div>;
    }

    if (isSuccess) {
        return (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center animate-in zoom-in duration-500 shadow-xl">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-slate-800 mb-2">Application Submitted!</h3>
                <p className="text-slate-600 mb-8 max-w-sm">Thank you for your interest in GPM Educational Academy. We have received your application and will contact you shortly with the next steps.</p>
                <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors">Start New Application</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="text-left animate-in fade-in duration-500">

            <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-primary mb-2">{template.title}</h2>
                <p className="text-slate-500">{template.description}</p>
            </div>

            <div className="space-y-6">
                {template.fields.map((field: any) => (
                    <div key={field._id || field.id} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <label className="block text-sm font-bold text-slate-800 mb-3">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>

                        {field.type === "text" && (
                            <input type="text" required={field.required} onChange={(e) => handleInputChange(field._id || field.id, e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-all" />
                        )}

                        {field.type === "email" && (
                            <input type="email" required={field.required} onChange={(e) => handleInputChange(field._id || field.id, e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-all" />
                        )}

                        {field.type === "number" && (
                            <input type="number" required={field.required} onChange={(e) => handleInputChange(field._id || field.id, e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-all" />
                        )}

                        {field.type === "date" && (
                            <input type="date" required={field.required} onChange={(e) => handleInputChange(field._id || field.id, e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-all cursor-pointer" />
                        )}

                        {field.type === "textarea" && (
                            <textarea rows={4} required={field.required} onChange={(e) => handleInputChange(field._id || field.id, e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-all resize-none" />
                        )}

                        {field.type === "dropdown" && field.options && (
                            <select required={field.required} onChange={(e) => handleInputChange(field._id || field.id, e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-all cursor-pointer">
                                <option value="">Select an option...</option>
                                {field.options.map((opt: any, i: number) => (
                                    <option key={i} value={opt}>{opt}</option>
                                ))}
                            </select>
                        )}

                        {field.type === "radio" && field.options && (
                            <div className="space-y-3">
                                {field.options.map((opt: any, i: number) => (
                                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="radio" name={field._id || field.id} value={opt} required={field.required} onChange={(e) => handleInputChange(field._id || field.id, e.target.value)} className="w-5 h-5 text-secondary border-slate-300 focus:ring-secondary" />
                                        <span className="text-slate-700 group-hover:text-primary transition-colors">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {field.type === "checkbox" && field.options && (
                            <div className="space-y-3">
                                {field.options.map((opt: any, i: number) => (
                                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" name={`${field._id || field.id}_${i}`} value={opt} onChange={(e) => {
                                            // Handle multiple checkbox logic
                                            const currentArr = formData[field._id || field.id] || [];
                                            if (e.target.checked) handleInputChange(field._id || field.id, [...currentArr, opt]);
                                            else handleInputChange(field._id || field.id, currentArr.filter((val: string) => val !== opt));
                                        }} className="w-5 h-5 text-secondary border-slate-300 rounded focus:ring-secondary" />
                                        <span className="text-slate-700 group-hover:text-primary transition-colors">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {field.type === "file" && (
                            <div className="border-2 border-dashed border-slate-300 bg-white rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                                <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                                <span className="text-sm font-bold text-slate-600">Click to upload or drag and drop</span>
                                <span className="text-xs text-slate-400 mt-1">PDF, JPG, PNG up to 10MB</span>
                                <input type="file" required={field.required} className="hidden" />
                            </div>
                        )}

                    </div>
                ))}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-8 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-light transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed text-lg"
            >
                {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    "Submit Application Securely"
                )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4 flex justify-center items-center gap-1">
                By submitting this form, you agree to our Terms and Privacy Policy.
            </p>
        </form>
    );
}
