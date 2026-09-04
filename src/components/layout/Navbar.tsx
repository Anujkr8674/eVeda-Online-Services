"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Code2, Smartphone, Layers, Brain, Cloud, Server,
  ChevronDown, Menu, X, ArrowRight,
  MessageSquare, FileText, Search, Share2, Users, Shield, Video, PenTool, Target, Layout,
  Phone, Mail, MapPin, Sparkles, BookOpen,
  GraduationCap, Activity, MonitorPlay, School, Store, Calculator, Truck, Boxes, ShoppingCart, Briefcase
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/utils";
import { useWebSettings } from "@/context/WebSettingsContext";
import { triggerOnboardingModal } from "@/components/shared/OnboardingModal";

function LogoMark({ size = 52 }: { size?: number }) {
  return (
    <img
      // src="/images/logo.png"
      alt="Eveda Online Services"
      style={{
        height: `${size}px`,
        width: "auto",
        display: "block",
        objectFit: "contain",
        maxWidth: "220px",
        transition: "all 0.5s ease-in-out",
      }}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}

const servicesMenuLinks = [
  {
    label: "Web Development",
    desc: "Custom full-stack web applications",
    href: "/services/web",
    icon: Code2,
    color: "#3B82F6", // Blue
    bg: "rgba(59, 130, 246, 0.08)"
  },
  {
    label: "Mobile App Development",
    desc: "iOS & Android native apps",
    href: "/services/mobile",
    icon: Smartphone,
    color: "#10B981", // Emerald
    bg: "rgba(16, 185, 129, 0.08)"
  },
  {
    label: "SaaS Platforms",
    desc: "Scalable multi-tenant portals",
    href: "/services/saas",
    icon: Layers,
    color: "#8B5CF6", // Purple
    bg: "rgba(139, 92, 246, 0.08)"
  },
  {
    label: "AI & ML Solutions",
    desc: "Intelligent agents & automation",
    href: "/services/ai",
    icon: Brain,
    color: "#EF4444", // Red
    bg: "rgba(239, 68, 68, 0.08)"
  },
  {
    label: "Cloud Services",
    desc: "AWS, Azure & GCP infra setups",
    href: "/services/cloud",
    icon: Cloud,
    color: "#06B6D4", // Cyan
    bg: "rgba(6, 182, 212, 0.08)"
  },
  {
    label: "DevOps & CI/CD",
    desc: "Continuous deployment automation",
    href: "/services/devops",
    icon: Server,
    color: "#F59E0B", // Amber
    bg: "rgba(245, 158, 11, 0.08)"
  },
  {
    label: "WhatsApp Marketing",
    desc: "Official business API & automation",
    href: "/services/whatsapp-marketing",
    icon: MessageSquare,
    color: "#25D366", // Green
    bg: "rgba(37, 211, 102, 0.08)"
  },
  {
    label: "Search Engine Optimization",
    desc: "Rank page 1 on Google & search engines",
    href: "/services/seo",
    icon: Search,
    color: "#3B82F6", // Blue
    bg: "rgba(59, 130, 246, 0.08)"
  },
  {
    label: "Social Media Marketing",
    desc: "Grow audiences & organic content",
    href: "/services/social-media-marketing",
    icon: Share2,
    color: "#8B5CF6", // Purple
    bg: "rgba(139, 92, 246, 0.08)"
  },
  {
    label: "Paid Ads (PPC)",
    desc: "Target ad campaigns on Meta & Google",
    href: "/services/ppc",
    icon: Target,
    color: "#EF4444", // Red
    bg: "rgba(239, 68, 68, 0.08)"
  },
  {
    label: "3D Video Editing",
    desc: "Premium video edits & motion cuts",
    href: "/services/3d-video-editing",
    icon: Video,
    color: "#EC4899", // Pink
    bg: "rgba(236, 72, 153, 0.08)"
  },
  {
    label: "Graphic Designing",
    desc: "Visual collaterals & layout designs",
    href: "/services/graphic-designing",
    icon: PenTool,
    color: "#06B6D4", // Cyan
    bg: "rgba(6, 182, 212, 0.08)"
  },
  {
    label: "Book Designing",
    desc: "Cover formatting, typesetting & print",
    href: "/services/book-designing",
    icon: BookOpen,
    color: "#F97316", // Orange
    bg: "rgba(249, 115, 22, 0.08)"
  },
  {
    label: "Book Branding",
    desc: "Author launch PR & Amazon A+ suite",
    href: "/services/book-branding",
    icon: Sparkles,
    color: "#c4347cdc", // Pink
    bg: "rgba(196, 52, 124, 0.08)"
  }
];

const productsMenuLinks = [
  { label: "Documents Management", href: "/products/dms", icon: FileText, color: "#3B82F6", bg: "rgba(59, 130, 246, 0.08)" },
  { label: "Learning Management", href: "/products/lms", icon: GraduationCap, color: "#F59E0B", bg: "rgba(245, 158, 11, 0.08)" },
  { label: "Hospital Management", href: "/products/hms", icon: Activity, color: "#EF4444", bg: "rgba(239, 68, 68, 0.08)" },
  { label: "OTT Platforms", href: "/products/ott", icon: MonitorPlay, color: "#8B5CF6", bg: "rgba(139, 92, 246, 0.08)" },
  { label: "School Management", href: "/products/school-erp", icon: School, color: "#10B981", bg: "rgba(16, 185, 129, 0.08)" },
  { label: "Marketplace Solutions", href: "/products/marketplace", icon: Store, color: "#F97316", bg: "rgba(249, 115, 22, 0.08)" },
  { label: "POS (Point of Sale)", href: "/products/pos", icon: Calculator, color: "#0EA5E9", bg: "rgba(14, 165, 233, 0.08)" },
  { label: "CRM System", href: "/products/crm", icon: Users, color: "#EC4899", bg: "rgba(236, 72, 153, 0.08)" },
  { label: "Logistics Management", href: "/products/logistics", icon: Truck, color: "#6366F1", bg: "rgba(99, 102, 241, 0.08)" },
  { label: "Inventory Management", href: "/products/inventory", icon: Boxes, color: "#14B8A6", bg: "rgba(20, 184, 166, 0.08)" },
  { label: "E-Commerce Solutions", href: "/products/ecommerce", icon: ShoppingCart, color: "#F43F5E", bg: "rgba(244, 63, 94, 0.08)" },
  { label: "HR Payroll & Roster", href: "/products/hrms", icon: Briefcase, color: "#8B5CF6", bg: "rgba(139, 92, 246, 0.08)" }
];

// Custom Palette icon wrapper since we imported Lucide icons dynamically
function Palette(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03444 19.1759 5.27557 19.2684 5.52552 19.25C6.73489 19.1611 7.8285 18.5822 8.5 17.6L9.5 16.1C9.8 15.6 10.4 15.3 11 15.3H12.5C13.9 15.3 15 14.2 15 12.8C15 12.2 14.8 11.7 14.4 11.3L13 9.9C12.6 9.5 12.4 9 12.4 8.4V7.5C12.4 6.1 13.5 5 14.9 5C16.3 5 17.4 6.1 17.4 7.5V8.5C17.4 9.1 17.9 9.6 18.5 9.6C19.1 9.6 19.6 9.1 19.6 8.5V7.5C19.6 4.5 17.1 2 14 2" />
    </svg>
  );
}

