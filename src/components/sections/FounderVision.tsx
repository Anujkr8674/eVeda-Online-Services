"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sparkles, Quote, ArrowRight, Eye, Palette, Cpu, TrendingUp,
  CheckCircle2, Compass, HeartHandshake, ShieldCheck
} from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaEnvelope, FaInstagram, FaFacebookF } from "react-icons/fa";
import { COMPANY, FOUNDER } from "@/lib/utils";

interface FounderVisionProps {
  variant?: "full" | "compact";
  id?: string;
}

export default function FounderVision({ variant = "full", id = "founder" }: FounderVisionProps) {
  const isFull = variant === "full";

  const pillars = [
    { label: "Vision", icon: Eye, color: "#7C3AED", bg: "rgba(124, 58, 237, 0.08)" },
    { label: "Creativity", icon: Palette, color: "#EC4899", bg: "rgba(236, 72, 153, 0.08)" },
    { label: "Technology", icon: Cpu, color: "#06B6D4", bg: "rgba(6, 182, 212, 0.08)" },
    { label: "Growth", icon: TrendingUp, color: "#10B981", bg: "rgba(16, 185, 129, 0.08)" },
  ];

  return (
    <section id={id} className="py-20 lg:py-28 relative overflow-hidden bg-white border-b border-slate-200/70">
      {/* Ambient background glass gradients */}
      <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-[radial-gradient(circle,_rgba(124,58,237,0.045)_0%,_transparent_70%)] blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[45%] h-[45%] bg-[radial-gradient(circle,_rgba(6,182,212,0.035)_0%,_transparent_70%)] blur-[90px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN: Professional Photograph & Floating Glass Accents ── */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            {/* Ambient halo glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.08)_0%,_transparent_70%)] pointer-events-none" />

            {/* Backing decorative cards */}
            <div className="absolute -top-2 -left-3 w-40 h-40 bg-gradient-to-br from-purple-200/40 to-indigo-100/30 rounded-3xl -z-10 blur-sm hidden sm:block" />
            <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-gradient-to-tl from-cyan-200/30 to-purple-100/30 rounded-3xl -z-10 blur-sm hidden sm:block" />

            {/* Main Portrait Frame with Glass Border */}
            <div className="relative rounded-[32px] overflow-hidden border border-white/80 bg-gradient-to-b from-white/90 to-purple-50/50 backdrop-blur-2xl shadow-[0_24px_60px_-15px_rgba(124,58,237,0.18)] p-3.5 sm:p-4 group">
              <div className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/team/geet.png"
                  alt="Geetanjali Singh — Founder & Visionary, EVeda Online Services"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  priority
                />

                {/* Gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Bottom caption overlay inside image */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <p className="text-[11px] font-black uppercase tracking-widest text-[#a78bfa] mb-0.5">
                    Founder & Visionary
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black font-sora tracking-tight leading-tight">
                    Geetanjali Singh
                  </h3>
                  <p className="text-xs text-white/80 font-medium mt-0.5">
                    EVeda Online Services
                  </p>
                </div>
              </div>

              {/* Floating Top Badge: Founder & Visionary */}
              <div className="absolute top-7 right-7 bg-white/95 backdrop-blur-md border border-purple-200/70 py-1.5 px-3.5 rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/10 z-20">
                <Sparkles className="w-3.5 h-3.5 text-[#7C3AED] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                  Founder & Visionary
                </span>
              </div>
            </div>

            {/* Floating Glass Quote Card (overlapping bottom) */}
            <div className="mt-4 sm:-mt-8 sm:ml-6 relative z-20 bg-white/95 backdrop-blur-xl border border-purple-100/80 rounded-2xl p-4 sm:p-5 shadow-xl shadow-purple-900/5 max-w-[92%]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7C3AED] shrink-0 mt-0.5 shadow-xs">
                  <Quote className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-[13px] font-semibold text-slate-700 italic leading-relaxed">
                    “Ideas become meaningful when they are given the right platform, the right presentation, and the courage to bring them to life.”
                  </p>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#7C3AED]">
                    — Geetanjali Singh
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Connect Pills */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-4 sm:ml-4">
              <a
                href={`mailto:${FOUNDER.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#7C3AED] hover:text-white text-slate-700 text-xs font-bold transition-all duration-200 shadow-xs"
                title={`Email Geetanjali Singh (${FOUNDER.email})`}
              >
                <FaEnvelope className="w-3 h-3 text-[#7C3AED]" />
                <span>Email</span>
              </a>
              <a
                href={FOUNDER.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#0A66C2] hover:text-white text-slate-700 text-xs font-bold transition-all duration-200 shadow-xs"
                title="Connect on LinkedIn"
              >
                <FaLinkedinIn className="w-3 h-3 text-[#0A66C2]" />
                <span>LinkedIn</span>
              </a>
              <a
                href={FOUNDER.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 text-xs font-bold transition-all duration-200 shadow-xs"
                title="Follow Geetanjali on Twitter (X)"
              >
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                <span>@EVedaSpeaks</span>
              </a>
              <a
                href={FOUNDER.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#E1306C] hover:text-white text-slate-700 text-xs font-bold transition-all duration-200 shadow-xs"
                title="Follow on Instagram"
              >
                <FaInstagram className="w-3 h-3 text-[#E1306C]" />
                <span>Instagram</span>
              </a>
              <a
                href={FOUNDER.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#1877F2] hover:text-white text-slate-700 text-xs font-bold transition-all duration-200 shadow-xs"
                title="Connect on Facebook"
              >
                <FaFacebookF className="w-3 h-3 text-[#1877F2]" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Content Narrative ── */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">

            {/* Header / Badging */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider text-[#7C3AED] bg-purple-50 border border-purple-200/60 mb-3 shadow-xs">
                <Compass className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span>{isFull ? "The Vision Behind EVeda" : "Meet the Founder"}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 font-sora leading-[1.15]">
                Meet <span className="text-[#7C3AED]">Geetanjali Singh</span>
              </h2>

              <p className="text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-widest mt-2">
                Founder & Visionary — EVeda Online Services
              </p>
            </div>

            {/* Story Paragraphs */}
            {isFull ? (
              <>
                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Behind EVeda Online Services is <strong className="text-slate-900 font-bold">Geetanjali Singh</strong>, a founder driven by creativity, determination, and the belief that every business, professional, author, and idea deserves a strong digital presence.
                  </p>
                  <p>
                    With a vision to bring technology, creativity, publishing, design, and digital marketing together under one roof, Geetanjali established EVeda Online Services as a platform designed to help individuals and businesses turn their ideas into professionally crafted digital experiences.
                  </p>
                  <p>
                    Her approach is rooted in understanding the journey behind every project — not simply delivering a service, but understanding what the client is trying to achieve and helping transform that vision into reality.
                  </p>
                </div>

                {/* Philosophy Callout: Building More Than a Service Company */}
                <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/40 border border-purple-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-300/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#7C3AED]">
                      <HeartHandshake className="w-4 h-4 text-[#7C3AED]" />
                      <span>Building More Than a Service Company</span>
                    </div>

                    <p className="text-slate-800 font-bold text-base sm:text-lg font-sora italic leading-snug">
                      “Ideas become meaningful when they are given the right platform, the right presentation, and the courage to bring them to life.”
                    </p>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      From website development and graphic design to book designing, publishing support, eBooks, children&apos;s books, educational content, social media, and digital marketing, Geetanjali&apos;s vision is to create a dependable creative and digital ecosystem for clients from different industries.
                    </p>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Her focus is not just on today&apos;s project, but on building long-term relationships, professional credibility, and sustainable digital growth.
                    </p>
                  </div>
                </div>

                {/* Her Vision Highlight Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-lg relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#7C3AED]/30 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-5 h-5 text-[#a78bfa]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#a78bfa] mb-1.5">
                        Her Vision
                      </h4>
                      <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed font-sora">
                        To empower businesses, authors, entrepreneurs, and professionals with the technology, creativity, and digital solutions they need to build something they can be proud of.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* ── COMPACT HOMEPAGE VERSION ── */
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Every meaningful venture begins with a vision. EVeda Online Services is the result of <strong className="text-slate-900 font-bold">Geetanjali Singh&apos;s</strong> vision to bring technology, creativity, publishing, and digital marketing together to help people and businesses build their presence with confidence.
                </p>
                <p>
                  With a strong focus on quality, creativity, and client-focused solutions, she continues to build EVeda as a trusted partner for businesses, authors, publishers, professionals, and entrepreneurs.
                </p>
                <p className="font-semibold text-slate-800 italic border-l-2 border-[#7C3AED] pl-3.5">
                  “Your idea deserves more than just a service. It deserves the right strategy, presentation, and opportunity to grow.”
                </p>
              </div>
            )}

            {/* 4 Pillars Strip: Vision | Creativity | Technology | Growth */}
            <div className="pt-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                Core Foundation
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {pillars.map(({ label, icon: Icon, color, bg }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-[#7C3AED]/40 hover:shadow-md transition-all duration-200 group/pillar"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover/pillar:scale-110"
                      style={{ backgroundColor: bg, color: color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 font-sora">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-3">
              {isFull ? (
                <Link
                  href="/team#founder"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-widest text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <span>Discover the EVeda Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  href="/team#founder"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-widest text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <span>Read Her Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
