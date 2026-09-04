"use client";

import { useState, useEffect } from "react";
import { 
  Check, ArrowRight, Mail, Phone, MapPin, AlertCircle, 
  Code2, Zap, Globe, ChevronDown, ChevronUp,
  Sparkles, Terminal, CheckCircle2, Video, Share2, Target,
  Shield, Database, CreditCard, RefreshCw, Smartphone, ChevronRight, X,
  Layers, Palette, FileText, BookmarkCheck, Award, Megaphone, Users
} from "lucide-react";
import Link from "next/link";
import { FaLinkedinIn, FaTwitter, FaGithub, FaTiktok, FaInstagram } from "react-icons/fa";
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
        className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-[#c4347c]/10 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" 
        style={{ transform: "translateZ(-10px)" }}
      />
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

// Helper to convert hex to RGB
function hexToRgb(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return isNaN(r) || isNaN(g) || isNaN(b) ? "196, 52, 124" : `${r}, ${g}, ${b}`;
}

// Book Branding FAQs
const bookBrandingFaqs = [
  {
    question: "What is included in an Author Branding & Launch Kit?",
    answer: "Our comprehensive author branding packages include an Author Brand Style Guide (logo, color codes, typography scales), custom Amazon A+ Content modules, BookTok/Reels viral video trailers, media press release kits, Goodreads & BookBub graphics, and automated reader magnet email funnels."
  },
  {
    question: "How does Amazon A+ Content increase book sales?",
    answer: "Amazon reports that titles with rich visual A+ Content convert up to 5.6% higher than plain text product pages. We craft immersive storytelling banners, character visual charts, comparison matrices, and editorial award badges that captivate browsing readers."
  },
  {
    question: "Do you create BookTok, Instagram Reels, and YouTube Shorts trailers?",
    answer: "Yes! We produce high-retention cinematic 9:16 vertical video trailers with licensed sound effects, kinetic typography, 3D book spin animations, and compelling hook scripts that drive viral reach on TikTok and Instagram."
  },
  {
    question: "How do you help build my email newsletter & ARC reader team?",
    answer: "We design and build dedicated author landing pages with integrated lead magnet funnels (e.g., free prequel novella, bonus chapters, character artwork), linking directly to Mailchimp, ConvertKit, or MailerLite to build a loyal subscriber base before launch day."
  },
  {
    question: "Can you manage our launch advertising and BookBub featured deals?",
    answer: "Yes, our team creates target ad creative suites (Meta visual ads, BookBub banners, Amazon Sponsored Products banners) with tailored copywriting designed for high click-through rates and low cost-per-acquisition."
  }
];

export default function BookBrandingServiceDetail({ service }: { service: ServiceDetail }) {
  const { settings } = useWebSettings();

  // Form State
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);

  // Interactive Launch Calculator State
  const [authorStage, setAuthorStage] = useState<string>("debut");
  const [hasAplus, setHasAplus] = useState(true);
  const [hasTrailer, setHasTrailer] = useState(true);
  const [hasAuthorSite, setHasAuthorSite] = useState(true);
  const [hasArcFunnel, setHasArcFunnel] = useState(true);
  const [hasPressKit, setHasPressKit] = useState(false);
  const [hasAdCreatives, setHasAdCreatives] = useState(false);
  const [isFastTrack, setIsFastTrack] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState<number>(75000);

  // Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Floating CTA state
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [dismissedCta, setDismissedCta] = useState(false);

  // Quick Hero email conversion
  const [heroEmail, setHeroEmail] = useState("");

  // Recalculate price dynamically
  useEffect(() => {
    let base = 35000;
    
    if (authorStage === "debut") base = 35000;
    else if (authorStage === "indie") base = 60000;
    else if (authorStage === "franchise") base = 110000;

    if (hasAplus) base += 20000;
    if (hasTrailer) base += 25000;
    if (hasAuthorSite) base += 35000;
    if (hasArcFunnel) base += 15000;
    if (hasPressKit) base += 12000;
    if (hasAdCreatives) base += 18000;
    if (isFastTrack) base = Math.round(base * 1.3);

    setEstimatedCost(base);
  }, [authorStage, hasAplus, hasTrailer, hasAuthorSite, hasArcFunnel, hasPressKit, hasAdCreatives, isFastTrack]);

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
          service: "Book Branding",
          notes: `Author Stage: ${authorStage}, Est Budget: ₹${estimatedCost.toLocaleString("en-IN")}`
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

  const rgb = hexToRgb(service.accent || "#c4347cdc");
  const customStyles = {
    "--accent-global": service.accent || "#c4347cdc",
    "--accent-global-hover": "#c4347c",
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
      
      {/* ── JSON-LD Structured Data for Book Branding Service ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Author Branding & Book Launch Marketing Services",
            "provider": {
              "@type": "Organization",
              "name": COMPANY.name,
              "url": "https://evedaonlineservices.com"
            },
            "serviceType": "Author Platform Strategy & Book Launch Marketing",
            "description": service.metaDesc,
            "areaServed": "Global",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": "60000",
              "priceValidUntil": "2027-12-31"
            }
          })
        }}
      />

      {/* ── 1. Hero Section ── */}
      <ServiceHero
        badge="Bestseller Launch Engine"
        title="Author Platform Branding"
        titleHighlight="& Book Launch Suite"
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
            <div className="w-12 h-12 rounded-xl bg-[#c4347c]/10 border border-[#c4347c]/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#c4347c]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-sora">Get A Complimentary Author Brand & Amazon A+ Content Audit</h4>
              <p className="text-xs text-slate-400">Discover where your book page is losing readers and how a branded launch funnels more sales.</p>
            </div>
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (heroEmail) triggerOnboardingModal({ type: "quote", serviceType: "Book Branding", preselectedPackage: "Author Brand & A+ Content Audit" });
            }}
            className="flex w-full lg:w-auto items-center gap-2"
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              value={heroEmail}
              onChange={(e) => setHeroEmail(e.target.value)}
              className="bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c4347c] w-full lg:w-72"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c4347c] to-[#9d2460] text-white text-sm font-bold shadow-lg shadow-[#c4347c]/20 hover:opacity-95 transition-all shrink-0 cursor-pointer flex items-center gap-2"
            >
              Get Free Audit <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* ── 2. Head-to-Head Comparison ── */}
      <section className="py-20 border-t border-white/5 relative z-10 bg-slate-950/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="GROWTH MULTIPLIER"
            title="Unbranded Book Release vs"
            titleHighlight="eVeda Author Ecosystem"
            description="See how structured branding turns casual page visitors into loyal lifetime readers and newsletter advocates."
          />

          <div className="mt-14 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-xs font-black uppercase text-slate-400 font-sora">Launch Strategy</th>
                  <th className="py-4 px-6 text-xs font-black uppercase text-rose-400 font-sora bg-rose-950/20 rounded-t-xl">Standard Self-Publishing</th>
                  <th className="py-4 px-6 text-xs font-black uppercase text-[#c4347c] font-sora bg-[#c4347c]/20 rounded-t-xl">eVeda Bestseller Branding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {[
                  { feature: "AMAZON A+ CONTENT", traditional: "Plain boring text product description with zero visuals", eveda: "Immersive visual brand story banners + character cards" },
                  { feature: "BOOK TRAILER PRODUCTION", traditional: "Static slideshow video with robotic voiceovers", eveda: "Cinematic 3D kinetic video trailers for TikTok & Reels" },
                  { feature: "READER EMAIL FUNNEL", traditional: "No mailing list, reliant 100% on algorithm luck", eveda: "High-converting ARC team & reader magnet automation" },
                  { feature: "AUTHOR PLATFORM & PR", traditional: "No media press kit, zero editorial outreach", eveda: "Full author press one-sheet & digital podcast/blog tour kit" },
                  { feature: "SOCIAL MEDIA ASSETS", traditional: "Disjointed, pixelated Canva graphics with no identity", eveda: "Bespoke 30-day viral launch social pack with brand guidelines" },
                  { feature: "SERIES SCALABILITY", traditional: "Every book starts from zero audience scratch", eveda: "Evergreen reader funnel that cross-sells entire backlist" }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-bold text-white font-sora">{item.feature}</td>
                    <td className="py-4 px-6 text-slate-400 bg-rose-950/10">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{item.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white font-semibold bg-[#c4347c]/10">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#c4347c] shrink-0" />
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
            badge="AUTHOR ECOSYSTEM"
            title="Complete Author Branding"
            titleHighlight="& Launch Architecture"
            description="Every asset you need to establish authority, hook readers, and convert launch momentum into lasting bestseller rankings."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: Sparkles,
                title: "Amazon A+ Enhanced Content",
                desc: "Eye-catching Amazon A+ visual modules featuring character art, world maps, editorial review highlights, and comparison carousels.",
                badge: "5.6% Conversion Lift"
              },
              {
                icon: Video,
                title: "Cinematic 3D Book Trailers",
                desc: "High-retention 9:16 vertical trailers for BookTok, Instagram Reels, and YouTube Shorts with motion graphics, sound design, and viral hooks.",
                badge: "Viral BookTok Ready"
              },
              {
                icon: Globe,
                title: "Author Platform & Landing Page",
                desc: "Fast, elegant author website with integrated book catalog, sample chapter reader, and newsletter sign-up integrations.",
                badge: "Full Web Platform"
              },
              {
                icon: Users,
                title: "ARC Team & Reader Magnet Funnel",
                desc: "Automated onboarding sequences that recruit advance review copy (ARC) readers and turn buyers into enthusiastic 5-star reviewers.",
                badge: "Review Generation"
              },
              {
                icon: Megaphone,
                title: "Media Press Kit & PR One-Sheet",
                desc: "Professional press kit with author bio, high-res book covers, interview Q&A talking points, and pitch templates for podcasts & media.",
                badge: "PR & Media Ready"
              },
              {
                icon: Target,
                title: "BookBub & Meta Ad Creative Suite",
                desc: "Proven high-converting ad banners and vertical video ad variations sized for Meta Ads, Amazon Sponsored Products, and BookBub.",
                badge: "High ROAS Creative"
              }
            ].map((card, i) => {
              const IconComp = card.icon;
              return (
                <InteractiveTiltCard key={i} className="p-8 rounded-[28px] bg-slate-900/80 border border-white/10 hover:border-[#c4347c]/40 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#c4347c]/10 border border-[#c4347c]/20 flex items-center justify-center text-[#c4347c]">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#c4347c]">
                        {card.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white font-sora mb-3">{card.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-[#c4347c]">
                    <span>View campaign breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </InteractiveTiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Live Interactive Launch Campaign Calculator ── */}
      <section className="py-20 bg-slate-950 border-y border-white/5 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="CAMPAIGN PLANNER"
            title="Interactive Author Launch"
            titleHighlight="Budget Calculator"
            description="Configure your launch components to view a customized timeline and estimated investment."
          />

          <div className="max-w-4xl mx-auto mt-14 p-6 sm:p-10 rounded-[32px] bg-slate-900/90 border border-white/10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Controls */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Author Publishing Stage</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "debut", label: "Debut Release" },
                      { id: "indie", label: "Multi-Book Indie" },
                      { id: "franchise", label: "Series Franchise" }
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setAuthorStage(s.id)}
                        className={`p-3 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                          authorStage === s.id
                            ? "bg-[#c4347c]/20 border-[#c4347c] text-white"
                            : "bg-slate-950 border-white/10 text-slate-400 hover:text-white"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Launch Deliverables</label>
                  {[
                    { label: "Amazon A+ Content Suite (3 Brand Story Modules)", state: hasAplus, setter: setHasAplus },
                    { label: "Cinematic 3D Book Trailer (16:9 4K + 9:16 Vertical)", state: hasTrailer, setter: setHasTrailer },
                    { label: "Custom Author Website & Landing Page", state: hasAuthorSite, setter: setHasAuthorSite },
                    { label: "Reader Magnet & Automated ARC Funnel", state: hasArcFunnel, setter: setHasArcFunnel },
                    { label: "Media Press Kit & Podcast Tour Pack", state: hasPressKit, setter: setHasPressKit },
                    { label: "Multi-Channel Paid Ad Creative Suite (Meta/BookBub)", state: hasAdCreatives, setter: setHasAdCreatives },
                    { label: "Fast-Track 10-Day Rush Delivery (+30%)", state: isFastTrack, setter: setIsFastTrack },
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                      <span className="text-xs font-medium text-slate-300">{item.label}</span>
                      <input
                        type="checkbox"
                        checked={item.state}
                        onChange={(e) => item.setter(e.target.checked)}
                        style={{ accentColor: "#c4347c" }}
                        className="w-4 h-4 rounded cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Right Output Card */}
              <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-[#c4347c]/20 border border-[#c4347c]/20">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c4347c]/10 border border-[#c4347c]/30 text-[#c4347c] text-xs font-bold mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Launch Blueprint Estimate</span>
                  </div>
                  
                  <div className="text-4xl sm:text-5xl font-black text-white font-sora mb-2">
                    ₹{estimatedCost.toLocaleString("en-IN")}
                  </div>
                  <p className="text-xs text-slate-400 mb-6">Execution window: {isFastTrack ? "10-14 days sprint" : "3-4 weeks comprehensive"}</p>

                  <div className="space-y-3 border-t border-white/10 pt-4 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#c4347c] shrink-0" />
                      <span>Direct Amazon A+ Content Upload Format Compliance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#c4347c] shrink-0" />
                      <span>Full 4K & Vertical Video Master Files Included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#c4347c] shrink-0" />
                      <span>Dedicated Author Brand Strategist Support</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => triggerOnboardingModal({ type: "quote", serviceType: "Book Branding", preselectedPackage: `Custom Launch Blueprint (₹${estimatedCost.toLocaleString("en-IN")})` })}
                  className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-[#c4347c] to-[#9d2460] text-white font-extrabold text-sm shadow-xl shadow-[#c4347c]/25 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Schedule Launch Strategy Call <ArrowRight className="w-4 h-4" />
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
            badge="LAUNCH PACKAGES"
            title="Author Branding"
            titleHighlight="Tiers & Solutions"
            description="Transparent packages engineered for indie publishers, debut novelists, and high-volume author franchises."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {service.pricing.map((tier, idx) => {
              const isPopular = idx === 1;
              return (
                <InteractiveTiltCard
                  key={tier.tier}
                  className={`p-8 rounded-[32px] flex flex-col justify-between transition-all duration-300 ${
                    isPopular
                      ? "bg-slate-900 border-2 border-[#c4347c] shadow-2xl shadow-[#c4347c]/15"
                      : "bg-slate-900/60 border border-white/10"
                  }`}
                >
                  <div>
                    {isPopular && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c4347c] text-white text-[10px] font-black uppercase tracking-widest mb-4">
                        <Sparkles className="w-3 h-3" /> Recommended Launch Strategy
                      </div>
                    )}
                    <h3 className="text-2xl font-black text-white font-sora">{tier.tier}</h3>
                    <div className="text-3xl font-black text-[#c4347c] font-sora mt-2 mb-3">{tier.price}</div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">{tier.desc}</p>

                    <div className="space-y-3 pt-4 border-t border-white/10">
                      {tier.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-[#c4347c] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => triggerOnboardingModal({ type: "package", serviceType: "Book Branding", preselectedPackage: `${service.title} (${tier.tier})` })}
                    className={`w-full mt-8 py-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isPopular
                        ? "bg-[#c4347c] hover:bg-[#a32262] text-white shadow-lg shadow-[#c4347c]/20"
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
            description="Common questions about author platform building, Amazon A+ design, and launch marketing funnels."
          />

          <div className="mt-12 space-y-4">
            {bookBrandingFaqs.map((faq, i) => (
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
                  <ChevronDown className={`w-5 h-5 text-[#c4347c] transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
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
          <MapPin className="w-4 h-4 text-[#c4347c] shrink-0" />
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
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(196, 52, 124, 0.15) 0%, transparent 70%)", opacity: 0.55 }} />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgb(2_6_23)_100%)]" />
        <div className="contact-marquee-wrap relative z-10 w-full overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)" }}>
          <div className="contact-marquee-track text-[52px] sm:text-[80px] md:text-[100px] font-black tracking-tighter uppercase select-none font-sora">
            {[...Array(2)].map((_, i) => (
              <span key={`a${i}`} className="inline-flex items-center gap-6 px-6">
                <span className="text-white/90">BUILD YOUR</span>
                <span style={{ color: "#c4347cdc" }}>AUTHOR BRAND</span>
                <span className="text-white/20">·</span>
                <span className="text-white/90">LAUNCH THE</span>
                <span style={{ color: "#c4347cdc" }}>BESTSELLER</span>
                <span className="text-white/20">·</span>
                <span className="text-white/90">EVEDA ONLINE</span>
                <span style={{ color: "#c4347cdc" }}>SERVICES</span>
                <span className="text-white/20">·</span>
              </span>
            ))}
            {[...Array(2)].map((_, i) => (
              <span key={`b${i}`} className="inline-flex items-center gap-6 px-6">
                <span className="text-white/90">BUILD YOUR</span>
                <span style={{ color: "#c4347cdc" }}>AUTHOR BRAND</span>
                <span className="text-white/20">·</span>
                <span className="text-white/90">LAUNCH THE</span>
                <span style={{ color: "#c4347cdc" }}>BESTSELLER</span>
                <span className="text-white/20">·</span>
                <span className="text-white/90">EVEDA ONLINE</span>
                <span style={{ color: "#c4347cdc" }}>SERVICES</span>
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
        <div className="bg-slate-900/95 backdrop-blur-xl border border-[#c4347c]/30 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#c4347c] animate-ping" />
            <div>
              <p className="text-xs font-bold text-white font-sora">Author Launch Strategy Slots</p>
              <p className="text-[10px] text-slate-400">Claim your free Amazon A+ Content & branding blueprint</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerOnboardingModal({ type: "general", serviceType: "Book Branding" })}
              className="px-4 py-2 rounded-xl bg-[#c4347c] hover:bg-[#a32262] text-white text-xs font-bold shadow-lg shadow-[#c4347c]/20 transition-all cursor-pointer whitespace-nowrap"
            >
              Book Strategy Session
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
