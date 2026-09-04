"use client";

import { useState, useEffect } from "react";
import { 
  Check, ArrowRight, Mail, Phone, MapPin, AlertCircle, 
  Code2, Zap, Globe, ChevronDown, ChevronUp,
  Cpu, Layers, Award, Sparkles, Terminal, CheckCircle2,
  Shield, Database, CreditCard, RefreshCw, Smartphone, ChevronRight, X
} from "lucide-react";
import Link from "next/link";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import { ServiceDetail } from "@/lib/services-data";
import { COMPANY } from "@/lib/utils";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import React from "react";
import ServiceHero from "@/components/sections/ServiceHero";
import PremiumCapabilities from "@/components/sections/PremiumCapabilities";
import SectionHeader from "@/components/ui/SectionHeader";
import TechStack from "@/components/sections/TechStack";
import ProcessSteps from "@/components/sections/ProcessSteps";
import { triggerOnboardingModal } from "@/components/shared/OnboardingModal";
import Portfolio from "@/components/sections/Portfolio";
import { useWebSettings } from "@/context/WebSettingsContext";

// Interactive 3D Parallax Tilt Card Component
function InteractiveTiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [12, -12]);
  const rotateY = useTransform(x, [-150, 150], [-12, 12]);

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
      {/* 3D glow */}
      <div 
        className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-purple-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" 
        style={{ transform: "translateZ(-10px)" }}
      />
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

// DevOps specific FAQs for SEO FAQPage schema
const devopsFaqs = [
  {
    question: "What does a CI/CD pipeline actually do?",
    answer: "Continuous Integration and Continuous Deployment automates testing and server releases. Every time a developer pushes code, the pipeline runs tests, packages the app, and deploys it to the server with zero manual intervention."
  },
  {
    question: "Can you containerize our legacy monolithic app?",
    answer: "Yes, we can wrap your existing code in Docker containers, allowing it to run predictably anywhere, and orchestrate it using Kubernetes for better scaling and resilience."
  },
  {
    question: "What happens if a deployment fails?",
    answer: "Our pipelines include automated health checks. If a newly deployed version fails to boot or throws errors, the system instantly rolls back to the previous stable version, ensuring users never see downtime."
  },
  {
    question: "How do you monitor application health?",
    answer: "We set up comprehensive observability stacks using tools like Prometheus for metrics, Grafana for visualization, and the ELK stack for centralized logging, complete with Slack/Email alerts."
  }
];

// Icons for Process Workflow Steps
const processStepIcons = [Terminal, Code2, Globe];

// Helper to convert hex to RGB
function hexToRgb(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return isNaN(r) || isNaN(g) || isNaN(b) ? "124, 58, 237" : `${r}, ${g}, ${b}`;
}

