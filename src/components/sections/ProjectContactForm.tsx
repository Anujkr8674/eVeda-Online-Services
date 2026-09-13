"use client";

import { useState } from "react";
import { Check, AlertCircle, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { FaLinkedinIn, FaYoutube, FaGithub } from "react-icons/fa";
import { COMPANY } from "@/lib/utils";
import { useWebSettings } from "@/context/WebSettingsContext";

interface ProjectContactFormProps {
  title: string;
  itemType?: "service" | "product";
  accentColor?: string;
}

export default function ProjectContactForm({
  title,
  itemType = "service",
  accentColor,
}: ProjectContactFormProps) {
  const { settings } = useWebSettings();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });
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
        body: JSON.stringify({ ...form, service: title }),
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
    } catch (err: any) {
      setError(err.message || "Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const accent = accentColor || "var(--accent-global, #7c3aed)";

  return (
    <section 
      className="border-t relative overflow-hidden bg-slate-950 border-white/[0.06] pb-0 pt-16 sm:pt-20 w-full max-w-full" 
      id="contact-project-form"
    >
      {/* Background radial ambient glows - strictly bounded */}
      <div 
        className="absolute top-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full pointer-events-none opacity-[0.12] blur-[90px] sm:blur-[120px]" 
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }} 
      />
      <div 
        className="absolute bottom-0 right-0 w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] rounded-full pointer-events-none opacity-[0.07] blur-[80px] sm:blur-[100px]" 
        style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }} 
      />
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:50px_50px] pointer-events-none" 
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-16 sm:pb-20 relative z-10 w-full min-w-0">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent-global)] bg-[var(--accent-global-dim)] border border-[var(--accent-global)]/20 mb-3" 
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Start Project
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-sora text-white leading-tight mb-3 sm:mb-4 px-2">
            Let&apos;s Build Your <span className="text-[var(--accent-global)]">Custom {title}</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed px-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Provide some initial details regarding your requirements and budget range, and our technical architects will get back to you with a comprehensive scope report in 24 hours.
          </p>
        </div>

        {/* Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 sm:gap-10 items-start w-full min-w-0">
          
          {/* Left: Responsive Form Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/40 border border-slate-100 overflow-hidden w-full min-w-0">
            <div className="p-5 sm:p-8 md:p-10">
              {sent ? (
                <div className="text-center py-10 sm:py-12">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border text-[var(--accent-global)]"
                    style={{ backgroundColor: "rgba(var(--accent-global-rgb), 0.1)", borderColor: "rgba(var(--accent-global-rgb), 0.2)" }}
                  >
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-lg mb-2 font-sora">Project Request Sent!</h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed max-w-md mx-auto">
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
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 w-full min-w-0">
                  {error && (
                    <div className="flex items-center gap-2 p-3.5 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0">
                    <div className="w-full min-w-0">
                      <label className="block text-[12px] sm:text-[13px] font-bold text-slate-700 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Full Name *</label>
                      <input
                        type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full min-w-0 h-11 px-3.5 sm:px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 transition-all duration-200"
                        style={{ "--tw-ring-color": "rgba(var(--accent-global-rgb), 0.2)" } as any}
                      />
                    </div>
                    <div className="w-full min-w-0">
                      <label className="block text-[12px] sm:text-[13px] font-bold text-slate-700 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Email Address *</label>
                      <input
                        type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Enter your email address"
                        className="w-full min-w-0 h-11 px-3.5 sm:px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 transition-all duration-200"
                        style={{ "--tw-ring-color": "rgba(var(--accent-global-rgb), 0.2)" } as any}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0">
                    <div className="w-full min-w-0">
                      <label className="block text-[12px] sm:text-[13px] font-bold text-slate-700 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Phone Number *</label>
                      <input
                        type="tel" required value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="Enter your phone number"
                        className="w-full min-w-0 h-11 px-3.5 sm:px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 transition-all duration-200"
                        style={{ "--tw-ring-color": "rgba(var(--accent-global-rgb), 0.2)" } as any}
                      />
                    </div>
                    <div className="w-full min-w-0">
                      <label className="block text-[12px] sm:text-[13px] font-bold text-slate-700 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Estimated Budget</label>
                      <select
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="w-full min-w-0 h-11 px-3 sm:px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 outline-none focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 transition-all duration-200 cursor-pointer truncate"
                        style={{ "--tw-ring-color": "rgba(var(--accent-global-rgb), 0.2)" } as any}
                      >
                        <option value="">Select range</option>
                        <option value="startup">Startup Tier (Under ₹4 Lakhs)</option>
                        <option value="growth">Growth Tier (₹4 - ₹10 Lakhs)</option>
                        <option value="enterprise">Enterprise Tier (Custom Quote)</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full min-w-0">
                    <label className="block text-[12px] sm:text-[13px] font-bold text-slate-700 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Project Specifics *</label>
                    <textarea
                      required rows={4} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={`Tell us about your ${title} project requirements, target goals, and expected delivery timeline...`}
                      className="w-full min-w-0 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none focus:bg-white focus:border-[var(--accent-global)] focus:ring-2 transition-all duration-200 leading-relaxed"
                      style={{ "--tw-ring-color": "rgba(var(--accent-global-rgb), 0.2)" } as any}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full h-12 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 rounded-xl sm:rounded-full transition-all duration-300 cursor-pointer shadow-lg active:scale-[0.98]"
                    style={{ background: "var(--accent-global, #7c3aed)", boxShadow: "0 6px 20px rgba(var(--accent-global-rgb), 0.35)" }}
                  >
                    {sending ? "Submitting..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Info panels matching theme */}
          <div className="space-y-4 sm:space-y-5 w-full min-w-0 lg:pt-2">
            {[
              { icon: Mail,   label: "Email Us",  value: COMPANY.email,    href: `mailto:${COMPANY.email}` },
              { icon: Phone,  label: "Call Us",   value: COMPANY.phone,    href: `tel:${COMPANY.phone}` },
              { icon: MapPin, label: "Location",  value: COMPANY.location, href: "#" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a 
                key={label} 
                href={href} 
                className="flex items-center gap-3.5 sm:gap-4 bg-slate-900 border border-white/[0.07] hover:border-[var(--accent-global)]/40 rounded-2xl p-4 sm:p-5 transition-all duration-200 group hover:bg-slate-800/80 w-full min-w-0"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent-global-dim)] border border-[var(--accent-global)]/30 transition-all duration-300 group-hover:scale-105">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-global)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</div>
                  <div className="text-xs sm:text-sm font-semibold text-white truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{value}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--accent-global)] shrink-0" />
              </a>
            ))}

            {/* Connect With Us */}
            <div className="bg-slate-900 border border-white/[0.07] rounded-2xl p-4 sm:p-5 w-full min-w-0">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Connect With Us</p>
              <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 w-full min-w-0">
                {[
                  { icon: FaLinkedinIn, href: COMPANY.social.linkedin, label: "LinkedIn" },
                  { icon: FaYoutube, href: COMPANY.social.youtube, label: "YouTube" },
                  { icon: FaGithub,     href: COMPANY.social.github,   label: "GitHub" },
                ].map(({ icon: Icon, href, label }) => (
                  <a 
                    key={label} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title={label}
                    className="flex-1 min-w-[80px] flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-white/[0.06] hover:border-[var(--accent-global)]/40 py-2.5 sm:py-3 rounded-xl text-xs font-semibold transition-all duration-200 text-slate-350 hover:text-white truncate"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <Icon className="w-3.5 h-3.5 text-[var(--accent-global)] shrink-0" />
                    <span className="truncate">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/[0.07] rounded-2xl p-4 sm:p-5 w-full min-w-0">
              <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <div className="text-white font-bold text-xs sm:text-sm font-sora">Available Right Now</div>
              </div>
              <p className="text-[11.5px] sm:text-[12px] leading-relaxed text-slate-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                Our team typically responds within <span className="text-white font-semibold">2–4 hours</span> during business hours (IST). Guaranteed response within 24 hours.
              </p>
              <div className="mt-3.5 pt-3.5 border-t border-white/[0.06] grid grid-cols-3 gap-2 text-center w-full min-w-0">
                {[{ v: "150+", l: "Projects" }, { v: "50+", l: "Clients" }, { v: "4.9★", l: "Rating" }].map((s) => (
                  <div key={s.l} className="min-w-0">
                    <div className="text-white font-bold text-sm sm:text-base font-sora">{s.v}</div>
                    <div className="text-slate-500 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Map (full width, responsive) */}
      <div className="relative w-full z-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-slate-950 via-slate-950/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 bg-slate-950/90 backdrop-blur-sm px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/[0.14] shadow-xl max-w-[90%]">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-global)] shrink-0" />
          <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{settings.address}</span>
        </div>
        <iframe
          src={settings.mapEmbed || "https://maps.google.com/maps?q=53+eVeda+Online+Services+Aryanagar+Haridwar&t=&z=13&ie=UTF8&iwloc=&output=embed"}
          width="100%" height="380"
          style={{ border: 0, display: "block", filter: "invert(92%) hue-rotate(180deg) brightness(0.82) saturate(0.6) contrast(0.88)" }}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          title="Eveda Online Services Office Location"
        />
      </div>

      {/* Marquee below map */}
      <div className="relative overflow-hidden bg-slate-950 py-8 sm:py-10 w-full max-w-full">
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
        <div 
          className="contact-marquee-wrap relative z-10 w-full overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}
        >
          <div className="contact-marquee-track text-[40px] sm:text-[70px] md:text-[90px] font-black tracking-tighter uppercase select-none font-sora">
            {[...Array(2)].map((_, i) => (
              <span key={`a${i}`} className="inline-flex items-center gap-4 sm:gap-6 px-4 sm:px-6">
                <span className="text-white/90">GET IN</span>
                <span style={{ color: "var(--accent-global)" }}>TOUCH</span>
                <span className="text-white/20">★</span>
                <span className="text-white/90">START YOUR</span>
                <span style={{ color: "var(--accent-global)" }}>PROJECT</span>
                <span className="text-white/20">★</span>
                <span className="text-white/90">BUILD THE</span>
                <span style={{ color: "var(--accent-global)" }}>FUTURE</span>
                <span className="text-white/20">★</span>
                <span className="text-white/90">EVEDA ONLINE</span>
                <span style={{ color: "var(--accent-global)" }}>SERVICES</span>
                <span className="text-white/20">★</span>
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}