import React from 'react';

// Fallback Rich Text Editor due to dependency installation constraints
// This can be easily swapped with TipTap or another robust editor later.

interface RichTextEditorProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
            <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-1">
                <button type="button" className="p-2 text-slate-500 hover:bg-slate-200 rounded font-bold" title="Bold (Mock)">B</button>
                <button type="button" className="p-2 text-slate-500 hover:bg-slate-200 rounded italic" title="Italic (Mock)">I</button>
                <button type="button" className="p-2 text-slate-500 hover:bg-slate-200 rounded underline" title="Underline (Mock)">U</button>
                <div className="w-px h-6 bg-slate-300 mx-2 self-center"></div>
                <button type="button" className="p-2 text-slate-500 hover:bg-slate-200 rounded text-sm font-semibold" title="Heading (Mock)">H1</button>
                <button type="button" className="p-2 text-slate-500 hover:bg-slate-200 rounded text-sm font-semibold" title="Heading (Mock)">H2</button>
                <div className="w-px h-6 bg-slate-300 mx-2 self-center"></div>
                <button type="button" className="p-2 text-slate-500 hover:bg-slate-200 rounded text-xs px-3" title="Will support HTML tags">HTML Editor</button>
            </div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || "Write your content here... (Supports HTML tags)"}
                className="w-full p-6 h-96 resize-y outline-none font-mono text-sm leading-relaxed text-slate-700 bg-slate-50/50"
            />
        </div>
    );
}
