"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail, Phone, MapPin, ArrowRight,
  PhoneCall, Sparkles, Globe2
} from "lucide-react";
import {
  FaTwitter, FaLinkedinIn, FaGithub, FaInstagram,
  FaFacebookF, FaYoutube, FaWhatsapp
} from "react-icons/fa";
import { COMPANY } from "@/lib/utils";
import { useWebSettings } from "@/context/WebSettingsContext";
import { triggerOnboardingModal } from "@/components/shared/OnboardingModal";
import { triggerBookDemoModal } from "@/components/shared/BookDemoModal";

function LogoMark({ size = 68 }: { size?: number }) {
  return (
    <img
      // src="/images/logo.png"
      alt="Eveda Online Services"
      style={{ height: `${size}px`, width: "auto", display: "block", objectFit: "contain" }}
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />
  );
}

const footerLinks = {
  Services: [
    { label: "Web Development", href: "/services/web" },
    { label: "Mobile Apps", href: "/services/mobile" },
    { label: "SaaS Platforms", href: "/services/saas" },
    { label: "AI Solutions", href: "/services/ai" },
    { label: "Cloud & DevOps", href: "/services/cloud" },
    { label: "UI/UX Design", href: "/services/design" },
  ],
  Products: [
    { label: "Documents Management", href: "/products/dms" },
    { label: "CRM System", href: "/products/crm" },
    { label: "E-Commerce System", href: "/products/ecommerce" },
    { label: "Hospital Management", href: "/products/hms" },
    { label: "HR Payroll & Roster", href: "/products/hrms" },
    { label: "POS & Retail Solutions", href: "/products/pos" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Our Portfolio", href: "/portfolio" },
    { label: "Careers", href: "/careers" },
    { label: "Blog & Insights", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ]
};

export default function Footer() {
  const { settings } = useWebSettings();
  const [isScrollActive, setIsScrollActive] = useState(false);

  const socials = [
    { icon: FaLinkedinIn, href: settings.social.linkedin, label: "LinkedIn" },
    { icon: FaGithub, href: settings.social.github, label: "GitHub" },
    { icon: FaInstagram, href: settings.social.instagram, label: "Instagram" },
    { icon: FaFacebookF, href: settings.social.facebook, label: "Facebook" },
    { icon: FaYoutube, href: settings.social.youtube, label: "YouTube" },
  ].filter((s) => Boolean(s.href));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrollActive(true);
      } else {
        setIsScrollActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-slate-950 border-t border-white/[0.08] text-white">

      {/* ── Background: deep purple radial + grid pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124, 58, 237, 0.25) 0%, rgba(109, 40, 217, 0.1) 45%, transparent 80%)",
        }}
      />

      {/* Subtle secondary glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom right, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Grid dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top neon border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/70 to-transparent" />

      {/* ── Main Content ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-16 relative z-10">

        {/* ══ STUNNING GLASSMOPHIC CTA BANNER ══ */}
        <div className="mb-16 p-8 sm:p-10 rounded-[32px] bg-white/[0.02] border border-white/[0.06] backdrop-blur-md relative overflow-hidden group/cta">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-[80px] opacity-25 pointer-events-none bg-[#7C3AED]" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-center lg:text-left space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#a78bfa] bg-[#7C3AED]/10 border border-[#7C3AED]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#a78bfa]" /> Digital Transformation
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-sora tracking-tight">
                Ready to build something <span className="text-[#a78bfa]">extraordinary</span>?
              </h3>
              <p className="text-slate-300 text-sm max-w-2xl font-medium leading-relaxed">
                Consult with our digital architects to map out custom software development, integrations, and enterprise configurations.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 shrink-0">
              <button
                onClick={() => triggerOnboardingModal({ type: "general" })}
                className="h-12 px-7 text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-purple-500/25 bg-[#7C3AED] hover:bg-[#6D28D9] hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Free Estimate <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => triggerBookDemoModal()}
                className="h-12 px-7 text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all duration-300 border border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Book A Live Demo
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 mb-16">

          {/* ── Brand Column (4 Cols) ── */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="space-y-4">
              <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
                <LogoMark size={68} />
              </Link>
              <p className="text-[14px] leading-relaxed text-slate-200 font-medium max-w-[340px]">
                {COMPANY.description}
              </p>
              <div className="inline-flex items-center gap-2 text-[10px] font-extrabold text-slate-350 uppercase tracking-widest border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] inline-block animate-pulse" />
                Est. {COMPANY.founded} · Ranchi, India
              </div>
            </div>
          </div>

          {/* ── Link Columns (5 Cols - 3 columns of sub-grid) ── */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-5">
                <h4 className="text-white font-extrabold text-[12px] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3.5 rounded-full bg-[#7C3AED] inline-block shadow-[0_0_8px_#7C3AED]" />
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-slate-300 hover:text-white transition-all hover:translate-x-1 inline-block duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Get In Touch Column (3 Cols) ── */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-white font-extrabold text-[12px] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-3.5 rounded-full bg-[#7C3AED] inline-block shadow-[0_0_8px_#7C3AED]" />
              Get in Touch
            </h4>

            {/* Contact Details */}
            <div className="space-y-3.5">
              <a href={`mailto:${settings.email}`}
                className="flex items-center gap-3 text-[13px] text-slate-200 hover:text-[#a78bfa] transition-colors duration-250 group">
                <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-[#7C3AED]/40 group-hover:bg-[#7C3AED]/10 transition-all">
                  <Mail className="w-3.5 h-3.5 text-[#a78bfa]" />
                </div>
                <span className="truncate">{settings.email}</span>
              </a>

              <a href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 text-[13px] text-slate-200 hover:text-[#a78bfa] transition-colors duration-250 group">
                <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-[#7C3AED]/40 group-hover:bg-[#7C3AED]/10 transition-all">
                  <Phone className="w-3.5 h-3.5 text-[#a78bfa]" />
                </div>
                <span>{settings.phone}</span>
              </a>

              <div className="flex items-start gap-3 text-[13px] text-slate-200">
                <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#a78bfa]" />
                </div>
                <span className="leading-relaxed mt-0.5 text-xs">{settings.location}</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/15 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ══ HORIZONTAL DEVELOPMENT HUBS ROW ══ */}
        <div className="border-t border-white/[0.06] py-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Globe2 className="w-4 h-4 text-[#a78bfa]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#a78bfa]">Development Hubs</span>
          </div>

          <div className="flex flex-wrap justify-center gap-y-2 gap-x-4 text-[11px] font-bold text-slate-200 tracking-wider">
            <span>Haridwar (HQ)</span>
            <span className="text-white/20">•</span>
            <span>Delhi</span>
            <span className="text-white/20">•</span>
            <span>Gurugram</span>
            <span className="text-white/20">•</span>
            <span>Noida</span>
            <span className="text-white/20">•</span>
            <span>Hyderabad</span>
            <span className="text-white/20">•</span>
            <span>Pune</span>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-slate-400 font-medium">
            <p>
              © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
            </p>
            <span className="text-white/10 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>All Systems Operational</span>
            </div>
          </div>

          <div className="flex items-center gap-6 font-bold">
            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>

      {/* ══ PERSISTENT FLOATING CALL & WHATSAPP CTA WIDGET (Sits above Scroll-to-Top button dynamically) ══ */}
      <div
        className="fixed right-6 z-45 flex flex-col gap-3.5 items-end transition-all duration-300 ease-out"
        style={{ bottom: isScrollActive ? "80px" : "24px" }}
      >
        {/* Call Button */}
        <a
          href={`tel:${settings.phone.replace(/\s+/g, "")}`}
          className="group relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Call Tech Architect"
        >
          {/* Pulsing Outer Ring */}
          <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping opacity-75 pointer-events-none" />
          <PhoneCall className="w-4.5 h-4.5 sm:w-5 sm:h-5 relative z-10" />

          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-[11px] font-bold tracking-wide whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow-md">
            Call Tech Architect
          </span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-green-500 to-emerald-600 text-white shadow-xl shadow-green-600/30 hover:shadow-green-600/50 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulsing Outer Ring */}
          <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping opacity-75 pointer-events-none" style={{ animationDelay: "0.5s" }} />
          <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />

          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-[11px] font-bold tracking-wide whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow-md">
            Chat on WhatsApp
          </span>
        </a>
      </div>

    </footer>
  );
}
