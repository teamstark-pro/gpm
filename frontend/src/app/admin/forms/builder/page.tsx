"use client";

import { useState, useEffect, Suspense } from "react";
import { Plus, Trash2, GripVertical, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchWithAuth } from "@/lib/api/config";

type FieldType = "text" | "textarea" | "email" | "number" | "date" | "dropdown" | "checkbox" | "radio" | "file";

interface FormField {
    _id: string;
    type: FieldType;
    label: string;
    required: boolean;
    options?: string[]; // For dropdown, checkbox, radio
}

function FormBuilderContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const formId = searchParams.get('id');

    const [title, setTitle] = useState("New Dynamic Form");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [fields, setFields] = useState<FormField[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(!!formId);

    useEffect(() => {
        if (!formId) return;

        const loadForm = async () => {
            try {
                const res = await fetchWithAuth(`/forms/templates/${formId}`);
                if (res.ok) {
                    const data = await res.json();
                    setTitle(data.title || "Untitled Form");
                    setDescription(data.description || "");
                    setIsActive(data.isActive !== undefined ? data.isActive : true);
                    setFields(data.fields || []);
                } else {
                    alert("Could not load form data.");
                }
            } catch (err) {
                console.error("Failed to load form", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadForm();
    }, [formId]);

    const addField = (type: FieldType) => {
        setFields([
            ...fields,
            {
                _id: Math.random().toString(36).substring(7),
                type,
                label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
                required: false,
                options: ["dropdown", "checkbox", "radio"].includes(type) ? ["Option 1", "Option 2"] : undefined,
            },
        ]);
    };

    const removeField = (id: string) => {
        setFields(fields.filter((f) => (f._id || (f as any).id) !== id));
    };

    const updateField = (id: string, updates: Partial<FormField>) => {
        setFields(fields.map((f) => ((f._id || (f as any).id) === id ? { ...f, ...updates } : f)));
    };

    const updateOption = (fieldId: string, optionIndex: number, newValue: string) => {
        setFields(
            fields.map((f) => {
                if ((f._id || (f as any).id) === fieldId && f.options) {
                    const newOptions = [...f.options];
                    newOptions[optionIndex] = newValue;
                    return { ...f, options: newOptions };
                }
                return f;
            })
        );
    };

    const saveForm = async () => {
        setIsSaving(true);
        try {
            const method = formId ? "PUT" : "POST";
            const url = formId ? `/forms/templates/${formId}` : "/forms/templates";

            const response = await fetchWithAuth(url, {
                method,
                body: JSON.stringify({
                    title,
                    description,
                    isActive,
                    fields,
                }),
            });

            if (!response.ok) throw new Error("Failed to save form");
            alert(formId ? "Form updated successfully!" : "Form template saved successfully to the database!");

            if (!formId) {
                router.push("/admin/forms");
            }
        } catch (err) {
            console.error(err);
            alert("Error saving form. Please check console.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="py-20 text-center text-slate-500 animate-pulse">Loading form details...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4">
                    <Link href="/admin/forms" className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold font-serif text-slate-800">Form Builder</h1>
                        <p className="text-slate-500 text-sm">Design your admission or generic forms.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isActive ? 'bg-primary' : 'bg-slate-300'}`} onClick={() => setIsActive(!isActive)}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isActive ? 'translate-x-6' : 'translate-x-0'}`} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{isActive ? 'Active' : 'Draft'}</span>
                    </label>
                    <button
                        onClick={saveForm}
                        disabled={isSaving || fields.length === 0}
                        className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-light transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSaving ? <span className="animate-pulse">Saving...</span> : <><Save className="w-4 h-4" /> Save Form</>}
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Main Editor */}
                <div className="lg:col-span-3 space-y-6">

                    {/* Form Meta */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 border-t-8 border-t-secondary">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-4xl font-serif font-bold text-primary mb-4 border-b border-transparent hover:border-slate-200 focus:border-primary focus:outline-none transition-colors"
                            placeholder="Form Title"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full text-slate-600 resize-none border-b border-transparent hover:border-slate-200 focus:border-primary focus:outline-none transition-colors"
                            placeholder="Add a description or instructions for this form..."
                            rows={2}
                        />
                    </div>

                    {/* Fields List */}
                    {fields.length === 0 ? (
                        <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center text-slate-500">
                            <p className="mb-2">This form has no fields yet.</p>
                            <p className="text-sm">Click a field type from the right panel to add it.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field._id || (field as any).id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 group">
                                    <div className="flex flex-col items-center justify-start gap-4 text-slate-300">
                                        <GripVertical className="w-5 h-5 cursor-grab hover:text-slate-500" />
                                        <span className="text-xs font-bold font-mono">{index + 1}</span>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <input
                                                type="text"
                                                value={field.label}
                                                onChange={(e) => updateField(field._id || (field as any).id, { label: e.target.value })}
                                                className="text-lg font-bold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-primary focus:outline-none w-2/3"
                                                placeholder="Question Label"
                                            />
                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={field.required}
                                                        onChange={(e) => updateField(field._id || (field as any).id, { required: e.target.checked })}
                                                        className="w-4 h-4 text-primary rounded focus:ring-primary"
                                                    />
                                                    Required
                                                </label>
                                                <button onClick={() => removeField(field._id || (field as any).id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block border-b border-slate-200 pb-2">
                                                Type: {field.type}
                                            </span>

                                            {/* Option Editor for Choice Fields */}
                                            {field.options && (
                                                <div className="space-y-2 mt-4">
                                                    {field.options.map((opt, optIdx) => (
                                                        <div key={optIdx} className="flex items-center gap-2">
                                                            <div className={`w-4 h-4 border border-slate-300 ${field.type === 'radio' ? 'rounded-full' : 'rounded'} bg-white`} />
                                                            <input
                                                                type="text"
                                                                value={opt}
                                                                onChange={(e) => updateOption(field._id || (field as any).id, optIdx, e.target.value)}
                                                                className="bg-transparent text-sm text-slate-700 border-b border-transparent hover:border-slate-300 focus:border-primary focus:outline-none flex-1"
                                                            />
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => updateField(field._id || (field as any).id, { options: [...field.options!, `Option ${field.options!.length + 1}`] })}
                                                        className="text-xs text-primary font-bold hover:underline flex items-center gap-1 mt-2"
                                                    >
                                                        <Plus className="w-3 h-3" /> Add Option
                                                    </button>
                                                </div>
                                            )}

                                            {/* Preview for other fields */}
                                            {!field.options && field.type === 'textarea' && <div className="h-20 border border-dashed border-slate-300 rounded bg-white mt-2"></div>}
                                            {!field.options && Array.of('text', 'email', 'number', 'date').includes(field.type) && <div className="h-10 border border-dashed border-slate-300 rounded bg-white mt-2"></div>}
                                            {!field.options && field.type === 'file' && <div className="h-16 border border-dashed border-slate-300 rounded bg-white mt-2 flex items-center justify-center text-slate-400 text-xs text-center p-2">File Upload Zone Placeholder</div>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Tools */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-4">
                        <h3 className="font-bold text-slate-800 font-serif mb-4 pb-2 border-b border-slate-100">Add Fields</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: "Short Text", type: "text" },
                                { label: "Paragraph", type: "textarea" },
                                { label: "Email", type: "email" },
                                { label: "Number", type: "number" },
                                { label: "Date", type: "date" },
                                { label: "Dropdown", type: "dropdown" },
                                { label: "Checkboxes", type: "checkbox" },
                                { label: "Multiple Choice", type: "radio" },
                                { label: "File Upload", type: "file" },
                            ].map((btn, i) => (
                                <button
                                    key={i}
                                    onClick={() => addField(btn.type as FieldType)}
                                    className={`text-xs font-semibold p-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:border-primary transition-all text-center flex flex-col items-center justify-center gap-1 ${btn.type === 'file' ? 'col-span-2 bg-slate-50' : ''}`}
                                >
                                    <Plus className="w-4 h-4 text-slate-400" />
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FormBuilder() {
    return (
        <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading builder...</div>}>
            <FormBuilderContent />
        </Suspense>
    );
}
