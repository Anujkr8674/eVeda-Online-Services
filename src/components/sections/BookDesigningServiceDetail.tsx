"use client";

import { useState, useEffect } from "react";
import { 
  Check, ArrowRight, Mail, Phone, MapPin, AlertCircle, 
  Code2, Zap, Globe, ChevronDown, ChevronUp,
  BookOpen, Sparkles, Terminal, CheckCircle2,
  Shield, Database, CreditCard, RefreshCw, Smartphone, ChevronRight, X,
  Layers, Palette, FileText, BookmarkCheck, Award, Library
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
        className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-orange-500/10 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" 
        style={{ transform: "translateZ(-10px)" }}
      />
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

// Book Design specific FAQs
const bookDesignFaqs = [
  {
    question: "What specifications and platforms do you design for?",
    answer: "We format and design books conforming strictly to Amazon KDP (Kindle Direct Publishing), IngramSpark, Barnes & Noble Press, Apple Books, Kobo, and Google Play Books. All print files include exact spine width calculations, bleed margins, and CMYK color profiles."
  },
  {
    question: "Do you deliver both print-ready PDF and reflowable eBook formats?",
    answer: "Yes! Every standard package includes high-resolution print-ready PDFs (with crop marks if required) alongside validated, responsive reflowable .ePub and Kindle-compatible files that render cleanly across all e-readers and tablet devices."
  },
  {
    question: "Can you handle complex interiors with illustrations, tables, and drop-caps?",
    answer: "Absolutely. We specialize in both fiction and complex non-fiction (cookbooks, business manuals, poetry, academic textbooks, memoirs). We incorporate custom chapter header flourishes, bespoke drop caps, pull quotes, callout boxes, and custom page numbering."
  },
  {
    question: "How are spine width and cover dimensions calculated?",
    answer: "Spine width is mathematically calculated based on your final formatted page count and paper stock selection (white paper vs cream paper vs color interior). We verify exact millimeter tolerances before exporting printer files."
  },
  {
    question: "Do I retain 100% of the copyright and source files?",
    answer: "Yes, you own 100% of all intellectual property, copyright, and publishing rights. We supply all production-ready files along with Adobe InDesign / Illustrator source files upon project completion."
  }
];

// Helper to convert hex to RGB
function hexToRgb(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return isNaN(r) || isNaN(g) || isNaN(b) ? "249, 115, 22" : `${r}, ${g}, ${b}`;
}

export default function BookDesigningServiceDetail({ service }: { service: ServiceDetail }) {
  const { settings } = useWebSettings();
  
  // Form State
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);
  
  // Interactive Calculator State
  const [genreType, setGenreType] = useState<string>("fiction");
  const [wordCount, setWordCount] = useState<number>(50); // in thousands
  const [hasCoverWrap, setHasCoverWrap] = useState(true);
  const [hasHardcover, setHasHardcover] = useState(true);
  const [hasAudioCover, setHasAudioCover] = useState(false);
  const [hasIllustrations, setHasIllustrations] = useState(false);
  const [has3DMockups, setHas3DMockups] = useState(true);
  const [isUrgent, setIsUrgent] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState<number>(45000);

  // Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Floating CTA state
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [dismissedCta, setDismissedCta] = useState(false);

  // Quick Hero email conversion
  const [heroEmail, setHeroEmail] = useState("");

  // Recalculate price dynamically
  useEffect(() => {
    let base = 25000;
    
    // Genre complexity
    if (genreType === "fiction") base = 25000;
    else if (genreType === "nonfiction") base = 32000;
    else if (genreType === "cookbook" || genreType === "children") base = 42000;
    else if (genreType === "poetry") base = 28000;

    // Word count calculation
    base += Math.round(wordCount * 250);

    // Format options
    if (hasCoverWrap) base += 8000;
    if (hasHardcover) base += 7000;
    if (hasAudioCover) base += 5000;
    if (hasIllustrations) base += 12000;
    if (has3DMockups) base += 4000;
    if (isUrgent) base = Math.round(base * 1.35);

    setEstimatedCost(base);
  }, [genreType, wordCount, hasCoverWrap, hasHardcover, hasAudioCover, hasIllustrations, has3DMockups, isUrgent]);

  // Scroll listener for floating CTA
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 600) {
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
        body: JSON.stringify({
          ...form,
          service: "Book Designing",
          notes: `Project Genre: ${genreType}, Word Count: ~${wordCount}k words, Est Budget: ₹${estimatedCost.toLocaleString("en-IN")}`
        }),
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

  const rgb = hexToRgb(service.accent || "#f97316");
  const customStyles = {
    "--accent-global": service.accent || "#f97316",
    "--accent-global-hover": `${service.accent || "#f97316"}ee`,
    "--accent-global-dim": `rgba(${rgb}, 0.08)`,
    "--accent-global-rgb": rgb,
  } as React.CSSProperties;

  const getMapSrc = (src: string) => {
    if (!src) return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14649.6!2d85.2896!3d23.3641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1035ec9bf83%3A0x6ec8f9f38fe2fc8e!2sRatu%20Rd%2C%20Ranchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin";
    if (src.includes("src=\"")) {
      const match = src.match(/src="([^"]+)"/);
      if (match && match[1]) return match[1];
    }
    return src;
  };

  return (
    <div className="bg-[#020617] text-white min-h-screen relative overflow-hidden font-sans" style={customStyles}>
      
      {/* ── JSON-LD Structured Data for Book Design Service ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Book Designing & Typesetting Services",
            "provider": {
              "@type": "Organization",
              "name": COMPANY.name,
              "url": "https://evedaonlineservices.com"
            },
            "serviceType": "Book Cover Design & Interior Typesetting",
            "description": service.metaDesc,
            "areaServed": "Global",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": "35000",
              "priceValidUntil": "2027-12-31"
            }
          })
        }}
      />

      {/* ── 1. Hero Section ── */}
      <ServiceHero
        badge="Bestseller Quality Guaranteed"
        title="Bespoke Book Designing"
        titleHighlight="& Typesetting Services"
        description={service.description}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* ── Quick Lead Capture Bar (Below Hero) ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-20 -mt-10 mb-16">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-sora">Get A Free Sample Chapter Typeset & Cover Consultation</h4>
              <p className="text-xs text-slate-400">Upload or describe your manuscript to receive an expert layout preview within 24 hours.</p>
            </div>
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (heroEmail) triggerOnboardingModal({ type: "quote", serviceType: "Book Designing", preselectedPackage: "Free Sample Chapter Typeset" });
            }}
            className="flex w-full lg:w-auto items-center gap-2"
          >
            <input
              type="email"
              placeholder="Enter your work email..."
              value={heroEmail}
              onChange={(e) => setHeroEmail(e.target.value)}
              className="bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 w-full lg:w-72"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all shrink-0 cursor-pointer flex items-center gap-2"
            >
              Get Sample <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* ── 2. Head-to-Head Comparison ── */}
      <section className="py-20 border-t border-white/5 relative z-10 bg-slate-950/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="INDUSTRY BENCHMARK"
            title="Why Authors Trust"
            titleHighlight="eVeda Book Design Studio"
            description="See how our bespoke publishing workflows elevate your book above amateur self-published titles."
          />

          <div className="mt-14 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-xs font-black uppercase text-slate-400 font-sora">Publishing Feature</th>
                  <th className="py-4 px-6 text-xs font-black uppercase text-rose-400 font-sora bg-rose-950/20 rounded-t-xl">Amateur / Budget Freelancer</th>
                  <th className="py-4 px-6 text-xs font-black uppercase text-orange-400 font-sora bg-orange-950/30 rounded-t-xl">eVeda Publishing Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {[
                  { feature: "COVER DESIGN QUALITY", traditional: "Flat stock photos with generic text overlay", eveda: "100% Custom 3D illustrated front, back & spine wrap" },
                  { feature: "INTERIOR TYPESETTING", traditional: "Microsoft Word default exports with awkward line breaks", eveda: "Pixel-perfect InDesign & Vellum typography with drop caps" },
                  { feature: "PRINTER SPECIFICATIONS", traditional: "Frequent Amazon KDP & IngramSpark file rejections", eveda: "Guaranteed 100% print pass with exact spine math" },
                  { feature: "EBOOK VALIDATION", traditional: "Broken images and garbled fonts on Kindle & iPad", eveda: "W3C-validated reflowable ePub3 and Kindle Mobi files" },
                  { feature: "AUDIOBOOK & MARKETING", traditional: "Ignored — no square cover or promotional renders", eveda: "ACX square audio covers + 3D photorealistic mockups" },
                  { feature: "COPYRIGHT & SOURCE FILES", traditional: "Withheld source files or ongoing licensing lock-in", eveda: "100% author-owned source files (.INDD, .PSD, fonts)" }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-bold text-white font-sora">{item.feature}</td>
                    <td className="py-4 px-6 text-slate-400 bg-rose-950/10">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{item.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white font-semibold bg-orange-950/20">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                        <span>{item.eveda}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 3. 3D Tilt Feature Bento Grid ── */}
      <section className="py-24 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="END-TO-END CAPABILITIES"
            title="Comprehensive Book Design"
            titleHighlight="& Typesetting Suite"
            description="From initial typography styling to print-on-demand fulfillment files, every element is crafted for visual brilliance."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: BookOpen,
                title: "Custom 3D Book Cover Wrap",
                desc: "Full front, spine, and back cover designs formatted to exact millimeter spine dimensions with barcode placement and CMYK color accuracy.",
                badge: "Full Cover Wrap"
              },
              {
                icon: FileText,
                title: "Interior Master Layout & Typography",
                desc: "Custom chapter headers, bespoke drop-caps, ornamental scene breaks, running headers, and optimized margins that ensure reading comfort.",
                badge: "Editorial Standard"
              },
              {
                icon: Smartphone,
                title: "Validated Multi-Platform ePub",
                desc: "Reflowable and fixed-layout eBook conversions tested rigorously across Kindle Paperwhite, iPad, Kobo, and Android tablets.",
                badge: "Zero Validation Errors"
              },
              {
                icon: Library,
                title: "IngramSpark & KDP Print Specs",
                desc: "Print-ready PDF/X-1a files pre-configured for Amazon KDP, IngramSpark, Barnes & Noble, and traditional offset litho print runs.",
                badge: "100% Print Pass"
              },
              {
                icon: Sparkles,
                title: "Photorealistic 3D Book Mockups",
                desc: "High-resolution 3D renders of your book (paperback, hardcover with dust jacket, tablet display) ready for advertising and websites.",
                badge: "Marketing Ready"
              },
              {
                icon: Award,
                title: "Audiobook ACX & Hardcover Kits",
                desc: "Square ACX cover art compliant with Audible and iTunes requirements, plus dust jacket flaps and foil stamping layouts.",
                badge: "Audio & Hardcover"
              }
            ].map((card, i) => {
              const IconComp = card.icon;
              return (
                <InteractiveTiltCard key={i} className="p-8 rounded-[28px] bg-slate-900/80 border border-white/10 hover:border-orange-500/40 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-orange-400">
                        {card.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white font-sora mb-3">{card.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-orange-400">
                    <span>Explore formatting specs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </InteractiveTiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Live Interactive Price Calculator ── */}
      <section className="py-20 bg-slate-950 border-y border-white/5 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="INSTANT ESTIMATE"
            title="Interactive Book Design"
            titleHighlight="Cost Calculator"
            description="Select your manuscript specifics and format options to view an instant transparent estimate."
          />

          <div className="max-w-4xl mx-auto mt-14 p-6 sm:p-10 rounded-[32px] bg-slate-900/90 border border-white/10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Controls */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Book Genre & Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "fiction", label: "Fiction Novel" },
                      { id: "nonfiction", label: "Business / Non-Fiction" },
                      { id: "cookbook", label: "Cookbook / Illustrated" },
                      { id: "poetry", label: "Poetry / Memoir" }
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGenreType(g.id)}
                        className={`p-3 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer ${
                          genreType === g.id
                            ? "bg-orange-500/20 border-orange-500 text-white"
                            : "bg-slate-950 border-white/10 text-slate-400 hover:text-white"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Manuscript Word Count</label>
                    <span className="text-sm font-black text-orange-400 font-sora">~{wordCount},000 Words</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={wordCount}
                    onChange={(e) => setWordCount(parseInt(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1">
                    <span>10k (Novella)</span>
                    <span>60k (Standard)</span>
                    <span>150k+ (Epic)</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Add-On Deliverables</label>
                  {[
                    { label: "Paperback Full Wrap (Front + Spine + Back)", state: hasCoverWrap, setter: setHasCoverWrap },
                    { label: "Hardcover Case Laminate / Dust Jacket", state: hasHardcover, setter: setHasHardcover },
                    { label: "Audiobook ACX Square Cover", state: hasAudioCover, setter: setHasAudioCover },
                    { label: "Custom Illustrated Chapter Headers", state: hasIllustrations, setter: setHasIllustrations },
                    { label: "3D Promotional Social Media Mockup Kit", state: has3DMockups, setter: setHas3DMockups },
                    { label: "Rush 4-Day Express Delivery (+35%)", state: isUrgent, setter: setIsUrgent },
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                      <span className="text-xs font-medium text-slate-300">{item.label}</span>
                      <input
                        type="checkbox"
                        checked={item.state}
                        onChange={(e) => item.setter(e.target.checked)}
                        className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Right Output Card */}
              <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-orange-950/30 border border-orange-500/20">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Calculated Estimate</span>
                  </div>
                  
                  <div className="text-4xl sm:text-5xl font-black text-white font-sora mb-2">
                    ₹{estimatedCost.toLocaleString("en-IN")}
                  </div>
                  <p className="text-xs text-slate-400 mb-6">Estimated turnaround: {isUrgent ? "4-5 business days" : "7-10 business days"}</p>

                  <div className="space-y-3 border-t border-white/10 pt-4 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>100% KDP & IngramSpark Print Validation Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>Reflowable ePub for Kindle, iPad & Kobo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>Full Intellectual Property & Source Files Handoff</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => triggerOnboardingModal({ type: "quote", serviceType: "Book Designing", preselectedPackage: `Custom Calculator Estimate (₹${estimatedCost.toLocaleString("en-IN")})` })}
                  className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Lock In Scope & Start Project <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Transparent Pricing Tiers ── */}
      <section className="py-24 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="FIXED TIERS"
            title="Book Designing"
            titleHighlight="Packages & Pricing"
            description="Simple, transparent packages suited for debut authors, multi-book series, and publishing houses."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {service.pricing.map((tier, idx) => {
              const isPopular = idx === 1;
              return (
                <InteractiveTiltCard
                  key={tier.tier}
                  className={`p-8 rounded-[32px] flex flex-col justify-between transition-all duration-300 ${
                    isPopular
                      ? "bg-slate-900 border-2 border-orange-500 shadow-2xl shadow-orange-500/10"
                      : "bg-slate-900/60 border border-white/10"
                  }`}
                >
                  <div>
                    {isPopular && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest mb-4">
                        <Sparkles className="w-3 h-3" /> Most Popular Choice
                      </div>
                    )}
                    <h3 className="text-2xl font-black text-white font-sora">{tier.tier}</h3>
                    <div className="text-3xl font-black text-orange-400 font-sora mt-2 mb-3">{tier.price}</div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">{tier.desc}</p>

                    <div className="space-y-3 pt-4 border-t border-white/10">
                      {tier.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => triggerOnboardingModal({ type: "package", serviceType: "Book Designing", preselectedPackage: `${service.title} (${tier.tier})` })}
                    className={`w-full mt-8 py-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isPopular
                        ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    Select {tier.tier} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </InteractiveTiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. Step-by-Step Delivery Roadmap ── */}
      <ProcessSteps steps={service.process} serviceTitle={service.title} />

      {/* ── 7. Portfolio Showcase ── */}
      <Portfolio />

      {/* ── 8. Technology & Publishing Toolset ── */}
      <TechStack />

      {/* ── 9. FAQ Accordion ── */}
      <section className="py-20 border-t border-white/5 relative z-10 bg-slate-950/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="FAQ"
            title="Frequently Asked"
            titleHighlight="Questions"
            description="Everything you need to know about book cover creation, typesetting, and print specifications."
          />

          <div className="mt-12 space-y-4">
            {bookDesignFaqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left text-base font-bold text-white font-sora cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-orange-400 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP (full width) ── */}
      <div className="relative w-full z-0">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-950 via-slate-950/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-950/90 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/[0.14] shadow-xl whitespace-nowrap">
          <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
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
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 70%)", opacity: 0.55 }} />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgb(2_6_23)_100%)]" />
        <div className="contact-marquee-wrap relative z-10 w-full overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)" }}>
          <div className="contact-marquee-track text-[52px] sm:text-[80px] md:text-[100px] font-black tracking-tighter uppercase select-none font-sora">
            {[...Array(2)].map((_, i) => (
              <span key={`a${i}`} className="inline-flex items-center gap-6 px-6">
                <span className="text-white/90">GET IN</span>
                <span style={{ color: "#f97316" }}>TOUCH</span>
                <span className="text-white/20">·</span>
                <span className="text-white/90">START YOUR</span>
                <span style={{ color: "#f97316" }}>BOOK</span>
                <span className="text-white/20">·</span>
                <span className="text-white/90">PUBLISH THE</span>
                <span style={{ color: "#f97316" }}>BESTSELLER</span>
                <span className="text-white/20">·</span>
                <span className="text-white/90">EVEDA ONLINE</span>
                <span style={{ color: "#f97316" }}>SERVICES</span>
                <span className="text-white/20">·</span>
              </span>
            ))}
            {[...Array(2)].map((_, i) => (
              <span key={`b${i}`} className="inline-flex items-center gap-6 px-6">
                <span className="text-white/90">GET IN</span>
                <span style={{ color: "#f97316" }}>TOUCH</span>
                <span className="text-white/20">·</span>
                <span className="text-white/90">START YOUR</span>
                <span style={{ color: "#f97316" }}>BOOK</span>
                <span className="text-white/20">·</span>
                <span className="text-white/90">PUBLISH THE</span>
                <span style={{ color: "#f97316" }}>BESTSELLER</span>
                <span className="text-white/20">·</span>
                <span className="text-white/90">EVEDA ONLINE</span>
                <span style={{ color: "#f97316" }}>SERVICES</span>
                <span className="text-white/20">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 10. Floating Bottom Conversion Bar with Close/Dismiss Button ── */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-xl transition-all duration-500 ease-out transform ${
          showFloatingCta && !dismissedCta ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-slate-900/95 backdrop-blur-xl border border-orange-500/30 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-orange-400 animate-ping" />
            <div>
              <p className="text-xs font-bold text-white font-sora">Publishing Design Slots Open</p>
              <p className="text-[10px] text-slate-400">Receive free typography audit & cover mockup sample</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerOnboardingModal({ type: "general", serviceType: "Book Designing" })}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-lg shadow-orange-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              Book Free Consultation
            </button>
            <button
              onClick={() => setDismissedCta(true)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Dismiss consultation bar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