export default function DevOpsServiceDetail({ service }: { service: ServiceDetail }) {
  const { settings } = useWebSettings();
  // Form State
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);
  
  // Interactive Calculator State
  const [calcStep, setCalcStep] = useState<number>(1);
  const [projectType, setProjectType] = useState<string>("b2b");
  const [billingModel, setBillingModel] = useState<"fixed" | "retainer">("fixed");
  const [pageCount, setPageCount] = useState<number>(5);
  const [hasGithubActions, setHasGithubActions] = useState(true);
  const [hasK8s, setHasK8s] = useState(true);
  const [hasPrometheus, setHasPrometheus] = useState(false);
  const [hasElk, setHasElk] = useState(false);
  const [hasSecurity, setHasSecurity] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState<number>(350000);

  // Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Floating CTA state
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [dismissedCta, setDismissedCta] = useState(false);

  // Quick Hero email conversion
  const [heroEmail, setHeroEmail] = useState("");

  // Recalculate price dynamically when options change
  useEffect(() => {
    let basePrice = 120000;
    
    // Project Type Multiplier
    if (projectType === "mvp") basePrice = 250000;
    else if (projectType === "b2b") basePrice = 450000;
    else if (projectType === "b2c") basePrice = 600000;
    else if (projectType === "enterprise") basePrice = 850000;

    // Pages cost
    basePrice += pageCount * 12000;

    // Feature toggles
    if (hasGithubActions) basePrice += 40000;
    if (hasK8s) basePrice += 80000;
    if (hasPrometheus) basePrice += 50000;
    if (hasElk) basePrice += 70000;
    if (hasSecurity) basePrice += 35000;

    // Billing model discount (Monthly Retainer gets 10% off the setup estimate)
    if (billingModel === "retainer") {
      basePrice = Math.round(basePrice * 0.9);
    }

    setEstimatedCost(basePrice);
  }, [projectType, pageCount, hasGithubActions, hasK8s, hasPrometheus, hasElk, hasSecurity, billingModel]);

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

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroEmail) {
      setForm((prev) => ({ ...prev, email: heroEmail }));
      const targetElement = document.getElementById("contact-project-form");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleApplyEstimate = () => {
    let messageString = `Calculator Estimate Selected:
- Project Type: ${projectType.toUpperCase()}
- Engagement Model: ${billingModel === "fixed" ? "Fixed Price" : "Monthly Retainer"}
- Pages: ${pageCount}
- GitHub Actions CI/CD: ${hasGithubActions ? "Yes" : "No"}
- Kubernetes Orchestration: ${hasK8s ? "Yes" : "No"}
- Prometheus/Grafana: ${hasPrometheus ? "Yes" : "No"}
- ELK Logging: ${hasElk ? "Yes" : "No"}
- Security Scanning: ${hasSecurity ? "Yes" : "No"}
- Calculated Cost: ₹${estimatedCost.toLocaleString("en-IN")}`;
    
    const featuresList: string[] = [];
    if (hasGithubActions) featuresList.push("GitHub Actions CI/CD");
    if (hasK8s) featuresList.push("Kubernetes Orchestration");
    if (hasPrometheus) featuresList.push("Prometheus/Grafana");
    if (hasElk) featuresList.push("ELK Logging Stack");
    if (hasSecurity) featuresList.push("Security Scanning");

    triggerOnboardingModal({
      type: "quote",
      preselectedPackage: `Custom Estimate (₹${estimatedCost.toLocaleString("en-IN")})`,
      serviceType: service.title,
      accentColor: service.accent,
      customQuoteDetails: {
        cost: estimatedCost,
        projectType,
        billingModel,
        pageCount,
        features: featuresList
      }
    });
  };

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

  const rgb = hexToRgb(service.accent);
  const customStyles = {
    "--accent-global": service.accent,
    "--accent-global-hover": `${service.accent}dd`,
    "--accent-global-dim": `rgba(${rgb}, 0.08)`,
    "--accent-global-rgb": rgb,
  } as React.CSSProperties;

  return (
    <div className="min-h-screen text-[var(--text-secondary)] bg-[var(--bg-primary)] relative overflow-hidden" style={customStyles}>
      {/* Background Grids & Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.12] blur-[140px] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent-global) 0%, transparent 80%)" }} />
      <div className="absolute top-[30%] right-[-10%] w-[45%] h-[45%] rounded-full opacity-[0.08] blur-[120px] pointer-events-none" style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 80%)" }} />
      <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] rounded-full opacity-[0.10] blur-[110px] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent-global) 0%, transparent 80%)" }} />

      {/* ── 1. Service Hero Section ── */}
      <ServiceHero
        title="CI/CD & DevOps Engineering Built For"
        titleHighlight="Velocity & Unbreakable Reliability"
        description={service.description}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <PremiumCapabilities
        serviceId={service.id}
        serviceTitle={service.title}
        features={service.features}
      />

      {/* ── 2. Head-to-Head Comparison (CMS vs Headless NextGen) ── */}
      <section className="py-24 border-b border-white/[0.06] relative z-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="mb-20"
          >
            <SectionHeader
              badge="ARCHITECTURE COMPARISON"
              title="Why Manual Operations"
              titleHighlight="Break Systems"
              description="A side-by-side comparison of manual code deployments versus our fully automated, resilient CI/CD pipelines."
              align="center"
              theme="dark"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-[1400px] mx-auto w-full"
          >
            {/* Desktop Table View (md and up) - Flex columns to keep card borders solid */}
            <div className="hidden md:flex items-start gap-8 relative z-10 w-full">
              
              {/* Left Side Table (58.33% width) */}
              <div className="w-[58.33%] pt-5">
                {/* Header Row */}
                <div className="h-11 flex items-end pb-3 border-b border-white/[0.08] w-full">
                  <div className="grid grid-cols-7 w-full items-center">
                    <div className="col-span-4" />
                    <div className="col-span-3 text-slate-500 font-bold uppercase text-[10px] tracking-widest text-left pl-4">
                      MANUAL DEPLOYMENTS
                    </div>
                  </div>
                </div>

                {/* Data Rows */}
                {[
                  { feature: "CODE RELEASES", value: "Prone to human error" },
                  { feature: "TESTING", value: "Manual clicks & checks" },
                  { feature: "ROLLBACKS", value: "Panic & manual fixes" },
                  { feature: "SCALING", value: "Adding servers by hand" },
                  { feature: "MONITORING", value: "Waiting for users to complain" },
                  { feature: "ENVIRONMENT SETUP", value: "Works on my machine" },
                  { feature: "SECURITY", value: "Reactive patching" }
                ].map((item, idx) => (
                  <div key={idx} className="grid grid-cols-7 h-[60px] items-center border-b border-white/[0.06] last:border-b-0">
                    {/* Feature name */}
                    <div className="col-span-4 font-bold text-slate-200 text-[10px] tracking-widest text-left uppercase">
                      {item.feature}
                    </div>
                    {/* Value */}
                    <div className="col-span-3 text-slate-450 text-xs pl-4 text-left">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Side Card (41.67% width) */}
              <div 
                className="w-[41.67%] rounded-[24px] border border-white/[0.06] p-5 shadow-2xl relative overflow-hidden"
                style={{
                  background: "#181622",
                  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.05)"
                }}
              >
                {/* Card Header (outside inner box) */}
                <div className="h-11 flex items-center justify-center pb-3">
                  <div className="text-sm font-black tracking-tight font-sora text-white flex items-center gap-1">
                    eveda <span className="font-light text-slate-450">solutions</span>
                  </div>
                </div>

                {/* Card Inner Rows Container */}
                <div 
                  className="rounded-[18px] border border-white/[0.08] overflow-hidden relative"
                  style={{
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%), #1E1C2A"
                  }}
                >
                  {/* Subtle Top-Left Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,222,128,0.06),transparent_50%)] pointer-events-none" />

                  {/* Card Rows */}
                  {[
                    "100% automated & consistent",
                    "Automated unit & E2E gates",
                    "Instant zero-downtime reverts",
                    "Kubernetes auto-scaling",
                    "Real-time metrics & alerts",
                    "Identical Docker containers",
                    "Automated vulnerability scans"
                  ].map((value, idx) => (
                    <div key={idx} className="h-[60px] flex items-center gap-3.5 pl-6 pr-4 border-b border-white/[0.05] last:border-b-0">
                      <div className="w-5 h-5 rounded-full bg-[#4ADE80] flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(74,222,128,0.25)]">
                        <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3.5]" />
                      </div>
                      <span className="text-white font-bold text-[13px]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Mobile View (Stacked Cards) */}
            <div className="block md:hidden space-y-4">
              {[
                { feature: "CODE RELEASES", traditional: "Prone to human error", nextgen: "100% automated & consistent" },
                { feature: "TESTING", traditional: "Manual clicks & checks", nextgen: "Automated unit & E2E gates" },
                { feature: "ROLLBACKS", traditional: "Panic & manual fixes", nextgen: "Instant zero-downtime reverts" },
                { feature: "SCALING", traditional: "Adding servers by hand", nextgen: "Kubernetes auto-scaling" },
                { feature: "MONITORING", traditional: "Waiting for users to complain", nextgen: "Real-time metrics & alerts" },
                { feature: "ENVIRONMENT SETUP", traditional: "Works on my machine", nextgen: "Identical Docker containers" },
                { feature: "SECURITY", traditional: "Reactive patching", nextgen: "Automated vulnerability scans" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  className="bg-[var(--bg-surface)] border border-white/[0.08] rounded-2xl p-5 space-y-3"
                >
                  <div className="text-[10px] uppercase tracking-widest font-black text-slate-400">
                    {item.feature}
                  </div>
                  
                  {/* Traditional */}
                  <div className="flex items-start gap-2.5 text-xs text-slate-400">
                    <span className="text-red-400 font-bold shrink-0">✕</span>
                    <span>{item.traditional}</span>
                  </div>

                  {/* NextGen */}
                  <div className="flex items-start gap-2.5 text-xs text-white font-bold bg-white/[0.03] p-3 rounded-xl border border-white/[0.05]">
                    <Check className="w-4 h-4 text-emerald-450 shrink-0 mt-0.5" />
                    <span>{item.nextgen}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Interactive Calculator Section ── */}
      <section className="py-20 bg-[#F7F8FA] border-y border-slate-200/70 relative z-10" id="calculator">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

          {/* ── Heading ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10"
          >
            <SectionHeader
              badge="Pricing Estimator"
              title="Build Your"
              titleHighlight="Custom Quote"
              description="Answer 4 quick questions and get a transparent, instant estimate — no sales calls needed."
              align="center"
              theme="light"
            />
          </motion.div>

          {/* ── Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="rounded-[28px] border border-slate-200/80 bg-white overflow-hidden grid md:grid-cols-12"
            style={{boxShadow:"0 8px 40px rgba(10,14,40,0.07), 0 1px 3px rgba(10,14,40,0.04)"}}
          >

            {/* Slider CSS */}
            <style dangerouslySetInnerHTML={{__html:`
              .calc-r::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--accent-global, #000);cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.22);transition:transform .15s}
              .calc-r::-webkit-slider-thumb:hover{transform:scale(1.15)}
              .calc-r::-moz-range-thumb{width:18px;height:18px;border:none;border-radius:50%;background:var(--accent-global, #000);cursor:pointer}
              .calc-r::-webkit-slider-runnable-track{background:linear-gradient(to right,var(--accent-global, #000) var(--pct,0%),#e2e8f0 var(--pct,0%));border-radius:999px}
            `}}/>

            {/* ═══ LEFT CONFIGURATOR ═══ */}
            <div className="md:col-span-8 p-6 sm:p-10" style={{fontFamily:"'Inter',sans-serif"}}>

              {/* Step Progress Bar */}
              <div className="flex items-center gap-0 mb-8">
                {[1,2,3,4].map((s) => (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <button
                      onClick={() => calcStep > s && setCalcStep(s)}
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-black transition-all duration-300 flex-shrink-0 ${
                        s < calcStep
                          ? "bg-[var(--accent-global)] text-white cursor-pointer animate-pulse"
                          : s === calcStep
                          ? "bg-[var(--accent-global)] text-white ring-4 ring-[var(--accent-global)]/20 scale-110"
                          : "bg-slate-100 text-slate-400 cursor-default"
                      }`}
                    >
                      {s < calcStep ? "✓" : s}
                    </button>
                    {s < 4 && (
                      <div className="flex-1 h-[2px] mx-2 rounded-full overflow-hidden bg-slate-100">
                        <div className={`h-full bg-[var(--accent-global)] rounded-full transition-all duration-500 ${calcStep > s ? "w-full" : "w-0"}`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Step Labels */}
              <div className="grid grid-cols-4 text-center mb-8 -mt-5">
                {["Project Type","Engagement","Pages","Add-ons"].map((lbl, i) => (
                  <span key={i} className={`text-[9px] font-extrabold uppercase tracking-widest transition-colors duration-200 ${
                    i + 1 === calcStep ? "text-[var(--accent-global)] font-black" : i + 1 < calcStep ? "text-slate-500" : "text-slate-300"
                  }`}>{lbl}</span>
                ))}
              </div>

              {/* ── STEP 1: Project Type ── */}
              {calcStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 font-sora mb-1">What are you building?</p>
                    <p className="text-xs text-slate-400 font-medium">Choose the type that best matches your vision.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {([
                      { id:"mvp",       label:"Basic CI/CD",      desc:"Automate single server deployments",    base:250000, icon:"⚙️" },
                      { id:"b2b",       label:"Docker Migration", desc:"Containerize existing monoliths",       base:450000, icon:"🐳" },
                      { id:"b2c",       label:"K8s Cluster",      desc:"High-availability orchestration",       base:600000, icon:"🚢" },
                      { id:"enterprise",label:"Enterprise SRE",   desc:"Advanced observability & SLAs",         base:850000, icon:"🏢" },
                    ] as {id:string;label:string;desc:string;base:number;icon:string}[]).map((t) => {
                      const sel = projectType === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => { setProjectType(t.id as any); setTimeout(() => setCalcStep(2), 320); }}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 group ${
                            sel
                              ? "text-slate-900 shadow-md"
                              : "border-slate-200 bg-white hover:border-slate-400 hover:shadow-md"
                          }`}
                          style={sel ? { borderColor: "var(--accent-global)", backgroundColor: "var(--accent-global-dim)" } : {}}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-xl mt-0.5">{t.icon}</span>
                            <div>
                              <p className={`text-sm font-extrabold tracking-tight ${sel ? "text-slate-950 font-black" : "text-slate-800"}`}>{t.label}</p>
                              <p className={`text-[11px] mt-0.5 ${sel ? "text-slate-650 font-medium" : "text-slate-400"}`}>{t.desc}</p>
                              <p className="text-xs font-black font-mono mt-1.5 text-[var(--accent-global)]">from ₹{t.base.toLocaleString("en-IN")}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 2: Engagement Model ── */}
              {calcStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 font-sora mb-1">How do you want to work?</p>
                    <p className="text-xs text-slate-400 font-medium">This determines the billing structure and timeline.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {([
                      { id:"fixed",    label:"Fixed Price",       desc:"Defined scope, one-time delivery. Best for clear requirements.", tag:"Most Common", tagColor:"bg-blue-50 text-blue-700 border-blue-100" },
                      { id:"retainer", label:"Monthly Retainer",  desc:"Ongoing dev, priority support, 10% off. Best for growing products.", tag:"Save 10%",    tagColor:"bg-emerald-50 text-emerald-700 border-emerald-100" },
                    ] as {id:string;label:string;desc:string;tag:string;tagColor:string}[]).map((opt) => {
                      const sel = billingModel === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => { setBillingModel(opt.id as any); setTimeout(() => setCalcStep(3), 320); }}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                            sel ? "text-slate-900 shadow-md" : "border-slate-200 bg-white hover:border-slate-400 hover:shadow-md"
                          }`}
                          style={sel ? { borderColor: "var(--accent-global)", backgroundColor: "var(--accent-global-dim)" } : {}}
                        >
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border mb-2 inline-block ${sel ? "" : opt.tagColor}`}
                                style={sel ? { backgroundColor: "var(--accent-global)", color: "#ffffff", border: "none" } : {}}
                          >{opt.tag}</span>
                          <p className={`text-sm font-extrabold ${sel ? "text-slate-950 font-black" : "text-slate-800"}`}>{opt.label}</p>
                          <p className={`text-[11px] mt-1 ${sel ? "text-slate-650 font-medium" : "text-slate-400"}`}>{opt.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={() => setCalcStep(1)} className="text-xs text-slate-400 hover:text-slate-600 font-semibold transition-colors mt-1">← Back</button>
                </div>
              )}

              {/* ── STEP 3: Pages ── */}
              {calcStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 font-sora mb-1">How many pages?</p>
                    <p className="text-xs text-slate-400 font-medium">Each additional page beyond the first adds ₹8,000.</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold text-slate-600">Pages / Screens</span>
                      <span className="text-2xl font-black text-black font-mono">{pageCount}</span>
                    </div>
                    <input
                      type="range" min={1} max={25} value={pageCount}
                      onChange={(e) => setPageCount(parseInt(e.target.value))}
                      className="calc-r w-full h-[3px] bg-slate-200 rounded-full appearance-none cursor-pointer outline-none block"
                      style={{"--pct": `${(pageCount - 1) / 24 * 100}%`} as any}
                    />
                    <div className="flex justify-between mt-3 text-[9px] font-bold text-slate-400 font-mono">
                      {[1,5,10,15,20,25].map(v => <span key={v} className={pageCount >= v ? "text-slate-700" : ""}>{v}</span>)}
                    </div>
                    {pageCount > 1 && (
                      <p className="mt-3 text-xs font-semibold text-[var(--accent-global)]">+ ₹{((pageCount - 1) * 8000).toLocaleString("en-IN")} for {pageCount - 1} extra {pageCount - 1 === 1 ? "page" : "pages"}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <button onClick={() => setCalcStep(2)} className="text-xs text-slate-400 hover:text-slate-600 font-semibold transition-colors">← Back</button>
                    <button
                      onClick={() => setCalcStep(4)}
                      className="px-6 py-2.5 rounded-xl bg-[var(--accent-global)] text-white text-xs font-extrabold uppercase tracking-widest hover:bg-[var(--accent-global-hover)] transition-all duration-200 shadow-md hover:-translate-y-0.5 cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 4: Add-ons ── */}
              {calcStep === 4 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 font-sora mb-1">Any add-on features?</p>
                    <p className="text-xs text-slate-400 font-medium">Toggle what you need — pricing updates instantly.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {([
                      { stateKey:"auth",     label:"GitHub Actions Setup",    sub:"Automated testing & deployments",    price:40000, badge:"Standard",   bc:"text-blue-600 bg-blue-50 border-blue-200" },
                      { stateKey:"payments", label:"Kubernetes (K8s)",        sub:"Containerized scaling clusters",     price:80000, badge:"Popular",    bc:"text-emerald-600 bg-emerald-50 border-emerald-200" },
                      { stateKey:"dashboards",label:"Prometheus & Grafana",   sub:"Real-time resource dashboards",      price:50000, badge:"Analytics",  bc:"text-amber-600 bg-amber-50 border-amber-200" },
                      { stateKey:"whitelabel",label:"ELK Stack Logging",      sub:"Centralized application logs",       price:70000, badge:"Enterprise", bc:"text-purple-600 bg-purple-50 border-purple-200" },
                      { stateKey:"customdomain",label:"Security Scanning",    sub:"Automated vulnerability pipelines",  price:35000, badge:"Security",   bc:"text-cyan-600 bg-cyan-50 border-cyan-200" },
                      { stateKey:"seo",      label:"Technical SEO Setup",     sub:"Meta, schema, Core Web Vitals",      price:20000, badge:"Growth",     bc:"text-rose-600 bg-rose-50 border-rose-200" },
                    ] as {stateKey:string;label:string;sub:string;price:number;badge:string;bc:string}[]).map((svc) => {
                      const map: Record<string, [boolean, (v:boolean)=>void]> = {
                        auth:         [hasGithubActions, setHasGithubActions],
                        payments:     [hasK8s,           setHasK8s],
                        dashboards:   [hasPrometheus,    setHasPrometheus],
                        whitelabel:   [hasElk,           setHasElk],
                        customdomain: [hasSecurity,      setHasSecurity],
                        seo:          [hasGithubActions, setHasGithubActions],
                      };
                      const [on, toggle] = map[svc.stateKey];
                      return (
                        <button
                          key={svc.stateKey}
                          type="button"
                          onClick={() => toggle(!on)}
                          className={`w-full text-left flex items-center gap-3 py-3 px-4 rounded-2xl border-2 transition-all duration-200 ${
                            on ? "text-slate-900 shadow-md" : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                          }`}
                          style={on ? { borderColor: "var(--accent-global)", backgroundColor: "var(--accent-global-dim)" } : {}}
                        >
                          {/* Toggle Knob */}
                          <div 
                            className={`flex-shrink-0 w-9 h-5 rounded-full relative transition-all duration-300 ${on ? "" : "bg-slate-100"}`}
                            style={on ? { backgroundColor: "rgba(var(--accent-global-rgb), 0.3)" } : {}}
                          >
                            <div 
                              className={`w-4 h-4 rounded-full absolute top-0.5 transition-all duration-300 shadow ${on ? "translate-x-4" : "bg-slate-400 translate-x-0.5"}`}
                              style={on ? { backgroundColor: "var(--accent-global)" } : {}}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`text-xs font-extrabold ${on ? "text-slate-950 font-black" : "text-slate-800"}`}>{svc.label}</span>
                              {!on && <span className={`text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full border ${svc.bc}`}>{svc.badge}</span>}
                            </div>
                            <p className={`text-[10px] mt-0.5 truncate ${on ? "text-slate-650 font-medium" : "text-slate-400"}`}>{svc.sub}</p>
                          </div>
                          <span className="text-[10px] font-black font-mono flex-shrink-0 text-[var(--accent-global)]">+₹{svc.price.toLocaleString("en-IN")}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={() => setCalcStep(3)} className="text-xs text-slate-400 hover:text-slate-600 font-semibold transition-colors">← Back</button>
                </div>
              )}

              {/* Completed selections recap chips */}
              {calcStep > 1 && (
                <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-100">
                  {projectType && (
                    <button 
                      onClick={() => setCalcStep(1)} 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-global-dim)] text-[var(--accent-global)] border text-[10px] font-bold transition-all cursor-pointer"
                      style={{ borderColor: "rgba(var(--accent-global-rgb), 0.2)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(var(--accent-global-rgb), 0.15)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(var(--accent-global-rgb), 0.08)"; }}
                    >
                      {projectType === "mvp" ? "Basic CI/CD" : projectType === "b2b" ? "Docker Migration" : projectType === "b2c" ? "K8s Cluster" : "Enterprise SRE"}
                      <span className="opacity-50 text-[8px]">✎</span>
                    </button>
                  )}
                  {calcStep > 2 && (
                    <button 
                      onClick={() => setCalcStep(2)} 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-global-dim)] text-[var(--accent-global)] border text-[10px] font-bold transition-all cursor-pointer"
                      style={{ borderColor: "rgba(var(--accent-global-rgb), 0.2)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(var(--accent-global-rgb), 0.15)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(var(--accent-global-rgb), 0.08)"; }}
                    >
                      {billingModel === "fixed" ? "Fixed Price" : "Monthly Retainer"}
                      <span className="opacity-50 text-[8px]">✎</span>
                    </button>
                  )}
                  {calcStep > 3 && (
                    <button 
                      onClick={() => setCalcStep(3)} 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-global-dim)] text-[var(--accent-global)] border text-[10px] font-bold transition-all cursor-pointer"
                      style={{ borderColor: "rgba(var(--accent-global-rgb), 0.2)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(var(--accent-global-rgb), 0.15)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(var(--accent-global-rgb), 0.08)"; }}
                    >
                      {pageCount} {pageCount === 1 ? "page" : "pages"}
                      <span className="opacity-50 text-[8px]">✎</span>
                    </button>
                  )}
                </div>
              )}

            </div>

            {/* ═══ RIGHT SUMMARY ═══ */}
            <div
              className="md:col-span-4 flex flex-col justify-between p-6 sm:p-8 relative text-white"
              style={{background:"var(--accent-global)", fontFamily:"'Inter',sans-serif"}}
            >
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-0.5">Your Estimate</p>
                  <h3 className="text-lg font-black text-white font-sora">Summary</h3>
                </div>

                <div className="space-y-2 text-[12px] font-semibold text-white/90">
                  {projectType ? (
                    <div className="flex justify-between">
                      <span>{projectType === "mvp" ? "Basic CI/CD" : projectType === "b2b" ? "Docker Migration" : projectType === "b2c" ? "K8s Cluster" : "Enterprise SRE"}</span>
                      <span className="font-black text-white font-mono">Base</span>
                    </div>
                  ) : <p className="text-[11px] text-white/50 italic">Select a project type to begin…</p>}
                  {pageCount > 1 && <div className="flex justify-between"><span>+ {pageCount} pages</span><span className="font-black font-mono">₹{((pageCount-1)*8000).toLocaleString("en-IN")}</span></div>}
                  {hasGithubActions && <div className="flex justify-between"><span>+ GitHub Actions</span><span className="font-black font-mono">₹40,000</span></div>}
                  {hasK8s && <div className="flex justify-between"><span>+ Kubernetes</span><span className="font-black font-mono">₹80,000</span></div>}
                  {hasPrometheus && <div className="flex justify-between"><span>+ Prometheus/Grafana</span><span className="font-black font-mono">₹50,000</span></div>}
                  {hasElk && <div className="flex justify-between"><span>+ ELK Logging</span><span className="font-black font-mono">₹70,000</span></div>}
                  {hasSecurity && <div className="flex justify-between"><span>+ Security Scanning</span><span className="font-black font-mono">₹35,000</span></div>}
                  {billingModel === "retainer" && (
                    <div className="flex justify-between text-white/80"><span>Retainer discount</span><span className="font-black font-mono">–10%</span></div>
                  )}
                </div>

                <div className="h-px bg-white/20" />

                {/* Promo */}
                <div className="rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-0.5">Promo Code</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-white">EVEDA10</span>
                    <span className="text-[8px] font-black text-white bg-white/20 px-2 py-0.5 rounded-full border border-white/10">10% OFF</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-6 md:mt-0">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Total Estimate</p>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-0.5 font-sora tracking-tight">
                    ₹{estimatedCost.toLocaleString("en-IN")}
                  </div>
                  {billingModel === "retainer" && (
                    <p className="text-[10px] font-bold text-white/80 mt-0.5">Retainer discount applied</p>
                  )}
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="terms_agree2" defaultChecked className="mt-0.5 w-4 h-4 rounded cursor-pointer" style={{accentColor:"var(--accent-global)"}} />
                  <label htmlFor="terms_agree2" className="text-[10px] leading-snug text-white/85 cursor-pointer font-medium">
                    I agree to the <span className="underline font-bold text-white">Terms of Service</span>.
                  </label>
                </div>

                <button
                  onClick={handleApplyEstimate}
                  className="w-full bg-white text-slate-900 font-extrabold text-[11px] uppercase tracking-widest py-3.5 rounded-xl shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                  style={{fontFamily:"'Inter',sans-serif"}}
                >
                  Book Free Consultation
                </button>

                <p className="text-[9px] text-white/60 text-center font-medium">
                  No payment now. Free 30-min strategy call.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
{/* ── 4. Technology Ecosystem (Home Page TechStack) ── */}
      <TechStack />

      {/* ── 5. Our Process Workflow (light-themed, 4 steps) ── */}
      <ProcessSteps steps={service.process} serviceTitle={service.title} />

      {/* ── 5.5. Portfolio Section ── */}
      <Portfolio />

      {/* ── 6. Premium FAQ Section (dark background) ── */}
      <section className="relative w-full overflow-hidden py-24 sm:py-32 border-y border-white/[0.08] bg-[#050B14]">
        {/* Center radial glow that fades into the dark background, creating a darker shade of blue at the edges */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, var(--accent-global) 0%, transparent 110%)" }} />
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">

          {/* Header row */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: sticky heading block */}
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
                Everything you want to{" "}
                <span style={{ color: "#ffffff" }}>know</span>
              </h2>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                Can't find the answer you're looking for? Reach out to our engineering team directly.
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

            {/* Right: accordion list */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              className="space-y-3"
            >
              {devopsFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-[22px] border overflow-hidden transition-all duration-300"
                    style={{
                      background: isOpen ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                      borderColor: isOpen ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)",
                      boxShadow: isOpen
                        ? "0 8px 30px rgba(0,0,0, 0.1)"
                        : "0 2px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        {/* Step number badge */}
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

      {/* ── 7. Pricing Packages (light background) ── */}
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
              Simple,{" "}
              <span style={{ color: "var(--accent-global)" }}>Transparent</span>{" "}
              Pricing
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Choose a tier that matches your current product scale. All options transfer 100% IP ownership upon delivery.
            </p>
          </motion.div>

          {/* 3 Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 items-stretch mb-14">
            {service.pricing.map((tier, idx) => {
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
                    onClick={() => triggerOnboardingModal({ type: "package", preselectedPackage: tier.tier, serviceType: service.title, accentColor: service.accent })}
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
            {/* Table header toggle row */}
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

            {/* Column headers */}
            <div
              className="grid border-b border-slate-200"
              style={{ gridTemplateColumns: "1fr repeat(3, minmax(0, 1fr))" }}
            >
              <div className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                Feature
              </div>
              {service.pricing.map((tier, i) => (
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

            {/* Feature rows */}
            {service.pricing[0].features.map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="grid border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                style={{ gridTemplateColumns: "1fr repeat(3, minmax(0, 1fr))" }}
              >
                <div
                  className="px-6 py-4 text-[13px] font-semibold text-slate-600"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {service.pricing[0].features[rowIdx] ?? "—"}
                </div>
                {service.pricing.map((tier, colIdx) => (
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


      {/* ── 9. High-Converting Lead Proposal Form ── */}
      <section className="border-t relative overflow-hidden bg-slate-950 border-white/[0.06] pb-0 pt-20" id="contact-project-form">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.12] blur-[120px]" style={{ background: "radial-gradient(circle, var(--accent-global) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.07] blur-[100px]" style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 pb-20 relative z-10">
          
          {/* Header aligned center */}
          <div className="text-center mb-16">
            <span 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent-global)] bg-[var(--accent-global-dim)] border mb-3" 
              style={{ fontFamily: "'Inter', sans-serif", borderColor: "rgba(var(--accent-global-rgb), 0.2)" }}
            >
              Start Project
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sora text-white leading-tight mb-4">
              Let&apos;s Build Your <span className="text-[var(--accent-global)]">Web Solution</span>
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
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      Our system registered your lead details. Our Web development engineering leads will review it shortly.
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
                        placeholder="Tell us about your web development project requirements, target goals, and expected delivery timeline..."
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

      {/* ── 10. Floating Bottom Conversion Bar with Close/Dismiss Button ── */}
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
              onClick={() => triggerOnboardingModal({ type: "package", preselectedPackage: "15% Promo Discount Blueprint", serviceType: service.title, accentColor: service.accent })}
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
