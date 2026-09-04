import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TARGET_CITIES, getCityById } from "@/lib/india-locations";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import { ArrowRight, MapPin, Building2, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return TARGET_CITIES.map((city) => ({
    city: city.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityById(city);
  
  if (!cityData) {
    return { title: "Location Not Found" };
  }

  return {
    title: `Best IT & Software Company in ${cityData.name} | Eveda Online Services`,
    description: `Looking for top-tier software development, AI solutions, and digital marketing in ${cityData.name}, ${cityData.state}? Eveda Online Services delivers enterprise-grade IT services globally.`,
    alternates: {
      canonical: `https://evedaonlineservices.com/locations/${cityData.id}`,
    },
    openGraph: {
      title: `Premium Software & IT Agency in ${cityData.name}`,
      description: `Transform your business with cutting-edge web, mobile, and AI solutions crafted by experts serving ${cityData.name}.`,
      url: `https://evedaonlineservices.com/locations/${cityData.id}`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityById(city);

  if (!cityData) {
    notFound();
  }

  // Generate dynamic JSON-LD for LocalBusiness in this specific city
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Eveda Online Services - ${cityData.name}`,
    "image": "https://evedaonlineservices.com/images/og-image.png",
    "url": `https://evedaonlineservices.com/locations/${cityData.id}`,
    "telephone": "+91-8630508235",
    "description": `Premium technology company delivering web, app, and AI solutions to businesses in ${cityData.name}, ${cityData.state}.`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressRegion": cityData.state,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": cityData.coordinates.lat,
      "longitude": cityData.coordinates.lng
    },
    "areaServed": {
      "@type": "City",
      "name": cityData.name
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      
      {/* Premium Custom Hero for Location Page */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 pointer-events-none" 
            style={{ background: "var(--accent-primary)" }}
          />
        </div>

        <div className="ng-container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider mb-8">
            <MapPin className="w-4 h-4" style={{ color: "var(--accent-primary)" }} />
            Serving {cityData.name}, {cityData.state}
          </div>
          
          <h1 className="ng-h1 mb-6">
            The Premium IT Partner for <br />
            <span style={{ color: "var(--accent-primary)" }}>{cityData.name}</span> Businesses
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Elevate your digital presence with enterprise-grade software, intelligent AI automations, and scalable cloud infrastructure built by global experts.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/contact" className="ng-btn-primary">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="ng-btn-secondary">
              View Case Studies
            </Link>
          </div>
        </div>

        {/* Floating stats metrics */}
        <div className="ng-container relative z-10 mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Local Impact", value: "High ROI", icon: TrendingUp },
            { label: "Global Standard", value: "150+ Delivered", icon: Building2 },
            { label: "Tech Stack", value: "Modern & Fast", icon: MapPin },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="ng-card-dark flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--accent-primary-dim)" }}>
                  <Icon className="w-6 h-6" style={{ color: "var(--accent-primary)" }} />
                </div>
                <div>
                  <div className="text-white font-bold text-lg font-sora">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Reuse core sections seamlessly */}
      <Services />
      <Portfolio />
      <Contact />
    </>
  );
}
