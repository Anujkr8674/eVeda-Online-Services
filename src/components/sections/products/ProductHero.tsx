"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight, Shield, FileText, PlayCircle, Check,
} from "lucide-react";
import { triggerBookDemoModal } from "@/components/shared/BookDemoModal";

/* ── Props ────────────────────────────────────────────────────────── */
interface ProductHeroProps {
  label: string;
  tagline: string;
  title1: string;
  title2: string;
  titleHighlight: string;
  description: string;
  accent: string;
  accentHover: string;
  accentAlpha: string;
  ctaText?: string;
  secondaryText?: string;
  features: string[];
  cardStat: string;
  cardStatLabel: string;
  mockupImage: string;
  stats: { value: string; label: string; sub: string; icon: any }[];
}

/* ── Typewriter — identical to Hero.tsx ──────────────────────────── */
function useTypewriter(text: string, speed = 110) {
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
      if (i >= text.length) { setDone(true); clearInterval(id); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return { displayed, done };
}

/* ── Mouse-track tilt ─────────────────────────────────────────────── */
function useMockupTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 120, damping: 22, mass: 0.6 };
  const sx = useSpring(rawX, springCfg);
  const sy = useSpring(rawY, springCfg);
  const rotateY  = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const rotateX  = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const translateX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(sy, [-0.5, 0.5], [-6, 6]);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onMouseLeave = () => { rawX.set(0); rawY.set(0); };

  return { ref, rotateX, rotateY, translateX, translateY, onMouseMove, onMouseLeave };
}

