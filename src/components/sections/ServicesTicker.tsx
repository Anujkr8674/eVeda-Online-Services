"use client";

import Link from "next/link";

const serviceLinks = [
  { label: "Web Development",        href: "/services/web" },
  { label: "Mobile App",             href: "/services/mobile" },
  { label: "SaaS Platform",          href: "/services/saas" },
  { label: "AI Solutions",           href: "/services/ai" },
  { label: "Cloud / DevOps",         href: "/services/cloud" },
  { label: "UI/UX Design",           href: "/services/design" },
  { label: "ERP / CRM",              href: "/services/erp" },
  { label: "Digital Transformation", href: "/services/transform" },
  { label: "Book Branding",          href: "/services/book-branding" },
  { label: "Book Designing",         href: "/services/book-designing" },
];

export default function ServicesTicker() {
  return (
    <div className="relative overflow-hidden py-8 border-y border-white/[0.05]"
      style={{
        background:
          "radial-gradient(ellipse 90% 200% at 50% 50%, #2e1065 0%, #1a0a3e 35%, #0d0520 65%, #020617 100%)",
      }}
    >
      <style>{`
        @keyframes svc-ticker {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .svc-ticker-track {
          display: flex;
          width: max-content;
          animation: svc-ticker 30s linear infinite;
        }
        .svc-ticker-wrap:hover .svc-ticker-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Subtle inner glow highlight at centre */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(139,92,246,0.18) 0%, transparent 70%)" }}
      />

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to right, #0d0520, transparent)" }}
      />
      <div className="absolute inset-y-0 right-0 w-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to left, #0d0520, transparent)" }}
      />

      <div className="svc-ticker-wrap overflow-hidden relative z-0">
        <div className="svc-ticker-track text-[42px] sm:text-[56px] md:text-[68px] font-black tracking-tighter uppercase select-none font-sora">
          {[...Array(2)].map((_, set) =>
            serviceLinks.map((s, i) => (
              <Link key={`${set}-${i}`} href={s.href}
                className="inline-flex items-center gap-6 px-6 group">
                <span className="text-[var(--accent-global)] opacity-50 group-hover:opacity-100 transition-all duration-200 text-3xl">◆</span>
                <span className="text-white/75 group-hover:text-white transition-colors duration-200 whitespace-nowrap">
                  {s.label}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
