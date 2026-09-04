"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeader from "@/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

/* ── Google Fonts for Syne + Playfair ─────────────────────────────── */
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

/* ── Gradient Arrow SVG ────────────────────────────────────────────── */
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

/* ── Project Card ────────────────────────────────────────────────────── */
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
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
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
            style={{
              flexShrink: 0,
              marginTop: 2,
              transform: hovered ? "translate(3px,-3px)" : "translate(0,0)",
              transition: "transform 0.3s ease",
            }}
          >
            <ArrowIcon size={36} />
          </div>
        </div>

        {/* Tags ── bg #e9ebed, Inter 14px, #46505b */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 400,
                color: "#46505b",
                background: "#e9ebed",
                padding: "6px 14px",
                borderRadius: 6,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Image block (fills remaining space) ── */}
      <div
        style={{
          flex: 1,
          margin: "0 18px 18px 18px",
          borderRadius: 20,
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 1.2s ease",
            display: "block",
          }}
          loading="lazy"
        />
      </div>
    </div>
  );
}

/* ── Circular "View All Services" button (last item) ── */
function CircleBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/portfolio"
      style={{
        flexShrink: 0,
        width: 208,
        height: 208,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient circle */}
      <svg
        width="208" height="208" viewBox="0 0 208 208" fill="none"
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
      <div style={{
        transform: hovered ? "translate(5px,-5px)" : "translate(0,0)",
        transition: "transform 0.3s ease",
        position: "relative",
        zIndex: 1,
      }}>
        <ArrowIcon size={61} />
      </div>
    </Link>
  );
}

/* ── Main Section ────────────────────────────────────────────────────── */
export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

    gsap.to(wrap, {
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
  }, { scope: sectionRef });

  return (
    <>
      {/* Inject Syne + Playfair fonts */}
      <style>{FONT_IMPORT}</style>

      {/* Portfolio section styles */}
      <style>{`
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
        /* Responsive Card styles */
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
        @media (max-height: 850px) {
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
        @media (max-height: 700px) {
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
        @media (max-width: 1024px) {
          .ra-project3-title-2 { min-width: 260px; padding: 0 32px 0 40px; }
          .ra-project3-title { min-width: 260px; padding: 0 40px 0 32px; }
          .ra-project3-content { gap: 20px; padding: 0 20px; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="portfolio-section"
        className="relative overflow-hidden"
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
              className="w-[320px]"
            />
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
              description="Partner with eVeda to transform your product ideas into digital realities."
              align="left"
              theme="dark"
              className="w-[320px]"
            />
          </div>

        </div>
      </section>
    </>
  );
}
