"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight, AlertCircle, User, AtSign, PhoneCall, DollarSign, CheckCircle2 } from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import { COMPANY } from "@/lib/utils";
import { useWebSettings } from "@/context/WebSettingsContext";
import SectionHeader from "@/components/ui/SectionHeader";

const services = [
  "Web Development", "Mobile App", "SaaS Platform",
  "AI Solutions", "Cloud / DevOps", "UI/UX Design",
  "ERP / CRM", "Digital Transformation",
  "Book Branding", "Book Designing",
];

const budgets = [
  { value: "5k-15k", label: "$5K – $15K" },
  { value: "15k-50k", label: "$15K – $50K" },
  { value: "50k-100k", label: "$50K – $100K" },
  { value: "100k+", label: "$100K+" },
];

function Field({ label, icon: Icon, required, children }: {
  label: string; icon: React.ElementType; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest select-none">
        <Icon className="w-3.5 h-3.5 text-[var(--accent-global)] opacity-80" />
        {label}{required && <span className="text-[var(--accent-global)]">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-slate-50 border border-slate-200 focus:border-[var(--accent-global)] focus:bg-white focus:ring-2 focus:ring-[var(--accent-global)]/10 rounded-xl px-4 py-3.5 text-sm outline-none text-slate-800 placeholder-slate-400 transition-all duration-200 font-medium";

export default function Contact() {
  const { settings } = useWebSettings();

  const getMapSrc = (src: string) => {
    if (!src) return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14649.6!2d85.2896!3d23.3641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1035ec9bf83%3A0x6ec8f9f38fe2fc8e!2sRatu%20Rd%2C%20Ranchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin";
    if (src.includes("src=\"")) {
      const match = src.match(/src="([^"]+)"/);
      if (match && match[1]) return match[1];
    }
    return src;
  };

  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);

  useEffect(() => {
    const checkPlannedScope = () => {
      const saved = localStorage.getItem("eveda_planned_scope") || localStorage.getItem("nextgen_planned_scope");
      if (saved) {
        try {
          const scope = JSON.parse(saved);
          setForm(prev => ({
            ...prev,
            service: scope.service || prev.service,
            budget: scope.budget || prev.budget,
            message: `Locked Blueprint Specs:\n• ID: ${scope.blueprintId}\n• Primary: ${scope.service}\n• Scale: ${scope.scale}\n• Timeline Velocity: ${scope.velocity}\n• Est. Hours: ${scope.hours} hrs\n• Estimated Cost: ${scope.costRange}\n\nLet's discuss my custom requirement details: `
          }));
          localStorage.removeItem("eveda_planned_scope");
          localStorage.removeItem("nextgen_planned_scope");
        } catch (e) { console.error("Error parsing planned scope", e); }
      }
    };
    checkPlannedScope();
    window.addEventListener("eveda_scope_locked", checkPlannedScope);
    window.addEventListener("nextgen_scope_locked", checkPlannedScope);
    return () => {
      window.removeEventListener("eveda_scope_locked", checkPlannedScope);
      window.removeEventListener("nextgen_scope_locked", checkPlannedScope);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); setSending(false); return; }
      setLeadId(data.leadId ?? null);
      setSent(true);
      setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
    } catch { setError("Network error. Please check your connection and try again."); }
    finally { setSending(false); }
  };

  return (
    <section className="border-t relative overflow-hidden bg-slate-950 border-white/[0.06] pb-0" id="contact">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.12] blur-[120px]" style={{ background: "radial-gradient(circle, var(--accent-global) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.07] blur-[100px]" style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-4 pt-24 pb-16 relative z-10">
        <SectionHeader
          badge="CONTACT US"
          title="Let's Build Something Great"
          titleHighlight="Together"
          description="Ready to transform your vision into reality? Reach out and let's discuss your project."
          align="center"
          className="mb-16"
          theme="dark"
        />

        <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-black/40 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[var(--accent-global)] via-purple-400 to-cyan-400" />
            <div className="p-8 sm:p-10">
              {sent ? (
                <div className="flex flex-col items-center text-center py-16 gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent-global)] to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 font-sora">Message Sent! 🎉</h3>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">Our team will reach out within 24 hours. We&apos;re excited to work with you.</p>
                  </div>
                  {leadId && (
                    <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="text-[11px] text-slate-400 font-mono">Reference: <span className="text-[var(--accent-global)] font-bold">{leadId}</span></p>
                    </div>
                  )}
                  <button onClick={() => { setSent(false); setLeadId(null); }} className="text-sm font-bold text-[var(--accent-global)] hover:underline mt-2">← Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true" />
                  {error && (
                    <div className="flex items-start gap-3 p-4 rounded-xl text-sm bg-red-50 border border-red-100 text-red-700">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" /><span>{error}</span>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full Name" icon={User} required>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" className={inputCls} />
                    </Field>
                    <Field label="Email Address" icon={AtSign} required>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@company.com" className={inputCls} />
                    </Field>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Phone Number" icon={PhoneCall} required>
                      <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 9876543210" className={inputCls} />
                    </Field>
                    <Field label="Budget Range" icon={DollarSign}>
                      <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputCls + " cursor-pointer"}>
                        <option value="">Select your budget</option>
                        {budgets.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                      </select>
                    </Field>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      <span className="w-3.5 h-3.5 rounded-full bg-[var(--accent-global)] opacity-80 inline-block" />Service Needed
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {services.map((s) => (
                        <button key={s} type="button" onClick={() => setForm({ ...form, service: s })}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold border-2 transition-all duration-200 cursor-pointer ${form.service === s ? "bg-[var(--accent-global)] border-[var(--accent-global)] text-white shadow-md shadow-purple-500/20 scale-105" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-[var(--accent-global)]/50 hover:text-[var(--accent-global)] hover:bg-slate-100"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      <span className="w-3.5 h-3.5 rounded-full bg-[var(--accent-global)] opacity-80 inline-block" />
                      Project Details <span className="text-[var(--accent-global)]">*</span>
                    </label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project, goals, and timeline. The more detail, the better we can help you." className={inputCls + " resize-none leading-relaxed"} />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full bg-gradient-to-r from-[var(--accent-global)] to-purple-600 hover:from-purple-600 hover:to-[var(--accent-global)] disabled:opacity-60 text-white font-bold text-sm h-14 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 cursor-pointer tracking-wide">
                    {sending ? (<><div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />Sending...</>) : (<><Send className="w-5 h-5" />Send Message<ArrowRight className="w-4 h-4 opacity-70" /></>)}
                  </button>
                  <p className="text-center text-[11px] text-slate-400">🔒 Your information is 100% secure and never shared with third parties.</p>
                </form>
              )}
            </div>
          </div>

          {/* Info Panels */}
          <div className="space-y-5 lg:pt-2">
            {[
              { icon: Mail,   label: "Email Us",  value: settings.email,    href: `mailto:${settings.email}` },
              { icon: Phone,  label: "Call Us",   value: settings.phone,    href: `tel:${settings.phone}` },
              { icon: MapPin, label: "Location",  value: settings.location, href: "#" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="flex items-center gap-4 bg-slate-900 border border-white/[0.07] hover:border-[var(--accent-global)]/40 rounded-2xl p-5 transition-all duration-200 group hover:bg-slate-800/80">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent-global-dim)] border border-[var(--accent-global)]/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                  <Icon className="w-5 h-5 text-[var(--accent-global)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{label}</div>
                  <div className="text-sm font-semibold text-white truncate">{value}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--accent-global)] shrink-0" />
              </a>
            ))}

            <div className="bg-slate-900 border border-white/[0.07] rounded-2xl p-5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Connect With Us</p>
              <div className="flex gap-3">
                {[
                  { icon: FaLinkedinIn, href: settings.social.linkedin, label: "LinkedIn" },
                  { icon: FaTwitter,    href: settings.social.twitter,  label: "Twitter" },
                  { icon: FaGithub,     href: settings.social.github,   label: "GitHub" },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-white/[0.06] hover:border-[var(--accent-global)]/40 py-3 rounded-xl text-xs font-semibold transition-all duration-200 text-slate-300 hover:text-white">
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
                <div className="text-white font-bold text-sm">Available Right Now</div>
              </div>
              <p className="text-[12px] leading-relaxed text-slate-400">
                Our team typically responds within <span className="text-white font-semibold">2–4 hours</span> during business hours (IST). Guaranteed response within 24 hours.
              </p>
              <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-3 text-center">
                {[{ v: "150+", l: "Projects" }, { v: "50+", l: "Clients" }, { v: "4.9★", l: "Rating" }].map((s) => (
                  <div key={s.l}>
                    <div className="text-white font-bold text-base">{s.v}</div>
                    <div className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">{s.l}</div>
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
          <span className="text-xs font-bold text-white tracking-wide">{COMPANY.name} — {settings.location}</span>
        </div>
        <iframe
          src={getMapSrc(settings.mapEmbed)}
          width="100%" height="420"
          style={{ border: 0, display: "block", filter: "invert(92%) hue-rotate(180deg) brightness(0.82) saturate(0.6) contrast(0.88)" }}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          title={`${COMPANY.name} Office Location`}
        />
      </div>

      {/* ── MARQUEE (below map) ── */}
      <div className="relative overflow-hidden bg-slate-950 py-10">
        <style>{`
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
        `}</style>
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
  );
}
