"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BarChart3, Globe, Users, Star,
  Shield, Zap, Code2, Bot, LineChart, Cloud, Layers, Lock,
  BookOpen, Palette, TrendingUp, ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { triggerOnboardingModal } from "@/components/shared/OnboardingModal";

/* ── Stats ─────────────────────────────────────────────────────────── */
const stats = [
  { value: "150+", label: "Projects Delivered", sub: "Across 12+ industries", icon: BarChart3 },
  { value: "50+", label: "Global Clients", sub: "Startups to enterprises", icon: Globe },
  { value: "30+", label: "Expert Engineers", sub: "Passionate builders", icon: Users },
  { value: "4.9★", label: "Client Rating", sub: "Based on 60+ reviews", icon: Star },
];

/* ── Slides — all share the same video, only colors/text differ ─────── */
const slides = [
  {
    accent: "#7C3AED", accentHover: "#6D28D9",
    accentAlpha: "rgba(124,58,237,0.14)",
    glowTop: "radial-gradient(ellipse 55% 55% at 75% 10%, rgba(124,58,237,0.22) 0%, transparent 70%)",
    tagIcon: BookOpen, label: "Book Designing & Branding",
    tagline: "Cover Artistry • Editorial Layout • Complete Author Identity",
    title1: "Crafting Captivating", title2: "Book Covers &",
    highlight: "Author Branding",
    description: "Transform manuscripts into bestselling works of art with bespoke cover design, interior formatting, and unforgettable author brand identities.",
    ctaText: "Design Your Book", ctaLink: "/contact",
    secondaryText: "View Book Portfolio", secondaryLink: "/portfolio",
    features: ["Custom Cover Design", "Interior Formatting", "Author Brand Identity"],
    featureIcons: [BookOpen, Shield, Zap],
    cardStat: "500+", cardStatLabel: "Books Designed",
    img: "/images/hero1.png",
  },
  {
    accent: "#06B6D4", accentHover: "#0891B2",
    accentAlpha: "rgba(6,182,212,0.14)",
    glowTop: "radial-gradient(ellipse 55% 55% at 75% 10%, rgba(6,182,212,0.22) 0%, transparent 70%)",
    tagIcon: Palette, label: "Graphic Designing",
    tagline: "Visual Identity • Marketing Creatives • High-Impact UI/UX",
    title1: "Inspiring Visuals &", title2: "Creative Brand",
    highlight: "Graphic Designing",
    description: "Elevate your brand presence with stunning visual storytelling — including corporate branding, marketing assets, social media kits, and packaging design.",
    ctaText: "Start Creative Project", ctaLink: "/contact",
    secondaryText: "Explore Creative Work", secondaryLink: "/portfolio",
    features: ["Brand Identity & Logos", "Marketing Creatives", "Packaging & Print"],
    featureIcons: [Palette, Shield, Zap],
    cardStat: "100%", cardStatLabel: "Original Concepts",
    img: "/images/hero2.png",
  },
  {
    accent: "#10B981", accentHover: "#059669",
    accentAlpha: "rgba(16,185,129,0.14)",
    glowTop: "radial-gradient(ellipse 55% 55% at 75% 10%, rgba(16,185,129,0.22) 0%, transparent 70%)",
    tagIcon: Code2, label: "Web, CRM & SaaS Development",
    tagline: "Full-Stack Architecture • Custom CRM • High-Scale SaaS",
    title1: "Building Intelligent", title2: "Web Platforms &",
    highlight: "Custom CRM & SaaS",
    description: "Engineer responsive, lightning-fast web applications, tailored enterprise CRM systems, and scalable cloud SaaS solutions built for high concurrency.",
    ctaText: "Build Your Platform", ctaLink: "/contact",
    secondaryText: "Explore Tech Stacks", secondaryLink: "/portfolio",
    features: ["Full-Stack Web Apps", "Enterprise CRM Systems", "Multi-Tenant SaaS"],
    featureIcons: [Code2, Shield, Zap],
    cardStat: "99.9%", cardStatLabel: "Uptime & Scale",
    img: "/images/hero3.png",
  },
  {
    accent: "#F59E0B", accentHover: "#D97706",
    accentAlpha: "rgba(245,158,11,0.14)",
    glowTop: "radial-gradient(ellipse 55% 55% at 75% 10%, rgba(245,158,11,0.22) 0%, transparent 70%)",
    tagIcon: TrendingUp, label: "Digital Marketing & SEO",
    tagline: "Organic Rankings • Performance Ads • Data-Driven ROI",
    title1: "Accelerating Growth", title2: "Through Targeted",
    highlight: "Digital Marketing & SEO",
    description: "Dominate search rankings, drive high-intent qualified traffic, and scale customer conversions with technical SEO, Google Ads, and performance marketing.",
    ctaText: "Grow Your Traffic", ctaLink: "/contact",
    secondaryText: "See Growth Results", secondaryLink: "/portfolio",
    features: ["Technical & Local SEO", "High-ROI PPC Campaigns", "Social Media Growth"],
    featureIcons: [TrendingUp, Shield, Zap],
    cardStat: "3.5×", cardStatLabel: "Traffic & Leads",
    img: "/images/hero4.png",
  },
  {
    accent: "#EC4899", accentHover: "#DB2777",
    accentAlpha: "rgba(236,72,153,0.14)",
    glowTop: "radial-gradient(ellipse 55% 55% at 75% 10%, rgba(236,72,153,0.22) 0%, transparent 70%)",
    tagIcon: ShoppingCart, label: "Ecommerce Platforms",
    tagline: "Frictionless Checkout • Multi-Vendor • Omnichannel Scale",
    title1: "High-Converting", title2: "Stores & Scalable",
    highlight: "Ecommerce Platforms",
    description: "Launch high-converting online storefronts, multi-vendor marketplaces, and custom commerce solutions equipped with seamless payments and inventory sync.",
    ctaText: "Launch Your Store", ctaLink: "/contact",
    secondaryText: "View Store Builds", secondaryLink: "/portfolio",
    features: ["Frictionless Checkout", "Multi-Vendor Systems", "Payment & Inventory Sync"],
    featureIcons: [ShoppingCart, Shield, Zap],
    cardStat: "45%+", cardStatLabel: "Higher Conversion",
    img: "/images/hero5.png",
  },
];

