"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const track1 = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "CTO",
    company: "FinanceIQ",
    avatar: "SM",
    content: "Eveda Online Services transformed our entire fintech platform in just 4 months. The quality of engineering, attention to detail, and proactive communication was exceptional.",
    date: "2 weeks ago",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    company: "MediConnect",
    avatar: "RK",
    content: "Working with eVeda felt like having an extension of our in-house team. They built our healthcare platform from scratch — backend, mobile apps, and AI features — with world-class execution.",
    date: "1 month ago",
  },
  {
    id: "3",
    name: "Emma Thompson",
    role: "VP Engineering",
    company: "RetailMax",
    avatar: "ET",
    content: "We needed a complete e-commerce overhaul in a tight timeline. eVeda delivered a next-gen platform handling 2M+ users seamlessly. Their DevOps expertise saved us $200K/year.",
    date: "3 days ago",
  },
  {
    id: "4",
    name: "David Chen",
    role: "Product Director",
    company: "LogiTech Solutions",
    avatar: "DC",
    content: "The team built our complex ERP system with impressive accuracy and speed. What would have taken 18 months internally was delivered in 6 months with superior code quality and documentation.",
    date: "1 month ago",
  },
];

const track2 = [
  {
    id: "5",
    name: "Priya Sharma",
    role: "CEO",
    company: "EduLearn",
    avatar: "PS",
    content: "Our edtech platform now serves 25,000+ students globally, thanks to eVeda's brilliant engineering. The real-time video infrastructure they built is flawlessly reliable.",
    date: "2 months ago",
  },
  {
    id: "6",
    name: "Marcus Vance",
    role: "VP Operations",
    company: "Securitas AI",
    avatar: "MV",
    content: "eVeda designed our cyber threat defense backend. Security is top-tier and AWS scalability is flawless. Their engineers are absolute cloud architectural specialists.",
    date: "1 month ago",
  },
  {
    id: "7",
    name: "Sophia Rodriguez",
    role: "Head of UX",
    company: "Nova Studios",
    avatar: "SR",
    content: "Incredible front-end fidelity. They translated our high-fidelity designs into pixel-perfect Next.js code with beautiful micro-interactions. Will absolutely work with them again.",
    date: "3 weeks ago",
  },
  {
    id: "8",
    name: "Alex Mercer",
    role: "Co-Founder",
    company: "CryoTech SaaS",
    avatar: "AM",
    content: "Launched our subscriber portal on schedule. Stripe integration, auto-invoicing, and sub-accounts work beautifully. The eVeda team is highly recommended for SaaS execution.",
    date: "5 days ago",
  },
];

/* ── Google G Icon SVG ──────────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22-.03-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ── Google Testimonial Card ────────────────────────────────────────── */
function GoogleTestimonialCard({ item }: { item: typeof track1[0] }) {
  // Authentic Google profile initial colors
  const googleColors = ["#1a73e8", "#ea4335", "#f9ab00", "#137333", "#7b1fa2", "#00acc1"];
  const getGoogleAvatarBg = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % googleColors.length;
    return googleColors[index];
  };

  const avatarBg = getGoogleAvatarBg(item.name);
  const firstLetter = item.name.charAt(0).toUpperCase();

  return (
    <motion.div
      className="flex-shrink-0 w-[360px] p-6 rounded-2xl border relative group bg-white border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
      whileHover={{
        y: -6,
        borderColor: "#06B6D4",
        boxShadow: "0 16px 40px rgba(15,23,42,0.08), 0 0 20px rgba(6,182,212,0.08)"
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Bar: Google branding */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          <GoogleIcon />
          <span className="text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
            Google Review
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-50 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-700 font-semibold">
            Verified
          </span>
        </div>
      </div>

      {/* Profile info */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white select-none shadow-inner"
          style={{
            backgroundColor: avatarBg,
            textShadow: "0 1px 2px rgba(0,0,0,0.15)"
          }}
        >
          {firstLetter}
        </div>
        <div>
          <h4 className="text-[13px] font-bold leading-tight" style={{ fontFamily: "Sora, sans-serif", color: "#0F172A" }}>
            {item.name}
          </h4>
          <span className="text-[11px] text-[#64748B] block mt-0.5">
            {item.role} at {item.company}
          </span>
        </div>
      </div>

      {/* Star ratings and Date */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-[11px] text-[#64748B] font-mono">{item.date}</span>
      </div>

      {/* Review content */}
      <p className="text-[13px] leading-relaxed text-[#334155]">
        &ldquo;{item.content}&rdquo;
      </p>
    </motion.div>
  );
}

export default function Testimonials() {
  // Duplicate arrays to make infinite loop seamless
  const track1Items = [...track1, ...track1, ...track1];
  const track2Items = [...track2, ...track2, ...track2];

  return (
    <section 
      className="relative overflow-hidden py-16 md:py-24 z-30 bg-white border-t border-slate-200/50" 
      id="testimonials"
    >
      {/* Grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Ambient Glows for Light Theme */}
      <div 
        className="absolute top-[-10%] left-[-15%] w-[450px] h-[450px] rounded-full pointer-events-none opacity-[0.05] blur-[90px] z-0" 
        style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }} 
      />
      <div 
        className="absolute bottom-[-10%] right-[-15%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04] blur-[100px] z-0" 
        style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }} 
      />

      {/* Styles for continuous marquee motion */}
      <style>{`
        @keyframes marquee-ltr {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-ltr {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: marquee-ltr 35s linear infinite;
        }
        .marquee-track-rtl {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: marquee-rtl 35s linear infinite;
        }
        .marquee-container:hover .marquee-track-ltr,
        .marquee-container:hover .marquee-track-rtl {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="mb-14 px-6">
          <SectionHeader
            badge="TESTIMONIALS"
            title="What Clients Say"
            titleHighlight="On Google"
            description="Don't take our word for it — here's a live feed of 5-star reviews from our verified Google Business profile."
            align="center"
            theme="light"
          />
        </div>

        {/* Marquees wrapper */}
        <div className="marquee-container flex flex-col gap-6 w-full py-4 relative">
          {/* Subtle overlay gradients to fade edges */}
          <div className="absolute inset-y-0 left-0 w-[120px] bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-[120px] bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />

          {/* Row 1: Left-to-Right */}
          <div className="overflow-hidden w-full py-2">
            <div className="marquee-track-ltr">
              {track1Items.map((item, idx) => (
                <GoogleTestimonialCard key={`t1-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Row 2: Right-to-Left */}
          <div className="overflow-hidden w-full py-2">
            <div className="marquee-track-rtl">
              {track2Items.map((item, idx) => (
                <GoogleTestimonialCard key={`t2-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Trust Metrics footer */}
        <div className="ng-container mt-12 max-w-2xl mx-auto pt-8 border-t border-slate-200">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: "4.9 / 5", label: "Google Rating" },
              { value: "60+", label: "Verified Reviews" },
              { value: "100%", label: "Satisfaction" },
            ].map((item) => (
              <div key={item.label}>
                <div
                  className="text-[22px] font-extrabold text-slate-900 mb-0.5"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {item.value}
                </div>
                <div className="text-[11px] text-[#64748B] font-semibold uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
