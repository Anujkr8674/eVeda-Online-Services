"use client";

import { useState } from "react";
import {
  Code2, Smartphone, Layers, Brain, Cloud, Server,
  BarChart3, Palette, Zap, Settings2, ArrowRight, ChevronRight, CheckCircle2,
  BookOpen, Sparkles
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const categories = [
  { id: "all", label: "All Services" },
  { id: "software", label: "Software & SaaS" },
  { id: "ai-cloud", label: "AI & Cloud" },
  { id: "design-growth", label: "Design & Growth" }
];

const services = [
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
    icon: Zap, title: "Digital Transformation", id: "transform", category: "design-growth",
    description: "End-to-end transformation strategies that modernize legacy systems and future-proof businesses.",
    features: ["Legacy modernization", "Process automation", "Technology audit", "Change management"],
  },
  {
    icon: Settings2, title: "Maintenance & Support", id: "support", category: "design-growth",
    description: "Ongoing support, performance monitoring, security patches, and continuous enhancement.",
    features: ["24/7 monitoring", "Security updates", "Performance tuning", "Dedicated support"],
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = services.filter((service) => {
    if (activeCategory === "all") return true;
    return service.category === activeCategory;
  });

  return (
    <section 
      className="py-10 text-slate-800 border-t border-slate-200/50 relative overflow-hidden" 
      id="services"
      style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(var(--accent-global-rgb), 0.04) 0%, transparent 70%), linear-gradient(180deg, #f8fafc 0%, #f9f8ff 50%, #f8fafc 100%)"
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
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
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[var(--accent-global)] text-white border-[var(--accent-global)] shadow-md shadow-purple-500/10"
                    : "bg-slate-100 text-slate-500 border-slate-200 hover:border-slate-350 hover:text-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredServices.map((service) => (
            <div
              key={service.id}
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
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-[var(--accent-global)] hover:bg-[var(--accent-global-hover)] text-white font-bold text-xs px-6 py-3 rounded-full shadow-lg shadow-purple-500/10 transition-all border border-purple-500/10"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
