"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython,
  SiDocker, SiKubernetes, SiMongodb, SiPostgresql, SiFirebase,
  SiTailwindcss, SiFigma, SiGraphql, SiRedis, SiFlutter,
  SiAndroid, SiApple, SiGooglecloud, SiTerraform, SiGithubactions,
  SiSupabase, SiPrisma, SiStripe, SiOpenai,
  SiBlender, SiCoreldraw, SiCanva, SiWordpress, SiShopify,
} from "react-icons/si";
import {
  TbBrandAdobeIllustrator,
  TbBrandAdobePhotoshop,
  TbBrandAdobeIndesign,
  TbFileTypePdf,
} from "react-icons/tb";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionGlow from "@/components/ui/SectionGlow";

gsap.registerPlugin(ScrollTrigger);

// Custom Pagemaker Publishing Icon (Styled to match Creative Suite badges)
function IconPagemaker(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 12c0 -4.243 0 -6.364 1.318 -7.682s3.44 -1.318 7.682 -1.318s6.364 0 7.682 1.318s1.318 3.44 1.318 7.682s0 6.364 -1.318 7.682s-3.44 1.318 -7.682 1.318s-6.364 0 -7.682 -1.318s-1.318 -3.44 -1.318 -7.682" />
      <path d="M7 16v-7h2.8a2 2 0 0 1 0 4H7" />
      <path d="M12.5 16v-4.5l2 2.5 2-2.5v4.5" />
    </svg>
  );
}

const cardsData = [
  // Row 1 (Top: Book Designing & Branding - Left 2, Right 2)
  { name: "Illustrator", icon: TbBrandAdobeIllustrator, color: "#FF9A00", r: 1, c: 3 },
  { name: "Photoshop", icon: TbBrandAdobePhotoshop, color: "#31A8FF", r: 1, c: 4 },
  { name: "InDesign", icon: TbBrandAdobeIndesign, color: "#FF3366", r: 1, c: 8 },
  { name: "CorelDRAW", icon: SiCoreldraw, color: "#00A551", r: 1, c: 9 },

  // Row 2 (Left 3, Right 3)
  { name: "React", icon: SiReact, color: "#61DAFB", r: 2, c: 2 },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", r: 2, c: 3 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", r: 2, c: 4 },

  { name: "Node.js", icon: SiNodedotjs, color: "#339933", r: 2, c: 8 },
  { name: "Python", icon: SiPython, color: "#3776AB", r: 2, c: 9 },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098", r: 2, c: 10 },

  // Row 3 (Left 4, Right 4)
  { name: "AWS", icon: FaAws, color: "#FF9900", r: 3, c: 1 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", r: 3, c: 2 },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5", r: 3, c: 3 },
  { name: "WordPress", icon: SiWordpress, color: "#21759B", r: 3, c: 4 },
  // { name: "Terraform", icon: SiTerraform, color: "#7B42BC", r: 3, c: 4 },

  { name: "MongoDB", icon: SiMongodb, color: "#47A248", r: 3, c: 8 },
  // { name: "Redis", icon: SiRedis, color: "#DC382D", r: 3, c: 9 },
  { name: "Shopify", icon: SiShopify, color: "#95BF47", r: 3, c: 9 },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", r: 3, c: 10 },
  { name: "Prisma", icon: SiPrisma, color: "#8A9BA8", r: 3, c: 11 },

  // Row 4 (Left 3, Right 3)
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", r: 4, c: 2 },
  { name: "Figma", icon: SiFigma, color: "#F24E1E", r: 4, c: 3 },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28", r: 4, c: 4 },

  { name: "Stripe", icon: SiStripe, color: "#635BFF", r: 4, c: 8 },
  { name: "OpenAI", icon: SiOpenai, color: "#A8A8A8", r: 4, c: 9 },
  { name: "Flutter", icon: SiFlutter, color: "#02569B", r: 4, c: 10 },

  // Row 5 (Bottom: Book Designing & Branding - Left 2, Right 2)
  { name: "Blender", icon: SiBlender, color: "#F5792A", r: 5, c: 3 },
  { name: "Pagemaker", icon: IconPagemaker, color: "#4A90E2", r: 5, c: 4 },
  { name: "Pdf/X", icon: TbFileTypePdf, color: "#E42313", r: 5, c: 8 },
  { name: "Canva", icon: SiCanva, color: "#00C4CC", r: 5, c: 9 },
];

