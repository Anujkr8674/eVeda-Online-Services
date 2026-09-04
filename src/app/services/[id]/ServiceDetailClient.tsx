"use client";

import { 
  CheckCircle2, ArrowRight, Mail, Phone, MapPin, Send, AlertCircle, Sparkles, Check
} from "lucide-react";
import { useState } from "react";
import ServiceHero from "@/components/sections/ServiceHero";
import PremiumCapabilities from "@/components/sections/PremiumCapabilities";
import { ServiceDetail } from "@/lib/services-data";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import { COMPANY } from "@/lib/utils";
import WebServiceDetail from "@/components/sections/WebServiceDetail";
import MobileServiceDetail from "@/components/sections/MobileServiceDetail";
import SaasServiceDetail from "@/components/sections/SaasServiceDetail";
import AiServiceDetail from "@/components/sections/AiServiceDetail";
import CloudServiceDetail from "@/components/sections/CloudServiceDetail";
import DevOpsServiceDetail from "@/components/sections/DevOpsServiceDetail";
import WhatsappServiceDetail from "@/components/sections/WhatsappServiceDetail";
import SeoServiceDetail from "@/components/sections/SeoServiceDetail";
import SmmServiceDetail from "@/components/sections/SmmServiceDetail";
import PpcServiceDetail from "@/components/sections/PpcServiceDetail";
import VideoEditingServiceDetail from "@/components/sections/VideoEditingServiceDetail";
import GraphicDesignServiceDetail from "@/components/sections/GraphicDesignServiceDetail";
import BookDesigningServiceDetail from "@/components/sections/BookDesigningServiceDetail";
import BookBrandingServiceDetail from "@/components/sections/BookBrandingServiceDetail";
import ProcessSteps from "@/components/sections/ProcessSteps";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import { triggerOnboardingModal } from "@/components/shared/OnboardingModal";
import Portfolio from "@/components/sections/Portfolio";
import { useWebSettings } from "@/context/WebSettingsContext";

// Helper to convert hex to RGB
function hexToRgb(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return isNaN(r) || isNaN(g) || isNaN(b) ? "124, 58, 237" : `${r}, ${g}, ${b}`;
}