const aboutMenuLinks = [
  { label: "About Us", href: "/about", icon: FileText },
  { label: "Team", href: "/team", icon: Users },
  { label: "Gallery", href: "/gallery", icon: Layout },
  { label: "Careers", href: "/careers", icon: Briefcase }
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", hasMenu: true },
  { label: "Services", href: "/services", hasMenu: true },
  { label: "Products", href: "/products", hasMenu: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { settings } = useWebSettings();

  // Pages with a dark full-screen hero that needs a transparent navbar on load
  const isHome = pathname === "/" || pathname.startsWith("/products/");

  const [scrolled, setScrolled] = useState(!isHome); // inner pages start scrolled
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);


  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setMegaOpen(null);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const onMegaEnter = (menuLabel: string) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(menuLabel);
  };
  const onMegaLeave = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(null), 180);
  };

  return (
    <>
      <header
        role="banner"
        className={cn(
          "fixed left-0 right-0 top-0 w-full z-50 transition-all duration-500 ease-in-out border-b",
          scrolled
            ? "bg-white border-slate-200/85 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)]"
            : "bg-transparent border-transparent"
        )}
      >
        {/* Level 1: Premium Solid Purple Top Bar (Only visible when scrolled & on Desktop) */}
        {/* Compact layout with py-1.5, smaller contact badges and icons */}
        <div className={cn(
          "hidden lg:grid w-full bg-[#7C3AED] text-white transition-all duration-500 ease-in-out overflow-hidden",
          scrolled ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
        )}>
          <div className="overflow-hidden w-full">
            <div className="flex items-center justify-between gap-4 w-full px-6 py-1.5 mx-auto max-w-[1400px]">
              {/* Left Side: Circular Badges for Phone, Email & Location */}
              <div className="flex items-center gap-4 xl:gap-6 text-[11px] font-semibold text-white/95">
                <a href={`tel:${settings.phone}`} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <div className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105">
                    <Phone className="w-2.5 h-2.5 fill-current" />
                  </div>
                  <span>{settings.phone}</span>
                </a>
                <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <div className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105">
                    <Mail className="w-2.5 h-2.5" />
                  </div>
                  <span>{settings.email}</span>
                </a>
                <div className="hidden xl:flex items-center gap-2">
                  <div className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-2.5 h-2.5" />
                  </div>
                  <span className="truncate max-w-[200px]">{settings.location}</span>
                </div>
              </div>

              {/* Right Side: Working hours, Socials, Green WhatsApp */}
              <div className="flex items-center gap-3.5 xl:gap-5">
                {/* Working Hours */}
                <span className="text-[10px] text-white/80 font-bold font-sora hidden 2xl:inline-block">
                  Mon - Sat: 9:00 AM - 6:00 PM
                </span>

                {/* Premium Social Icons (White Circle with Purple Icons) */}
                <div className="flex items-center gap-1.5">
                  {/* LinkedIn */}
                  <a href={settings.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-slate-100 transition-all shadow-sm" aria-label="LinkedIn">
                    <FaLinkedinIn className="w-2.5 h-2.5" />
                  </a>
                  {/* Twitter/X */}
                  <a href={settings.social.twitter} target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-slate-100 transition-all shadow-sm" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  {/* Instagram */}
                  <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-slate-100 transition-all shadow-sm" aria-label="Instagram">
                    <FaInstagram className="w-2.5 h-2.5" />
                  </a>
                  {/* Facebook */}
                  <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-slate-100 transition-all shadow-sm" aria-label="Facebook">
                    <FaFacebookF className="w-2 h-2" />
                  </a>
                  {/* YouTube */}
                  <a href={settings.social.youtube} target="_blank" rel="noopener noreferrer" className="w-5.5 h-5.5 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-slate-100 transition-all shadow-sm" aria-label="YouTube">
                    <FaYoutube className="w-2.5 h-2.5" />
                  </a>
                </div>

                {/* WhatsApp green CTA */}
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 transition-all shadow-sm"
                >
                  <FaWhatsapp className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Level 2: Navigation & Branding (Desktop Only) */}
        <div className={cn(
          "hidden lg:flex items-stretch justify-between w-full px-6 mx-auto max-w-[1400px] transition-all duration-500 ease-in-out",
          scrolled ? "h-[72px]" : "h-[104px]"
        )}>
          {/* Logo on Left */}
          <Link href="/" className="flex items-center shrink-0 group" aria-label="Eveda Online Services — Home">
            <LogoMark size={scrolled ? 46 : 56} />
          </Link>

          {/* Centered Navigation Menu */}
          <nav
            className="flex items-stretch gap-1.5 xl:gap-3.5 h-full"
            role="navigation"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = link.hasMenu
                ? (link.label === "About"
                  ? (pathname === "/about" || pathname === "/team" || pathname === "/gallery" || pathname === "/careers")
                  : (link.label === "Services" ? pathname.startsWith("/services") : pathname.startsWith("/products"))
                )
                : pathname === link.href;

              return link.hasMenu ? (
                /* Wrapper div is now flex container so child is perfectly aligned vertically with other links */
                <div
                  key={link.label}
                  className={cn(
                    "flex items-stretch h-full group",
                    link.label === "About" && "relative"
                  )}
                  onMouseEnter={() => onMegaEnter(link.label)}
                  onMouseLeave={onMegaLeave}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-sora uppercase tracking-wider relative inline-flex items-center gap-1 text-[11.5px] font-extrabold transition-all duration-500 ease-in-out group/nav px-3 h-full",
                      scrolled
                        ? (isActive ? "text-[#7C3AED]" : "text-black hover:text-[#7C3AED]")
                        : (isActive ? "text-white" : "text-white/85 hover:text-white")
                    )}
                    aria-expanded={!!megaOpen}
                    aria-haspopup="true"
                  >

                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 transition-all duration-500 ease-in-out ml-0.5",
                        scrolled
                          ? (isActive ? "text-[#7C3AED]" : "text-slate-500 group-hover/nav:text-[#7C3AED]")
                          : (isActive ? "text-white" : "text-white/60 group-hover/nav:text-white"),
                        (megaOpen === link.label) && (scrolled ? "text-[#7C3AED] rotate-180" : "text-white rotate-180")
                      )}
                    />
                    {isActive && (
                      <span className={cn(
                        "absolute bottom-0 left-3 right-3 h-[3px] rounded-t-full transition-all duration-500 ease-in-out",
                        scrolled ? "bg-[#7C3AED]" : "bg-white"
                      )} />
                    )}
                  </Link>

                  {/* Mega Menu / Submenu matching the premium design */}
                  {link.label === "About" ? (
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 w-52 bg-white border border-slate-200/85 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.08)] py-2 text-slate-800 transition-all duration-200 ease-in-out origin-top z-50",
                        (megaOpen === "About")
                          ? "opacity-100 scale-y-100 pointer-events-auto"
                          : "opacity-0 scale-y-95 pointer-events-none"
                      )}
                      onMouseEnter={() => onMegaEnter("About")}
                      onMouseLeave={onMegaLeave}
                      role="menu"
                      aria-label="About menu"
                    >
                      {aboutMenuLinks.map((s) => {
                        const ItemIcon = s.icon;
                        return (
                          <Link
                            key={s.label}
                            href={s.href}
                            role="menuitem"
                            className="flex items-center gap-3 px-4.5 py-3 hover:bg-slate-50 text-slate-700 hover:text-[#7C3AED] transition-colors"
                          >
                            <ItemIcon className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="text-[12px] font-extrabold uppercase tracking-wider font-sora">
                              {s.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "absolute top-full left-0 right-0 w-full bg-white border-t border-slate-200/85 border-b border-slate-200 rounded-b-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] text-slate-800 transition-all duration-300 ease-in-out origin-top z-50",
                        (megaOpen === link.label)
                          ? "opacity-100 scale-y-100 pointer-events-auto"
                          : "opacity-0 scale-y-95 pointer-events-none"
                      )}
                      onMouseEnter={() => onMegaEnter(link.label)}
                      onMouseLeave={onMegaLeave}
                      role="menu"
                      aria-label={`${link.label} menu`}
                    >
                      {/* Centered content aligning with the header container */}
                      <div className="max-w-[1400px] mx-auto px-6 py-10 grid grid-cols-[1fr_450px] gap-10">

                        {/* Left Pane - Grid of Services & Helper Link */}
                        <div className="flex flex-col justify-between">
                          {/* 3-column grid of service/product cards */}
                          <div className="grid grid-cols-3 gap-4">
                            {(link.label === "Products" ? productsMenuLinks : servicesMenuLinks).map((s) => {
                              const ItemIcon = s.icon;
                              return (
                                <Link
                                  key={s.label}
                                  href={s.href}
                                  role="menuitem"
                                  className="group/card flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 hover:border-slate-350 transition-all duration-200"
                                >
                                  <div className="flex items-center gap-3.5 min-w-0">
                                    <ItemIcon
                                      className="w-5.5 h-5.5 shrink-0 transition-transform duration-300 group-hover/card:scale-105"
                                      style={{ color: s.color }}
                                    />
                                    <span className="text-[13.5px] font-bold text-slate-850 font-sora leading-none truncate">
                                      {s.label}
                                    </span>
                                  </div>
                                  <div className="text-slate-300 group-hover/card:text-slate-800 transition-colors pl-1 shrink-0">
                                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/card:translate-x-0.5" />
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          {/* Bottom Helper link */}
                          <div className="mt-8 flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <MessageSquare className="w-4 h-4 text-slate-400 shrink-0" />
                            <span>
                              Need help? Contact our{" "}
                              <Link
                                href="/contact"
                                className="text-slate-800 font-semibold underline underline-offset-4 decoration-[#7C3AED]/45 hover:decoration-[#7C3AED] transition-colors"
                              >
                                support service
                              </Link>
                            </span>
                          </div>
                        </div>                      {/* Right Pane - Feature Promo Banner */}
                        <div className="pl-8 border-l border-slate-100 flex flex-col justify-center">
                          {/* Vertical Custom Showcase Card */}
                          <div className="flex flex-col justify-between p-6 rounded-[24px] bg-gradient-to-br from-purple-50/70 via-white/80 to-indigo-50/40 border border-purple-100/60 shadow-[0_8px_24px_rgba(124,58,237,0.02)] h-full relative overflow-hidden group/banner">
                            {/* Decorative soft glowing backdrops */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />

                            <div className="relative z-10">
                              {/* 1. Capsule Badge: Featured Service */}
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#7C3AED] bg-purple-100/50 border border-purple-200/30 mb-3">
                                <Sparkles className="w-3 h-3 text-[#7C3AED] animate-pulse" />
                                <span>Featured Service</span>
                              </div>

                              {/* 2. Headline: Premium Digital Solutions */}
                              <h3 className="text-lg font-black text-slate-900 font-sora leading-tight tracking-tight mb-1">
                                <span className="text-[#7C3AED]">Premium</span> Digital {link.label}
                              </h3>

                              {/* 3. Description */}
                              <p className="text-slate-500 text-xs leading-relaxed font-semibold max-w-[280px]">
                                Powerful, scalable and future-ready {link.label.toLowerCase()} tailored for your business growth.
                              </p>
                            </div>

                            {/* 4. Laptop Showcase image with purple background blob and shadow */}
                            <div className="relative w-full aspect-[16/9] -mt-6 -mb-6 flex items-center justify-center z-10">
                              {/* Glowing Purple background blob */}
                              <div className="absolute w-28 h-28 bg-[#7C3AED]/20 rounded-full blur-2xl pointer-events-none z-0" />
                              {/* Soft Purple shadow overlay underneath the laptop */}
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-purple-500/30 blur-md rounded-full pointer-events-none z-0" />
                              <img
                                src="/images/mega_menu_banner.png"
                                alt="Premium Digital Solutions"
                                className="object-contain w-full h-full max-h-[110px] transition-transform duration-700 group-hover/banner:scale-105 relative z-10"
                              />
                            </div>

                            {/* 5. Pill CTA Button */}
                            <div className="relative z-10">
                              <Link
                                href={link.href}
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-[0_6px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_8px_26px_rgba(124,58,237,0.45)] transition-all duration-300 cursor-pointer"
                              >
                                <span>Explore {link.label}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover/banner:translate-x-0.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "font-sora uppercase tracking-wider relative inline-flex items-center gap-1.5 text-[11.5px] font-extrabold transition-all duration-500 ease-in-out px-3 h-full",
                    scrolled
                      ? (isActive ? "text-[#7C3AED]" : "text-black hover:text-[#7C3AED]")
                      : (isActive ? "text-white" : "text-white/85 hover:text-white")
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className={cn(
                      "absolute bottom-0 left-3 right-3 h-[3px] rounded-t-full transition-all duration-500 ease-in-out",
                      scrolled ? "bg-[#7C3AED]" : "bg-white"
                    )} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 xl:gap-3.5">
            {/* Phone outlined button - slide & fade transition */}
            <a
              href={`tel:${settings.phone}`}
              className={cn(
                "border rounded-full text-xs font-extrabold flex items-center gap-2 transition-all duration-500 ease-in-out shadow-sm overflow-hidden",
                scrolled
                  ? "border-[#7C3AED] text-[#7C3AED] bg-white hover:bg-violet-50/50 opacity-100 max-w-[220px] px-4 py-2.5"
                  : "border-transparent text-transparent bg-transparent opacity-0 max-w-0 py-0 px-0 pointer-events-none"
              )}
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>{settings.phone}</span>
            </a>

            {/* Solid CTA Button */}
            <button
              onClick={() => triggerOnboardingModal({ type: "general" })}
              className={cn(
                "text-white px-5.5 py-3 rounded-full text-xs font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-0.5 shrink-0 cursor-pointer",
                scrolled ? "bg-[#7C3AED] hover:bg-[#6D28D9]" : "bg-[#7C3AED]/95 hover:bg-[#7C3AED] backdrop-blur-sm"
              )}
            >
              Get A Quote <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Navbar (logo + hamburger) - visible below lg */}
        <div className={cn(
          "flex lg:hidden items-center justify-between w-full px-4 py-3.5 transition-colors duration-500 ease-in-out",
          scrolled ? "bg-white text-slate-900 border-b border-slate-200" : "bg-transparent text-white"
        )}>
          <Link href="/" className="flex items-center shrink-0" aria-label="Eveda Online Services — Home">
            <LogoMark size={38} />
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerOnboardingModal({ type: "general" })}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-full text-xs font-extrabold shadow-md transition-all shrink-0 cursor-pointer"
            >
              Get A Quote
            </button>
            <button
              className={cn(
                "w-9.5 h-9.5 rounded-lg flex items-center justify-center transition-colors border",
                scrolled
                  ? "border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="mobile-menu"
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-slate-900 border-l border-slate-800 p-6 lg:hidden overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <LogoMark size={36} />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9.5 h-9.5 rounded-lg flex items-center justify-center bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav aria-label="Mobile navigation links">
              <div className="space-y-1">
                {[...navLinks, { label: "Contact", href: "/contact" }].map((link) => {
                  if (link.label === "About") {
                    const isSubActive = pathname === "/about" || pathname === "/team" || pathname === "/gallery" || pathname === "/careers";
                    return (
                      <div key={link.label} className="space-y-1">
                        <div className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold text-slate-450",
                          isSubActive && "text-[#7C3AED] bg-violet-500/5"
                        )}>
                          <span>About</span>
                        </div>
                        <div className="pl-4 space-y-1 border-l border-slate-800/60 ml-4">
                          {aboutMenuLinks.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className={cn(
                                "flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold transition-all",
                                pathname === sub.href ? "text-[#7C3AED] bg-violet-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800"
                              )}
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.label}
                              <ArrowRight className="w-3.5 h-3.5 opacity-30" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition-all",
                        pathname === link.href ? "text-[#7C3AED] bg-violet-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                      <ArrowRight className="w-4 h-4 opacity-30" />
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Contact Info */}
              <div className="pt-6 mt-6 border-t border-slate-800 space-y-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4">Contact Info</p>
                <div className="space-y-3 px-4">
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-xs text-slate-300 hover:text-white transition-colors">
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-rose-400">
                      <Phone className="w-3.5 h-3.5 fill-current" />
                    </div>
                    {settings.phone}
                  </a>
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-xs text-slate-300 hover:text-white transition-colors">
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-violet-400">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    {settings.email}
                  </a>
                  <div className="flex items-start gap-3 text-xs text-slate-300">
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span>{settings.location}</span>
                  </div>
                </div>
              </div>

              {/* Mobile Socials */}
              <div className="pt-6 mt-6 border-t border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-3">Follow Us</p>
                <div className="flex items-center gap-2.5 px-4">
                  <a href={settings.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:bg-slate-100 transition-colors shadow">
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                  <a href={settings.social.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:bg-slate-100 transition-colors shadow">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:bg-slate-100 transition-colors shadow">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:bg-slate-100 transition-colors shadow">
                    <FaFacebookF className="w-3.5 h-3.5" />
                  </a>
                  <a href={settings.social.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white text-[#7C3AED] flex items-center justify-center hover:bg-slate-100 transition-colors shadow font-bold">
                    <FaYoutube className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800">
                <button
                  onClick={() => { setMobileOpen(false); triggerOnboardingModal({ type: "general" }); }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors cursor-pointer"
                >
                  Get A Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
