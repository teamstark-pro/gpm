import { BookOpen, Users, Globe, Target } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen pt-24">
            {/* Hero Header */}
            <section className="bg-primary-dark text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">About GPM Educational Academy</h1>
                    <p className="text-xl max-w-2xl mx-auto font-light text-slate-300">
                        A legacy of 16 years in shaping the minds and hearts of tomorrow's leaders.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-10 rounded-3xl shadow-lg border-t-8 border-secondary group hover:-translate-y-2 transition-transform duration-300">
                            <Target className="w-12 h-12 text-secondary mb-6" />
                            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Mission</h2>
                            <p className="text-slate-600 leading-relaxed">
                                To provide a dynamic, inclusive, and challenging learning environment that empowers students to reach their highest potential. We strive to foster intellectual curiosity, ethical character, and a profound sense of global responsibility.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-3xl shadow-lg border-t-8 border-primary group hover:-translate-y-2 transition-transform duration-300">
                            <Globe className="w-12 h-12 text-primary mb-6" />
                            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Vision</h2>
                            <p className="text-slate-600 leading-relaxed">
                                To be the premier institution of learning in the region, recognized globally for producing compassionate innovators and leaders who will shape a more just, sustainable, and peaceful world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* History Timeline snippet */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
                    <h2 className="text-4xl font-serif font-bold text-primary mb-8">Our Rich History</h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-12">
                        Established 16 years ago by visionary educators, GPM Educational Academy began as a modest academy with just 50 students. Today, we stand as a beacon of educational excellence with a sprawling 100-acre campus, world-class facilities, and an alumni network that spans the globe, excelling in every conceivable field.
                    </p>
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
                        <img src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=2074&auto=format&fit=crop" alt="Historical Campus" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* Principal's Message */}
            <section className="py-24 bg-background-alt overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
                        <div className="lg:w-1/3 relative">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                                <img src="/img/director.jpg" alt="Director" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl bg-secondary z-0" />
                        </div>

                        <div className="lg:w-2/3 space-y-6">
                            <div className="flex items-center gap-2 text-secondary font-bold tracking-widest uppercase text-sm">
                                <span className="w-8 h-0.5 bg-secondary"></span> Principal's Message
                            </div>
                            <h2 className="text-4xl font-serif font-bold text-primary leading-tight">
                                Nurturing the Leaders of Tomorrow
                            </h2>
                            <div className="pl-6 border-l-4 border-secondary/50 text-slate-600 italic leading-relaxed text-lg my-6">
                                "At GPM Educational Academy, we believe that education extends far beyond the four walls of a classroom. Our commitment is to holistic development—ensuring every student is intellectually equipped, emotionally resilient, and morally grounded."
                            </div>
                            <p className="text-slate-600 leading-relaxed font-light">
                                We invite you to explore our vibrant community and witness firsthand the passion for learning that defines our academy. Together, we can help your child discover their unique talents and forge a path to a brilliant future.
                            </p>
                            <p className="font-serif font-bold text-primary text-xl pt-4">Manoj kumar shukla</p>
                            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Director</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
