"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Users, GraduationCap, Calendar } from "lucide-react";
import { AdmissionPopup } from "@/components/ui/AdmissionPopup";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdmissionPopup />

      {/* 1. Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white mt-16">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary-light border border-secondary/30 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            Admissions Open 2026-2027
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 drop-shadow-lg">
            Excellence in <br />
            <span className="text-secondary">Education</span> & Character
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Empowering the next generation of global leaders through rigorous academics, innovative thinking, and compassionate leadership.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/admissions" className="w-full sm:w-auto px-8 py-4 bg-secondary text-primary-dark font-bold rounded-full hover:bg-secondary-light transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              Apply for Admission
            </Link>
            <Link href="/about" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 backdrop-blur-sm transition-all border border-white/20">
              Discover Our Campus
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Stats/Highlights Section */}
      <section className="py-16 bg-white relative -mt-16 z-20 mx-4 md:mx-auto container max-w-5xl rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          <div className="text-center group">
            <div className="mx-auto w-16 h-16 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-serif font-bold text-primary mb-1">16</h3>
            <p className="text-slate-500 font-medium text-sm">Years of Excellence</p>
          </div>
          <div className="text-center group">
            <div className="mx-auto w-16 h-16 bg-secondary/10 text-secondary-dark rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-serif font-bold text-primary mb-1">2,500</h3>
            <p className="text-slate-500 font-medium text-sm">Students Enrolled</p>
          </div>
          <div className="text-center group">
            <div className="mx-auto w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-serif font-bold text-primary mb-1">100%</h3>
            <p className="text-slate-500 font-medium text-sm">College Acceptance</p>
          </div>
        </div>
      </section>

      {/* 3. About Us Snippet */}
      <section className="py-24 bg-background-alt overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop" alt="Campus Life" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-full h-full rounded-2xl border-4 border-secondary z-0" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            </div>

            <div className="lg:w-1/2 space-y-6">
              <div className="flex items-center gap-2 text-secondary font-bold tracking-widest uppercase text-sm">
                <span className="w-8 h-0.5 bg-secondary"></span> Welcome to GPM Educational Academy
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">
                A Legacy of <br /> Transformative Education
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                Founded 16 years ago, GPM Educational Academy has been at the forefront of educational innovation. Our holistic approach ensures that students do not just memorize facts, but learn how to think critically, act ethically, and lead with compassion.
              </p>
              <p className="text-slate-600 leading-relaxed pb-4">
                Our state-of-the-art facilities, world-class faculty, and diverse student body create an environment where every child can discover their passion and reach their full potential.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors group">
                Read Our Full Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Latest News & Events */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">News & Upcoming Events</h2>
            <p className="text-slate-600 text-lg">Stay updated with the latest happenings, achievements, and events from our vibrant campus.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Card 1 */}
            <div className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
              <div className="h-48 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=2069&auto=format&fit=crop" alt="Science Fair" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">News</div>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-500 mb-2 flex items-center gap-1"><Calendar className="w-4 h-4" /> October 12, 2025</p>
                <h3 className="text-xl font-bold font-serif text-primary mb-3 group-hover:text-secondary transition-colors">Annual International Science Innovation Fair</h3>
                <p className="text-slate-600 line-clamp-2 mb-4">Our students took home top honors at this year's global science fair with groundbreaking projects in renewable energy.</p>
                <Link href="/news" className="text-primary font-medium hover:text-secondary text-sm flex items-center gap-1 group/link">
                  Read More <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
              <div className="h-48 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop" alt="Sports Match" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">Sports</div>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-500 mb-2 flex items-center gap-1"><Calendar className="w-4 h-4" /> September 28, 2025</p>
                <h3 className="text-xl font-bold font-serif text-primary mb-3 group-hover:text-secondary transition-colors">Varsity Basketball Team Secures State Championship</h3>
                <p className="text-slate-600 line-clamp-2 mb-4">In a thrilling final match, the GPM Knights emerged victorious to claim their third consecutive title.</p>
                <Link href="/news" className="text-primary font-medium hover:text-secondary text-sm flex items-center gap-1 group/link">
                  Read More <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Event Card */}
            <div className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-secondary/5">
              <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white shrink-0 shadow-md rounded-2xl flex flex-col overflow-hidden mb-6">
                  <div className="bg-primary text-white text-xs font-bold py-1">NOV</div>
                  <div className="text-2xl font-bold text-primary flex-1 flex items-center justify-center">15</div>
                </div>
                <h3 className="text-xl font-bold font-serif text-primary mb-3">Fall Admissions Open House</h3>
                <p className="text-slate-600 mb-6 font-light">Join us on campus to meet faculty, tour facilities, and learn about our academic programs.</p>
                <Link href="/admissions" className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-light transition-colors mt-auto w-full">
                  Register to Attend
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/news" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all">
              View All News & Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