export default function TechStack() {
  const containerRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Grab all cards and sort them by their column value to animate left-to-right
    const cards = gsap.utils.toArray<HTMLElement>(".tech-card");
    cards.sort((a, b) => {
      const colA = parseInt(a.getAttribute("data-col") || "0", 10);
      const colB = parseInt(b.getAttribute("data-col") || "0", 10);
      return colA - colB;
    });

    const centerBlock = containerRef.current.querySelector(".center-block");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 10%",
        scrub: 2.5,
      }
    });

    // 1. Staggered Assembly of Cards - More Prominent
    tl.fromTo(cards,
      { opacity: 0, y: 800, scale: 0.2, rotation: (i) => (i % 2 === 0 ? -20 : 20) },
      { opacity: 1, y: 0, scale: 1, rotation: 0, stagger: 0.05, ease: "back.out(1.5)" }
    );

    // 2. Center Reveal
    if (centerBlock) {
      tl.fromTo(centerBlock,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, ease: "power3.out", duration: 0.5 },
        "-=0.2"
      );

      if (counterRef.current) {
        const counter = { val: 0 };
        tl.to(counter, {
          val: 30,
          roundProps: "val",
          ease: "none",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.innerText = counter.val + "+";
            }
          }
        }, "<");
      }
    }

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 sm:py-32"
      id="technologies"
    >
      <SectionGlow />
      <style>{`
        @media (min-width: 1024px) {
          .lg-grid-place {
            grid-column: var(--lg-col);
            grid-row: var(--lg-row);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.1; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.3; }
        }
      `}</style>

      {/* --- BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 z-[-2] bg-gradient-to-b from-[#000000] via-[#05050A] to-[#000000]" />
      <div className="absolute inset-0 z-[-2] opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none z-[-2]" />

      {/* Floating Particles */}
      {mounted && Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white z-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      {/* --- CONTENT --- */}
      <div className="ng-container relative z-10">
        <div className="mb-16 sm:mb-24">
          <SectionHeader
            badge="TECHNOLOGY ECOSYSTEM"
            title="Powered by the World's Best"
            titleHighlight="Modern Technologies"
            description="Battle-tested technologies chosen for scalability, performance, security, and long-term growth."
          />
        </div>

        {/* CSS Grid for Desktop (11 cols), Flex/Grid for Mobile */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-[repeat(11,minmax(0,1fr))] gap-3 sm:gap-4 lg:gap-5 w-full max-w-[1400px] mx-auto relative">

          {/* CENTER REVEAL BLOCK (Desktop only placement) */}
          <div
            className="center-block hidden lg:flex flex-col items-center justify-center row-start-2 row-span-3 col-start-5 col-span-3 rounded-[32px] relative overflow-hidden"
            style={{
              background: "rgba(10, 10, 12, 0.60)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.50), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--accent-primary-rgb),0.05)] to-transparent rounded-[32px] pointer-events-none" />

            <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-center h-full w-full">

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style={{ background: "var(--accent-primary)" }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent-primary)" }}>Engineering</p>
                  <p className="text-[16px] font-bold leading-tight text-white">Full-Stack Expertise</p>
                </div>
              </div>

              {/* Features List */}
              <div className="flex flex-col gap-3 mb-6">
                {["Enterprise-Grade Security", "Scalable Infrastructure", "Distinctive Brand Identity", "Scalable Digital Solutions", "Seamless Integrations"].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "var(--accent-primary)" }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-primary)" }} />
                    </div>
                    <span className="text-[13px] font-semibold text-white/90">{f}</span>
                  </div>
                ))}
              </div>

              {/* Subtle Divider */}
              <div className="h-px w-full mb-6" style={{ background: "rgba(255, 255, 255, 0.08)" }} />

              {/* Stat + CTA */}
              <div className="flex items-end justify-between">
                <div>
                  <div
                    ref={counterRef}
                    className="font-black leading-none mb-1 text-white"
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "42px",
                      letterSpacing: "-0.03em",
                      color: "var(--accent-primary)"
                    }}
                  >
                    0+
                  </div>
                  <div className="text-[11px] font-medium tracking-wide text-slate-400 uppercase">
                    Core Technologies
                  </div>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold rounded-full px-5 py-2.5 transition-all duration-200 hover:opacity-90 shadow-sm text-white"
                  style={{ background: "var(--accent-primary)" }}
                >
                  Let's Build &rarr;
                </a>
              </div>

            </div>
          </div>

          {/* TECHNOLOGY CARDS */}
          {cardsData.map((card) => (
            <div
              key={card.name}
              data-col={card.c}
              className="tech-card lg-grid-place w-full h-[100px] sm:h-[115px] relative"
              style={{
                "--lg-col": card.c,
                "--lg-row": card.r,
              } as any}
            >
              {/* Inner container to safely handle CSS hovers without conflicting with GSAP's inline transforms */}
              <div
                className="group flex flex-col items-center justify-center gap-1.5 sm:gap-2 w-full h-full rounded-[24px] p-2.5 sm:p-3.5 relative transition-all duration-500 cursor-default hover:-translate-y-2 overflow-hidden"
                style={{
                  background: "rgba(10, 10, 12, 0.60)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: "0 24px 60px rgba(0, 0, 0, 0.50), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
                }}
              >
                {/* Hover Glow Background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px] pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${card.color}15 0%, transparent 70%)`
                  }}
                />
                {/* Hover Border Ring */}
                <div
                  className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ border: `1px solid ${card.color}40` }}
                />

                <card.icon
                  className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 transition-transform duration-500 group-hover:scale-110 relative z-10"
                  style={{ color: card.color }}
                />

                <div className="text-center relative z-10 px-1 w-full">
                  <div className="text-[9.5px] sm:text-[11px] lg:text-[11.5px] font-semibold text-white tracking-tight truncate w-full">
                    {card.name}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
