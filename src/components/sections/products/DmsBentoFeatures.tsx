"use client";

import { motion } from "framer-motion";
import { 
  Search, Shield, Cloud, RefreshCw, Smartphone, 
  History, Activity, Puzzle, ClipboardList, Sparkles, CheckCircle2
} from "lucide-react";

export default function DmsBentoFeatures() {
  const features = [
    {
      icon: Search,
      title: "AI-Powered Search",
      description: "Find any document in seconds with AI, OCR and natural language search. Retrieve context, scanned text, and handwritten notes instantly.",
      colSpan: "md:col-span-8",
      colorClasses: "bg-indigo-50 border-indigo-100 text-indigo-605 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600",
      borderHover: "hover:border-indigo-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)]",
      glowGradient: "from-indigo-50/0 via-transparent to-indigo-500/[0.02]",
      textHover: "group-hover:text-indigo-600"
    },
    {
      icon: ClipboardList,
      title: "Everything at a Glance",
      description: "Get a real-time overview of your documents, team activity, approvals, and system health from a single unified panel.",
      colSpan: "md:col-span-4",
      colorClasses: "bg-violet-50 border-violet-100 text-violet-605 group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600",
      borderHover: "hover:border-violet-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
      glowGradient: "from-violet-50/0 via-transparent to-violet-500/[0.02]",
      textHover: "group-hover:text-violet-600"
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Control view, edit, download and share permissions with granular roles, keeping confidential files strictly restricted.",
      colSpan: "md:col-span-4",
      colorClasses: "bg-emerald-50 border-emerald-100 text-emerald-605 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
      borderHover: "hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)]",
      glowGradient: "from-emerald-50/0 via-transparent to-emerald-500/[0.02]",
      textHover: "group-hover:text-emerald-600"
    },
    {
      icon: Cloud,
      title: "Secure Cloud Storage",
      description: "Enterprise-grade encryption keeps your data safe in the cloud 24/7. Built on high-availability cloud architecture.",
      colSpan: "md:col-span-4",
      colorClasses: "bg-cyan-50 border-cyan-100 text-cyan-605 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600",
      borderHover: "hover:border-cyan-300 hover:shadow-[0_20px_50px_rgba(6,182,212,0.06)]",
      glowGradient: "from-cyan-50/0 via-transparent to-cyan-500/[0.02]",
      textHover: "group-hover:text-cyan-655"
    },
    {
      icon: RefreshCw,
      title: "Workflow Automation",
      description: "Automate document review pipelines, multi-level approvals, and instant notifications to eliminate manual delays.",
      colSpan: "md:col-span-4",
      colorClasses: "bg-amber-50 border-amber-100 text-amber-605 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600",
      borderHover: "hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.06)]",
      glowGradient: "from-amber-50/0 via-transparent to-amber-500/[0.02]",
      textHover: "group-hover:text-amber-600"
    },
    {
      icon: Smartphone,
      title: "Mobile Access",
      description: "Access, edit, and approve critical business documents securely on the go from any mobile device or tablet.",
      colSpan: "md:col-span-4",
      colorClasses: "bg-blue-50 border-blue-100 text-blue-650 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
      borderHover: "hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.06)]",
      glowGradient: "from-blue-50/0 via-transparent to-blue-500/[0.02]",
      textHover: "group-hover:text-blue-600"
    },
    {
      icon: History,
      title: "Version Control",
      description: "Track document changes over time, compare revisions side-by-side, and restore previous file versions with a single click.",
      colSpan: "md:col-span-8",
      colorClasses: "bg-teal-50 border-teal-100 text-teal-650 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600",
      borderHover: "hover:border-teal-300 hover:shadow-[0_20px_50px_rgba(20,184,166,0.06)]",
      glowGradient: "from-teal-50/0 via-transparent to-teal-500/[0.02]",
      textHover: "group-hover:text-teal-600"
    },
    {
      icon: Activity,
      title: "Audit & Activity Logs",
      description: "Maintain absolute compliance and security transparency with comprehensive, immutable audit trails of all file activity.",
      colSpan: "md:col-span-6",
      colorClasses: "bg-rose-50 border-rose-100 text-rose-650 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600",
      borderHover: "hover:border-rose-300 hover:shadow-[0_20px_50px_rgba(244,63,94,0.06)]",
      glowGradient: "from-rose-50/0 via-transparent to-rose-500/[0.02]",
      textHover: "group-hover:text-rose-600"
    },
    {
      icon: Puzzle,
      title: "Seamless Integrations",
      description: "Connect your DMS directly with Google Drive, Dropbox, Slack, Salesforce, and custom REST APIs for unified operations.",
      colSpan: "md:col-span-6",
      colorClasses: "bg-purple-50 border-purple-100 text-purple-650 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600",
      borderHover: "hover:border-purple-300 hover:shadow-[0_20px_50px_rgba(168,85,247,0.06)]",
      glowGradient: "from-purple-50/0 via-transparent to-purple-500/[0.02]",
      textHover: "group-hover:text-purple-600"
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#fcfdff] to-[#f8fafc] py-24 border-t border-slate-200/50">
      
      {/* Background blurs and subtle grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.02] blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-indigo-500/[0.02] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "radial-gradient(#3b82f6 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Powerful Features
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black leading-tight text-slate-900 font-sora tracking-tight">
            Everything You Need in a <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Modern DMS</span>
          </h2>
          <p className="mt-3 text-slate-500 text-sm leading-relaxed max-w-xl mx-auto font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
            eVeda DMS simplifies how teams manage documents, protect sensitive data, and accelerate workflows.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className={`col-span-12 ${feature.colSpan} group bg-white border border-slate-200/60 rounded-[28px] p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative overflow-hidden transition-all duration-300 ${feature.borderHover}`}
            >
              {/* Subtle background glow on card hover */}
              <div className={`absolute -inset-px bg-gradient-to-br ${feature.glowGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Icon Container with hover animation */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ease-in-out shadow-sm ${feature.colorClasses}`}>
                    <feature.icon className="w-5.5 h-5.5 stroke-[2]" />
                  </div>
                  
                  {/* Title */}
                  <h3 className={`text-lg font-extrabold text-slate-900 font-sora tracking-tight transition-colors duration-250 ${feature.textHover}`}>
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="mt-3 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Features Row: Full Width list inside container */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md rounded-2xl mt-12 py-5 px-6 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            
            {[
              { title: "Enterprise Security", desc: "AES-256 encryption & SSO support" },
              { title: "Scalable & Flexible", desc: "Scale resources dynamically" },
              { title: "Boost Productivity", desc: "Find documents 4x faster" },
              { title: "Cost Effective", desc: "Reduce operations and paper costs" }
            ].map((f, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-slate-800 text-xs font-sora leading-tight">{f.title}</h5>
                  <p className="text-slate-500 text-[10px] font-semibold mt-0.5 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
