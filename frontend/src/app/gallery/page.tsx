import { Camera, PlayCircle, Image as ImageIcon } from "lucide-react";

export default function GalleryPage() {
    const images = [
        { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop", title: "Campus Grounds", category: "Campus" },
        { src: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=2069&auto=format&fit=crop", title: "Science Fair 2025", category: "Events" },
        { src: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop", title: "Varsity Basketball", category: "Sports" },
        { src: "https://images.unsplash.com/photo-1427504494785-319ce8372ac0?q=80&w=2070&auto=format&fit=crop", title: "Graduation Ceremony", category: "Events" },
        { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop", title: "Library Reading Room", category: "Facilities" },
        { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop", title: "Student Collaboration", category: "Academics" },
    ];

    return (
        <div className="flex flex-col min-h-screen pt-24">
            {/* Hero Header */}
            <section className="bg-primary-dark text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity filter blur-sm" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <Camera className="w-12 h-12 mx-auto text-secondary mb-6" />
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Media Gallery</h1>
                    <p className="text-xl max-w-2xl mx-auto font-light text-slate-300">
                        Explore life at GPM Educational Academy through the lens of our students, faculty, and events.
                    </p>
                </div>
            </section>

            {/* Categories / Filters Placeholder */}
            <section className="py-8 bg-white border-b border-slate-100 sticky top-[92px] z-30 shadow-sm hidden md:block">
                <div className="container mx-auto px-4 md:px-6 flex justify-center gap-4">
                    <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium">All</button>
                    <button className="px-6 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full text-sm font-medium transition-colors">Campus</button>
                    <button className="px-6 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full text-sm font-medium transition-colors">Events</button>
                    <button className="px-6 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full text-sm font-medium transition-colors">Sports</button>
                    <button className="px-6 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full text-sm font-medium transition-colors">Facilities</button>
                </div>
            </section>

            {/* Grid */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {images.map((img, idx) => (
                            <div key={idx} className="group relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 cursor-pointer shadow-md shadow-slate-200 hover:shadow-2xl transition-all duration-500">
                                <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-secondary text-xs uppercase tracking-widest font-bold mb-1 block transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{img.category}</span>
                                    <h3 className="text-white text-xl font-serif font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{img.title}</h3>
                                </div>
                                <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                                    <ImageIcon className="w-6 h-6 drop-shadow-md" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <button className="px-8 py-3 bg-white border border-slate-200 shadow-sm text-primary font-bold rounded-full hover:bg-slate-50 hover:shadow-md transition-all">
                            Load More Images
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
