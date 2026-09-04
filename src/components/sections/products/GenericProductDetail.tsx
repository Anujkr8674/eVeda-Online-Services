"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Users, Shield, Cloud, Zap, Check, ArrowRight,
  ChevronLeft, ChevronRight, AlertCircle, MapPin, Mail, Phone,
  MousePointerClick, ShieldCheck, Rocket, X, Play, Settings,
  CheckCircle2
} from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import { ProductDetail } from "@/lib/products-data";
import ProductHero from "./ProductHero";
import TrustedBy from "../TrustedBy";
import PremiumCapabilities from "../PremiumCapabilities";
import ProductBentoFeatures from "./ProductBentoFeatures";
import TechStack from "../TechStack";
import InteractiveTiltCard from "@/components/shared/InteractiveTiltCard";
import { triggerOnboardingModal } from "@/components/shared/OnboardingModal";
import { triggerBookDemoModal } from "@/components/shared/BookDemoModal";
import { COMPANY } from "@/lib/utils";
import { useWebSettings } from "@/context/WebSettingsContext";


// Helper to convert hex to RGB
function hexToRgb(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return isNaN(r) || isNaN(g) || isNaN(b) ? "99, 102, 241" : `${r}, ${g}, ${b}`;
}

export default function GenericProductDetail({ product }: { product: ProductDetail }) {
  const { settings } = useWebSettings();
  // Form State
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);
  
  // Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Floating CTA state
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [dismissedCta, setDismissedCta] = useState(false);

  // Testimonial State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: `eVeda ${product.title} transformed how our team handles daily workflows. We scaled our operations 4x faster and maintain perfect data compliance. Truly the best system we have ever deployed.`,
      name: "Sarah Jenkins",
      role: "Operations Director, FinTech Corp",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
      stars: 5
    },
    {
      quote: `The integration capabilities and robust dashboard architecture are absolute lifesavers. What used to take hours now takes seconds. It integrates flawlessly with our existing corporate cloud workflow.`,
      name: "David Chen",
      role: "VP of Technology, Global Logistics",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      stars: 5
    },
    {
      quote: `Automatic compliance verification and hardware synchronization gave our security compliance officer complete peace of mind. Setup took less than a week. Highly recommend their enterprise support team.`,
      name: "Marcus Brody",
      role: "IT Director, HealthGroup",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
      stars: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Handle scroll to show sticky CTA bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowFloatingCta(true);
      } else {
        setShowFloatingCta(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    try {
      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service: product.title }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSending(false);
        return;
      }
      setLeadId(data.leadId ?? null);
      setSent(true);
      setForm({ name: "", email: "", phone: "", budget: "", message: "" });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const rgb = hexToRgb(product.accent);
  const customStyles = {
    "--accent-global": product.accent,
    "--accent-global-hover": `${product.accent}dd`,
    "--accent-global-dim": `rgba(${rgb}, 0.08)`,
    "--accent-global-rgb": rgb,
  } as React.CSSProperties;

  // Decide mockups based on product
  const productImages: Record<string, { mockup: string; steps: string }> = {
    dms: { mockup: "/images/dms_mockup.png", steps: "/images/dms_steps.png" },
    lms: { mockup: "/images/lms_mockup.png", steps: "/images/lms_steps.png" },
    hms: { mockup: "/images/hms_mockup.png", steps: "/images/hms_steps.png" },
    ott: { mockup: "/images/ott_mockup.png", steps: "/images/ott_steps.png" },
    "school-erp": { mockup: "/images/sms_mockup.png", steps: "/images/sms_steps.png" },
    marketplace: { mockup: "/images/market_mockup.png", steps: "/images/market_steps.png" },
    pos: { mockup: "/images/pos_mockup.png", steps: "/images/pos_steps.png" },
    crm: { mockup: "/images/crm_mockup.png", steps: "/images/crm_steps.png" },
    logistics: { mockup: "/images/logistic_mockup.png", steps: "/images/logistics_steps.png" },
    inventory: { mockup: "/images/inventory_mockup.png", steps: "/images/inventory_steps.png" },
    ecommerce: { mockup: "/images/ecommerce_mockup.png", steps: "/images/ecommerce_steps.png" },
    hrms: { mockup: "/images/hr_mockup.png", steps: "/images/hr_steps.png" },
  };

  const images = productImages[product.id] || {
    mockup: "/images/saas_dashboard_mockup.png",
    steps: "/images/saas_dashboard_mockup.png"
  };
  const heroMockup = images.mockup;
  const stepsMockup = images.steps;

  return (
    <div className="min-h-screen text-[var(--text-secondary)] bg-[var(--bg-primary)] relative" style={customStyles}>

      {/* ── 1. Product Hero ── */}
      <ProductHero
        label={product.title}
        tagline="Enterprise SaaS • Secure & Scalable"
        title1={product.headline.split(" ").slice(0, 3).join(" ")}
        title2={product.headline.split(" ").slice(3, -2).join(" ")}
        titleHighlight={product.headline.split(" ").slice(-2).join(" ")}
        description={product.description}
        accent={product.accent}
        accentHover={`${product.accent}cc`}
        accentAlpha={`rgba(${rgb}, 0.14)`}
        ctaText="Request a Demo"
        secondaryText="Explore Features"
        features={product.features.slice(0, 3)}
        cardStat="250k+"
        cardStatLabel="Active Transactions"
        mockupImage={heroMockup}
        stats={[
          { value: "500k+",  label: "Active Users",        sub: "Trusted daily",             icon: Users },
          { value: "99.9%", label: "Uptime SLA",           sub: "Guaranteed reliability",    icon: Zap },
          { value: "24/7",  label: "Support Available",    sub: "Dedicated account team",    icon: Cloud },
        ]}
      />

      <TrustedBy />

      {/* ── 2. Premium Capabilities ── */}
      <PremiumCapabilities
        serviceId={product.id}
        serviceTitle={product.title}
        features={product.features}
      />

      {/* ── 3. Bento Features Section ── */}
      <ProductBentoFeatures 
        productTitle={product.title}
        features={product.bentoFeatures}
        accentColor={product.accent}
      />

      {/* ── 4. Technology Ecosystem ── */}
      <TechStack />

      {/* ── 5. Onboarding Steps Section ── */}
      <section className="py-20 sm:py-24 bg-white relative overflow-visible">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative overflow-visible">
          
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-4"
              style={{
                background: "var(--accent-global-dim)",
                color: "var(--accent-global)",
                border: "1px solid rgba(var(--accent-global-rgb), 0.25)",
              }}
            >
              15-Day Free Trial
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-4"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Get Started with eVeda {product.title} <br />
              <span style={{ color: "var(--accent-global)" }}>in 3 Simple Steps</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Experience the power of our intelligent {product.title}. Submit your request and start automating workflows in minutes.
            </p>
          </div>

          <div 
            className="relative bg-slate-50/70 border border-slate-100 rounded-[36px] p-6 sm:p-10 md:p-12 lg:p-14 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center overflow-visible"
            style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.02)" }}
          >
            {/* Left Column: 3 Steps */}
            <div className="lg:col-span-7 space-y-8 relative z-20">
              
              {/* Step 1 */}
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0 shadow-sm border border-amber-200/50">
                  <MousePointerClick className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900 font-sora">1. Submit Details</h4>
                  <p className="text-slate-550 text-sm leading-relaxed font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Fill out our quick demo form with your team requirements and scaling parameters so we can customize your workspace.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-200/60 ml-16" />

              {/* Step 2 */}
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full bg-sky-100/85 text-sky-600 flex items-center justify-center shrink-0 shadow-sm border border-sky-200/50">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900 font-sora">2. Custom Sandbox Approved</h4>
                  <p className="text-slate-550 text-sm leading-relaxed font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Our engineers review your application and provision a secure custom sandbox environment loaded with product features within 2 hours.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-200/60 ml-16" />

              {/* Step 3 */}
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0 shadow-sm border border-rose-200/50">
                  <Rocket className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900 font-sora">3. Start Operating</h4>
                  <p className="text-slate-550 text-sm leading-relaxed font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Log in with secure admin credentials, invite your department members, and begin automating daily processes instantly.
                  </p>
                </div>
              </div>

              {/* Book Free Demo Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => triggerBookDemoModal({ productName: product.title, accentColor: product.accent })}
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-extrabold rounded-full px-8 py-4 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  style={{
                    background: "var(--accent-global)",
                    boxShadow: "0 6px 20px rgba(var(--accent-global-rgb), 0.35)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Book Free Demo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Mockup Image */}
            <div className="lg:col-span-5 h-[350px] sm:h-[400px] lg:h-[420px] relative overflow-visible mt-8 lg:mt-0 flex justify-center lg:block">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full blur-3xl opacity-60 pointer-events-none -z-10" 
                style={{ background: "radial-gradient(circle, var(--accent-global) 0%, transparent 70%)" }}
              />
              
              <InteractiveTiltCard className="absolute -top-16 -bottom-16 lg:-top-28 lg:-bottom-28 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-8 w-[280px] sm:w-[320px] lg:w-[460px] h-[calc(100%+128px)] lg:h-[calc(100%+224px)] flex items-center justify-center overflow-visible z-20">
                <img
                  src={stepsMockup}
                  alt={`${product.title} Interface Mockup`}
                  className="w-full h-full object-contain drop-shadow-[0_24px_55px_rgba(0,0,0,0.18)]"
                />
              </InteractiveTiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section className="py-20 sm:py-24 bg-[#000000] border-t border-white/[0.08] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 50%, var(--accent-global) 0%, transparent 110%)", opacity: 0.12 }} />
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          <div 
            className="relative bg-white/[0.03] border border-white/[0.08] rounded-[36px] p-8 md:p-14 lg:p-16 grid lg:grid-cols-12 gap-12 items-center"
            style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)" }}
          >
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-4"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Always Here To Help You Succeed
                </span>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-white mb-4 font-sora"
                >
                  Real Stories From Real Users <br />
                  <span style={{ color: "var(--accent-global)" }}>Discover the difference</span>
                </h2>
              </div>

              {/* Metrics */}
              <div className="flex items-center gap-8 sm:gap-12 pt-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 font-mono flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[var(--accent-global)]" /> Active Pipelines
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-black text-white font-sora">10M+</h3>
                </div>

                <div className="w-px h-12 bg-white/10" />

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Satisfaction Rate
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-black text-white font-sora">98.5%</h3>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center overflow-visible">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full blur-3xl opacity-75 pointer-events-none -z-10 animate-pulse" 
                style={{ 
                  background: `radial-gradient(circle, rgba(${rgb}, 0.8) 0%, rgba(${rgb}, 0.4) 50%, transparent 75%)`,
                  animationDuration: "6s"
                }}
              />

              <div className="relative w-full max-w-[480px] h-[340px] md:h-[360px] flex items-center justify-center overflow-visible">
                {testimonials.map((t, idx) => {
                  const offset = (idx - activeTestimonial + testimonials.length) % testimonials.length;
                  const isTop = offset === 0;

                  return (
                    <motion.div
                      key={idx}
                      style={{
                        zIndex: 30 - offset,
                        transformOrigin: "bottom center",
                        background: isTop ? "#ffffff" : "rgba(255, 255, 255, 0.95)",
                        borderColor: "rgba(0, 0, 0, 0.08)",
                        boxShadow: isTop ? "0 25px 50px rgba(0,0,0,0.18), 0 4px 18px rgba(0,0,0,0.02)" : "0 10px 30px rgba(0,0,0,0.08)",
                      }}
                      animate={{
                        scale: 1 - offset * 0.04,
                        y: offset * 12,
                        x: offset * 12,
                        rotate: offset * 1.5,
                        opacity: offset <= 2 ? 1 - offset * 0.35 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 22,
                      }}
                      className="absolute inset-0 border rounded-[28px] p-6 sm:p-8 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <div className="flex gap-0.5">
                            {Array.from({ length: t.stars }).map((_, s) => (
                              <svg key={s} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.86-4.53-6.16-4.53z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                          </svg>
                        </div>
                        <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed italic" style={{ fontFamily: "'Inter', sans-serif" }}>
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={t.avatar}
                            alt={t.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-100"
                          />
                          <div>
                            <h5 className="font-extrabold text-slate-900 text-sm font-sora leading-tight">{t.name}</h5>
                            <p className="text-slate-500 text-[10.5px] font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>{t.role}</p>
                          </div>
                        </div>

                        {isTop && (
                          <div className="flex gap-2 shrink-0">
                            <button 
                              onClick={handlePrev}
                              className="w-9 h-9 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center transition-all duration-200 text-slate-600 cursor-pointer"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={handleNext}
                              className="w-9 h-9 rounded-full bg-[var(--accent-global)] hover:opacity-90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                              style={{ boxShadow: "0 4px 12px rgba(var(--accent-global-rgb), 0.25)" }}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Premium FAQ Section ── */}
      <section className="relative w-full overflow-hidden py-24 sm:py-32 border-y border-white/[0.08] bg-[#050B14]">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, var(--accent-global) 0%, transparent 110%)" }} />
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="lg:sticky lg:top-32"
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-5"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255, 0.3)",
                }}
              >
                FAQs
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-white mb-6"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Everything you want to <span style={{ color: "#ffffff" }}>know</span>
              </h2>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                Can&apos;t find the answer you&apos;re looking for? Reach out to our engineering team directly.
              </p>
              <a
                href="#contact-project-form"
                className="inline-flex items-center gap-2 text-sm font-bold rounded-xl px-6 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg bg-white"
                style={{
                  color: "var(--accent-global)",
                  boxShadow: "0 4px 14px rgba(0,0,0, 0.15)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Ask a Question
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              className="space-y-3"
            >
              {product.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-[22px] border overflow-hidden transition-all duration-300"
                    style={{
                      background: isOpen ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                      borderColor: isOpen ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)",
                      boxShadow: isOpen ? "0 8px 30px rgba(0,0,0, 0.1)" : "0 2px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 transition-all duration-300"
                          style={{
                            background: isOpen ? "#fff" : "rgba(255,255,255,0.15)",
                            color: isOpen ? "var(--accent-global)" : "#fff",
                            fontFamily: "'Sora', sans-serif",
                          }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="font-bold text-sm sm:text-[15px] text-white leading-snug"
                          style={{ fontFamily: "'Sora', sans-serif" }}
                        >
                          {faq.question}
                        </span>
                      </div>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                        style={{
                          background: isOpen ? "#fff" : "rgba(255,255,255,0.15)",
                          color: isOpen ? "var(--accent-global)" : "#fff",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2.5}>
                          <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                        </svg>
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 pl-[4.25rem]">
                            <p
                              className="text-white/90 text-sm leading-relaxed"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 7. Pricing Packages ── */}
      <section className="relative w-full overflow-hidden bg-white" id="pricing-packages">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-24 sm:py-32">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-5"
              style={{
                background: "var(--accent-global-dim)",
                color: "var(--accent-global)",
                border: "1px solid rgba(var(--accent-global-rgb), 0.25)",
              }}
            >
              Pricing & Budgets
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-4"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Simple, <span style={{ color: "var(--accent-global)" }}>Transparent</span> Pricing
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Choose a tier that matches your current operational scale. All options transfer 100% IP ownership upon delivery.
            </p>
          </motion.div>

          {/* 3 Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 items-stretch mb-14">
            {product.pricing.map((tier, idx) => {
              const isPopular = idx === 1;
              return (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: idx * 0.1 }}
                  className={`relative rounded-[28px] p-8 flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
                    isPopular
                      ? "border-[var(--accent-global)] bg-[var(--accent-global)]"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
                  }`}
                  style={{
                    boxShadow: isPopular
                      ? "0 24px 60px rgba(var(--accent-global-rgb), 0.25)"
                      : "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-white text-[10px] font-black uppercase tracking-widest shadow-md" style={{ color: "var(--accent-global)" }}>
                        ★ Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <div
                      className={`text-[11px] font-black uppercase tracking-widest mb-3 ${isPopular ? "text-white/60" : "text-slate-400"}`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {tier.tier}
                    </div>
                    <div
                      className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 ${isPopular ? "text-white" : "text-slate-900"}`}
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {tier.price}
                    </div>
                    <p
                      className={`text-[13px] leading-relaxed ${isPopular ? "text-white/70" : "text-slate-500"}`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {tier.desc}
                    </p>
                  </div>

                  <div
                    className={`space-y-3 mb-8 pt-6 border-t flex-1 ${isPopular ? "border-white/20" : "border-slate-100"}`}
                  >
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            isPopular ? "bg-white/20" : "bg-[var(--accent-global-dim)]"
                          }`}
                        >
                          <Check
                            className="w-3 h-3 stroke-[2.5]"
                            style={{ color: isPopular ? "#fff" : "var(--accent-global)" }}
                          />
                        </div>
                        <span
                          className={`text-[13px] font-medium ${isPopular ? "text-white" : "text-slate-700"}`}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => triggerOnboardingModal({ type: "package", preselectedPackage: tier.tier, serviceType: product.title, accentColor: product.accent })}
                    className={`w-full h-12 rounded-xl font-bold text-[13px] flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                      isPopular
                        ? "bg-white text-[var(--accent-global)] hover:bg-slate-50"
                        : "border-2 border-slate-200 text-slate-800 hover:border-[var(--accent-global)] hover:text-[var(--accent-global)]"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Get Started <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[28px] border border-slate-200 overflow-hidden"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 border-b border-slate-200">
              <div
                className="w-10 h-6 rounded-full flex items-center relative cursor-default"
                style={{ background: "var(--accent-global, #7c3aed)" }}
              >
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm" />
              </div>
              <span className="text-sm font-bold text-slate-700" style={{ fontFamily: "'Inter', sans-serif" }}>
                Compare plans to find your best fit
              </span>
            </div>

            <div
              className="grid border-b border-slate-200"
              style={{ gridTemplateColumns: "1fr repeat(3, minmax(0, 1fr))" }}
            >
              <div className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                Feature
              </div>
              {product.pricing.map((tier, i) => (
                <div
                  key={i}
                  className={`px-4 py-4 text-center text-[12px] font-extrabold ${i === 1 ? "text-white" : "text-slate-700"}`}
                  style={{
                    background: i === 1 ? "var(--accent-global, #7c3aed)" : "transparent",
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  {tier.tier}
                </div>
              ))}
            </div>

            {product.pricing[0].features.map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="grid border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                style={{ gridTemplateColumns: "1fr repeat(3, minmax(0, 1fr))" }}
              >
                <div
                  className="px-6 py-4 text-[13px] font-semibold text-slate-600"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {product.pricing[0].features[rowIdx] ?? "—"}
                </div>
                {product.pricing.map((tier, colIdx) => (
                  <div key={colIdx} className="px-4 py-4 flex items-center justify-center">
                    {tier.features[rowIdx] ? (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: "var(--accent-global-dim)" }}
                      >
                        <Check
                          className="w-3.5 h-3.5 stroke-[2.5]"
                          style={{ color: "var(--accent-global)" }}
                        />
                      </div>
                    ) : (
                      <span className="text-slate-300 text-lg font-light">—</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </section>

      {/* ── 9. Lead Proposal Form ── */}
      <section className="border-t relative overflow-hidden bg-slate-950 border-white/[0.06] pb-0 pt-20" id="contact-project-form">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.12] blur-[120px]" style={{ background: "radial-gradient(circle, var(--accent-global) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.07] blur-[100px]" style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 pb-20 relative z-10">
          <div className="text-center mb-16">
            <span 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent-global)] bg-[var(--accent-global-dim)] border mb-3" 
              style={{ fontFamily: "'Inter', sans-serif", borderColor: "rgba(var(--accent-global-rgb), 0.2)" }}
            >
              Start Project
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sora text-white leading-tight mb-4">
              Let&apos;s Build Your <span className="text-[var(--accent-global)]">Custom {product.title}</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              Provide some initial details regarding your requirements and budget range, and our technical architects will get back to you with a comprehensive scope report in 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
            
            {/* Left side: Form card */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/40 overflow-hidden">
              <div className="p-8 sm:p-10">
                {sent ? (
                  <div className="text-center py-12">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border text-[var(--accent-global)]"
                      style={{ backgroundColor: "rgba(var(--accent-global-rgb), 0.1)", borderColor: "rgba(var(--accent-global-rgb), 0.2)" }}
                    >
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="text-slate-900 font-bold text-lg mb-2 font-sora">Project Request Sent!</h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      Our system registered your lead details. Our engineering leads will review it shortly.
                    </p>
                    {leadId && (
                      <div className="inline-block px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                        <p className="text-[10px] font-mono text-slate-400">
                          Reference Code: <span className="text-[var(--accent-global)] font-bold">{leadId}</span>
                        </p>
                      </div>
                    )}
                    <div>
                      <button
                        type="button"
                        onClick={() => { setSent(false); setLeadId(null); }}
                        className="text-xs font-bold text-[var(--accent-global)] hover:underline cursor-pointer"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-bold text-slate-700 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Full Name *</label>
                        <input
                          type="text" required value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Enter your full name"
                          className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 transition-all duration-200"
                          style={{ "--tw-ring-color": "rgba(var(--accent-global-rgb), 0.2)" } as any}
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-slate-700 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Email Address *</label>
                        <input
                          type="email" required value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="Enter your email address"
                          className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 transition-all duration-200"
                          style={{ "--tw-ring-color": "rgba(var(--accent-global-rgb), 0.2)" } as any}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-bold text-slate-700 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Phone Number *</label>
                        <input
                          type="tel" required value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="Enter your phone number"
                          className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 transition-all duration-200"
                          style={{ "--tw-ring-color": "rgba(var(--accent-global-rgb), 0.2)" } as any}
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-slate-700 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Estimated Budget</label>
                        <select
                          value={form.budget}
                          onChange={(e) => setForm({ ...form, budget: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 outline-none focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 transition-all duration-200 cursor-pointer"
                          style={{ "--tw-ring-color": "rgba(var(--accent-global-rgb), 0.2)" } as any}
                        >
                          <option value="">Select range</option>
                          <option value="startup">Startup Tier (Under ₹4 Lakhs)</option>
                          <option value="growth">Growth Tier (₹4 - ₹10 Lakhs)</option>
                          <option value="enterprise">Enterprise Tier (Custom Quote)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-bold text-slate-700 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Project Specifics *</label>
                      <textarea
                        required rows={4} value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={`Tell us about your custom ${product.title} requirements, expected integrations, and delivery timelines...`}
                        className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 transition-all duration-200 leading-relaxed"
                        style={{ "--tw-ring-color": "rgba(var(--accent-global-rgb), 0.2)" } as any}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full h-12 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 rounded-full transition-all duration-300 cursor-pointer shadow-lg"
                      style={{ background: "var(--accent-global, #7c3aed)", boxShadow: "0 6px 20px rgba(var(--accent-global-rgb), 0.35)" }}
                    >
                      {sending ? "Submitting..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right side: Info panels */}
            <div className="space-y-5 lg:pt-2">
              {[
                { icon: Mail,   label: "Email Us",  value: COMPANY.email,    href: `mailto:${COMPANY.email}` },
                { icon: Phone,  label: "Call Us",   value: COMPANY.phone,    href: `tel:${COMPANY.phone}` },
                { icon: MapPin, label: "Location",  value: COMPANY.location, href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="flex items-center gap-4 bg-slate-900 border border-white/[0.07] hover:border-[var(--accent-global)]/40 rounded-2xl p-5 transition-all duration-200 group hover:bg-slate-800/80">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent-global-dim)] border border-[var(--accent-global)]/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg">
                    <Icon className="w-5 h-5 text-[var(--accent-global)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</div>
                    <div className="text-sm font-semibold text-white truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{value}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--accent-global)] shrink-0" />
                </a>
              ))}

              <div className="bg-slate-900 border border-white/[0.07] rounded-2xl p-5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Connect With Us</p>
                <div className="flex gap-3">
                  {[
                    { icon: FaLinkedinIn, href: COMPANY.social.linkedin, label: "LinkedIn" },
                    { icon: FaTwitter,    href: COMPANY.social.twitter,  label: "Twitter" },
                    { icon: FaGithub,     href: COMPANY.social.github,   label: "GitHub" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-white/[0.06] hover:border-[var(--accent-global)]/40 py-3 rounded-xl text-xs font-semibold transition-all duration-200 text-slate-350 hover:text-white"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <Icon className="w-4 h-4 text-[var(--accent-global)]" />{label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/[0.07] rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  <div className="text-white font-bold text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>Available Right Now</div>
                </div>
                <p className="text-[12px] leading-relaxed text-slate-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Our team typically responds within <span className="text-white font-semibold">2–4 hours</span> during business hours (IST). Guaranteed response within 24 hours.
                </p>
                <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-3 text-center">
                  {[{ v: "150+", l: "Projects" }, { v: "50+", l: "Clients" }, { v: "4.9★", l: "Rating" }].map((s) => (
                    <div key={s.l}>
                      <div className="text-white font-bold text-base" style={{ fontFamily: "'Sora', sans-serif" }}>{s.v}</div>
                      <div className="text-slate-550 text-[10px] font-semibold uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── MAP (full width) ── */}
        <div className="relative w-full z-0">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-950 via-slate-950/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-950/90 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/[0.14] shadow-xl whitespace-nowrap">
            <MapPin className="w-4 h-4 text-[var(--accent-global)] shrink-0" />
            <span className="text-xs font-bold text-white tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>{settings.address}</span>
          </div>
          <iframe
            src={settings.mapEmbed || "https://maps.google.com/maps?q=53+eVeda+Online+Services+Aryanagar+Haridwar&t=&z=13&ie=UTF8&iwloc=&output=embed"}
            width="100%" height="420"
            style={{ border: 0, display: "block", filter: "invert(92%) hue-rotate(180deg) brightness(0.82) saturate(0.6) contrast(0.88)" }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Eveda Online Services Office Location"
          />
        </div>

        {/* ── MARQUEE ── */}
        <div className="relative overflow-hidden bg-slate-950 py-10">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes contact-marquee {
              0%   { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .contact-marquee-track {
              display: flex;
              width: max-content;
              animation: contact-marquee 22s linear infinite;
            }
            .contact-marquee-wrap:hover .contact-marquee-track {
              animation-play-state: paused;
            }
          `}} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 100% at 50% 50%, var(--accent-global-dim) 0%, transparent 70%)", opacity: 0.55 }} />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgb(2_6_23)_100%)]" />
          <div className="contact-marquee-wrap relative z-10 w-full overflow-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)" }}>
            <div className="contact-marquee-track text-[52px] sm:text-[80px] md:text-[100px] font-black tracking-tighter uppercase select-none font-sora">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="inline-flex items-center gap-6 px-6">
                  <span className="text-white/90">GET IN</span>
                  <span style={{ color: "var(--accent-global)" }}>TOUCH</span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/90">START YOUR</span>
                  <span style={{ color: "var(--accent-global)" }}>PROJECT</span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/90">BUILD THE</span>
                  <span style={{ color: "var(--accent-global)" }}>FUTURE</span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/90">EVEDA ONLINE</span>
                  <span style={{ color: "var(--accent-global)" }}>SERVICES</span>
                  <span className="text-white/20">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ── 10. Floating Bottom Conversion Bar ── */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-xl transition-all duration-500 ease-out transform ${
          showFloatingCta && !dismissedCta ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[var(--bg-surface)]/90 backdrop-blur-md border border-white/[0.08] rounded-full px-5 py-3 shadow-[0_15px_50px_rgba(0,0,0,0.3)] flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <div className="text-[10px] font-extrabold text-[var(--accent-global)] uppercase tracking-widest">Get Custom Estimate</div>
            <div className="text-white text-xs font-bold font-sora mt-0.5 truncate max-w-[200px]">Free technical scope blueprint.</div>
          </div>
          <div className="sm:hidden text-xs font-bold text-white font-sora truncate max-w-[120px]">
            Free Tech Scope Blueprint
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerOnboardingModal({ type: "package", preselectedPackage: "15% Promo Discount Blueprint", serviceType: product.title, accentColor: product.accent })}
              className="bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white font-bold text-[10px] sm:text-xs px-4 sm:px-5 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-md shadow-[0_4px_12px_rgba(var(--accent-global-rgb),0.15)] cursor-pointer"
            >
              Claim 15% Discount <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setDismissedCta(true)}
              className="w-7 h-7 rounded-full border border-white/[0.1] hover:border-white/[0.2] bg-white/[0.02] hover:bg-white/[0.05] flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
