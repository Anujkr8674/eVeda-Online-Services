"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Clock, User, Mail, Phone, Info, Check, Loader2, ArrowRight, ChevronLeft, AlertCircle, MessageSquare, Sparkles
} from "lucide-react";
import Image from "next/image";
import { COMPANY } from "@/lib/utils";

export interface OnboardingTriggerOptions {
  type: "package" | "quote" | "general";
  preselectedPackage?: string;
  serviceType?: string;
  accentColor?: string;
  customQuoteDetails?: {
    cost: number;
    projectType: string;
    billingModel: string;
    pageCount: number;
    features: string[];
  };
}

// Helper to convert hex to RGB
function hexToRgb(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return isNaN(r) || isNaN(g) || isNaN(b) ? "124, 58, 237" : `${r}, ${g}, ${b}`;
}

// Trigger helper
export function triggerOnboardingModal(options: OnboardingTriggerOptions) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-onboarding", { detail: options }));
  }
}

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [accentColor, setAccentColor] = useState("");

  // Dynamic settings from trigger
  const [flowType, setFlowType] = useState<"package" | "quote" | "general">("general");
  const [preselectedPackage, setPreselectedPackage] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [quoteDetails, setQuoteDetails] = useState<OnboardingTriggerOptions["customQuoteDetails"] | null>(null);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: ""
  });

  // Touched state for validation error display
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    budget: false
  });

  const [sending, setSending] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [error, setError] = useState("");

  // Event listener for opening the modal
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<OnboardingTriggerOptions>;
      const detail = customEvent.detail || { type: "general" };

      setFlowType(detail.type || "general");
      setPreselectedPackage(detail.preselectedPackage || "");
      setServiceType(detail.serviceType || "");
      setQuoteDetails(detail.customQuoteDetails || null);
      setAccentColor(detail.accentColor || "");

      // Auto-prefill budget and default messages based on type
      let defaultBudget = "";
      let defaultMessage = "";

      if (detail.type === "package" && detail.preselectedPackage) {
        const pkgLower = detail.preselectedPackage.toLowerCase();
        if (pkgLower.includes("growth") || pkgLower.includes("pro")) defaultBudget = "growth";
        else if (pkgLower.includes("enterprise") || pkgLower.includes("custom")) defaultBudget = "enterprise";
        else defaultBudget = "startup";
        defaultMessage = `I am interested in securing the "${detail.preselectedPackage}" package for ${detail.serviceType || "my project"}.`;
      } else if (detail.type === "quote" && detail.customQuoteDetails) {
        const cost = detail.customQuoteDetails.cost;
        defaultBudget = cost < 250000 ? "startup" : cost < 600000 ? "growth" : "enterprise";
        defaultMessage = `Calculator Custom Quote:
- Project Type: ${detail.customQuoteDetails.projectType}
- Pages: ${detail.customQuoteDetails.pageCount}
- Model: ${detail.customQuoteDetails.billingModel}
- Selected Features: ${detail.customQuoteDetails.features.join(", ")}
- Estimated Cost: ₹${cost.toLocaleString("en-IN")}`;
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        budget: defaultBudget,
        message: defaultMessage
      });

      setTouched({
        name: false,
        email: false,
        phone: false,
        budget: false
      });

      setIsOpen(true);
      setStep(0);
      setError("");
      setLeadId("");
    };

    window.addEventListener("open-onboarding", handleOpen);
    return () => window.removeEventListener("open-onboarding", handleOpen);
  }, []);

  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close handler
  const handleClose = () => {
    setIsOpen(false);
  };

  // Restrict phone input to 10 digits
  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    if (cleaned.length <= 10) {
      setForm(prev => ({ ...prev, phone: cleaned }));
    }
  };

  // Validation checkers
  const isNameValid = form.name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isPhoneValid = form.phone.length === 10;
  const isBudgetValid = flowType !== "general" || form.budget !== "";

  const isStepValid = () => {
    if (step === 1) return isNameValid;
    if (step === 2) return isEmailValid && isPhoneValid;
    if (step === 3) return isBudgetValid;
    return true;
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Submit request
  const handleSubmit = async () => {
    setSending(true);
    setError("");

    try {
      let finalMessage = form.message;
      if (flowType === "package" && preselectedPackage) {
        finalMessage += `\n[Selected Package: ${preselectedPackage}]`;
      }

      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          budget: form.budget || "startup",
          message: finalMessage.trim(),
          service: serviceType || "General Tech Proposal",
          metadata: quoteDetails ? {
            flowType: "quote",
            cost: quoteDetails.cost,
            projectType: quoteDetails.projectType,
            billingModel: quoteDetails.billingModel,
            pageCount: quoteDetails.pageCount,
            features: quoteDetails.features
          } : {
            flowType: "package",
            preselectedPackage: preselectedPackage
          }
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to register request. Please try again.");
        setSending(false);
        return;
      }

      setLeadId(data.leadId ?? "");
      setStep(4);
    } catch {
      setError("A connection error occurred. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const nextStep = () => {
    if (step === 3) {
      handleSubmit();
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(0, prev - 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 overflow-y-auto">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-0"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={accentColor ? {
              "--accent-global": accentColor,
              "--accent-global-hover": `${accentColor}dd`,
              "--accent-global-dim": `rgba(${hexToRgb(accentColor)}, 0.08)`,
              "--accent-global-rgb": hexToRgb(accentColor),
            } as React.CSSProperties : undefined}
            className="bg-white text-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl relative z-10 overflow-hidden min-h-fit md:min-h-[500px] flex flex-col md:flex-row border border-slate-100"
          >

            {/* ══ STEP 0: Welcome Panel ══ */}
            {step === 0 && (
              <div className="w-full flex flex-col md:flex-row relative">
                {/* Mobile close button (hidden on desktop) */}
                <button
                  onClick={handleClose}
                  className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 transition-all cursor-pointer shadow-md border border-slate-200 md:hidden"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left info column */}
                <div className="flex-1 p-8 sm:p-12 flex flex-col justify-between" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <div className="space-y-5">

                    {/* Flow-specific header badge */}
                    {flowType === "package" && (
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest"
                        style={{
                          background: "var(--accent-global-dim, rgba(124, 58, 237, 0.08))",
                          color: "var(--accent-global, #7c3aed)",
                          border: "1px solid color-mix(in srgb, var(--accent-global, #7c3aed) 25%, transparent)"
                        }}
                      >
                        ⚡ SECURE PACKAGE RATES
                      </span>
                    )}
                    {flowType === "quote" && (
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest"
                        style={{
                          background: "var(--accent-global-dim, rgba(124, 58, 237, 0.08))",
                          color: "var(--accent-global, #7c3aed)",
                          border: "1px solid color-mix(in srgb, var(--accent-global, #7c3aed) 25%, transparent)"
                        }}
                      >
                        ⚡ LOCK IN CUSTOM QUOTE
                      </span>
                    )}
                    {flowType === "general" && (
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest"
                        style={{
                          background: "var(--accent-global-dim, rgba(124, 58, 237, 0.08))",
                          color: "var(--accent-global, #7c3aed)",
                          border: "1px solid color-mix(in srgb, var(--accent-global, #7c3aed) 25%, transparent)"
                        }}
                      >
                        ⚡ PROJECT ONBOARDING
                      </span>
                    )}

                    {/* Dynamic Headline */}
                    <h2 className="text-3xl sm:text-4xl font-extrabold font-sora text-slate-900 tracking-tight leading-tight">
                      {flowType === "package" && (
                        <>
                          Configure & Secure the <span style={{ color: "var(--accent-global, #7c3aed)" }}>{preselectedPackage}</span>.
                        </>
                      )}
                      {flowType === "quote" && (
                        <>
                          Finalize and submit your <span style={{ color: "var(--accent-global, #7c3aed)" }}>custom configuration</span>.
                        </>
                      )}
                      {flowType === "general" && (
                        <>
                          Let&apos;s start building your <span style={{ color: "var(--accent-global, #7c3aed)" }}>next big product</span>.
                        </>
                      )}
                    </h2>

                    {/* Dynamic description */}
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {flowType === "package" && (
                        `Complete this 2-minute validation form to reserve your slot for ${preselectedPackage}. We will generate a structured proposal blueprint and send it directly to your email.`
                      )}
                      {flowType === "quote" && (
                        `Verify your calculated specifications. We will review your page count, custom features, and integration toggles to produce a detailed development roadmap.`
                      )}
                      {flowType === "general" && (
                        `Tell us what you are looking to build. We will customize a technical development blueprint and detailed quote for your team.`
                      )}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-3">
                      <button
                        onClick={() => setStep(1)}
                        className="h-12 px-8 text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all duration-200 flex items-center gap-2 cursor-pointer"
                        style={{
                          background: "var(--accent-global, #7c3aed)",
                          boxShadow: "0 8px 24px rgba(124, 58, 237, 0.25)"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--accent-global-hover, #6d28d9)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "var(--accent-global, #7c3aed)";
                        }}
                      >
                        Let&apos;s Begin <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-full text-xs font-semibold text-slate-600">
                        <Clock className="w-4 h-4" style={{ color: "var(--accent-global, #7c3aed)" }} />
                        <span>Completion time: <span className="text-slate-900 font-bold">1 minute</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Footer - Clean Large SVG Icons without borders/backgrounds */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-8 border-t border-slate-150 mt-8">
                    {/* Google Trust Box */}
                    <div className="text-left flex items-center gap-2.5">
                      <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                      </svg>
                      <div>
                        <div className="flex text-amber-500 mb-0.5 text-[8px] tracking-tighter">★★★★★</div>
                        <p className="text-[10px] font-black text-slate-800 leading-none">4.9/5 <span className="text-slate-400 font-medium block mt-0.5">Google</span></p>
                      </div>
                    </div>

                    {/* Trustpilot Trust Box */}
                    <div className="text-left flex items-center gap-2.5">
                      <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24">
                        <path d="M24 9.624H14.832L12 1.008l-2.832 8.616H0l7.416 5.376-2.832 8.616L12 18.24l7.416 5.376-2.832-8.616L24 9.624z" fill="#00b67a" />
                      </svg>
                      <div>
                        <div className="flex text-emerald-500 mb-0.5 text-[8px] tracking-tighter">★★★★★</div>
                        <p className="text-[10px] font-black text-slate-800 leading-none">4.8/5 <span className="text-slate-400 font-medium block mt-0.5">Trustpilot</span></p>
                      </div>
                    </div>

                    {/* Facebook Trust Box */}
                    <div className="text-left flex items-center gap-2.5">
                      <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <div>
                        <div className="flex text-blue-600 mb-0.5 text-[8px] tracking-tighter">★★★★★</div>
                        <p className="text-[10px] font-black text-slate-800 leading-none">4.8/5 <span className="text-slate-400 font-medium block mt-0.5">Facebook</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Architect Headshot Panel (Clean image only, NO names, NO overlays!) */}
                <div className="hidden md:block w-full md:w-[380px] bg-gradient-to-tr from-purple-100/50 via-slate-50 to-indigo-50/30 relative min-h-[350px] md:min-h-full overflow-hidden shrink-0 border-l border-slate-100/60">
                  <Image
                    src="/images/architect_portrait.png"
                    alt="Technical Supervisor"
                    fill
                    // style={{ width: "80%" }}
                    className="object-contain object-bottom pt-4 scale-120 origin-bottom"
                    priority
                  />
                  {/* Subtle soft gradient overlay at top and bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/10 pointer-events-none" />

                  {/* Floating Card 1: Projects Done */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: [0, -6, 0]
                    }}
                    transition={{
                      x: { duration: 0.4, delay: 0.25 },
                      opacity: { duration: 0.4, delay: 0.25 },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute top-[26%] left-4 z-10 bg-white/90 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(124,58,237,0.06)] rounded-2xl px-4 py-2 flex items-center gap-2.5 max-w-[170px]"
                  >
                    <div className="w-7 h-7 rounded-xl bg-purple-50 flex items-center justify-center text-purple-650 shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-extrabold text-xs leading-none">150+</div>
                      <div className="text-slate-500 text-[8px] font-bold uppercase tracking-wider mt-0.5">Projects Done</div>
                    </div>
                  </motion.div>

                  {/* Floating Card 2: On-Time SLA */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: [0, 6, 0]
                    }}
                    transition={{
                      x: { duration: 0.4, delay: 0.35 },
                      opacity: { duration: 0.4, delay: 0.35 },
                      y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
                    }}
                    className="absolute bottom-[28%] right-4 z-10 bg-white/90 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(124,58,237,0.06)] rounded-2xl px-4 py-2 flex items-center gap-2.5 max-w-[170px]"
                  >
                    <div className="w-7 h-7 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-extrabold text-xs leading-none">99.8%</div>
                      <div className="text-slate-500 text-[8px] font-bold uppercase tracking-wider mt-0.5">On-Time SLA</div>
                    </div>
                  </motion.div>

                  {/* Close button on welcome screen */}
                  <button
                    onClick={handleClose}
                    className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-955 transition-all cursor-pointer shadow-md border border-slate-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ══ STEPS 1, 2, 3: Questionnaire ══ */}
            {step > 0 && step < 4 && (
              <div className="w-full flex flex-col p-8 sm:p-12 justify-between flex-1" style={{ fontFamily: "'Inter', sans-serif" }}>

                {/* Header Row */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">
                      {step === 1 && "Step 1: Contact Name"}
                      {step === 2 && "Step 2: Connect Verification"}
                      {step === 3 && (flowType === "general" ? "Step 3: Setup & Budget" : "Step 3: Project Integration Details")}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-extrabold text-slate-505 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        Step {step} of 3
                      </span>
                      <button
                        onClick={handleClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all border border-slate-100 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-8">
                    <motion.div
                      className="h-full bg-purple-600 rounded-full"
                      initial={{ width: `${((step - 1) / 3) * 100}%` }}
                      animate={{ width: `${(step / 3) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Form fields & hint blocks */}
                <div className="my-6 space-y-6 flex-1 max-w-2xl">

                  {/* STEP 1: Name */}
                  {step === 1 && (
                    <div className="space-y-4 animate-fadeIn">
                      <label className="block text-slate-900 font-extrabold text-lg sm:text-xl font-sora tracking-tight">
                        What is your full name?
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          onBlur={() => handleBlur("name")}
                          placeholder="Enter your full name"
                          className={`w-full h-12 pl-12 pr-4 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder:text-slate-450 outline-none transition-all duration-200 ${touched.name && !isNameValid
                              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-slate-200 focus:bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-200/10"
                            }`}
                        />
                      </div>
                      {touched.name && !isNameValid && (
                        <p className="text-red-500 text-xs font-semibold flex items-center gap-1.5 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" /> Please enter your name (minimum 2 characters).
                        </p>
                      )}

                      {/* Hint card */}
                      <div className="rounded-xl border border-purple-100 bg-purple-50/15 p-4 mt-4 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-600 text-white shrink-0 shadow-md shadow-purple-500/10">
                          <Info className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-purple-650 tracking-widest uppercase mb-1">Architect Assignment:</p>
                          <p className="text-slate-650 text-xs leading-relaxed">
                            Your full name helps us coordinate your project profile with our development lead.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Phone & Email */}
                  {step === 2 && (
                    <div className="space-y-4 animate-fadeIn">
                      <label className="block text-slate-900 font-extrabold text-lg sm:text-xl font-sora tracking-tight">
                        Provide your mobile number and email.
                      </label>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            onBlur={() => handleBlur("phone")}
                            placeholder="10-digit Phone Number"
                            className={`w-full h-12 pl-12 pr-4 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 ${touched.phone && !isPhoneValid
                                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                : "border-slate-200 focus:bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-200/10"
                              }`}
                          />
                        </div>

                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            onBlur={() => handleBlur("email")}
                            placeholder="Work Email Address"
                            className={`w-full h-12 pl-12 pr-4 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 ${touched.email && !isEmailValid
                                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                : "border-slate-200 focus:bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-200/10"
                              }`}
                          />
                        </div>
                      </div>

                      {/* Explicit Inline Validation Messages */}
                      {touched.phone && !isPhoneValid && (
                        <p className="text-red-500 text-xs font-semibold flex items-center gap-1.5 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" /> Must be exactly a 10-digit mobile number (entered: {form.phone.length}/10).
                        </p>
                      )}
                      {touched.email && !isEmailValid && (
                        <p className="text-red-500 text-xs font-semibold flex items-center gap-1.5 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5" /> Please enter a valid email address.
                        </p>
                      )}

                      {/* Hint card */}
                      <div className="rounded-xl border border-purple-100 bg-purple-50/15 p-4 mt-4 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-600 text-white shrink-0 shadow-md shadow-purple-500/10">
                          <Info className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-purple-650 tracking-widest uppercase mb-1">Proposal Delivery:</p>
                          <p className="text-slate-655 text-xs leading-relaxed">
                            We will send your finalized scope proposal, cost estimates, and milestones to these validated endpoints.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Dynamic Requirements & Prefilled Details */}
                  {step === 3 && (
                    <div className="space-y-4 animate-fadeIn">

                      {/* Dynamic budget and summary layout based on trigger origin */}
                      {flowType === "package" && (
                        <div className="space-y-4">
                          <label className="block text-slate-900 font-extrabold text-lg sm:text-xl font-sora tracking-tight">
                            Confirm your package selection
                          </label>
                          <div className="p-4 rounded-2xl bg-purple-50/30 border border-purple-100 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                              <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase text-purple-600 tracking-widest">SELECTED PACKAGE</p>
                              <h4 className="text-slate-900 font-extrabold text-sm">{preselectedPackage}</h4>
                              {serviceType && <p className="text-[10px] text-slate-500 font-semibold">{serviceType}</p>}
                            </div>
                          </div>

                          <label className="block text-slate-900 font-extrabold text-sm font-sora mt-4">
                            Describe any custom features or timeline requirements (Optional)
                          </label>
                        </div>
                      )}

                      {flowType === "quote" && quoteDetails && (
                        <div className="space-y-4">
                          <label className="block text-slate-900 font-extrabold text-lg sm:text-xl font-sora tracking-tight">
                            Confirm your custom configuration estimate
                          </label>

                          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-purple-50/30 border border-purple-100 font-sans">
                            <div>
                              <p className="text-[9px] font-black uppercase text-purple-600 tracking-widest">PROJECT TYPE</p>
                              <p className="text-slate-900 text-xs font-bold capitalize">{quoteDetails.projectType}</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-black uppercase text-purple-600 tracking-widest">Engagement Model</p>
                              <p className="text-slate-900 text-xs font-bold capitalize">{quoteDetails.billingModel === "fixed" ? "Fixed Price" : "Retainer"}</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-black uppercase text-purple-600 tracking-widest">Pages / Screens</p>
                              <p className="text-slate-900 text-xs font-bold">{quoteDetails.pageCount}</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-black uppercase text-purple-600 tracking-widest">Calculated Cost</p>
                              <p className="text-purple-700 text-xs font-black font-mono">₹{quoteDetails.cost.toLocaleString("en-IN")}</p>
                            </div>
                          </div>

                          <label className="block text-slate-900 font-extrabold text-sm font-sora mt-4">
                            Any other requirements or specific databases needed? (Optional)
                          </label>
                        </div>
                      )}

                      {flowType === "general" && (
                        <div className="space-y-4">
                          <label className="block text-slate-900 font-extrabold text-lg sm:text-xl font-sora tracking-tight">
                            Select a budget tier
                          </label>

                          <div className="grid sm:grid-cols-3 gap-3">
                            {[
                              { val: "startup", title: "Startup Tier", desc: "Under ₹4 Lakhs" },
                              { val: "growth", title: "Growth Tier", desc: "₹4 - ₹10 Lakhs" },
                              { val: "enterprise", title: "Enterprise", desc: "Custom Scale" }
                            ].map((tier) => (
                              <button
                                key={tier.val}
                                type="button"
                                onClick={() => setForm({ ...form, budget: tier.val })}
                                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${form.budget === tier.val
                                    ? "bg-purple-50/10 ring-2"
                                    : "border-slate-200 hover:border-slate-350 hover:bg-slate-50"
                                  }`}
                                style={{
                                  borderColor: form.budget === tier.val ? "var(--accent-global, #7c3aed)" : "",
                                  boxShadow: form.budget === tier.val ? "0 4px 12px rgba(124, 58, 237, 0.08)" : "",
                                }}
                              >
                                <div className="text-xs font-black text-slate-800">{tier.title}</div>
                                <div className="text-[10px] text-slate-450 mt-1 font-semibold">{tier.desc}</div>
                              </button>
                            ))}
                          </div>

                          <label className="block text-slate-900 font-extrabold text-sm font-sora mt-4">
                            Tell us a little bit about your project requirements & goals
                          </label>
                        </div>
                      )}

                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                        <textarea
                          rows={3}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Describe the stack, integrations, timeline or custom request details here..."
                          className="w-full p-4 pl-12 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none focus:bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-200/10 transition-all duration-200 leading-relaxed"
                        />
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-655 font-semibold mt-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
                  <button
                    onClick={prevStep}
                    className="h-11 px-6 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-655 font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    onClick={nextStep}
                    disabled={!isStepValid() || sending}
                    className="h-11 px-8 text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    style={{
                      background: "var(--accent-global, #7c3aed)",
                      boxShadow: "0 6px 20px rgba(124, 58, 237, 0.2)"
                    }}
                    onMouseEnter={(e) => {
                      if (!isStepValid() || sending) return;
                      e.currentTarget.style.background = "var(--accent-global-hover, #6d28d9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--accent-global, #7c3aed)";
                    }}
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : step === 3 ? (
                      "Lock In Details & Submit"
                    ) : (
                      <>
                        Next Question <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Legal Footer */}
                <p className="text-[9px] text-slate-450 mt-6 leading-relaxed">
                  By submitting this form, you authorize representatives of {COMPANY.name} to email and contact you regarding your digital architecture design. Your information is kept completely secure and never shared with third parties.
                </p>
              </div>
            )}

            {/* ══ STEP 4: Dynamic Success Panel ══ */}
            {step === 4 && (
              <div className="w-full p-8 sm:p-12 flex flex-col items-center justify-center text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white shadow-lg"
                  style={{
                    background: "var(--accent-global, #7c3aed)",
                    boxShadow: "0 8px 24px rgba(124, 58, 237, 0.25)"
                  }}
                >
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold font-sora text-slate-900 tracking-tight mb-3">
                  {flowType === "package" ? "Package Preference Secured!" : flowType === "quote" ? "Custom Configuration Logged!" : "Project Details Received!"}
                </h3>

                <p className="text-slate-655 text-sm max-w-md mx-auto leading-relaxed mb-6">
                  Success! Thank you, <span className="text-slate-900 font-bold">{form.name}</span>. We are compiling your custom development sprints and proposal. Check <span className="text-slate-900 font-bold">{form.email}</span> for your tailored quote in 2–4 hours.
                </p>

                {leadId && (
                  <div className="inline-block px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl mb-8">
                    <p className="text-xs font-mono text-slate-500">
                      Solution Blueprint Reference Code: <span style={{ color: "var(--accent-global, #7c3aed)" }} className="font-bold">{leadId}</span>
                    </p>
                  </div>
                )}

                <button
                  onClick={handleClose}
                  className="h-11 px-8 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all duration-200 cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            )}

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
