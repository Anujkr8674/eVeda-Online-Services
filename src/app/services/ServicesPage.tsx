"use client";

import PageHero from "@/components/common/PageHero";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import { 
  ArrowRight, Check, Code, Smartphone, Layout, Cpu, Server, 
  Shield, Database, Sparkles, Terminal, CheckCircle2, ChevronRight, 
  Zap, RefreshCw, BarChart3, Users, Play, Send, HelpCircle 
} from "lucide-react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

// ── Interactive 3D Parallax Card Wrapper ──
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
      <div 
        className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-purple-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" 
        style={{ transform: "translateZ(-10px)" }}
      />
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  // ── State for Interactive Widgets ──
  const [activeTab, setActiveTab] = useState<string>("web");

  // 1. Web Dev State
  const [webTab, setWebTab] = useState<"performance" | "seo" | "scale">("performance");
  
  // 2. Mobile Simulator State
  const [phoneScreen, setPhoneScreen] = useState<"home" | "notif" | "sync">("home");
  const [notifTriggered, setNotifTriggered] = useState(false);
  
  // 3. SaaS Billing Calculator State
  const [saasUsers, setSaasUsers] = useState<number>(500);
  const [saasTier, setSaasTier] = useState<"basic" | "pro" | "enterprise">("pro");

  // 4. AI Flow Simulator State
  const [aiInput, setAiInput] = useState<string>("Analyze customer feedback logs");
  const [aiStep, setAiStep] = useState<number>(0);
  const [aiProcessing, setAiProcessing] = useState(false);

  // Trigger AI flow animation simulation
  const startAiSimulation = () => {
    if (aiProcessing) return;
    setAiProcessing(true);
    setAiStep(1);
    
    setTimeout(() => {
      setAiStep(2);
      setTimeout(() => {
        setAiStep(3);
        setTimeout(() => {
          setAiStep(4);
          setAiProcessing(false);
        }, 1200);
      }, 1000);
    }, 800);
  };

  // Scrollspy effect for active subpage tab navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["web", "mobile", "saas", "ai", "cloud"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveTab(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.offsetTop - 120;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setActiveTab(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full opacity-[0.06] blur-[140px] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent-global) 0%, transparent 80%)" }} />
      <div className="absolute bottom-[30%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.05] blur-[120px] pointer-events-none" style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 80%)" }} />

      {/* ── Page Hero ── */}
      <PageHero
        badge="Technology Stack & Services"
        title="Bespoke Digital Solutions"
        titleHighlight="Engineered to Scale"
        description="We build blazing fast web apps, native mobile apps, SaaS ecosystems, and intelligent AI integrations. Explore our core engineering services below."
        breadcrumbs={[{ label: "Services" }]}
        theme="light"
      />

      {/* ── Sticky Sub-Navigation Bar ── */}
      <div className="sticky top-[80px] z-30 bg-white/80 backdrop-blur-md border-y border-slate-100 shadow-sm py-3.5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto gap-4 scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {[
              { id: "web", label: "Web Apps" },
              { id: "mobile", label: "Mobile Apps" },
              { id: "saas", label: "SaaS Ecosystems" },
              { id: "ai", label: "AI & Machine Learning" },
              { id: "cloud", label: "Cloud & DevOps" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[var(--accent-global)] text-white shadow-md shadow-purple-500/15"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="shrink-0 pl-4 border-l border-slate-100 hidden md:block">
            <Link
              href="/contact"
              className="text-xs font-bold text-[var(--accent-global)] hover:underline flex items-center gap-1"
            >
              Request custom proposal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 1. Web Development Service Section ── */}
      <section id="web" className="py-24 border-b border-slate-100 relative z-10 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center">
                  <Code className="w-4 h-4 text-[var(--accent-global)]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-global)]">
                  01. Frontend & Full-Stack
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sora text-slate-900 leading-tight">
                High-Performance Web Platforms
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We design and engineer bespoke web apps that load in sub-seconds. Leveraging Next.js 15, React 19, and Server-Side Rendering (SSR), we ensure your system has optimal Core Web Vitals and SEO discoverability out of the box.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {[
                  "Server-Side Rendering (SSR) & Static Generation",
                  "Edge caching and localized edge execution",
                  "Type-safe GraphQL & REST API integrations",
                  "Structured JSON-LD schema search optimizations",
                  "Progressive Web App (PWA) offline builds",
                  "Comprehensive A11y accessibility standards"
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 leading-normal">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <Link
                  href="/services/web"
                  className="px-6 py-3.5 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white font-bold text-xs sm:text-sm rounded-full transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/20 hover:-translate-y-0.5 flex items-center gap-1.5"
                >
                  Explore Details & Custom Calculator
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className="px-6 py-3.5 text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm rounded-full transition-all"
                >
                  View Case Studies
                </Link>
              </div>
            </div>

            {/* Right: Interactive Dev Panel Widget */}
            <div className="lg:col-span-6">
              <InteractiveTiltCard className="bg-white border border-slate-100 rounded-3xl p-1 shadow-[0_15px_40px_rgba(0,0,0,0.03)] overflow-hidden">
                {/* Dev Panel Header */}
                <div className="bg-slate-50 border-b border-slate-100 px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  {/* Selector Tabs */}
                  <div className="flex items-center gap-1 bg-slate-150 rounded-lg p-0.5 border border-slate-200">
                    {[
                      { id: "performance", label: "Performance" },
                      { id: "seo", label: "SEO Audit" },
                      { id: "scale", label: "Autoscale" }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setWebTab(tab.id as any)}
                        className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          webTab === tab.id
                            ? "bg-white text-slate-800 shadow-sm"
                            : "text-slate-500 hover:text-slate-850"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dev Panel Content Grid */}
                <div className="p-6 h-60 flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    {webTab === "performance" && (
                      <motion.div
                        key="performance"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lighthouse Audits</span>
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Optimal</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          {[
                            { score: "100", label: "LCP Speed", value: "0.4s" },
                            { score: "100", label: "FID Latency", value: "9ms" },
                            { score: "100", label: "CLS Stability", value: "0.00" }
                          ].map((item, idx) => (
                            <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                              <div className="w-10 h-10 rounded-full border-2 border-emerald-250 bg-emerald-50/50 flex items-center justify-center mx-auto mb-2 text-emerald-600 font-extrabold text-xs">
                                {item.score}
                              </div>
                              <div className="text-[8px] font-extrabold uppercase tracking-wider text-slate-500">{item.label}</div>
                              <div className="text-[10px] font-bold text-slate-800 mt-0.5">{item.value}</div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {webTab === "seo" && (
                      <motion.div
                        key="seo"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3 font-mono text-[9px] text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100"
                      >
                        <div className="flex items-center gap-2 border-b border-slate-150 pb-2 text-[8px] uppercase tracking-wider text-slate-400 font-bold">
                          <Terminal className="w-3.5 h-3.5 text-purple-650" />
                          <span>Generated JSON-LD Schema Markup</span>
                        </div>
                        <div className="text-purple-650">&lt;script <span className="text-blue-500">type</span>=<span className="text-emerald-600">&quot;application/ld+json&quot;</span>&gt;</div>
                        <div className="pl-4 font-bold">&#123;</div>
                        <div className="pl-8">&quot;@context&quot;: &quot;https://schema.org&quot;,</div>
                        <div className="pl-8">&quot;@type&quot;: &quot;TechService&quot;,</div>
                        <div className="pl-8">&quot;name&quot;: &quot;Next.js Web Applications&quot;</div>
                        <div className="pl-4 font-bold">&#125;</div>
                        <div className="text-purple-650">&lt;/script&gt;</div>
                      </motion.div>
                    )}

                    {webTab === "scale" && (
                      <motion.div
                        key="scale"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Edge Deployment Status</span>
                          <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                            Live Active
                          </span>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Server response latency</span>
                            <span className="text-slate-800 font-bold font-mono">14ms globally</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Concurrent requests limit</span>
                            <span className="text-slate-800 font-bold font-mono">Infinite (Serverless Edge)</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Global routing points</span>
                            <span className="text-[var(--accent-global)] font-extrabold font-mono">100+ CDNs</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span className="font-mono text-purple-650">Edge Worker Active</span>
                    <span>100% Core Web Vitals Guaranteed</span>
                  </div>
                </div>
              </InteractiveTiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Mobile App Development Service Section ── */}
      <section id="mobile" className="py-24 border-b border-slate-100 bg-[#f8fafc] relative z-10 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Interactive Mobile App Mockup */}
            <div className="lg:col-span-5 lg:order-2">
              <InteractiveTiltCard className="bg-white border border-slate-100 rounded-[36px] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] max-w-sm mx-auto">
                <div className="w-full rounded-[28px] border-8 border-slate-850 bg-slate-900 relative overflow-hidden h-[380px] flex flex-col justify-between p-4">
                  {/* Speaker and Camera notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full border border-slate-850 flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-850" />
                  </div>

                  {/* Dynamic Mobile Screens */}
                  <div className="flex-1 flex flex-col justify-between bg-slate-50 rounded-[20px] p-3 pt-6 border border-slate-100 mt-2 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      {phoneScreen === "home" && (
                        <motion.div
                          key="home"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4 h-full flex flex-col justify-between"
                        >
                          <div>
                            <div className="h-2 w-8 bg-purple-200 rounded mb-4" />
                            <h4 className="text-slate-800 font-extrabold text-xs font-sora">eVeda Bank App</h4>
                            <p className="text-[9px] text-slate-500 leading-normal mt-1">Simulated native cross-platform build.</p>
                            <div className="mt-4 p-2 bg-white rounded-xl border border-slate-100 flex items-center justify-between">
                              <span className="text-[8px] font-bold text-slate-600">Secure Vault Balance</span>
                              <span className="text-[9px] font-black text-slate-800">₹45,000</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <button
                              type="button"
                              onClick={() => { setPhoneScreen("notif"); setNotifTriggered(true); }}
                              className="w-full h-8 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white text-[9px] font-bold rounded-lg transition-all"
                            >
                              Test Push Notification
                            </button>
                            <button
                              type="button"
                              onClick={() => setPhoneScreen("sync")}
                              className="w-full h-8 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[9px] font-bold rounded-lg transition-all"
                            >
                              Simulate Offline Sync
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {phoneScreen === "notif" && (
                        <motion.div
                          key="notif"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-4 h-full flex flex-col justify-between text-center py-6"
                        >
                          <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center mx-auto text-[var(--accent-global)]">
                            <Zap className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-[10px] font-extrabold text-slate-800 font-sora">Push Notification Received</h5>
                            <p className="text-[8px] text-slate-550 mt-1 max-w-[150px] mx-auto">
                              Simulating FCM / APNS secure transmission tunnel.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setPhoneScreen("home")}
                            className="h-7 w-20 bg-slate-900 text-white font-bold text-[8px] rounded-lg mx-auto"
                          >
                            Back
                          </button>
                        </motion.div>
                      )}

                      {phoneScreen === "sync" && (
                        <motion.div
                          key="sync"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          className="space-y-4 h-full flex flex-col justify-between text-center py-6"
                        >
                          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          </div>
                          <div>
                            <h5 className="text-[10px] font-extrabold text-slate-850 font-sora">Offline Database Sync</h5>
                            <p className="text-[8px] text-slate-550 mt-1 max-w-[160px] mx-auto">
                              Synchronizing local SQLite cache with remote PostgreSQL cloud storage.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setPhoneScreen("home")}
                            className="h-7 w-20 bg-slate-900 text-white font-bold text-[8px] rounded-lg mx-auto"
                          >
                            Back
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </InteractiveTiltCard>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 lg:order-1 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-[var(--accent-global)]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-global)]">
                  02. Native iOS & Android
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sora text-slate-900 leading-tight">
                Immersive Mobile Applications
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We compile beautiful mobile applications that run at native performance. Whether using React Native or Flutter for cross-platform speed, or Swift & Kotlin for custom native modules, we verify stability across all screen dimensions.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {[
                  "React Native & Flutter cross-platform speed",
                  "Offline-first sync database mechanics",
                  "Native biometric authentication access gates",
                  "Firebase & APNS push notification nodes",
                  "App Store & Google Play Store release managers",
                  "Continuous crash report & diagnostics tracking"
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 leading-normal">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/services/mobile"
                  className="px-6 py-3.5 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white font-bold text-xs sm:text-sm rounded-full transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/20 hover:-translate-y-0.5 inline-flex items-center gap-1.5"
                >
                  Configure Mobile Package
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. SaaS Ecosystem Service Section ── */}
      <section id="saas" className="py-24 border-b border-slate-100 relative z-10 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center">
                  <Layout className="w-4 h-4 text-[var(--accent-global)]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-global)]">
                  03. Multi-Tenant Platforms
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sora text-slate-900 leading-tight">
                Scalable SaaS Infrastructure
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Launch secure, multi-tenant software platforms. We build robust databases with rigid schema isolation levels, Stripe recurring checkout gates, usage metrics analytics dashboards, and custom domain mapping architectures.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {[
                  "Rigid multi-tenant database isolation bounds",
                  "Stripe portal recurring billing integration",
                  "Granular role-based user access controls (RBAC)",
                  "Custom tenant domains routing setups",
                  "Aggregated usage metering analytical dashboards",
                  "Detailed security logging & API audit logs"
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 leading-normal">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/services/saas"
                  className="px-6 py-3.5 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white font-bold text-xs sm:text-sm rounded-full transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/20 hover:-translate-y-0.5 inline-flex items-center gap-1.5"
                >
                  Configure SaaS Platform Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive SaaS Calculator Panel */}
            <div className="lg:col-span-6">
              <InteractiveTiltCard className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.03)] space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SaaS Resource Estimator</span>
                    <span className="text-[9px] font-extrabold text-[var(--accent-global)] uppercase bg-purple-50 px-2 py-0.5 rounded">Active Plan</span>
                  </div>
                  <h4 className="text-slate-800 font-extrabold text-sm sm:text-base font-sora">Calculate Infrastructure Allocations</h4>
                </div>

                {/* Slider for users */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Monthly Active Users (MAU)</span>
                    <span className="text-[var(--accent-global)] font-mono">{saasUsers} users</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={10000}
                    step={100}
                    value={saasUsers}
                    onChange={(e) => setSaasUsers(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 rounded-lg appearance-none cursor-pointer accent-[var(--accent-global)]"
                  />
                </div>

                {/* Tier buttons */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {[
                    { id: "basic", label: "Basic DB" },
                    { id: "pro", label: "Isolated DB" },
                    { id: "enterprise", label: "Cluster Setup" }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setSaasTier(tier.id as any)}
                      className={`py-2 px-1 rounded-xl border text-[10px] font-bold text-center transition-all cursor-pointer ${
                        saasTier === tier.id
                          ? "bg-[var(--accent-global)] border-[var(--accent-global)] text-white shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>

                {/* Live Output stats */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Required Cloud Nodes</span>
                    <span className="text-slate-800 font-bold font-mono">
                      {saasUsers < 2000 ? "1 App Instance" : saasUsers < 6000 ? "3 Cluster Nodes" : "Autoscaling Group (Max 12)"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Stripe Billing Webhooks Webhooks</span>
                    <span className="text-slate-800 font-bold font-mono">Configured (Zero-Lag)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Project Scope</span>
                    <span className="text-[var(--accent-global)] font-extrabold font-mono">
                      {saasTier === "basic" ? "4-6 Weeks" : saasTier === "pro" ? "6-10 Weeks" : "10-14 Weeks"}
                    </span>
                  </div>
                </div>

                <div className="text-[9px] font-bold text-slate-450 uppercase text-center tracking-widest">
                  100% Compliant SOC2 Security Framework Ready
                </div>
              </InteractiveTiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. AI & Machine Learning Service Section ── */}
      <section id="ai" className="py-24 border-b border-slate-100 bg-[#f8fafc] relative z-10 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Interactive AI RAG Simulator */}
            <div className="lg:col-span-6 lg:order-2">
              <InteractiveTiltCard className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.03)] space-y-5">
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-[9px] font-mono font-bold text-slate-550 uppercase tracking-wider">AI RAG Agent Simulator</span>
                  </div>
                  <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                </div>

                {/* Input selection */}
                <div className="space-y-2">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">1. Select AI Action Query</label>
                  <select
                    value={aiInput}
                    onChange={(e) => { setAiInput(e.target.value); setAiStep(0); }}
                    className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 outline-none"
                  >
                    <option value="Analyze customer feedback logs">Analyze customer feedback logs</option>
                    <option value="Generate predictive revenue report">Generate predictive revenue report</option>
                    <option value="Trigger vector search index update">Trigger vector search index update</option>
                  </select>
                </div>

                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={startAiSimulation}
                  disabled={aiProcessing}
                  className="w-full h-10 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-65"
                >
                  <Play className="w-3.5 h-3.5" /> {aiProcessing ? "Executing Nodes..." : "Run AI Simulation Pipeline"}
                </button>

                {/* Visual steps */}
                <div className="space-y-2.5 font-mono text-[9px]">
                  {[
                    { step: 1, label: "Vector embedding generated (384-dims)" },
                    { step: 2, label: "Pinecone / pgvector retrieval complete (score: 0.94)" },
                    { step: 3, label: "LLM refining query context summaries" },
                    { step: 4, label: "Output payload formatted & returned" }
                  ].map((s) => (
                    <div
                      key={s.step}
                      className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${
                        aiStep >= s.step
                          ? "bg-purple-50/40 border-purple-150 text-slate-800"
                          : "bg-slate-50/50 border-slate-100 text-slate-400"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[8px] ${
                        aiStep >= s.step ? "bg-[var(--accent-global)] text-white" : "bg-slate-200 text-slate-500"
                      }`}>
                        {s.step}
                      </div>
                      <span className="truncate">{s.label}</span>
                    </div>
                  ))}
                </div>
              </InteractiveTiltCard>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-6 lg:order-1 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-[var(--accent-global)]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-global)]">
                  04. Agentic AI & RAG
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sora text-slate-900 leading-tight">
                AI & Machine Learning Solutions
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Integrate production-grade machine learning pipelines into your software workflows. We build custom RAG (Retrieval-Augmented Generation) search layers, LLM agents with tool-calling capabilities, and predictive analytical engines.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {[
                  "Retrieval-Augmented Generation (RAG) vector database setups",
                  "Anthropic & OpenAI API agent integrations",
                  "Structured data embedding extraction systems",
                  "Natural Language Processing (NLP) sentiment categorization",
                  "Automated prompt-template engineering structures",
                  "Custom predictive regression model deployments"
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 leading-normal">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/services/ai"
                  className="px-6 py-3.5 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white font-bold text-xs sm:text-sm rounded-full transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/20 hover:-translate-y-0.5 inline-flex items-center gap-1.5"
                >
                  Configure AI Solution Package
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. Cloud & DevOps Service Section ── */}
      <section id="cloud" className="py-24 border-b border-slate-100 relative z-10 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center">
                  <Server className="w-4 h-4 text-[var(--accent-global)]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-global)]">
                  05. Cloud Infrastructure
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sora text-slate-900 leading-tight">
                High-Availability Cloud & DevOps
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Deploy infrastructure as code. We build autoscaling setups on AWS, Google Cloud, and Azure using Terraform, configure secure Docker container networks, and deploy automated CI/CD pipelines.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {[
                  "Terraform infrastructure as code (IaC) setup",
                  "Automated GitHub Actions test-deploy scripts",
                  "Docker & Kubernetes container cluster layouts",
                  "Zero-downtime database replication structures",
                  "Active Sentry & Prometheus alerting systems",
                  "AWS & Cloudflare CDN edge speed tweaks"
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 leading-normal">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/services/cloud"
                  className="px-6 py-3.5 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white font-bold text-xs sm:text-sm rounded-full transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/20 hover:-translate-y-0.5 inline-flex items-center gap-1.5"
                >
                  Configure Cloud & DevOps Pack
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Technical Cloud Visualization Card */}
            <div className="lg:col-span-6">
              <InteractiveTiltCard className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.03)] space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Infrastructure Cluster Status</span>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-150 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    Active Node: aws-ap-south-1
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "VPC Cloud Network Guardrails", val: "Active Setup (SOC2 Compliant)", desc: "Isolated subnets, custom IAM role scopes." },
                    { label: "Deployment Pipeline Status", val: "Succeeding (Commit #84d2)", desc: "Auto runs unit tests, builds containers, pushes to ECR." },
                    { label: "Database Replications State", val: "Synced (Primary + 2 Read Replicas)", desc: "Zero data-loss failover setup." }
                  ].map((srv, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-800">{srv.label}</span>
                        <span className="text-[10px] font-bold text-emerald-600 font-mono">{srv.val}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">{srv.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">
                  Zero Downtime Infrastructure Guarantee
                </div>
              </InteractiveTiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* ── Additional Common Sections ── */}
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Contact />
    </div>
  );
}
