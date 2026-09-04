"use client";

import { motion } from "framer-motion";
import { 
  Search, Shield, Cloud, RefreshCw, Smartphone, 
  History, Activity, Puzzle, ClipboardList, Sparkles, CheckCircle2,
  GraduationCap, Play, Video, Award, BookOpen, Users,
  Heart, Calendar, DollarSign, Plus, Tv, Lock, CreditCard,
  School, FileSpreadsheet, MapPin, Truck, Box, BarChart3,
  ShoppingCart, Percent, UserCheck, Briefcase
} from "lucide-react";

const iconMap: Record<string, any> = {
  search: Search,
  shield: Shield,
  cloud: Cloud,
  refresh: RefreshCw,
  mobile: Smartphone,
  history: History,
  activity: Activity,
  puzzle: Puzzle,
  list: ClipboardList,
  sparkles: Sparkles,
  check: CheckCircle2,
  graduation: GraduationCap,
  play: Play,
  video: Video,
  award: Award,
  book: BookOpen,
  users: Users,
  heart: Heart,
  calendar: Calendar,
  dollar: DollarSign,
  plus: Plus,
  tv: Tv,
  lock: Lock,
  card: CreditCard,
  school: School,
  sheet: FileSpreadsheet,
  pin: MapPin,
  truck: Truck,
  box: Box,
  chart: BarChart3,
  cart: ShoppingCart,
  percent: Percent,
  usercheck: UserCheck,
  briefcase: Briefcase
};

interface ProductBentoFeaturesProps {
  productTitle: string;
  features: {
    iconName: string;
    title: string;
    description: string;
    colSpan: string;
    colorClasses: string;
    borderHover: string;
    glowGradient: string;
    textHover: string;
  }[];
  accentColor: string;
}

export default function ProductBentoFeatures({ productTitle, features, accentColor }: ProductBentoFeaturesProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#fcfdff] to-[#f8fafc] py-24 border-t border-slate-200/50">
      
      {/* Background blurs and subtle grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full blur-[120px]" 
          style={{ backgroundColor: `${accentColor}05` }}
        />
        <div 
          className="absolute right-[-10%] bottom-[10%] h-[500px] w-[500px] rounded-full blur-[120px]" 
          style={{ backgroundColor: `${accentColor}03` }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(${accentColor} 1.5px, transparent 1.5px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-slate-50 text-slate-600 border border-slate-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} /> Powerful Capabilities
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black leading-tight text-slate-900 font-sora tracking-tight">
            Everything You Need in a <span style={{ color: accentColor }}>Modern {productTitle}</span>
          </h2>
          <p className="mt-3 text-slate-500 text-sm leading-relaxed max-w-xl mx-auto font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
            eVeda {productTitle} simplifies how teams operate, protect sensitive data, and accelerate workflows.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {features.map((feature, idx) => {
            const Icon = iconMap[feature.iconName] || Search;
            return (
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
                    <div 
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ease-in-out shadow-sm`}
                      style={{ 
                        backgroundColor: `${accentColor}10`,
                        color: accentColor
                      }}
                    >
                      <Icon className="w-5.5 h-5.5 stroke-[2]" />
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-lg font-extrabold text-slate-900 font-sora tracking-tight transition-colors duration-250 group-hover:text-[var(--accent-global)]`}>
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="mt-3 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Features Row: Full Width list inside container */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md rounded-2xl mt-12 py-5 px-6 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            
            {[
              { title: "Enterprise Security", desc: "AES-256 encryption & SSO support" },
              { title: "Scalable & Flexible", desc: "Scale resources dynamically" },
              { title: "Boost Productivity", desc: "Work up to 4x faster" },
              { title: "Cost Effective", desc: "Reduce operations and setup costs" }
            ].map((f, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border shadow-sm"
                  style={{ 
                    backgroundColor: `${accentColor}08`, 
                    borderColor: `${accentColor}15`,
                    color: accentColor 
                  }}
                >
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
