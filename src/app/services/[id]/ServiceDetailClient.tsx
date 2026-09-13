"use client";

import ProjectContactForm from "@/components/sections/ProjectContactForm";

import { 
  CheckCircle2, ArrowRight, Mail, Phone, MapPin, Send, AlertCircle, Sparkles, Check
} from "lucide-react";
import { useState, useEffect } from "react";
import ServiceHero from "@/components/sections/ServiceHero";
import PremiumCapabilities from "@/components/sections/PremiumCapabilities";
import { ServiceDetail } from "@/lib/services-data";
import { FaLinkedinIn, FaYoutube, FaGithub } from "react-icons/fa";
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
    <div className="bg-[#fafbfc] min-h-screen text-slate-800 overflow-x-clip w-full max-w-full" style={customStyles}>

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
        <div className="w-full relative overflow-hidden">
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

      {/* ── 9. High-Converting Lead Proposal Form ── */}
      <ProjectContactForm 
        title={service.title} 
        itemType="service" 
        accentColor={service.accent} 
      />

    </div>
  );
}
