import Link from "next/link";
import { BookOpen, Microscope, Palette, Code, Activity, ArrowRight, Star } from "lucide-react";

export default function AcademicsPage() {
    const departments = [
        { title: "Sciences & Math", icon: <Microscope className="w-6 h-6" />, desc: "Foundational science concepts, mathematics, and logical reasoning for all classes." },
        { title: "Humanities", icon: <BookOpen className="w-6 h-6" />, desc: "Literature, History, Social Studies, and Hindi & English Languages." },
        { title: "Arts & Design", icon: <Palette className="w-6 h-6" />, desc: "Visual Arts, Craft, Music, and creative expression activities." },
        { title: "Technology", icon: <Code className="w-6 h-6" />, desc: "Basic Computer Science and Digital Literacy for young learners." },
        { title: "Physical Ed.", icon: <Activity className="w-6 h-6" />, desc: "Athletics, Yoga, Health, and extra-curricular sports activities." },
    ];

    const classes = [
        { label: "Nursery", proposed: false },
        { label: "LKG", proposed: false },
        { label: "UKG", proposed: false },
        { label: "Class 1st", proposed: false },
        { label: "Class 2nd", proposed: false },
        { label: "Class 3rd", proposed: false },
        { label: "Class 4th", proposed: false },
        { label: "Class 5th", proposed: false },
        { label: "Class 6th", proposed: true },
        { label: "Class 7th", proposed: true },
        { label: "Class 8th", proposed: true },
    ];

    return (
        <div className="flex flex-col min-h-screen pt-24">
            {/* Hero Header */}
            <section className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Academic Excellence</h1>
                    <p className="text-xl max-w-2xl mx-auto font-light text-slate-300">
                        A nurturing and rigorous curriculum from Nursery to Class 8th, building strong foundations for life.
                    </p>
                </div>
            </section>

            {/* Classes Offered */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-serif font-bold text-primary mb-6">Classes Offered</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            GPM Educational Academy proudly offers classes from Nursery to Class 8th. Classes marked as <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-sm font-semibold px-2 py-0.5 rounded-full"><Star className="w-3 h-3" /> Proposed</span> are upcoming additions to our school.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {classes.map((cls, index) => (
                            <div
                                key={index}
                                className={`relative p-6 rounded-2xl text-center transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl ${
                                    cls.proposed
                                        ? "bg-amber-50 border-2 border-amber-300"
                                        : "bg-background-alt border-2 border-transparent hover:border-primary/20"
                                }`}
                            >
                                {cls.proposed && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full shadow">
                                        <Star className="w-3 h-3" /> Proposed
                                    </span>
                                )}
                                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center font-bold text-lg mb-3 ${
                                    cls.proposed ? "bg-amber-200 text-amber-800" : "bg-white text-primary shadow-md"
                                }`}>
                                    {index + 1}
                                </div>
                                <p className={`font-bold font-serif text-base ${
                                    cls.proposed ? "text-amber-800" : "text-primary"
                                }`}>{cls.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curriculum Overview */}
            <section className="py-24 bg-slate-50 relative">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-serif font-bold text-primary mb-6">Our Curriculum</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            We blend traditional foundational learning with modern, inquiry-based methodologies to build confident, curious, and capable young minds.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white p-8 rounded-2xl text-center group hover:shadow-2xl transition-all duration-300">
                            <div className="w-16 h-16 mx-auto bg-background-alt rounded-full flex items-center justify-center text-primary shadow-md mb-6 group-hover:scale-110 transition-transform">
                                <span className="font-bold text-xl">PP</span>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-primary mb-3">Pre-Primary</h3>
                            <p className="text-slate-600 text-sm">Nursery · LKG · UKG</p>
                            <p className="text-slate-500 mt-4 leading-relaxed">Playful learning focused on motor skills, early literacy, numeracy, and building social confidence.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl text-center group hover:shadow-2xl transition-all duration-300 border-t-4 border-secondary">
                            <div className="w-16 h-16 mx-auto bg-background-alt rounded-full flex items-center justify-center text-secondary-dark shadow-md mb-6 group-hover:scale-110 transition-transform">
                                <span className="font-bold text-xl">P</span>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-primary mb-3">Primary Years</h3>
                            <p className="text-slate-600 text-sm">Class 1st to Class 5th</p>
                            <p className="text-slate-500 mt-4 leading-relaxed">Foundational literacy, numeracy, and nurturing a natural curiosity about the world through hands-on activities.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl text-center group hover:shadow-2xl transition-all duration-300 border-t-4 border-amber-400">
                            <div className="w-16 h-16 mx-auto bg-amber-50 rounded-full flex items-center justify-center text-amber-700 shadow-md mb-6 group-hover:scale-110 transition-transform">
                                <span className="font-bold text-xl">M</span>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-primary mb-3">Middle Years <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full align-middle">Proposed</span></h3>
                            <p className="text-slate-600 text-sm">Class 6th to Class 8th</p>
                            <p className="text-slate-500 mt-4 leading-relaxed">Encourages interdisciplinary learning, critical analysis, and developing independent thinking skills.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Departments */}
            <section className="py-24 bg-primary-dark text-white">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-4xl font-serif font-bold text-center mb-16">Academic Departments</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {departments.map((dept, index) => (
                            <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
                                <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {dept.icon}
                                </div>
                                <h3 className="text-xl font-bold font-serif mb-2">{dept.title}</h3>
                                <p className="text-slate-400 font-light text-sm">{dept.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-background-alt text-center">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                    <h2 className="text-3xl font-serif font-bold text-primary mb-6">Ready to Join Our Academic Community?</h2>
                    <Link href="/admissions" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-light transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                        Apply for Admissions <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
