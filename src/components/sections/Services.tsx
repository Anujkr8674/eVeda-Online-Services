"use client";

import { useState } from "react";
import {
  Code2, Smartphone, Layers, Brain, Cloud, Server,
  BarChart3, Palette, Zap, Settings2, ArrowRight, ChevronRight, CheckCircle2,
  BookOpen, Sparkles, ChevronDown, ChevronUp, PenTool, Search, Megaphone, ShoppingCart, CreditCard
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const categories = [

  { id: "all", label: "All Services" },
  { id: "design-growth", label: "Design & Growth" },
  { id: "software", label: "Software & SaaS" },
  { id: "ai-cloud", label: "AI & Cloud" }

];

const services = [
  {
    icon: BookOpen, title: "Book Designing", id: "book-designing", category: "design-growth",
    description: "Bespoke 3D book covers, interior typesetting, and print-ready files for KDP & IngramSpark.",
    features: ["Full cover wrap", "Interior typesetting", "ePub & Kindle mobi", "100% KDP compliance"],
  },
  {
    icon: Sparkles, title: "Book Branding", id: "book-branding", category: "design-growth",
    description: "Author platform architecture, Amazon A+ Content, BookTok trailers, and bestseller launch campaigns.",
    features: ["Amazon A+ modules", "Cinematic 3D trailers", "Author website", "ARC reader funnel"],
  },
  {
    icon: Palette,
    title: "Graphic Designing",
    id: "graphic-designing",
    category: "design-growth",
    description: "Creative and professional graphics designed to communicate your brand, ideas, and message effectively.",
    features: [
      "Social media graphics",
      "Marketing materials",
      "Posters & banners",
      "Creative visual designs"
    ],
  },

  {
    icon: BookOpen,
    title: "Book Cover Design",
    id: "book-cover-design",
    category: "design-growth",
    description: "Eye-catching and professional book covers designed to capture attention and represent your story.",
    features: [
      "Front & back cover",
      "Full cover wrap",
      "3D book mockups",
      "Print-ready design"
    ],
  },

  {
    icon: PenTool,
    title: "Logo Designing",
    id: "logo-designing",
    category: "design-growth",
    description: "Unique and memorable logos crafted to establish a strong and recognizable brand identity.",
    features: [
      "Custom logo concepts",
      "Brand identity design",
      "Multiple formats",
      "Vector & print-ready files"
    ],
  },

  {
    icon: CreditCard,
    title: "Card Designing",
    id: "card-designing",
    category: "design-growth",
    description: "Professional and creative card designs that make your business and personal brand stand out.",
    features: [
      "Business cards",
      "Visiting cards",
      "Invitation cards",
      "Print-ready files"
    ],
  },
  {
    icon: Code2, title: "Web Development", id: "web", category: "software",
    description: "Full-stack modern web applications built with Next.js, React, TypeScript, and cloud infrastructure.",
    features: ["Next.js & React", "TypeScript", "REST & GraphQL APIs", "Progressive Web Apps"],
  },
  {
    icon: Smartphone, title: "Mobile App Development", id: "mobile", category: "software",
    description: "Native iOS and Android apps, plus cross-platform solutions with React Native and Flutter.",
    features: ["React Native", "Flutter", "iOS & Android", "App Store Optimization"],
  },
  {
    icon: Layers, title: "SaaS Platforms", id: "saas", category: "software",
    description: "Multi-tenant SaaS with subscription management, analytics, and enterprise-grade scalability.",
    features: ["Multi-tenancy", "Subscription billing", "Real-time dashboards", "API-first design"],
  },
  {
    icon: Search,
    title: "SEO",
    id: "seo",
    category: "design-growth",
    description: "Improve your online visibility, search rankings, and organic traffic with effective SEO strategies.",
    features: [
      "Keyword research",
      "On-page SEO",
      "Technical SEO",
      "SEO analytics"
    ],
  },

  {
    icon: Megaphone,
    title: "Digital Marketing",
    id: "digital-marketing",
    category: "design-growth",
    description: "Grow your brand online with targeted digital marketing strategies that reach the right audience.",
    features: [
      "Social media marketing",
      "Content marketing",
      "Campaign management",
      "Performance analytics"
    ],
  },

  {
    icon: ShoppingCart,
    title: "E-commerce Management",
    id: "ecommerce-management",
    category: "design-growth",
    description: "Manage and optimize your online store for better performance, customer experience, and growth.",
    features: [
      "Product management",
      "Store optimization",
      "Order management",
      "Sales analytics"
    ],
  },
  {
    icon: Brain, title: "AI & ML Solutions", id: "ai", category: "ai-cloud",
    description: "Intelligent automation, predictive analytics, NLP, and custom AI integrations.",
    features: ["GPT integrations", "Custom ML models", "Computer vision", "Predictive analytics"],
  },
  {
    icon: Cloud, title: "Cloud Computing", id: "cloud", category: "ai-cloud",
    description: "Cloud architecture, migration, and optimization across AWS, Azure, and GCP.",
    features: ["AWS / Azure / GCP", "Serverless architecture", "Cost optimization", "99.99% uptime SLA"],
  },
  {
    icon: Server, title: "DevOps & CI/CD", id: "devops", category: "ai-cloud",
    description: "Streamlined pipelines, infrastructure as code, container orchestration, and monitoring.",
    features: ["Docker & Kubernetes", "CI/CD pipelines", "Infrastructure as code", "24/7 monitoring"],
  },
  {
    icon: BarChart3, title: "ERP & CRM Systems", id: "erp", category: "software",
    description: "Custom enterprise resource planning and CRM systems built for your unique workflow.",
    features: ["Custom ERP", "CRM integrations", "Workflow automation", "Business intelligence"],
  },
  {
    icon: Palette, title: "UI/UX Design", id: "design", category: "design-growth",
    description: "Pixel-perfect, user-centered design systems that drive conversion and engagement.",
    features: ["Design systems", "Figma prototypes", "User research", "Accessibility"],
  },

  {
    icon: Settings2, title: "Maintenance & Support", id: "support", category: "design-growth",
    description: "Ongoing support, performance monitoring, security patches, and continuous enhancement.",
    features: ["24/7 monitoring", "Security updates", "Performance tuning", "Dedicated support"],
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredServices = services.filter((service) => {
    if (activeCategory === "all") return true;
    return service.category === activeCategory;
  });

  const shouldShowExpandBtn = activeCategory === "all" && filteredServices.length > 4;
  const visibleServices = (isExpanded || !shouldShowExpandBtn)
    ? filteredServices
    : filteredServices.slice(0, 4);

  return (
    <section
      className="py-12 sm:py-16 text-slate-800 border-t border-slate-200/50 relative overflow-hidden"
      id="services"
      style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(var(--accent-global-rgb), 0.04) 0%, transparent 70%), linear-gradient(180deg, #f8fafc 0%, #f9f8ff 50%, #f8fafc 100%)"
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <SectionHeader
              badge="OUR SERVICES"
              title="Everything You Need to"
              titleHighlight="Build & Scale"
              description="From concept to launch and beyond — end-to-end technology services for every stage of your digital journey."
              align="left"
              theme="light"
              className="max-w-xl"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id !== "all") {
                    setIsExpanded(true);
                  }
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${activeCategory === cat.id
                  ? "bg-[var(--accent-global)] text-white border-[var(--accent-global)] shadow-md shadow-purple-500/10"
                  : "bg-slate-100 text-slate-500 border-slate-200 hover:border-slate-350 hover:text-slate-800"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence>
            {visibleServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: "20px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(var(--accent-global-rgb), 0.25)";
                  e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.08), 0 0 30px rgba(var(--accent-global-rgb), 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.04)";
                }}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-350 group-hover:scale-115 group-hover:rotate-6 shadow-sm shadow-purple-500/5 group-hover:shadow-md group-hover:shadow-purple-500/20"
                    style={{
                      background: "var(--accent-global)",
                      color: "#ffffff",
                    }}
                  >
                    <service.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold mb-2 text-slate-950" style={{ fontFamily: "Sora, sans-serif" }}>{service.title}</h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">{service.description}</p>
                  <div className="space-y-1.5 border-t pt-4 mb-6" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-slate-650">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--accent-global)" }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-75"
                    style={{ color: "var(--accent-global)" }}
                  >
                    Explore service <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Expand / View All Controls */}
        {shouldShowExpandBtn && !isExpanded ? (
          <div className="text-center mt-10 flex justify-center">
            {/* ONLY "View All" button shown in collapsed state */}
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="inline-flex items-center gap-2.5 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-purple-500/10"
              aria-expanded={false}
            >
              <span>View All</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* When in expanded state, show both "Show Less" and "View all Services" side by side */
          <div className="text-center mt-12 flex flex-row items-center justify-center gap-4">
            {shouldShowExpandBtn && isExpanded && (
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  const el = document.getElementById("services");
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-slate-200/80 transition-all cursor-pointer hover:border-slate-300"
                aria-expanded={true}
              >
                <span>Show Less</span>
                <ChevronUp className="w-4 h-4" />
              </button>
            )}

            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 transition-all duration-300 hover:scale-105 border border-purple-500/10"
            >
              <span>View all Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
