"use client";

import PageHero from "@/components/common/PageHero";
import { productsData } from "@/lib/products-data";
import { triggerOnboardingModal } from "@/components/shared/OnboardingModal";
import Link from "next/link";
import {
  FileText, GraduationCap, Activity, MonitorPlay, School, Store,
  Calculator, Users, Truck, Boxes, ShoppingCart, Briefcase,
  ArrowRight, CheckCircle2, Sparkles, Layers, ShieldCheck, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const ICON_MAP: Record<string, any> = {
  FileText,
  GraduationCap,
  Activity,
  MonitorPlay,
  School,
  Store,
  Calculator,
  Users,
  Truck,
  Boxes,
  ShoppingCart,
  Briefcase,
};

const CATEGORIES = [
  "All",
  "Enterprise & Ops",
  "Education & Healthcare",
  "Commerce & Media",
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const products = Object.values(productsData);

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Enterprise & Ops") {
      return ["dms", "crm", "hrms", "pos", "logistics", "inventory"].includes(p.id);
    }
    if (activeCategory === "Education & Healthcare") {
      return ["lms", "hms", "school-erp"].includes(p.id);
    }
    if (activeCategory === "Commerce & Media") {
      return ["marketplace", "ecommerce", "ott"].includes(p.id);
    }
    return true;
  });

  return (
    <div className="bg-[#0b0c10] min-h-screen text-slate-100">
      <PageHero
        badge="Our Solutions"
        title="Enterprise Software Products"
        description="Turnkey, cloud-native platforms engineered for scalability, ironclad security, and immediate business ROI."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#7C3AED] text-white shadow-[0_4px_16px_rgba(124,58,237,0.4)] scale-105"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => {
            const IconComponent = ICON_MAP[product.iconName] || Briefcase;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/50 hover:bg-white/[0.05] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(124,58,237,0.15)] hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${product.accent}22, ${product.accent}44)`,
                        color: product.accent,
                        border: `1px solid ${product.accent}55`,
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10">
                      SaaS Ready
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <h3 className="text-xl font-bold font-sora text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                    {product.headline}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2 mb-8">
                    {product.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#7C3AED] text-white text-xs font-bold transition-all duration-200"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => triggerOnboardingModal({ type: "general" })}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
                  >
                    Demo
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-violet-950/60 via-slate-900 to-indigo-950/60 border border-violet-500/30 text-center relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Custom Tailoring Available
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sora text-white mb-3">
              Need a Custom Feature or Dedicated Deployment?
            </h2>
            <p className="text-sm text-slate-300 mb-6">
              All our software products can be white-labeled, self-hosted on your cloud infrastructure, or customized to match your exact enterprise workflows.
            </p>
            <button
              onClick={() => triggerOnboardingModal({ type: "general" })}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-extrabold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              Request Custom Demo & Architecture Review <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