// Interactive 3D Card wrapper for Pricing and Key sections
function Interactive3DCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-120, 120], [10, -10]);
  const rotateY = useTransform(x, [-120, 120], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-shadow duration-300 relative cursor-pointer group ${className}`}
    >
      <div 
        className="absolute -inset-1.5 rounded-[24px] bg-gradient-to-tr from-purple-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none" 
        style={{ transform: "translateZ(-5px)" }}
      />
      <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }} className="w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

export default function ServiceDetailClient({ service }: { service: ServiceDetail }) {
  const { settings } = useWebSettings();

  if (service.id === "web") {
    return <WebServiceDetail service={service} />;
  }
  if (service.id === "mobile") {
    return <MobileServiceDetail service={service} />;
  }
  if (service.id === "saas") {
    return <SaasServiceDetail service={service} />;
  }
  if (service.id === "ai") {
    return <AiServiceDetail service={service} />;
  }
  if (service.id === "cloud") {
    return <CloudServiceDetail service={service} />;
  }
  if (service.id === "devops") {
    return <DevOpsServiceDetail service={service} />;
  }
  if (service.id === "whatsapp-marketing") {
    return <WhatsappServiceDetail service={service} />;
  }
  if (service.id === "seo") {
    return <SeoServiceDetail service={service} />;
  }
  if (service.id === "social-media-marketing") {
    return <SmmServiceDetail service={service} />;
  }
  if (service.id === "ppc") {
    return <PpcServiceDetail service={service} />;
  }
  if (service.id === "3d-video-editing") {
    return <VideoEditingServiceDetail service={service} />;
  }
  if (service.id === "graphic-designing") {
    return <GraphicDesignServiceDetail service={service} />;
  }
  if (service.id === "book-designing") {
    return <BookDesigningServiceDetail service={service} />;
  }
  if (service.id === "book-branding") {
    return <BookBrandingServiceDetail service={service} />;
  }

  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    try {
      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service: service.title }),
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const rgb = hexToRgb(service.accent);
  const customStyles = {
    "--accent-global": service.accent,
    "--accent-global-hover": `${service.accent}dd`,
    "--accent-global-dim": `rgba(${rgb}, 0.08)`,
    "--accent-global-rgb": rgb,
  } as React.CSSProperties;

  return (
    <div className="bg-[#fafbfc] min-h-screen text-slate-800 overflow-hidden" style={customStyles}>

      {/* Smooth Page Hero Entrance */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ServiceHero
          title={service.headline.split(" ").slice(0, 4).join(" ")}
          titleHighlight={service.headline.split(" ").slice(4).join(" ")}
          description={service.description}
          breadcrumbs={[
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
        />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-16">

        {/* 1. Key Features Grid */}
        <PremiumCapabilities 
          serviceId={service.id} 
          serviceTitle={service.title} 
          features={service.features} 
        />

        {/* 2. Tech Stack Section with dynamic pills */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 border border-slate-100 bg-white rounded-3xl px-6 my-12 shadow-[0_15px_40px_rgba(0,0,0,0.03)]"
        >
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-widest text-[var(--accent-global)] mb-3 block">
              TECHNOLOGY STACK
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-sora mb-8">
              Built with Modern, Scalable Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {service.techStack.map((tech, idx) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-800 font-bold text-xs transition-all hover:border-[var(--accent-global)] hover:bg-white hover:-translate-y-0.5 cursor-pointer"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 3. Our Process Workflow - light themed 4-step cards */}
        <ProcessSteps steps={service.process} serviceTitle={service.title} />

        {/* 3.5. Portfolio Section */}
        <div className="w-[100vw] relative left-1/2 -translate-x-1/2">
          <Portfolio />
        </div>

        {/* 4. Pricing Tiers with 3D cards */}
        <section className="py-16 border-t border-slate-100 my-12" id="estimate-calculator">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[var(--accent-global)] mb-3 block">
              PRICING & BUDGETS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-sora">
              Transparent Pricing Packages
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {service.pricing.map((tier, idx) => (
              <Interactive3DCard
                key={tier.tier}
                className={`rounded-3xl p-8 border ${
                  idx === 1 
                    ? "border-[var(--accent-global)] bg-[var(--accent-global-dim)] shadow-[0_15px_40px_rgba(var(--accent-global-rgb),0.06)]" 
                    : "bg-white border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-900 font-extrabold text-sm font-sora">{tier.tier}</span>
                    {idx === 1 && (
                      <span 
                        className="text-[9px] font-bold px-2.5 py-1 rounded-full uppercase text-white bg-[var(--accent-global)] shadow-md shadow-[0_4px_12px_rgba(var(--accent-global-rgb),0.25)]"
                      >
                        Popular Choice
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-2 font-sora">{tier.price}</div>
                  <p className="text-slate-500 text-xs mb-6 leading-relaxed">{tier.desc}</p>
                  
                  <div className="space-y-3 mb-8 pt-6 border-t border-slate-100">
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs text-slate-650">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-[var(--accent-global)]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => triggerOnboardingModal({ type: "package", preselectedPackage: tier.tier, serviceType: service.title, accentColor: service.accent })}
                  className={`w-full h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 mt-4 cursor-pointer ${
                    idx === 1
                      ? "bg-[var(--accent-global)] text-white hover:bg-[var(--accent-global-hover)] shadow-md shadow-[0_4px_12px_rgba(var(--accent-global-rgb),0.2)] hover:shadow-[0_6px_18px_rgba(var(--accent-global-rgb),0.35)]"
                      : "text-slate-800 border border-slate-200 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  Select Package <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Interactive3DCard>
            ))}
          </div>
        </section>

      </div>

      {/* 5. Custom Service Contact Form */}
      <section className="border-t relative overflow-hidden bg-slate-950 border-white/[0.06] pb-0 pt-20" id="contact-project-form">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.12] blur-[120px]" style={{ background: "radial-gradient(circle, var(--accent-global) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.07] blur-[100px]" style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 pb-20 relative z-10">
          
          {/* Header aligned center */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent-global)] bg-[var(--accent-global-dim)] border border-[var(--accent-global)]/20 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
              Start Project
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sora text-white leading-tight mb-4">
              Let&apos;s Build Your Custom <span className="text-[var(--accent-global)]">{service.title} Solution</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              Provide some initial details regarding your requirements and budget range, and our technical architects will get back to you with a comprehensive scope report in 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
            
            {/* Left side: Form card (white, shadow-2xl, no top line) */}
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
                    <p className="text-xs text-slate-550 mb-4 leading-relaxed">
                      Our system registered your lead details. Our {service.title} engineering leads will review it shortly.
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
                        placeholder={`Tell us about your ${service.title} project requirements, target goals, and expected delivery timeline...`}
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

            {/* Right side: Info panels matching homepage */}
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

        {/* ── MARQUEE (below map) ── */}
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
              {[...Array(2)].map((_, i) => (
                <span key={`a${i}`} className="inline-flex items-center gap-6 px-6">
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
              {[...Array(2)].map((_, i) => (
                <span key={`b${i}`} className="inline-flex items-center gap-6 px-6">
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

    </div>
  );
}
