"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, PhoneCall, ShieldCheck } from "lucide-react";
import { COMPANY } from "@/lib/utils";

interface AboutProps {
  isAboutPage?: boolean;
}

export default function About({ isAboutPage = false }: AboutProps) {
  return (
    <section className="py-10 bg-white relative overflow-hidden" id="about">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.02)_1px,transparent_1px)] [background-size:20px_20px] opacity-80 pointer-events-none z-0" />
      
      {/* Subtle Radial Orbs for Light Theme */}
      <div className="absolute top-[10%] left-[-10%] w-[45%] h-[45%] bg-[radial-gradient(circle,_rgba(124,58,237,0.04)_0%,_transparent_70%)] blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[45%] h-[45%] bg-[radial-gradient(circle,_rgba(6,182,212,0.03)_0%,_transparent_70%)] blur-[90px] pointer-events-none z-0" />

      {/* Decorative Horizontal Dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium Image Collage (Safari Mockup + Circular Overlapping Image) */}
          <div className="lg:col-span-6 relative pt-4 pb-8 lg:pb-0">
            {/* Background dynamic glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.02)_0%,_transparent_75%)] pointer-events-none z-0" />
            
            {/* Decorative Background Shape */}
            <div className="absolute top-[-20px] left-[-20px] w-48 h-48 bg-gradient-to-br from-purple-100/70 to-indigo-50/50 rounded-3xl -z-10 border border-purple-100/40 hidden sm:block animate-pulse duration-[8s]" />
            
            {/* Subtle Dot Pattern */}
            <div className="absolute top-[-32px] left-[-32px] w-24 h-48 bg-[radial-gradient(var(--accent-global)_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-10 -z-15 hidden sm:block" />

            {/* Safari Mockup Frame (Light Theme) */}
            <div className="relative z-10 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
              {/* Browser Header Top Bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-50 border-b border-slate-100">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="mx-auto w-[55%] h-5 rounded bg-white border border-slate-200 text-[9px] text-slate-400 flex items-center justify-center font-mono select-none">
                  evedaonlineservices.com/about
                </div>
              </div>
              
              {/* Main Image content */}
              <div className="relative aspect-[16/10] w-full bg-slate-50">
                <Image
                  src="/images/about_office1.png"
                  alt="E Veda Collaborative Teamwork"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Circular Overlapping Secondary Image Card (White border & custom shadow) */}
            <div className="absolute bottom-[-32px] left-[-24px] w-[38%] aspect-square rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white z-20 hidden sm:block animate-float-slow">
              <div className="relative w-full h-full bg-slate-50">
                <Image
                  src="/images/about_office2.png"
                  alt="NextGen Focused Software Engineering"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Premium Light-Purple Gradient Experience Badge (Positioned at bottom-right) */}
            <div className="absolute bottom-[-16px] right-[16px] bg-[var(--accent-global)] text-white rounded-2xl p-4 shadow-xl border border-purple-500/20 backdrop-blur-md hidden sm:flex z-20 items-center gap-3 shadow-purple-500/20">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-extrabold text-white/80 uppercase tracking-widest leading-none mb-1">ESTABLISHED</p>
                <p className="text-xs font-bold text-white leading-none font-sora">Built for Global Scale</p>
              </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="lg:col-span-6 flex flex-col pl-0 lg:pl-4">
            {/* Subtitle Badge */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-[var(--accent-global)] bg-[var(--accent-global-dim)] mb-4">
                About Us
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 font-sora">
              Innovating Technology for Your <span className="text-[var(--accent-global)]">Success</span>
            </h2>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              {COMPANY.description} Founded in {COMPANY.founded}, officially launched {COMPANY.launchDate} — built from Day 1 to compete globally.
            </p>

            {/* Features List */}
            <div className="space-y-6">
              {/* Bullet 1 */}
              <div className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-global)] flex items-center justify-center shrink-0 transition-all duration-350 group-hover:scale-115 group-hover:rotate-6 shadow-sm shadow-purple-500/5 group-hover:shadow-md group-hover:shadow-purple-500/20">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1 font-sora">Top-Tier Engineering Talent</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-normal">
                    Vetted experts delivering enterprise-grade software and intelligent AI solutions.
                  </p>
                </div>
              </div>

              {/* Bullet 2 */}
              <div className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-global)] flex items-center justify-center shrink-0 transition-all duration-350 group-hover:scale-115 group-hover:rotate-6 shadow-sm shadow-purple-500/5 group-hover:shadow-md group-hover:shadow-purple-500/20">
                  <PhoneCall className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1 font-sora">24/7 Dedicated Support</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-normal">
                    Round-the-clock proactive monitoring and assistance whenever you need it.
                  </p>
                </div>
              </div>

              {/* Bullet 3 */}
              <div className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-global)] flex items-center justify-center shrink-0 transition-all duration-350 group-hover:scale-115 group-hover:rotate-6 shadow-sm shadow-purple-500/5 group-hover:shadow-md group-hover:shadow-purple-500/20">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1 font-sora">Transparent & Agile Process</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-normal">
                    Full visibility, zero hidden overheads, and rapid milestone-based delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href={isAboutPage ? "/contact" : "/about"}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white font-bold text-xs sm:text-sm rounded-full transition-all duration-300 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/25 hover:-translate-y-0.5"
              >
                {isAboutPage ? "Start a Project" : "Know More"} <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
