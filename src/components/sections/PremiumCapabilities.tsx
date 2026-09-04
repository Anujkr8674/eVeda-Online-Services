"use client";

import { motion } from "framer-motion";
import { 
  Calendar, Coins, Briefcase, Zap, Cpu, Code2, 
  Smartphone, Layers, Database, Settings, MessageSquare, Globe, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

interface PremiumCapabilitiesProps {
  serviceId: string;
  serviceTitle: string;
  features: string[]; // Retained for type compatibility
}

interface ServiceMarketingContent {
  wideTitle: string;
  wideDesc: string;
  metrics: { label: string; value: string }[];
  squareTitle: string;
  squareDesc: string;
  cardTitle: string;
  icon: any;
  wideGradient: string;
  squareGradient: string;
}

const getMarketingContent = (id: string, title: string): ServiceMarketingContent => {
  switch (id) {
    case "web":
      return {
        wideTitle: "Custom Web Applications Built for Sales & Speed",
        wideDesc: "Engaging, conversion-optimized platforms engineered with next-gen frameworks for sub-second load times and high organic visibility.",
        metrics: [
          { label: "Uptime SLA", value: "99.99%" },
          { label: "Page Load Speed", value: "<0.5s" }
        ],
        squareTitle: "Future-Proof React & Next.js Architecture",
        squareDesc: "Robust, secure, and search-optimized codebase designed to grow with your active user base.",
        cardTitle: "eVeda Web Engine",
        icon: Code2,
        wideGradient: "from-[#1E3A8A] to-[#1D4ED8]",
        squareGradient: "from-[#10B981] to-[#059669]"
      };
    case "mobile":
      return {
        wideTitle: "Immersive Native iOS & Android App Development",
        wideDesc: "Stunning cross-platform Flutter & React Native apps delivering fluid native performance, offline sync, and beautiful transitions.",
        metrics: [
          { label: "Crash-free SLA", value: "99.9%" },
          { label: "Store Approvals", value: "100%" }
        ],
        squareTitle: "Offline-First Sync & Peripherals",
        squareDesc: "Keep your users engaged with seamless cloud synchronization and deep device hardware integration.",
        cardTitle: "eVeda Mobile Dev",
        icon: Smartphone,
        wideGradient: "from-[#065F46] to-[#10B981]",
        squareGradient: "from-[#F59E0B] to-[#D97706]"
      };
    case "saas":
      return {
        wideTitle: "Custom Multi-Tenant SaaS Software Platforms",
        wideDesc: "Rigid database tenant isolation, Stripe subscription billing gateways, custom dashboards, and user permission modules.",
        metrics: [
          { label: "DB Segregation", value: "Secure" },
          { label: "Billing Engine", value: "Stripe API" }
        ],
        squareTitle: "Embedded Analytics & User Panels",
        squareDesc: "Empower your software clients with dynamic charts, usage trackers, and white-labeling features.",
        cardTitle: "eVeda SaaS Core",
        icon: Layers,
        wideGradient: "from-[#4C1D95] to-[#8B5CF6]",
        squareGradient: "from-[#06B6D4] to-[#0891B2]"
      };
    case "ai":
      return {
        wideTitle: "Deploy Intelligent AI Agents That Drive ROI",
        wideDesc: "Custom machine learning models, retrieval-augmented generation (RAG) vector searches, and agentic workflows that automate workflows.",
        metrics: [
          { label: "Agent Response", value: "<1.5s" },
          { label: "Operations Speedup", value: "10x" }
        ],
        squareTitle: "Trained Enterprise Models & Vectors",
        squareDesc: "Leverage private internal corporate wikis with safe, secure, and sandboxed AI integrations.",
        cardTitle: "eVeda AI Agent",
        icon: Cpu,
        wideGradient: "from-[#991B1B] to-[#EF4444]",
        squareGradient: "from-[#8B5CF6] to-[#7C3AED]"
      };
    case "cloud":
      return {
        wideTitle: "High-Availability, Zero-Downtime Cloud Infrastructure",
        wideDesc: "Secure cloud architectures, automated backups, SOC2 compliance setups, and optimized cloud budgets on AWS & GCP.",
        metrics: [
          { label: "Uptime SLA", value: "99.99%" },
          { label: "Failover Routine", value: "Automated" }
        ],
        squareTitle: "Terraform Infrastructure as Code",
        squareDesc: "Deploy standardized, compliance-ready server and database clusters in minutes.",
        cardTitle: "eVeda Cloud Node",
        icon: Database,
        wideGradient: "from-[#0369A1] to-[#0EA5E9]",
        squareGradient: "from-[#10B981] to-[#059669]"
      };
    case "devops":
      return {
        wideTitle: "Ship Code Safely and Automatically",
        wideDesc: "Automated CI/CD pipelines, Docker containerizations, Kubernetes orchestration setups, and infrastructure monitoring systems.",
        metrics: [
          { label: "Pipeline Speed", value: "Minutes" },
          { label: "Deployment Error", value: "0%" }
        ],
        squareTitle: "Continuous Monitoring & Alerts",
        squareDesc: "Instantly detect anomalies with Prometheus and Grafana dashboards before they affect users.",
        cardTitle: "eVeda CI/CD Pipeline",
        icon: Settings,
        wideGradient: "from-[#A16207] to-[#EAB308]",
        squareGradient: "from-[#0F172A] to-[#334155]"
      };
    case "erp":
      return {
        wideTitle: "Centralize Business Workflows with Custom ERPs",
        wideDesc: "Automated billing templates, GST calculation engines, CRM pipelines, and granular department role permissions.",
        metrics: [
          { label: "Department Sync", value: "100%" },
          { label: "Invoice Engine", value: "Automated" }
        ],
        squareTitle: "Omnichannel Communications Hub",
        squareDesc: "Interact with client logs, SMTP email routing, and WhatsApp alerts directly inside one unified portal.",
        cardTitle: "eVeda ERP Engine",
        icon: Layers,
        wideGradient: "from-[#1E1B4B] to-[#312E81]",
        squareGradient: "from-[#EC4899] to-[#DB2777]"
      };
    case "whatsapp-marketing":
      return {
        wideTitle: "Automated WhatsApp API Marketing Funnels",
        wideDesc: "Official Business API verifications, broadcast campaign schedulers, conversational AI chatbots, and multi-agent inbox systems.",
        metrics: [
          { label: "Open Rates", value: "98%" },
          { label: "AI Bot Support", value: "24/7" }
        ],
        squareTitle: "Real-Time CRM & Lead Sync",
        squareDesc: "Connect message triggers directly to user actions and databases for immediate notifications.",
        cardTitle: "eVeda WA Bot",
        icon: MessageSquare,
        wideGradient: "from-[#14532D] to-[#22C55E]",
        squareGradient: "from-[#1E40AF] to-[#3B82F6]"
      };
    case "social-media-marketing":
      return {
        wideTitle: "Engage Audiences Where They Spend Their Time",
        wideDesc: "Premium graphics, video reels, and technical copy designed to grow active communities around your brand.",
        metrics: [
          { label: "Reach Growth", value: "300%" },
          { label: "Content Quality", value: "Premium" }
        ],
        squareTitle: "Omnichannel Calendar Scheduling",
        squareDesc: "Publish across LinkedIn, X, Instagram, and YouTube seamlessly.",
        cardTitle: "eVeda Social",
        icon: MessageSquare,
        wideGradient: "from-[#6B21A8] to-[#A855F7]",
        squareGradient: "from-[#0F172A] to-[#1E293B]"
      };
    case "ppc":
      return {
        wideTitle: "Direct Conversions with High-Yield Ad Campaigns",
        wideDesc: "Data-driven paid advertising campaigns across Google, Meta, and LinkedIn designed to maximize return on ad spend (ROAS).",
        metrics: [
          { label: "Lower CPA", value: "40%" },
          { label: "ROAS Target", value: "3.5x" }
        ],
        squareTitle: "Dynamic Retargeting Loops",
        squareDesc: "Advanced pixel tracking and A/B testing to capture intent and re-engage lost leads.",
        cardTitle: "eVeda PPC",
        icon: Coins,
        wideGradient: "from-[#991B1B] to-[#DC2626]",
        squareGradient: "from-[#C2410C] to-[#F97316]"
      };
    case "3d-video-editing":
      return {
        wideTitle: "Cinematic 3D Visuals and Premium Motion Graphics",
        wideDesc: "Photorealistic 3D product animations and cinematic video editing tailored for SaaS, ads, and brand showcases.",
        metrics: [
          { label: "Engagement", value: "4.2x" },
          { label: "Render Quality", value: "8K UHD" }
        ],
        squareTitle: "Dynamic Motion Graphics",
        squareDesc: "Custom typography, 3D tracking, and fluid transitions to elevate your storytelling.",
        cardTitle: "eVeda Studio",
        icon: Layers,
        wideGradient: "from-[#BE185D] to-[#EC4899]",
        squareGradient: "from-[#312E81] to-[#6366F1]"
      };
    case "graphic-designing":
      return {
        wideTitle: "Stunning Graphic Collaterals That Match Your Brand",
        wideDesc: "Professional graphic design services for marketing collaterals, social media assets, ebooks, and corporate brochures.",
        metrics: [
          { label: "Design Consistency", value: "100%" },
          { label: "Turnaround", value: "24-48h" }
        ],
        squareTitle: "Brand Asset Vault",
        squareDesc: "Organized, shareable design libraries containing all your high-res vectors and print-ready files.",
        cardTitle: "eVeda Graphics",
        icon: Layers,
        wideGradient: "from-[#0369A1] to-[#38BDF8]",
        squareGradient: "from-[#9D174D] to-[#EC4899]"
      };
    case "seo":
      return {
        wideTitle: "Dominate Page 1 Rankings for High-Value Intent",
        wideDesc: "Technical website audits, structured schema markup, Core Web Vitals speed optimization, and authority link acquisition.",
        metrics: [
          { label: "Target Position", value: "Page 1" },
          { label: "Traffic Growth", value: "2.5x" }
        ],
        squareTitle: "JSON-LD Rich Schema Markups",
        squareDesc: "Guide crawler engines to index product specifications, FAQs, and reviews with rich result cards.",
        cardTitle: "eVeda SEO Core",
        icon: Globe,
        wideGradient: "from-[#1E3A8A] to-[#1D4ED8]",
        squareGradient: "from-[#8B5CF6] to-[#7C3AED]"
      };
    case "dms":
      return {
        wideTitle: "Custom Document Solutions Built for Speed & Security",
        wideDesc: "Streamline your enterprise document workflows with automated indexing, OCR metadata extraction, and sub-second full-text searches.",
        metrics: [
          { label: "Uptime SLA", value: "99.99%" },
          { label: "Search Speed", value: "<0.8s" }
        ],
        squareTitle: "Role-Based Security & Audit Compliance",
        squareDesc: "Rigid user permission control, full document activity logging, and AES-256 data protection setups.",
        cardTitle: "eVeda DMS Platform",
        icon: ShieldCheck,
        wideGradient: "from-[#1E3A8A] to-[#3B82F6]",
        squareGradient: "from-[#10B981] to-[#059669]"
      };
    case "lms":
      return {
        wideTitle: "Scalable E-Learning Platform Built for Modern Students",
        wideDesc: "Launch courses, host video lectures, publish quizzes, and verify student progress with automated certificates.",
        metrics: [
          { label: "Course Delivery SLA", value: "99.9%" },
          { label: "Quiz Processor", value: "Real-time" }
        ],
        squareTitle: "Interactive Student Portal & Forums",
        squareDesc: "Let students collaborate in discussion forums and track modules via visual progress logs.",
        cardTitle: "eVeda LMS Core",
        icon: Briefcase,
        wideGradient: "from-[#D97706] to-[#F59E0B]",
        squareGradient: "from-[#0F172A] to-[#1E293B]"
      };
    case "hms":
      return {
        wideTitle: "High-Performance Hospital Operations & EHR Core",
        wideDesc: "Secure EMR record archiving, real-time doctor slot scheduling, and integrated pharmacy inventory control systems.",
        metrics: [
          { label: "Data Compliance", value: "HIPAA" },
          { label: "Slot Sync Speed", value: "<0.5s" }
        ],
        squareTitle: "Granular Ward & Bed Allocation Grid",
        squareDesc: "Instantly allocate available ICU slots, hospital beds, and track active nurse assignments.",
        cardTitle: "eVeda HMS Node",
        icon: ShieldCheck,
        wideGradient: "from-[#DC2626] to-[#EF4444]",
        squareGradient: "from-[#1E3A8A] to-[#2563EB]"
      };
    case "ott":
      return {
        wideTitle: "Studio-Grade OTT Video Delivery Platform",
        wideDesc: "Secure Widevine/FairPlay DRM encryption, multi-bitrate HLS transcoding, and flexible billing options.",
        metrics: [
          { label: "Transcode Speed", value: "10x" },
          { label: "Ad Load Speed", value: "<0.3s" }
        ],
        squareTitle: "Multi-Platform Smart TV Playback",
        squareDesc: "Deliver clean streaming experiences natively on Web, Android, Apple TV, FireTV, and Tizen.",
        cardTitle: "eVeda OTT Stream",
        icon: Smartphone,
        wideGradient: "from-[#6D28D9] to-[#8B5CF6]",
        squareGradient: "from-[#10B981] to-[#059669]"
      };
    case "school-erp":
      return {
        wideTitle: "Digital Campus Administration & Fee Systems",
        wideDesc: "Automated conflict-free class timetables, online admission manager, and smart fee collections with UPI auto-reminders.",
        metrics: [
          { label: "Roster Sync Speed", value: "Instant" },
          { label: "Reminders", value: "WhatsApp" }
        ],
        squareTitle: "RFID Biometrics & GPS Tracking Hub",
        squareDesc: "Let parents monitor real-time bus locations and register biometric student check-ins.",
        cardTitle: "eVeda School ERP",
        icon: Calendar,
        wideGradient: "from-[#059669] to-[#10B981]",
        squareGradient: "from-[#B45309] to-[#D97706]"
      };
    case "marketplace":
      return {
        wideTitle: "High-Scale Multi-Vendor Marketplace Operations",
        wideDesc: "Onboard independent sellers, manage split payouts, calculate commissions, and sync shipments with top courier APIs.",
        metrics: [
          { label: "Payout Sync SLA", value: "Connect API" },
          { label: "Product Import", value: "Bulk OCR" }
        ],
        squareTitle: "Advanced Escrow & Dispute Management",
        squareDesc: "Protect buyers and sellers with custom holding rule sets and order settlements.",
        cardTitle: "eVeda Market Core",
        icon: Coins,
        wideGradient: "from-[#EA580C] to-[#F97316]",
        squareGradient: "from-[#1E1B4B] to-[#312E81]"
      };
    case "pos":
      return {
        wideTitle: "Lightning-Fast Cloud POS Billing Engine",
        wideDesc: "Process register sales in sub-seconds with barcode integrations, offline billing sync, and automated receipts.",
        metrics: [
          { label: "Offline Sync", value: "Automated" },
          { label: "Transaction SLA", value: "<1s" }
        ],
        squareTitle: "Central Multi-Warehouse Inventory Sync",
        squareDesc: "Deduct items in real-time as bills settle, ensuring accurate stock balances.",
        cardTitle: "eVeda Cloud POS",
        icon: Settings,
        wideGradient: "from-[#0284C7] to-[#0EA5E9]",
        squareGradient: "from-[#10B981] to-[#059669]"
      };
    case "crm":
      return {
        wideTitle: "Convert More Leads with Sales Pipeline CRM",
        wideDesc: "Automate lead routing, WhatsApp follow-ups, client activity logging, and sales projection reports.",
        metrics: [
          { label: "Conversion Lift", value: "3.5x+" },
          { label: "Routing Speed", value: "Round Robin" }
        ],
        squareTitle: "Omnichannel Communications & API Integrations",
        squareDesc: "Onboard leads directly from Google Ads, Meta, IndiaMart, and custom website forms.",
        cardTitle: "eVeda CRM Panel",
        icon: MessageSquare,
        wideGradient: "from-[#DB2777] to-[#EC4899]",
        squareGradient: "from-[#5B21B6] to-[#7C3AED]"
      };
    case "logistics":
      return {
        wideTitle: "Fleet Operations & Route Optimization Logistics",
        wideDesc: "Dynamic vehicle routing, real-time GPS fleet tracking, driver deliveries logging, and proof-of-delivery uploads.",
        metrics: [
          { label: "GPS Telemetry Sync", value: "Real-time" },
          { label: "Fuel Optimization", value: "30% Lift" }
        ],
        squareTitle: "Client Consignment Tracking Links",
        squareDesc: "Send secure, live transit links to clients for real-time order location updates.",
        cardTitle: "eVeda Logistics",
        icon: Globe,
        wideGradient: "from-[#4F46E5] to-[#6366F1]",
        squareGradient: "from-[#0D9488] to-[#14B8A6]"
      };
    case "inventory":
      return {
        wideTitle: "Smart Multi-Warehouse Inventory Tracking ERP",
        wideDesc: "Track stock counts, assign batch expiry tags, set minimum reorder thresholds, and automate PO generation.",
        metrics: [
          { label: "Audits Speed", value: "Barcodes" },
          { label: "Stock Accuracy", value: "99.9%" }
        ],
        squareTitle: "Supplier Portals & COGS Analytics",
        squareDesc: "Manage vendor product lists and analyze product profit margins automatically.",
        cardTitle: "eVeda Inventory Node",
        icon: Database,
        wideGradient: "from-[#0D9488] to-[#14B8A6]",
        squareGradient: "from-[#1E3A8A] to-[#2563EB]"
      };
    case "ecommerce":
      return {
        wideTitle: "High-Performance Headless E-Commerce Frontends",
        wideDesc: "Sub-second catalog page load speeds, custom single-page checkouts, and integrated payment processors.",
        metrics: [
          { label: "Catalog Load", value: "<0.3s" },
          { label: "Cart Recovery Lift", value: "25%" }
        ],
        squareTitle: "Automated Abandoned Cart Marketing",
        squareDesc: "Send automated WhatsApp discount codes and checkout reminder emails to recover lost sales.",
        cardTitle: "eVeda Commerce Core",
        icon: Coins,
        wideGradient: "from-[#E11D48] to-[#F43F5E]",
        squareGradient: "from-[#312E81] to-[#4338CA]"
      };
    case "hrms":
      return {
        wideTitle: "Automated HR Administration & Payroll Engine",
        wideDesc: "Biometric attendance sync, automated PF/ESIC tax compliance sheets, shift roster builders, and employee self-service.",
        metrics: [
          { label: "Tax Calculation SLA", value: "Compliant" },
          { label: "Roster Updates", value: "Instant" }
        ],
        squareTitle: "Full Applicant Tracking System (ATS)",
        squareDesc: "Track candidates, log interview notes, and dispatch job offers from a single screen.",
        cardTitle: "eVeda HRMS Portal",
        icon: Briefcase,
        wideGradient: "from-[#6D28D9] to-[#8B5CF6]",
        squareGradient: "from-[#1E293B] to-[#334155]"
      };
    default:
      return {
        wideTitle: `Premium ${title} Customized for Your Brand`,
        wideDesc: `Get tailored, high-converting ${title} designed by expert engineers to streamline operations and scale conversions.`,
        metrics: [
          { label: "Delivery SLA", value: "On-Time" },
          { label: "Expert Support", value: "24/7" }
        ],
        squareTitle: "Engineered for Enterprise Performance",
        squareDesc: "Security audits, clean modular patterns, and flexible integrations mapped for scaling companies.",
        cardTitle: "eVeda Engine",
        icon: Settings,
        wideGradient: "from-[#1E1B4B] to-[#312E81]",
        squareGradient: "from-[#10B981] to-[#059669]"
      };
  }
};

// Official green WhatsApp branding vector icon
function WhatsAppIcon({ className = "w-5.5 h-5.5" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
    </svg>
  );
}

export default function PremiumCapabilities({ serviceId, serviceTitle, features }: PremiumCapabilitiesProps) {
  const content = getMarketingContent(serviceId, serviceTitle);

  const handleScrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const conversionTabs = [
    {
      label: "Book Consultation",
      desc: "Schedule a Discovery Call",
      icon: Calendar,
      iconBg: "bg-[#E0F2FE]", // Google Blue-light
      iconColor: "text-[#0284C7]",
      hoverBg: "group-hover:bg-[#0284C7] group-hover:text-white",
      actionHref: "#contact-project-form",
      onClick: handleScrollToSection("contact-project-form"),
      isExternal: false
    },
    {
      label: "Cost Calculator",
      desc: "Estimate Project Budget",
      icon: Coins,
      iconBg: "bg-[#FEF3C7]", // Gold-light
      iconColor: "text-[#D97706]",
      hoverBg: "group-hover:bg-[#D97706] group-hover:text-white",
      actionHref: serviceId === "web" ? "#cost-calculator" : "#contact-project-form",
      onClick: handleScrollToSection(serviceId === "web" ? "cost-calculator" : "contact-project-form"),
      isExternal: false
    },
    {
      label: "Chat on WhatsApp",
      desc: "Instant Tech Callback",
      icon: WhatsAppIcon,
      iconBg: "bg-[#DCFCE7]", // Green-light
      iconColor: "text-[#25D366]",
      hoverBg: "group-hover:bg-[#25D366] group-hover:text-white",
      actionHref: "https://wa.me/919031806381",
      isExternal: true
    },
    {
      label: "View Portfolio",
      desc: "Explore Case Studies",
      icon: Briefcase,
      iconBg: "bg-[#F3E8FF]", // Purple-light
      iconColor: "text-[#7C3AED]",
      hoverBg: "group-hover:bg-[#7C3AED] group-hover:text-white",
      actionHref: "/portfolio",
      isExternal: false
    }
  ];

  return (
    <section 
      className="py-20 text-slate-800 border-t border-slate-200/50 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.02) 0%, transparent 70%), linear-gradient(180deg, #ffffff 0%, #fcfbff 50%, #ffffff 100%)"
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Section Heading - Homepage consistent layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <SectionHeader
            badge="OUR CAPABILITIES"
            title="How We Power Your"
            titleHighlight={`${serviceTitle} Projects`}
            description="Scale your brand with bank-grade security, sub-second load times, and custom-tailored integrations designed to maximize your conversions."
            align="left"
            theme="light"
            className="max-w-3xl"
          />
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
          
          {/* 1. WIDE CARD (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-8 flex"
          >
            <div 
              className={`w-full rounded-[28px] bg-gradient-to-br ${content.wideGradient} text-white p-8 md:p-10 relative overflow-hidden flex flex-col justify-between group shadow-sm min-h-[300px]`}
            >
              {/* Radial gradient glow for premium shine */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none" />

              {/* Card Header & Title */}
              <div className="max-w-[70%] z-10 space-y-3">
                <h3 className="text-xl md:text-2xl font-black font-sora tracking-tight leading-snug">
                  {content.wideTitle}
                </h3>
                <p className="text-white/70 text-xs sm:text-[13px] leading-relaxed max-w-[480px]">
                  {content.wideDesc}
                </p>
              </div>

              {/* Metrics & Action Button */}
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 items-end mt-8 z-10">
                
                {/* Stats / Features */}
                <div className="flex gap-10">
                  {content.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-2xl font-black font-sora leading-none mb-1 text-white">
                        {m.value}
                      </div>
                      <div className="text-[10.5px] font-bold text-white/60 uppercase tracking-wider leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Yellow Action Button */}
                <div className="md:justify-self-end">
                  <a
                    href="#contact-project-form"
                    onClick={handleScrollToSection("contact-project-form")}
                    className="inline-flex items-center justify-center bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-black text-[11px] uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-black/10 hover:shadow-black/20"
                  >
                    Show More
                  </a>
                </div>

              </div>

              {/* Rotated 3D Glassmorphic Tech Graphic (Right) */}
              <div className="absolute right-[-24px] top-[12%] lg:top-[15%] w-[260px] h-[160px] pointer-events-none hidden sm:block">
                <div 
                  className="w-full h-full rounded-2xl bg-white/[0.07] border border-white/20 backdrop-blur-md shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] rotate-[-12deg] transform transition-transform duration-700 group-hover:rotate-[-6deg] group-hover:scale-103 p-4 flex flex-col justify-between"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                      <content.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-white/50 font-bold">
                      {content.cardTitle}
                    </span>
                  </div>
                  
                  {/* Visual chart pattern representing backend logs */}
                  <div className="space-y-2">
                    <div className="h-1.5 w-16 bg-white/25 rounded-full" />
                    <div className="h-1 w-28 bg-white/15 rounded-full" />
                    <div className="h-1 w-20 bg-white/15 rounded-full" />
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-mono text-white/60">DEPLOYED.SSL</span>
                    <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-[#FACC15]" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* 2. SQUARE CARD (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-4 flex"
          >
            <div 
              className={`w-full rounded-[28px] bg-gradient-to-br ${content.squareGradient} text-white p-8 md:p-10 relative overflow-hidden flex flex-col justify-between shadow-sm min-h-[300px]`}
            >
              {/* Radial shine overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none" />

              <div className="z-10 space-y-3">
                <h3 className="text-xl md:text-2xl font-black font-sora tracking-tight leading-snug">
                  {content.squareTitle}
                </h3>
                <p className="text-white/70 text-xs sm:text-[13px] leading-relaxed">
                  {content.squareDesc}
                </p>
              </div>

              {/* Decorative subtle vector background shape */}
              <div className="absolute bottom-[-20%] right-[-10%] w-[180px] h-[180px] opacity-15 rounded-full border-[12px] border-white pointer-events-none" />
              <div className="absolute bottom-[-10%] right-[-5%] w-[120px] h-[120px] opacity-10 rounded-full border-[8px] border-white pointer-events-none" />

              <div className="z-10 text-[11px] font-bold uppercase tracking-widest text-white/60">
                EVEDA VERIFIED
              </div>
            </div>
          </motion.div>

        </div>

        {/* 3. BOTTOM HIGH-CONVERSION ACTIONS (Pills with real colored logos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {conversionTabs.map((tab, index) => {
            const Icon = tab.icon;
            
            const pillContent = (
              <>
                <div 
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${tab.iconBg} ${tab.iconColor} transition-all duration-300 ${tab.hoverBg}`}
                >
                  <Icon className="w-5.5 h-5.5" />
                </div>
                
                <div>
                  <div className="text-slate-800 font-bold text-[13px] font-sora leading-tight group-hover:text-[var(--accent-global)] transition-colors duration-300">
                    {tab.label}
                  </div>
                  <div className="text-slate-400 text-[10px] font-semibold mt-0.5 leading-none">
                    {tab.desc}
                  </div>
                </div>
              </>
            );

            const wrapperMotion = (children: React.ReactNode) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                {children}
              </motion.div>
            );

            if (tab.isExternal) {
              return wrapperMotion(
                <a
                  href={tab.actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 bg-white border border-slate-200/50 p-4.5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all duration-300 group cursor-pointer"
                >
                  {pillContent}
                </a>
              );
            }

            if (tab.onClick) {
              return wrapperMotion(
                <a
                  href={tab.actionHref}
                  onClick={tab.onClick}
                  className="flex items-center gap-3.5 bg-white border border-slate-200/50 p-4.5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all duration-300 group cursor-pointer"
                >
                  {pillContent}
                </a>
              );
            }

            return wrapperMotion(
              <Link
                href={tab.actionHref}
                className="flex items-center gap-3.5 bg-white border border-slate-200/50 p-4.5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all duration-300 group cursor-pointer"
              >
                {pillContent}
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
