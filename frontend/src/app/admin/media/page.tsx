import { UploadCloud, Search, Image as ImageIcon, File, Video, Trash2, FolderPlus } from "lucide-react";

export default function MediaAdminPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-slate-800 mb-1">Media Library</h1>
                    <p className="text-slate-500">Manage images, documents, and other file assets.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2">
                        <FolderPlus className="w-5 h-5" /> New Folder
                    </button>
                    <button className="px-5 py-2.5 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-light transition-colors flex items-center gap-2">
                        <UploadCloud className="w-5 h-5" /> Upload File
                    </button>
                </div>
            </div>

            {/* Upload Zone */}
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 bg-slate-50 flex flex-col items-center justify-center text-center hover:bg-slate-100 hover:border-primary/50 transition-colors cursor-pointer cursor-copy">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-primary mb-4 border border-slate-200">
                    <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">Drag and drop files here</h3>
                <p className="text-slate-500 max-w-sm">Upload images, PDFs, or videos up to 50MB. They will be immediately available in the UI.</p>
            </div>

            {/* File Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-800 font-serif text-xl">Recent Uploads</h3>
                    <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded border border-slate-200 focus-within:border-primary">
                        <Search className="w-4 h-4 text-slate-400 mr-2" />
                        <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none w-32 text-sm" />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                        { name: "campus_hero.jpg", type: "img", size: "2.4 MB" },
                        { name: "prospectus_2026.pdf", type: "doc", size: "12.1 MB" },
                        { name: "science_fair.jpg", type: "img", size: "1.8 MB" },
                        { name: "basketball.jpg", type: "img", size: "3.2 MB" },
                        { name: "logo_primary.png", type: "img", size: "0.5 MB" },
                        { name: "welcome_video.mp4", type: "vid", size: "45 MB" },
                    ].map((file, i) => (
                        <div key={i} className="group border border-slate-200 rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all relative">
                            <div className="aspect-square bg-slate-100 flex items-center justify-center text-slate-300 relative">
                                {file.type === 'img' ? (
                                    <ImageIcon className="w-12 h-12" />
                                ) : file.type === 'doc' ? (
                                    <File className="w-12 h-12" />
                                ) : (
                                    <Video className="w-12 h-12" />
                                )}

                                {/* Overlay actions */}
                                <div className="absolute inset-0 bg-primary-dark/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 bg-white text-primary rounded-full hover:scale-110 transition-transform"><Search className="w-4 h-4" /></button>
                                    <button className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <div className="p-3 bg-white">
                                <p className="text-sm font-semibold text-slate-700 truncate" title={file.name}>{file.name}</p>
                                <p className="text-xs text-slate-500">{file.size}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