/* ── Component ───────────────────────────────────────────────────── */
export default function ProductHero({
  label,
  tagline,
  title1,
  title2,
  titleHighlight,
  description,
  accent,
  accentHover,
  accentAlpha,
  ctaText = "Request a Demo",
  secondaryText = "Explore Features",
  features,
  cardStat,
  cardStatLabel,
  mockupImage,
  stats,
}: ProductHeroProps) {
  const [mounted, setMounted] = useState(false);
  const { displayed, done } = useTypewriter(titleHighlight, 110);
  const {
    ref: tiltRef,
    rotateX,
    rotateY,
    translateX,
    translateY,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  } = useMockupTilt();

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true);
      document.documentElement.style.setProperty("--hero-accent", accent);
      document.documentElement.style.setProperty("--hero-accent-hover", accentHover);
    });
    return () => cancelAnimationFrame(raf);
  }, [accent, accentHover]);

  const glowTop = `radial-gradient(ellipse 55% 55% at 75% 10%, ${accent}38 0%, transparent 70%)`;

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative overflow-x-clip overflow-y-visible w-full max-w-full"
      /* Extra bottom padding so stats card (translate-y-1/2) doesn't clip mockup */
      style={{ minHeight: "100vh", background: "#000000", paddingTop: "110px", paddingBottom: "80px" }}
    >
      {/* ── Video — identical to Hero.tsx ─────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {mounted && (
          <video autoPlay muted loop playsInline preload="none"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.6 }}>
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* ── Overlays — identical to Hero.tsx ─────────────────────── */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(110deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.80) 45%, rgba(0,0,0,0.35) 100%)" }} />
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,1) 100%)" }} />
      <div className="absolute inset-0 z-[3] pointer-events-none"
        style={{ background: glowTop }} />

      {/* ── Main Grid ────────────────────────────────────────────── */}
      <div className="ng-container relative z-10 w-full h-full flex flex-col justify-center gap-10"
        style={{ minHeight: "calc(100vh - 190px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-14 items-center w-full">

          {/* ── LEFT ─────────────────────────────────────────────── */}
          <div className="flex flex-col">
            {/* Badge */}
            <motion.div className="flex flex-wrap items-center gap-3 mb-5"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest"
                style={{ background: accentAlpha, border: `1px solid ${accent}55`, color: accent }}>
                <Shield className="w-3.5 h-3.5" />{label}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest hidden sm:block"
                style={{ color: "rgba(255,255,255,0.30)", letterSpacing: "0.13em" }}>{tagline}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-white font-extrabold leading-[1.10] mb-5"
              style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(32px, 4.2vw, 54px)", letterSpacing: "-0.03em" }}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}>
              {title1}<br />{title2}<br />
              <span style={{ color: accent, textShadow: `0 0 32px ${accent}55` }}>
                {displayed}
                {!done && <span style={{ display: "inline-block", width: "3px", height: "0.85em", background: accent, marginLeft: "3px", verticalAlign: "middle", borderRadius: "2px", animation: "hero-cursor-blink 0.7s step-end infinite" }} />}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p className="text-[14px] md:text-[15px] leading-[1.78] mb-7 max-w-[490px]"
              style={{ color: "rgba(255,255,255,0.48)" }}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}>
              {description}
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-row items-center gap-2 mb-7"
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}>
              <button 
                onClick={(e) => {
                  if (ctaText.toLowerCase().includes("demo")) {
                    e.preventDefault();
                    triggerBookDemoModal({ productName: label, accentColor: accent });
                  } else {
                    scrollTo("contact-project-form")(e);
                  }
                }}
                className="group inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-white rounded-full transition-all duration-300 px-6 py-3 shrink-0 whitespace-nowrap cursor-pointer"
                style={{ background: accent, boxShadow: `0 6px 26px ${accent}50` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = accentHover; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = accent; e.currentTarget.style.transform = "translateY(0)"; }}>
                {ctaText}<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button onClick={scrollTo("features-section")}
                className="inline-flex items-center justify-center gap-2 text-[13px] font-medium text-white/65 rounded-full border transition-all duration-300 hover:text-white hover:bg-white/[0.07] hover:border-white/30 px-6 py-3 shrink-0 whitespace-nowrap cursor-pointer"
                style={{ border: "1px solid rgba(255,255,255,0.13)" }}>
                <PlayCircle className="w-4 h-4" />{secondaryText}
              </button>
            </motion.div>

            {/* Feature chips */}
            <motion.div className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}>
              {features.map((f, i) => (
                <div key={i}
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-medium rounded-lg"
                  style={{ padding: "6px 13px", color: "rgba(255,255,255,0.50)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <Shield className="w-3 h-3" style={{ color: accent }} />{f}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — full-width mockup, NO overlapping card ────── */}
          <div className="hidden lg:block relative"
            ref={tiltRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1200px" }}>

            {/* Glow blob */}
            <div className="absolute inset-0 -z-10 blur-[80px] rounded-3xl pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 60% 50%, ${accent}30 0%, transparent 65%)` }} />

            {/* Tiltable image */}
            <motion.div
              style={{ rotateX, rotateY, translateX, translateY, transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
              <img
                src={mockupImage}
                alt="DMS Dashboard — Laptop & Mobile Mockup"
                className="w-full h-auto object-contain select-none"
                draggable={false}
                style={{ filter: `drop-shadow(0 30px 80px ${accent}45) drop-shadow(0 8px 40px rgba(0,0,0,0.7))` }}
              />
            </motion.div>

            {/* Floating pill — top left of image */}
            <motion.div
              className="absolute top-[8%] left-0 flex items-center gap-2.5 rounded-2xl px-3.5 py-2 z-10"
              style={{ background: "rgba(6,6,16,0.88)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.75 }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: accentAlpha, border: `1px solid ${accent}44` }}>
                <FileText className="w-3.5 h-3.5" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: accent }}>Today&apos;s Uploads</p>
                <p className="text-white font-black text-[16px] leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>+1,245</p>
              </div>
            </motion.div>

            {/* Floating live pill — bottom right of image */}
            <motion.div
              className="absolute bottom-[18%] right-0 flex items-center gap-2 rounded-full px-3.5 py-1.5 z-10"
              style={{ background: "rgba(6,6,16,0.90)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.9 }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-white text-[11px] font-bold">AES-256 Encrypted</span>
            </motion.div>

            {/* Floating stat pill — bottom left */}
            <motion.div
              className="absolute bottom-[8%] left-2 flex items-center gap-2 rounded-2xl px-3.5 py-2 z-10"
              style={{ background: "rgba(6,6,16,0.88)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", boxShadow: "0 8px 24px rgba(0,0,0,0.45)" }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.05 }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${accent}20`, border: `1px solid ${accent}44` }}>
                <Check className="w-3.5 h-3.5" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Active Users</p>
                <p className="text-white font-black text-[16px] leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>10K+</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Stats Card — same as Hero.tsx, straddling bottom ─────── */}
      <div className="relative z-20 px-4 md:absolute md:bottom-0 md:left-0 md:right-0 md:transform md:translate-y-1/2">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 max-w-6xl mx-auto bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.10)] border border-slate-100 w-full min-w-0 overflow-hidden">
          {stats.map((stat, idx) => {
            const SIcon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 md:p-6 min-w-0">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: accentAlpha }}>
                  <SIcon className="w-[18px] h-[18px]" style={{ color: accent }} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 leading-none mb-1"
                    style={{ fontFamily: "Sora, sans-serif", fontSize: "22px", letterSpacing: "-0.03em" }}>{stat.value}</div>
                  <div className="text-[12px] font-semibold text-slate-700 leading-tight">{stat.label}</div>
                  <div className="text-[10.5px] text-slate-400 mt-0.5 leading-tight">{stat.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes hero-cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