/* ── Typewriter Hook ─────────────────────────────────────────────────── */
function useTypewriter(text: string, speed = 52) {
  const [prevText, setPrevText] = useState(text);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  if (text !== prevText) {
    setPrevText(text);
    setDisplayed("");
    setDone(false);
  }

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        clearInterval(id);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return { displayed, done };
}

/* ── Component ──────────────────────────────────────────────────────── */
export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const slide = slides[currentIndex];
  const { displayed, done } = useTypewriter(slide.highlight, 110);

  // Push accent colour to CSS var so Navbar can read it
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true);
      document.documentElement.style.setProperty("--hero-accent", slide.accent);
      document.documentElement.style.setProperty("--hero-accent-hover", slide.accentHover);
    });
    return () => cancelAnimationFrame(raf);
  }, [slide.accent, slide.accentHover]);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => setCurrentIndex((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  const TagIcon = slide.tagIcon;

  return (
    <section
      className="relative overflow-visible"
      style={{ minHeight: "100vh", background: "#000000", paddingTop: "110px" }}
    >
      {/* ── Video Background ──────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {mounted && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.6 }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* ── Overlays ──────────────────────────────────────────────── */}
      {/* Left-heavy dark so text stays legible */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(110deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.80) 45%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      {/* Bottom fade — soft so video doesn't bleed at the edge */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,1) 100%)" }}
      />
      {/* Per-slide accent glow — animated on change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`glow-${currentIndex}`}
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{ background: slide.glowTop }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0 }}
        />
      </AnimatePresence>

      {/* ── Main Content ──────────────────────────────────────────── */}
      <div
        className="ng-container relative z-10 w-full min-h-[calc(100vh-110px)] flex flex-col justify-center pt-2 pb-48 lg:pb-36"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch w-full">

          {/* ── LEFT ──────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col"
              >
                {/* Badge + tagline row */}
                <motion.div
                  className="flex flex-wrap items-center gap-3 mb-5"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <span
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest"
                    style={{
                      background: slide.accentAlpha,
                      border: `1px solid ${slide.accent}55`,
                      color: slide.accent,
                    }}
                  >
                    <TagIcon className="w-3.5 h-3.5" />
                    {slide.label}
                  </span>
                  <span
                    className="text-[11px] font-medium uppercase tracking-widest hidden sm:block"
                    style={{ color: "rgba(255,255,255,0.30)", letterSpacing: "0.13em" }}
                  >
                    {slide.tagline}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  className="text-white font-extrabold leading-[1.10] mb-5"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "clamp(32px, 4.2vw, 54px)",
                    letterSpacing: "-0.03em",
                  }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {slide.title1}
                  <br />
                  {slide.title2}
                  <br />
                  {/* Typewriter highlight */}
                  <span
                    style={{
                      color: slide.accent,
                      textShadow: `0 0 32px ${slide.accent}55`,
                    }}
                  >
                    {displayed}
                    {/* Blinking cursor while typing */}
                    {!done && (
                      <span
                        style={{
                          display: "inline-block",
                          width: "3px",
                          height: "0.85em",
                          background: slide.accent,
                          marginLeft: "3px",
                          verticalAlign: "middle",
                          borderRadius: "2px",
                          animation: "hero-cursor-blink 0.7s step-end infinite",
                        }}
                      />
                    )}
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  className="text-[14px] md:text-[15px] leading-[1.78] mb-7 max-w-[490px]"
                  style={{ color: "rgba(255,255,255,0.48)" }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  {slide.description}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  className="flex flex-row items-center gap-2 mb-7 w-full sm:w-auto"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <button
                    onClick={() => triggerOnboardingModal({ type: "package", preselectedPackage: `${slide.label} Custom Package`, serviceType: slide.label, accentColor: slide.accent })}
                    className="group inline-flex items-center justify-center gap-1 sm:gap-2 text-[11px] sm:text-[13px] font-semibold text-white rounded-full transition-all duration-300 flex-1 sm:flex-initial px-3 sm:px-[22px] py-2.5 sm:py-[12px] shrink-0 whitespace-nowrap cursor-pointer"
                    style={{
                      background: slide.accent,
                      boxShadow: `0 6px 26px ${slide.accent}50`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = slide.accentHover;
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = `0 12px 34px ${slide.accent}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = slide.accent;
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = `0 6px 26px ${slide.accent}50`;
                    }}
                  >
                    {slide.ctaText}
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                  <Link
                    href={slide.secondaryLink}
                    className="inline-flex items-center justify-center gap-1 sm:gap-2 text-[11px] sm:text-[13px] font-medium text-white/65 rounded-full border transition-all duration-300 hover:text-white hover:bg-white/[0.07] hover:border-white/30 flex-1 sm:flex-initial px-3 sm:px-[22px] py-2.5 sm:py-[12px] shrink-0 whitespace-nowrap"
                    style={{ border: "1px solid rgba(255,255,255,0.13)" }}
                  >
                    {slide.secondaryText}
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                </motion.div>

                {/* Feature chips */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  {slide.features.map((f, i) => {
                    const Icon = slide.featureIcons[i];
                    return (
                      <div
                        key={i}
                        className="inline-flex items-center gap-1.5 text-[11.5px] font-medium rounded-lg"
                        style={{
                          padding: "6px 13px",
                          color: "rgba(255,255,255,0.50)",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <Icon className="w-3 h-3" style={{ color: slide.accent }} />
                        {f}
                      </div>
                    );
                  })}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Spotlight Card only (image is absolute at section level) ── */}
          <div className="lg:col-span-5 hidden lg:flex flex-col justify-start items-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${currentIndex}`}
                className="relative w-full max-w-[310px]"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute -inset-6 rounded-3xl opacity-20 blur-3xl pointer-events-none" style={{ background: slide.accent }} />
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    background: "rgba(10, 10, 12, 0.60)",
                    border: `1px solid rgba(255, 255, 255, 0.08)`,
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.50), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div className="relative p-5">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                        style={{ background: slide.accent }}
                      >
                        <TagIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p
                          className="text-[9px] font-bold uppercase tracking-wider mb-0.5"
                          style={{ color: slide.accent }}
                        >
                          Service Spotlight
                        </p>
                        <p className="text-[14px] font-bold leading-tight text-white">
                          {slide.label}
                        </p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="flex flex-col gap-2.5 mb-4">
                      {slide.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div
                            className="w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0"
                            style={{ borderColor: slide.accent }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: slide.accent }} />
                          </div>
                          <span className="text-[12.5px] font-semibold text-white/90">
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Subtle Divider */}
                    <div className="h-px w-full mb-4" style={{ background: "rgba(255, 255, 255, 0.08)" }} />

                    {/* Stat + CTA */}
                    <div className="flex items-end justify-between">
                      <div>
                        <div
                          className="font-bold leading-none mb-1 text-white"
                          style={{
                            fontFamily: "Sora, sans-serif",
                            fontSize: "34px",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          {slide.cardStat}
                        </div>
                        <div className="text-[10px] font-medium text-slate-400">
                          {slide.cardStatLabel}
                        </div>
                      </div>
                      <button
                        onClick={() => triggerOnboardingModal({ type: "package", preselectedPackage: `${slide.label} Spotlight Custom Plan`, serviceType: slide.label, accentColor: slide.accent })}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold rounded-full px-4 py-2 transition-all duration-200 hover:opacity-90 shadow-sm cursor-pointer"
                        style={{
                          background: slide.accent,
                          color: "#ffffff",
                        }}
                      >
                        Get Started <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Person Image — absolute, bottom-center of right half ─────── */}
      <div
        className="absolute bottom-0 hidden lg:flex items-end justify-center z-[8] pointer-events-none"
        style={{
          left: "20%",
          right: "0px",
          paddingBottom: "40px",
          height: "min(72vh, 580px)",
        }}
      >
        {/* Accent glow at feet */}
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-72 h-36 blur-3xl opacity-35 pointer-events-none transition-colors duration-700"
          style={{ background: slide.accent }}
        />
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={slide.img}
            alt={`Eveda Online Services expert — ${slide.label}`}
            className="relative z-10 select-none w-auto"
            style={{
              height: "100%",
              objectFit: "contain",
              objectPosition: "bottom center",
              filter: `drop-shadow(0 -16px 60px ${slide.accent}55) drop-shadow(0 24px 40px rgba(0,0,0,0.55))`,
              transition: "filter 0.6s ease",
            }}
            initial={{ opacity: 0, y: 70, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/hero1.png";
            }}
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* ── Slide Tabs ────────────────────────────────────────────── */}
      <div
        className="absolute z-30 bottom-[92px] hidden md:block w-full overflow-x-auto hide-scrollbar"
        style={{ paddingLeft: "max(20px, calc((100vw - 1400px) / 2 + 32px))" }}
      >
        <div className="flex items-center gap-2 min-w-max pr-6">
          {slides.map((s, idx) => {
            const active = idx === currentIndex;
            const SIcon = s.tagIcon;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="group relative flex items-center gap-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none"
                style={{
                  padding: active ? "7px 13px 7px 10px" : "7px 10px",
                  background: active ? s.accentAlpha : "rgba(255,255,255,0.05)",
                  border: active ? `1px solid ${s.accent}55` : "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
                aria-label={s.label}
              >
                <SIcon
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: active ? s.accent : "rgba(255,255,255,0.32)" }}
                />
                {active && (
                  <motion.span
                    className="text-[10.5px] font-semibold whitespace-nowrap"
                    style={{ color: s.accent }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {s.label}
                  </motion.span>
                )}
                {!active && (
                  <span
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-[10px] font-semibold text-white px-2.5 py-1.5 rounded-lg"
                    style={{
                      background: "rgba(0,0,0,0.92)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {s.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Stats Card — white, partially straddling hero/TrustedBy border on desktop ── */}
      <div className="relative z-20 px-4 mt-8 md:absolute md:bottom-0 md:left-0 md:right-0 md:transform md:translate-y-1/2">
        <div
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 max-w-6xl mx-auto bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.10)] border border-slate-100"
        >
          {stats.map((stat, idx) => {
            const SIcon = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-5 md:p-6"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500"
                  style={{ background: slide.accentAlpha }}
                >
                  <SIcon className="w-[18px] h-[18px]" style={{ color: slide.accent }} />
                </div>
                <div>
                  <div
                    className="font-bold text-slate-900 leading-none mb-1"
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "22px",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[12px] font-semibold text-slate-700 leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-[10.5px] text-slate-400 mt-0.5 leading-tight">
                    {stat.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Cursor blink keyframe (injected once) ─────────────────── */}
      <style>{`
        @keyframes hero-cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
