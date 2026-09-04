"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const categories = [
  "All",
  "Fintech",
  "Healthcare",
  "SaaS",
  "AI & ML",
  "DevOps",
  "E-Commerce"
];

const projects = [
  {
    id: "1",
    title: "Decentralized Finance Payment Architecture",
    tags: ["Fintech", "Blockchain", "Web3"],
    category: "Fintech",
    image: "/images/portfolio/1.jpg",
    description: "Enterprise Web3 gateway processing $10M+ daily. Zero-latency smart contract execution and robust multi-chain reconciliation.",
    outcomes: ["$10M+ daily volume", "Under 2s reconciliation", "Multi-chain auditing"],
    accent: "#22c55e",
  },
  {
    id: "2",
    title: "AI-Driven Logistics Optimization Platform",
    tags: ["AI & ML", "Cloud", "SaaS"],
    category: "AI & ML",
    image: "/images/portfolio/ai.png",
    description: "Predictive route planning engine that reduced carrier dispatch delays by 35% using real-time traffic and weather models.",
    outcomes: ["35% delay reduction", "Dynamic routing", "40% fuel savings"],
    accent: "#3b82f6",
  },
  {
    id: "3",
    title: "HIPAA-Compliant Patient Telehealth Portal",
    tags: ["Healthcare", "React Native", "API Dev"],
    category: "Healthcare",
    image: "/images/portfolio/2.jpg",
    description: "Secure teleconsultation platform connecting 50K+ patients with specialists via encrypted WebRTC channels.",
    outcomes: ["50K+ users", "HIPAA HL7 standard", "End-to-end encryption"],
    accent: "#06b6d4",
  },
  {
    id: "4",
    title: "High-Throughput E-Commerce Core Engine",
    tags: ["E-Commerce", "Serverless", "Stripe"],
    category: "E-Commerce",
    image: "/images/portfolio/saas.png",
    description: "Serverless storefront handling 2M+ concurrent users, featuring AI-powered search rankings and one-click checkouts.",
    outcomes: ["2M+ scale cap", "AI products recommendation", "40% conversions boost"],
    accent: "#f97316",
  },
  {
    id: "5",
    title: "Autoscaling Kubernetes Cloud Infrastructure",
    tags: ["DevOps", "Kubernetes", "AWS"],
    category: "DevOps",
    image: "/images/portfolio/security.png",
    description: "Infrastructure-as-code automation enabling automated failover and 99.99% multi-region uptime SLA for SaaS enterprises.",
    outcomes: ["99.99% uptime SLA", "Zero-downtime deploy", "30% host savings"],
    accent: "#7c3aed",
  },
  {
    id: "6",
    title: "Real-Time Collaborative Canvas Platform",
    tags: ["WebSockets", "SaaS", "UI/UX"],
    category: "SaaS",
    image: "/images/portfolio/mobile.png",
    description: "A collaborative drawing and brainstorming web canvas, featuring sub-100ms multi-user syncing via WebSockets.",
    outcomes: ["Sub-100ms latency sync", "Multiplayer cursors", "Figma-grade layout"],
    accent: "#ec4899",
  },
  {
    id: "7",
    title: "Custom Healthcare EHR Analytics Engine",
    tags: ["Healthcare", "Data Science", "Cloud"],
    category: "Healthcare",
    image: "/images/portfolio/3.jpg",
    description: "Clinical analytics dashboard compiling patient statistics, treatment cycles, and automated medical report extraction.",
    outcomes: ["98% data accuracy", "Integrated charts", "Saved admin hours"],
    accent: "#06b6d4",
  },
  {
    id: "8",
    title: "Fintech Trading & Investment Dashboard",
    tags: ["Fintech", "SaaS", "Next.js"],
    category: "Fintech",
    image: "/images/portfolio/4.jpg",
    description: "Real-time stock and crypto brokerage UI with interactive charting, automated buy/sell alerts, and portfolio tracking.",
    outcomes: ["Real-time price ticks", "Custom warning triggers", "Interactive canvas charts"],
    accent: "#22c55e",
  },
];

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [items, setItems] = useState<any[]>(projects);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          setItems(json.data);
        }
      })
      .catch((err) => console.error("Error loading portfolio items:", err));
  }, []);

  const filteredProjects = activeCategory === "All"
    ? items
    : items.filter(p => p.category === activeCategory || p.tags.includes(activeCategory));

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#fafbfc] to-slate-50 border-b border-slate-200/50">
      {/* Fine Technical Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: "linear-gradient(rgba(15,23,42,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.015) 1px, transparent 1px)",
          backgroundSize: "64px 64px"
        }}
      />

      {/* Decorative Blur Elements */}
      <div className="absolute top-[15%] left-[-5%] w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(124,58,237,0.04)_0%,_transparent_75%)] blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-5%] w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(6,182,212,0.04)_0%,_transparent_75%)] blur-[90px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-full border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[var(--accent-global)] border-[var(--accent-global)] text-white shadow-md shadow-purple-500/10"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-350 hover:text-slate-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] hover:-translate-y-2 flex flex-col justify-between transition-all duration-500"
            >
              {/* Background gradient glow that appears on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${project.accent}08 0%, transparent 70%)`
                }}
              />

              {/* Browser Mockup Wrapper for Image */}
              <div className="p-4 pb-0">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm bg-slate-50 aspect-[16/10]">
                  {/* macOS dots bar */}
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100/80 border-b border-slate-200/50 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                    <span className="mx-auto text-[7px] text-slate-400 font-mono font-medium tracking-tight truncate max-w-[60%]">
                      evedaonlineservices.com/{project.id}
                    </span>
                  </div>
                  
                  {/* Project Image */}
                  <div className="relative w-full h-[calc(100%-24px)] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" 
                      style={{
                        background: `linear-gradient(to bottom, transparent, ${project.accent})`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 pt-5 flex flex-col justify-between flex-grow relative z-10">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ color: project.accent, backgroundColor: `${project.accent}10`, border: `1px solid ${project.accent}20` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base mb-2 font-sora text-slate-900 leading-snug group-hover:text-slate-950 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>

                  {/* Outcomes Row / Metric highlights */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-100 mb-4">
                    {project.outcomes.map((outcome: string, idx: number) => {
                      const words = outcome.split(' ');
                      const metricValue = words[0];
                      const metricLabel = words.slice(1).join(' ');
                      return (
                        <div key={idx} className="flex flex-col">
                          <span className="text-xs sm:text-sm font-black tracking-tight leading-tight truncate" style={{ color: project.accent }}>
                            {metricValue}
                          </span>
                          <span className="text-[8px] sm:text-[9px] font-extrabold text-slate-400 uppercase tracking-wider truncate mt-0.5">
                            {metricLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 flex items-center justify-between border-t border-slate-100/60 mt-2">
                  <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">
                    Full Case Study
                  </span>
                  <Link
                    href={`/case-studies/${project.id === "1" ? "banking" : project.id === "2" ? "logistics" : project.id === "3" ? "telemedicine" : "banking"}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 text-slate-600 transition-all duration-300 hover:text-white group-hover:border-slate-800 group-hover:bg-slate-900"
                  >
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
