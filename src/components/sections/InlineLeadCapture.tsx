"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send, Sparkles, CheckCircle2, AlertCircle, User,
  Mail, Phone, FileText, ChevronRight, HelpCircle, Shield, Clock, Award
} from "lucide-react";
import { COMPANY } from "@/lib/utils";

const services = [
  "Book Designing",
  "Book Branding",
  "Logo Design",
  "Digital Marketing",
  "E-commerce Management",
  "Web Development",
  "Mobile App Development",
  "SEO",
  "SaaS Platform",
  "AI & Automation",
  "Cloud / DevOps",
  "Others"
];

export default function InlineLeadCapture() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bot spam

    setError("");
    setSending(true);

    try {
      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website: honeypot, // honeypot
          service: form.service || "General Consultation",
          budget: "startup", // default fallback
          message: form.message || "Requesting a free quote."
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to register request. Please try again.");
        setSending(false);
        return;
      }
      setLeadId(data.leadId ?? null);
      setSent(true);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setError("A connection error occurred. Please check your network and try again.");
    } finally {
      setSending(false);
    }
  };

  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    if (cleaned.length <= 10) {
      setForm(prev => ({ ...prev, phone: cleaned }));
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-[#160b29] to-slate-955 border-b border-white/[0.06]" id="lead-form-section">
      {/* Decorative Background Overlays */}
      <div className="absolute top-0 right-0 w-[55%] h-[55%] bg-[radial-gradient(circle,_rgba(124,58,237,0.12)_0%,_transparent_70%)] blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[45%] h-[45%] bg-[radial-gradient(circle,_rgba(6,182,212,0.08)_0%,_transparent_70%)] blur-[90px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Grid wrapper matching the exact 1400px width and padding of About.tsx */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Consistent 50/50 Grid Split (lg:col-span-6 and lg:col-span-6 with lg:gap-16) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column (50%) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-4 font-sora">
                <Sparkles className="w-3.5 h-3.5" />
                Let&apos;s Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-sora">
                Request a Free <span className="text-[var(--accent-global)]">Custom Proposal</span>
              </h2>
            </div>

            <p className="text-slate-450 text-sm sm:text-base leading-relaxed font-sora tracking-tight font-light">
              Fill out this quick form and our team will get back to you with a free project proposal and quote within 24 hours.
            </p>

            {/* Trust Boxes */}
            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              {[
                { icon: Clock, title: "24-Hour Response", desc: "No long waiting times. Get a response from our team within 24 hours." },
                { icon: Shield, title: "NDA Protected", desc: "Your project specifications and ideas remain completely confidential." },
                { icon: Award, title: "Expert Guidance", desc: "Speak directly with senior engineers and product consultants." }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-4 h-4 text-[var(--accent-global)]" />
                    </div>
                    <div className="font-sora">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-200 mb-0.5 tracking-tight">{item.title}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-450 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (50%): Compact Clean White Lead Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_24px_50px_rgba(15,23,42,0.06)] relative text-slate-800">

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-5"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#7C3AED] flex items-center justify-center mx-auto shadow-lg shadow-purple-500/20">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900 font-sora tracking-tight">Message Sent! 🎉</h3>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed font-sora">
                      Our team will reach out within 24 hours. We are excited to work with you.
                    </p>
                  </div>
                  {leadId && (
                    <div className="inline-block px-4 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="text-[10px] text-slate-500 font-mono">Reference: <span className="text-[#7C3AED] font-bold">{leadId}</span></p>
                    </div>
                  )}
                  <button
                    onClick={() => { setSent(false); setLeadId(null); }}
                    className="text-xs sm:text-sm font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors block mx-auto pt-2 font-sora"
                  >
                    ← Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-sora">
                  {/* Honeypot field */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
                    aria-hidden="true"
                  />

                  {error && (
                    <div className="flex items-start gap-2.5 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold">
                      <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Standard inputs grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#7C3AED]" /> Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full h-11 px-4 bg-slate-50 border border-slate-200 focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none transition-all font-medium tracking-tight"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#7C3AED]" /> Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full h-11 px-4 bg-slate-50 border border-slate-200 focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none transition-all font-medium tracking-tight"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#7C3AED]" /> Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full h-11 px-4 bg-slate-50 border border-slate-200 focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none transition-all font-medium tracking-tight"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#7C3AED]" /> Service Interested *
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full h-11 pl-4 pr-10 bg-slate-50 border border-slate-200 focus:border-[#7C3AED] rounded-xl text-xs text-slate-700 outline-none transition-all font-semibold cursor-pointer appearance-none tracking-tight"
                        >
                          <option value="">Select Service</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-450 border-l border-slate-200 pl-2">
                          <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-[#7C3AED]" /> Project Goals & Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Enter your requirements"
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 focus:border-[#7C3AED] focus:bg-white rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none transition-all font-medium resize-none leading-relaxed tracking-tight"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full h-12 rounded-xl font-bold text-xs uppercase tracking-widest text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-all shadow-md shadow-purple-650/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 hover:-translate-y-0.5 duration-250"
                  >
                    {sending ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <>
                        Get a Free Quote
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[9.5px] text-slate-400 text-center leading-relaxed tracking-tight">
                    🔒 Your specifications remain 100% confidential and secure.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
