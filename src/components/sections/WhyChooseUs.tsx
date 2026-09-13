"use client";

import { Zap, Shield, Target, Lock, Sparkles } from "lucide-react";

const advantages = [
  {
    icon: Zap,
    title: "Lightning-Fast Delivery",
    desc: "Agile sprints designed to launch enterprise-grade MVPs within weeks, not months.",
    stat: "3× faster",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    desc: "ISO-aligned protocols, end-to-end data encryption, and robust zero-trust architecture.",
    stat: "99.99%",
  },
  {
    icon: Target,
    title: "ROI-Driven Engineering",
    desc: "Every feature maps to measurable outcomes — conversions, retention, and business growth.",
    stat: "240%",
  },
  {
    icon: Lock,
    title: "Full IP Ownership",
    desc: "All code repository rights, designs, and intellectual property transfer to you completely.",
    stat: "100%",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative overflow-hidden py-10 text-slate-800 border-t border-slate-200/50 bg-white"
      id="why-choose-us"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[45%] h-[45%] bg-[radial-gradient(circle,_rgba(124,58,237,0.03)_0%,_transparent_70%)] blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] bg-[radial-gradient(circle,_rgba(6,182,212,0.02)_0%,_transparent_70%)] blur-[90px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Image Section */}
          <div className="lg:col-span-6 relative">
            {/* Background dynamic glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.03)_0%,_transparent_75%)] pointer-events-none z-0" />

            {/* Decorative Background Shape */}
            <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-gradient-to-br from-purple-100/70 to-indigo-50/50 rounded-3xl -z-10 border border-purple-100/40 hidden sm:block animate-pulse duration-[8s]" />

            {/* Subtle Dot Pattern */}
            <div className="absolute bottom-[-32px] left-[-32px] w-32 h-32 bg-[radial-gradient(var(--accent-global)_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-15 -z-15 hidden sm:block" />

            {/* Main Image Card */}
            <div className="relative z-10 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
              <img
                src="/images/about_office2.png"
                alt="eVeda Technical Excellence"
                className="w-full h-[420px] object-cover"
              />
              {/* Blur gradient overlay at the bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-300">Technical Excellence</p>
                <h4 className="text-sm font-bold mt-1">Engineered for absolute performance, scale, and enterprise security.</h4>
              </div>
            </div>

            {/* Overlapping Floating Stats Card */}
            <div className="absolute bottom-6 right-[-20px] z-20 bg-white border border-slate-100 rounded-2xl p-4 shadow-xl hidden md:block max-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-[var(--accent-global)]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-black text-slate-950 font-sora">240%</div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Avg. Client ROI</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Value Propositions */}
          <div className="lg:col-span-6">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-[var(--accent-global)] bg-[var(--accent-global-dim)] mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 font-sora">
                Why Global Leaders <span className="text-[var(--accent-global)]">Choose EVeda</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                World-class engineering talent, enterprise security, and transparent delivery — engineered to maximize the ROI of your technology investments.
              </p>
            </div>

            {/* 4 Advantage Cards */}
            <div className="space-y-4">
              {advantages.map((adv, idx) => {
                const Icon = adv.icon;
                return (
                  <div
                    key={idx}
                    className="flex gap-4 items-start p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50/30 transition-all duration-300 group shadow-sm hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-global)] flex items-center justify-center shrink-0 text-white shadow-sm shadow-purple-500/5 group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-md group-hover:shadow-purple-500/20 transition-all duration-350">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 font-sora">
                          {adv.title}
                        </h3>
                        <span className="text-xs font-extrabold text-[var(--accent-global)] font-sora bg-purple-50 px-2 py-0.5 rounded-full">
                          {adv.stat}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 leading-normal">
                        {adv.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
