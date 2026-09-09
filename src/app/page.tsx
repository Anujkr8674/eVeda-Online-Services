import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

// Dynamic imports to code-split and lazy-load all sections below the fold.
// This significantly reduces the initial JS bundle size and improves LCP.
const TrustedBy = dynamic(() => import("@/components/sections/TrustedBy"));
const InlineLeadCapture = dynamic(() => import("@/components/sections/InlineLeadCapture"));
const About = dynamic(() => import("@/components/sections/About"));
const FounderVision = dynamic(() => import("@/components/sections/FounderVision"));
const Services = dynamic(() => import("@/components/sections/Services"));
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"));
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));
const TechStack = dynamic(() => import("@/components/sections/TechStack"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Blog = dynamic(() => import("@/components/sections/Blog"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const ServicesTicker = dynamic(() => import("@/components/sections/ServicesTicker"));

export const metadata: Metadata = {
  title: "Eveda Online Services — Premium IT Company | Web, Mobile, AI & SaaS",
  description:
    "Build world-class web apps, mobile apps, SaaS platforms, and AI solutions with Eveda Online Services. 150+ projects delivered. 50+ global clients. India's premium tech partner.",
  alternates: {
    canonical: "https://evedaonlineservices.com",
  },
  openGraph: {
    title: "Eveda Online Services — Premium IT Company | Web, Mobile, AI & SaaS",
    description:
      "Build world-class web apps, mobile apps, SaaS platforms, and AI solutions. 150+ projects delivered, 50+ global clients.",
    url: "https://evedaonlineservices.com",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Eveda Online Services" }],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <InlineLeadCapture />
      <About />
      <FounderVision variant="compact" />
      <Services />
      <ServicesTicker />
      <WhyChooseUs />
      <Portfolio />
      <Process />
      <TechStack />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
    </>
  );
}
