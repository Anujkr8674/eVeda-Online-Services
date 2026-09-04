import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export const easing = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  spring: [0.34, 1.56, 0.64, 1],
  smooth: [0.25, 0.1, 0.25, 1],
} as const;

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easing.easeOut,
    },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easing.easeOut,
    },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easing.easeOut,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easing.easeOut,
    },
  },
};

export const COMPANY = {
  name: "Eveda Online Services",
  shortName: "eVeda",
  tagline: "Engineering Tomorrow's Digital Future",
  description: "We design and build high-performance software, AI solutions, SaaS platforms, and enterprise systems for startups and forward-thinking businesses.",
  founded: 2026,
  launchDate: "June 16, 2026",
  email: "info@evedaonlineservices.com",
  supportEmail: "info@evedaonlineservices.com",
  phone: "+91 8630508235",
  whatsapp: "+918630508235",
  location: "53 eVeda Online Services Aryanagar, Haridwar",
  city: "Haridwar",
  state: "Uttarakhand",
  country: "India",
  pincode: "249407",
  fullAddress: "53 eVeda Online Services Aryanagar, Haridwar, Uttarakhand, India",
  website: "https://evedaonlineservices.com",
  // Dummy social links — will be made dynamic via backend CMS
  social: {
    twitter: "https://twitter.com/evedaonlineservices",
    linkedin: "https://linkedin.com/company/evedaonlineservices",
    github: "https://github.com/evedaonlineservices",
    instagram: "https://instagram.com/evedaonlineservices",
    youtube: "https://youtube.com/@evedaonlineservices",
    facebook: "https://facebook.com/evedaonlineservices",
  },
  stats: {
    projectsDelivered: "150+",
    globalClients: "50+",
    uptime: "99.9%",
    teamSize: "25+",
    countriesServed: "12+",
    clientRetention: "100%",
  },
  services: [
    "Web Development",
    "Mobile App Development",
    "SaaS Platforms",
    "AI & ML Solutions",
    "Cloud Services",
    "DevOps & CI/CD",
    "ERP & CRM Systems",
    "UI/UX Design",
    "Digital Transformation",
    "Book Branding",
    "Book Designing",
    "Maintenance & Support",
  ],
} as const;

