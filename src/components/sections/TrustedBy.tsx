"use client";

import React from "react";
import { IconType } from "react-icons";
import { 
  SiPhonepe, 
  SiRazorpay, 
  SiStripe, 
  SiVercel, 
  SiSupabase, 
  SiWhatsapp, 
  SiTwilio, 
  SiSendgrid, 
  SiGithub, 
  SiFigma, 
  SiFirebase,
  SiCanva,
  SiCoreldraw,
} from "react-icons/si";
import {
  TbBrandAdobePhotoshop,
  TbBrandAdobeIllustrator,
} from "react-icons/tb";
import { FaAws } from "react-icons/fa6";

/* Trusted-by marquee — verified technology & design platform partners with official logos */

interface Company {
  name: string;
  category: string;
  officialColor: string;
  logo: IconType;
}

const companies: Company[] = [
  {
    name: "PhonePe",
    category: "Payment Partner",
    officialColor: "#5f259f",
    logo: SiPhonepe,
  },
  {
    name: "Razorpay",
    category: "Payment Gateway",
    officialColor: "#0c8af0",
    logo: SiRazorpay,
  },
  {
    name: "Stripe",
    category: "Global Payments",
    officialColor: "#635bff",
    logo: SiStripe,
  },
  {
    name: "AWS",
    category: "Cloud Infrastructure",
    officialColor: "#ff9900",
    logo: FaAws,
  },
  {
    name: "Vercel",
    category: "Cloud & Hosting",
    officialColor: "#000000",
    logo: SiVercel,
  },
  {
    name: "Canva",
    category: "Design & Branding",
    officialColor: "#00c4cc",
    logo: SiCanva,
  },
  {
    name: "Adobe Photoshop",
    category: "Book Cover & Imaging",
    officialColor: "#31a8ff",
    logo: TbBrandAdobePhotoshop,
  },
  {
    name: "Adobe Illustrator",
    category: "Vector & Book Art",
    officialColor: "#ff9a00",
    logo: TbBrandAdobeIllustrator,
  },
  {
    name: "CorelDRAW",
    category: "Print & Vector Layout",
    officialColor: "#00b140",
    logo: SiCoreldraw,
  },
  {
    name: "Supabase",
    category: "Database & Backend",
    officialColor: "#3ecf8e",
    logo: SiSupabase,
  },
  {
    name: "WhatsApp API",
    category: "Messaging Gateway",
    officialColor: "#25d366",
    logo: SiWhatsapp,
  },
  {
    name: "Twilio",
    category: "SMS & Voice Gateway",
    officialColor: "#f22f46",
    logo: SiTwilio,
  },
  {
    name: "SendGrid",
    category: "Email Infrastructure",
    officialColor: "#1a82e2",
    logo: SiSendgrid,
  },
  {
    name: "GitHub",
    category: "DevOps & Workflows",
    officialColor: "#24292e",
    logo: SiGithub,
  },
  {
    name: "Figma",
    category: "UI/UX Workflow",
    officialColor: "#f24e1e",
    logo: SiFigma,
  },
  {
    name: "Firebase",
    category: "Database & Auth",
    officialColor: "#ffca28",
    logo: SiFirebase,
  },
];

// Duplicate for seamless infinite scroll
const track = [...companies, ...companies];

export default function TrustedBy() {
  return (
    <section
      className="relative pt-10 md:pt-24 pb-10 overflow-hidden"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      {/* Label */}
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.20em] text-slate-400 mb-7 select-none px-4">
        SUPPORTING SEAMLESS INTEGRATION WITH LEADING PLATFORMS
      </p>

      {/* Marquee track */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center gap-4 w-max"
          style={{
            animation: "ng-marquee 38s linear infinite",
            willChange: "transform",
          }}
        >
          {track.map((company, i) => {
            const LogoIcon = company.logo;
            return (
              <div
                key={`${company.name}-${i}`}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full select-none cursor-default whitespace-nowrap transition-all duration-200 group"
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent-global-dim)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                {/* Logo icon with official brand color */}
                <LogoIcon 
                  className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 shrink-0" 
                  style={{ color: company.officialColor }}
                />
                
                <span
                  className="text-sm font-bold tracking-tight text-slate-600 group-hover:text-slate-900 transition-colors"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {company.name}
                </span>
                <span
                  className="text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-500 transition-colors hidden sm:block"
                >
                  {company.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
