"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeader from "@/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

/* ─── Google Fonts for Syne + Playfair ────────────────────────────── */
const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Playfair+Display:ital,wght@1,700&display=swap');
`;

const projects = [
  {
    id: "1",
    title: "Decentralized Finance Payment Architecture",
    tags: ["Fintech", "Blockchain", "Web3"],
    image: "/images/portfolio/1.jpg",
  },
  {
    id: "2",
    title: "AI-Driven Logistics Optimization Platform",
    tags: ["Machine Learning", "Cloud", "SaaS"],
    image: "/images/portfolio/ai.png",
  },
  {
    id: "3",
    title: "HIPAA-Compliant Patient Telehealth Portal",
    tags: ["Healthcare", "React Native", "API Dev"],
    image: "/images/portfolio/2.jpg",
  },
  {
    id: "4",
    title: "High-Throughput E-Commerce Core Engine",
    tags: ["Next.js", "Serverless", "Stripe"],
    image: "/images/portfolio/saas.png",
  },
  {
    id: "5",
    title: "Autoscaling Kubernetes Cloud Infrastructure",
    tags: ["DevOps", "Kubernetes", "AWS"],
    image: "/images/portfolio/security.png",
  },
  {
    id: "6",
    title: "Real-Time Collaborative Canvas Platform",
    tags: ["WebSockets", "SaaS", "UI/UX"],
    image: "/images/portfolio/mobile.png",
  },
];

/* ─── Gradient Arrow SVG ───────────────────────────────────────────── */
function ArrowIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="arr1" x1="0.546204" y1="30.5091" x2="60.4725" y2="30.5091" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" /><stop offset="1" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="arr2" x1="36.2991" y1="12.6318" x2="60.4709" y2="12.6318" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" /><stop offset="1" stopColor="#6366F1" />
        </linearGradient>
        <clipPath id="arrclip">
          <rect width="59.9264" height="59.9264" fill="white" transform="translate(0.546021 0.545898)" />
        </clipPath>
      </defs>
      <g clipPath="url(#arrclip)">
        <path d="M1.8336 60.4724C1.50412 60.4724 1.17464 60.3467 0.923231 60.0953C0.420528 59.5925 0.420528 58.7773 0.923231 58.2744L58.2746 0.923013C58.7775 0.420194 59.5927 0.420194 60.0955 0.923013C60.5982 1.42583 60.5982 2.24104 60.0955 2.74386L2.74408 60.0953C2.49255 60.3468 2.16307 60.4724 1.8336 60.4724Z" fill="url(#arr1)" />
        <path d="M59.1834 24.7176C58.4724 24.7176 57.8959 24.1412 57.8959 23.4302V3.12086H37.5866C36.8756 3.12086 36.2991 2.54442 36.2991 1.83338C36.2991 1.12234 36.8756 0.545898 37.5866 0.545898H59.1834C59.8944 0.545898 60.4709 1.12234 60.4709 1.83338V23.4302C60.4709 24.1412 59.8944 24.7176 59.1834 24.7176Z" fill="url(#arr2)" />
      </g>
    </svg>
  );
}

/* ─── Project Card ─────────────────────────────────────────────────── */
function ProjectCard({ project, cardRef }: {
  project: typeof projects[0];
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      className="ra-project3-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 32px 80px rgba(0,0,0,0.4)"
          : "0 8px 32px rgba(0,0,0,0.18)",
      }}
    >
      {/* ── Text block ── */}
      <div className="ra-project3-text">
        {/* Title + Arrow row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, marginBottom: 16 }}>
          <h3
            className="ra-project3-title-text"
            style={{
              textDecorationLine: hovered ? "underline" : "none",
              textUnderlineOffset: 4,
              textDecorationColor: "rgba(28,28,45,0.3)",
            }}
          >
            {project.title}
          </h3>
          <div
            className="ra-project3-arrow-wrap"
            style={{
              transform: hovered ? "translate(3px,-3px)" : "translate(0,0)",
            }}
          >
            <ArrowIcon size={34} />
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="ra-project3-tag"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Image block (fills remaining space) ── */}
      <div className="ra-project3-img-box">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Circular Link CTA Button ─────────────────────────────────────── */
function CircleBtn() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/portfolio"
      className="circle-btn-link"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="View all portfolio projects"
    >
      {/* Gradient circle */}
      <svg
        className="circle-btn-svg"
        viewBox="0 0 208 208"
        fill="none"
        style={{
          position: "absolute",
          inset: 0,
          transform: hovered ? "rotate(15deg)" : "rotate(0deg)",
          transition: "transform 0.5s ease",
        }}
      >
        <defs>
          <linearGradient id="circleg" x1="0.981598" y1="103.509" x2="208" y2="103.509" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C3AED" /><stop offset="1" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        <circle cx="104.491" cy="103.509" r="102.509" stroke="url(#circleg)" strokeWidth="2" />
      </svg>
      {/* Inner arrow */}
      <div
        className="circle-btn-arrow"
        style={{
          transform: hovered ? "translate(4px,-4px)" : "translate(0,0)",
          transition: "transform 0.3s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        <ArrowIcon size={52} />
      </div>
    </Link>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

    // Only apply horizontal scroll pinning on desktop screens (>= 1024px)
    // On mobile/tablet (< 1024px), keep native vertical page scroll and smooth horizontal snap carousel
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tween = gsap.to(wrap, {
        x: () => -(wrap.scrollWidth - section.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${wrap.scrollWidth - section.clientWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          pinSpacing: true,
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <>
      {/* Inject Syne + Playfair fonts */}
      <style>{FONT_IMPORT}</style>

      {/* Portfolio section styles */}
      <style>{`
        /* --- Desktop Default (>= 1024px) --- */
        #portfolio-section {
          position: relative;
          overflow: hidden;
          height: 100vh;
        }
        .ra-project3-wrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: calc(100vh - 108px); /* Height minus sticky header */
          margin-top: 108px; /* Start directly below sticky header */
          width: max-content;
          position: relative;
        }
        /* Left title panel */
        .ra-project3-title-2 {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          padding: 0 60px 0 80px;
          min-width: 340px;
          position: relative;
          z-index: 2;
        }
        /* Cards row */
        .ra-project3-content {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 36px;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
          padding: 0 36px;
        }
        /* Right title panel */
        .ra-project3-title {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          padding: 0 80px 0 60px;
          min-width: 340px;
          position: relative;
          z-index: 2;
        }
        /* Card styles */
        .ra-project3-item {
          flex-shrink: 0;
          width: 520px;
          height: 560px;
          background: #ffffff;
          border-radius: 32px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.4s ease, transform 0.4s ease;
          will-change: transform;
        }
        .ra-project3-text {
          padding: 40px 32px 24px 32px;
        }
        .ra-project3-title-text {
          font-family: 'Syne', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #1c1c2d;
          line-height: 1.35;
          letter-spacing: -0.01em;
          flex: 1;
        }
        .ra-project3-arrow-wrap {
          flex-shrink: 0;
          margin-top: 2px;
          transition: transform 0.3s ease;
        }
        .ra-project3-tag {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #46505b;
          background: #e9ebed;
          padding: 6px 14px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .ra-project3-img-box {
          flex: 1;
          margin: 0 18px 18px 18px;
          border-radius: 20px;
          overflow: hidden;
          min-height: 0;
        }
        .circle-btn-link {
          flex-shrink: 0;
          width: 208px;
          height: 208px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .circle-btn-svg {
          width: 208px;
          height: 208px;
        }

        /* Desktop Height Adaptations */
        @media (min-width: 1024px) and (max-height: 850px) {
          .ra-project3-item {
            width: 450px;
            height: 480px;
            border-radius: 24px;
          }
          .ra-project3-text {
            padding: 28px 24px 16px 24px;
          }
          .ra-project3-title-text {
            font-size: 19px;
          }
        }
        @media (min-width: 1024px) and (max-height: 700px) {
          .ra-project3-item {
            width: 390px;
            height: 400px;
            border-radius: 20px;
          }
          .ra-project3-text {
            padding: 20px 20px 12px 20px;
          }
          .ra-project3-title-text {
            font-size: 15px;
          }
        }

        /* ── Mobile & Tablet Responsive Engine (< 1024px) ── */
        @media (max-width: 1023px) {
          #portfolio-section {
            height: auto !important;
            min-height: auto !important;
            overflow: visible !important;
            padding: 56px 0 72px 0 !important;
          }
          .ra-project3-wrap {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            height: auto !important;
            margin-top: 0 !important;
            width: 100% !important;
            max-width: 100vw !important;
            transform: none !important;
            gap: 20px !important;
          }
          /* Left Title positioned at top of section */
          .ra-project3-title-2 {
            width: 100% !important;
            min-width: 0 !important;
            padding: 0 20px !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .ra-project3-title-2 .section-header-box {
            width: 100% !important;
            max-width: 100% !important;
          }
          /* Native smooth swipe cards carousel */
          .ra-project3-content {
            display: flex !important;
            flex-direction: row !important;
            align-items: stretch !important;
            width: 100% !important;
            max-width: 100vw !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            padding: 6px 20px 20px 20px !important;
            gap: 16px !important;
            box-sizing: border-box !important;
            scrollbar-width: none; /* Firefox */
          }
          .ra-project3-content::-webkit-scrollbar {
            display: none; /* Chrome, Safari */
          }
          /* Mobile cards: fits viewport with peek of next card */
          .ra-project3-item {
            width: 82vw !important;
            max-width: 340px !important;
            min-width: 270px !important;
            height: 440px !important;
            scroll-snap-align: start !important;
            border-radius: 22px !important;
            box-shadow: 0 12px 36px rgba(0,0,0,0.3) !important;
            background: #ffffff !important;
          }
          .ra-project3-text {
            padding: 22px 18px 14px 18px !important;
          }
          .ra-project3-title-text {
            font-size: 17px !important;
            line-height: 1.35 !important;
          }
          .ra-project3-tag {
            font-size: 11px !important;
            padding: 4px 9px !important;
            border-radius: 5px !important;
          }
          .ra-project3-img-box {
            margin: 0 12px 12px 12px !important;
            border-radius: 14px !important;
            min-height: 180px !important;
          }
          /* Trailing circular button styled nicely for mobile carousel */
          .circle-btn-link {
            width: 130px !important;
            height: 130px !important;
            min-width: 130px !important;
            align-self: center !important;
            scroll-snap-align: center !important;
            margin: 0 10px 0 4px !important;
          }
          .circle-btn-svg {
            width: 130px !important;
            height: 130px !important;
          }
          .circle-btn-arrow {
            transform: scale(0.68) !important;
          }
          /* Concluding call to action on mobile */
          .ra-project3-title {
            width: 100% !important;
            min-width: 0 !important;
            padding: 10px 20px 0 20px !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .ra-project3-title .section-header-box {
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="portfolio-section"
        className="relative"
        style={{ background: "#0B0F19" }}
      >
        {/* --- BACKGROUND DESIGN (Static to ensure consistency during horizontal scroll) --- */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          background: "linear-gradient(to bottom, #000000 0%, #05050A 50%, #000000 100%)",
        }} />

        <div className="absolute inset-0 z-[0] opacity-100 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(124,58,237,0.07)_0%,_transparent_75%)] rounded-full blur-[120px] pointer-events-none z-[0]" />

        {/* ── Wide horizontal scroll container ── */}
        <div ref={wrapRef} className="ra-project3-wrap z-10">

          {/* ── LEFT TITLE (ra-project3-title-2) ── */}
          <div className="ra-project3-title-2 flex flex-col justify-center">
            <SectionHeader
              badge="PORTFOLIO"
              title="Recent"
              titleHighlight="Our Projects"
              description="A curated showcase of our latest enterprise solutions, mobile apps, and SaaS platforms."
              align="left"
              theme="dark"
              className="w-[320px] section-header-box"
            />
            {/* Mobile swipe hint */}
            <div className="flex items-center gap-2 mt-4 text-xs font-semibold tracking-wider text-purple-400/90 uppercase lg:hidden">
              <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span>Swipe to explore projects</span>
            </div>
          </div>

          {/* ── CARDS ROW (ra-project3-content) ── */}
          <div className="ra-project3-content">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* Last item: circular button */}
            <CircleBtn />
          </div>

          {/* ── RIGHT TITLE (ra-project3-title) ── */}
          <div className="ra-project3-title flex flex-col justify-center">
            <SectionHeader
              badge="BUILD WITH US"
              title="Start Your"
              titleHighlight="Success Story"
              description="Partner with EVeda to transform your product ideas into digital realities."
              align="left"
              theme="dark"
              className="w-[320px] section-header-box"
            />
            <div className="mt-5">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-600/25"
              >
                <span>Explore All Projects</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
