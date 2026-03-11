import Link from "next/link";
import { FileText, CalendarClock, CreditCard, Download, CheckCircle, ArrowRight } from "lucide-react";
import FormRenderer from "@/components/ui/FormRenderer";

export default function AdmissionsPage() {
    return (
        <div className="flex flex-col min-h-screen pt-24">
            {/* Hero Header */}
            <section className="bg-secondary-dark text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-80" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 drop-shadow-lg">Admissions</h1>
                    <p className="text-xl max-w-2xl mx-auto font-light text-white/90">
                        Your journey to excellence starts here. Join our diverse, vibrant, and driven community.
                    </p>
                </div>
            </section>

            {/* Admission Process */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-primary mb-4">The Admission Process</h2>
                        <p className="text-lg text-slate-600">A simple, transparent 4-step process to enroll your child.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-0.5 bg-slate-200 z-0 border-t-2 border-dashed border-slate-300" />

                        {[
                            { icon: <FileText className="w-8 h-8" />, title: "1. Apply Online", desc: "Fill out the dynamic registration form on our website." },
                            { icon: <CalendarClock className="w-8 h-8" />, title: "2. Assessment", desc: "Schedule an entrance assessment and student interview." },
                            { icon: <CheckCircle className="w-8 h-8" />, title: "3. Review & Acceptance", desc: "The admissions committee reviews the application." },
                            { icon: <CreditCard className="w-8 h-8" />, title: "4. Enrollment", desc: "Sign the agreement and pay the enrollment fees." },
                        ].map((step, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center text-primary border-4 border-background mb-6">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold font-serif text-primary mb-2">{step.title}</h3>
                                <p className="text-slate-500 text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form Section / Dynamic Form Placeholder */}
            <section className="py-24 bg-background-alt">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-8 border-primary">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Online Application Form</h2>
                            <p className="text-slate-600">
                                Fill out the form below to begin the application process for the 2026-2027 academic year.
                            </p>
                        </div>

                        <FormRenderer />
                    </div>
                </div>
            </section>

            {/* Downloads / Fees */}
            <section className="py-20 bg-primary-dark text-white">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-secondary rounded-full" /> Important Documents
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                                        <span className="font-medium text-slate-300 group-hover:text-white">School Prospectus 2026-2027</span>
                                        <Download className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                                        <span className="font-medium text-slate-300 group-hover:text-white">Fee Structure</span>
                                        <Download className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                                        <span className="font-medium text-slate-300 group-hover:text-white">Academic Calendar</span>
                                        <Download className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-secondary rounded-full" /> Scholarship & Aid
                            </h3>
                            <p className="text-slate-300 leading-relaxed font-light mb-6">
                                We are committed to making a GPM Educational Academy education accessible to talented students from diverse backgrounds. We offer a limited number of merit-based scholarships and need-based financial aid.
                            </p>
                            <Link href="/contact" className="inline-flex items-center gap-2 text-secondary font-bold hover:text-white transition-colors group">
                                Contact Financial Aid Office <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
