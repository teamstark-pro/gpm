import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen pt-24">
            {/* Hero Header */}
            <section className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Contact Us</h1>
                    <p className="text-xl max-w-2xl mx-auto font-light text-slate-300">
                        We are here to answer your questions and guide you through your journey with us.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 bg-background relative -mt-10 rounded-t-[3rem] z-20">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">

                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-serif text-primary mb-2">Our Campus</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Nakaha Bashant Balpur<br />
                                        Gonda UP<br />
                                        India
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                                <div className="w-12 h-12 bg-secondary/20 text-secondary-dark rounded-xl flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-serif text-primary mb-2">Phone</h3>
                                    <p className="text-slate-600 mb-1">Main: 9277084811</p>
                                    <p className="text-slate-600">Admissions: 9277084811</p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-serif text-primary mb-2">Email</h3>
                                    <p className="text-slate-600 mb-1">gpmeducationalacademy@gmail.com</p>
                                    <p className="text-slate-600">gpmeducationalacademy@gmail.com</p>
                                </div>
                            </div>

                            <div className="bg-primary p-8 rounded-3xl shadow-lg text-white flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-serif mb-2">Office Hours</h3>
                                    <p className="text-white/80 mb-1">Mon - Fri: 8:00 AM - 5:00 PM</p>
                                    <p className="text-white/80">Saturday: By Appointment</p>
                                    <p className="text-white/80">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-slate-100 h-full">
                                <h2 className="text-3xl font-serif font-bold text-primary mb-2">Send us a Message</h2>
                                <p className="text-slate-500 mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>

                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">First Name <span className="text-accent">*</span></label>
                                            <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Last Name <span className="text-accent">*</span></label>
                                            <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Doe" />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Email Address <span className="text-accent">*</span></label>
                                            <input type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="john@example.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Phone Number</label>
                                            <input type="tel" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="(555) 123-4567" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Inquiry Type</label>
                                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer">
                                            <option>General Inquiry</option>
                                            <option>Admissions</option>
                                            <option>Academics</option>
                                            <option>Careers</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Message <span className="text-accent">*</span></label>
                                        <textarea rows={5} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none" placeholder="How can we help you?"></textarea>
                                    </div>

                                    <button type="button" className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(15,42,74,0.39)] hover:shadow-[0_6px_20px_rgba(15,42,74,0.23)] hover:bg-primary-light transition-all flex items-center justify-center gap-2">
                                        Send Message <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="h-96 w-full bg-slate-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    [ Interactive Google Map Integration ]
                </div>
            </section>
        </div>
    );
}
