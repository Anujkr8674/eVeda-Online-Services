import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import OnboardingModal from "@/components/shared/OnboardingModal";
import BookDemoModal from "@/components/shared/BookDemoModal";
import SupportChatbot from "@/components/shared/SupportChatbot";
import { Toaster } from "react-hot-toast";
import { getWebsiteSettings } from "@/lib/settings";
import { WebSettingsProvider } from "@/context/WebSettingsContext";
import RouteScrollRestorer from "@/components/shared/RouteScrollRestorer";

const CRM_PATHS = ["/dashboard", "/admin", "/telecallers", "/superadmin"];

export const metadata: Metadata = {
  title: {
    default: "Eveda Online Services — Engineering Tomorrow's Digital Future",
    template: "%s | Eveda Online Services",
  },
  description:
    "Premium technology company specializing in AI, SaaS, Enterprise Software, Automation, Cloud Infrastructure, and Digital Transformation. 150+ projects delivered to 50+ global clients.",
  metadataBase: new URL("https://evedaonlineservices.com"),
  keywords: [
    "AI solutions", "SaaS development", "enterprise software", "digital transformation",
    "cloud infrastructure", "web development", "mobile app development",
    "software company India", "IT company Haridwar", "custom software development",
    "Next.js developer", "React developer", "machine learning solutions",
    "DevOps CI/CD", "ERP CRM development", "UI UX design", "full-stack development",
    "Eveda Online Services", "eVeda", "evedaonlineservices.com",
  ],
  authors: [{ name: "Eveda Online Services", url: "https://evedaonlineservices.com" }],
  creator: "Eveda Online Services",
  publisher: "Eveda Online Services",
  alternates: {
    canonical: "https://evedaonlineservices.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://evedaonlineservices.com",
    siteName: "Eveda Online Services",
    title: "Eveda Online Services — Engineering Tomorrow's Digital Future",
    description:
      "Premium technology company delivering AI, SaaS, Enterprise Software, and Digital Transformation. 150+ projects, 50+ global clients.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eveda Online Services — Engineering Tomorrow's Digital Future",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@evedaonlineservices",
    creator: "@evedaonlineservices",
    title: "Eveda Online Services — Engineering Tomorrow's Digital Future",
    description:
      "AI, SaaS, and Enterprise Software for the modern world. 150+ projects, 50+ global clients.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ── JSON-LD Structured Data ─────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://evedaonlineservices.com/#organization",
      name: "Eveda Online Services",
      url: "https://evedaonlineservices.com",
      logo: {
        "@type": "ImageObject",
        url: "https://evedaonlineservices.com/images/logo.png",
        width: 400,
        height: 100,
      },
            sameAs: [
        "https://x.com/EVedaSpeaks",
        "https://www.youtube.com/@EVedaOnlineServices",
        "https://github.com/E-Veda-Online-Services",
        "https://www.linkedin.com/company/e-veda-online-services",
        "https://www.instagram.com/evedaonlineservices/",
        "https://www.facebook.com/evedaonlineservices/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-8630508235",
        contactType: "customer service",
        email: "info@evedaonlineservices.com",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://evedaonlineservices.com/#localbusiness",
      name: "Eveda Online Services",
      image: "https://evedaonlineservices.com/images/og-image.png",
      url: "https://evedaonlineservices.com",
      telephone: "+91-8630508235",
      email: "info@evedaonlineservices.com",
      description:
        "Premium technology company specializing in AI, SaaS, Enterprise Software, and Digital Transformation. Serving global clients.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "53 eVeda Online Services Aryanagar",
        addressLocality: "Haridwar",
        addressRegion: "Uttarakhand",
        postalCode: "249407",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 29.9231,
        longitude: 78.1194,
      },
      priceRange: "$$",
      openingHours: "Mo-Sa 09:00-18:00",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "60",
        bestRating: "5",
        worstRating: "1",
      },
      hasMap: "https://maps.google.com/?q=53+eVeda+Online+Services+Aryanagar+Haridwar",
    },
    {
      "@type": "WebSite",
      "@id": "https://evedaonlineservices.com/#website",
      url: "https://evedaonlineservices.com",
      name: "Eveda Online Services",
      description: "Engineering Tomorrow's Digital Future",
      publisher: { "@id": "https://evedaonlineservices.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://evedaonlineservices.com/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  const isCRM = CRM_PATHS.some((p) => pathname.startsWith(p));
  const settings = await getWebsiteSettings();

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${sora.variable} ${inter.variable} ${isCRM ? "crm-shell antialiased overflow-x-hidden" : "antialiased overflow-x-hidden"}`}
        style={
          isCRM
            ? { background: "var(--crm-bg)", color: "var(--crm-text)" }
            : { background: "var(--bg-primary)", color: "var(--text-secondary)" }
        }
        suppressHydrationWarning
      >
        <Toaster
          position="top-right"
          toastOptions={{
            style: isCRM
              ? {
                  background: "#ffffff",
                  color: "#0a0a0c",
                  border: "1px solid #e6e8ed",
                  borderRadius: "12px",
                  fontSize: "13px",
                  boxShadow: "0 8px 24px -8px rgba(16,24,40,0.12)",
                }
              : {
                  background: "var(--bg-surface)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  fontSize: "13px",
                },
          }}
        />

        {isCRM ? (
          children
        ) : (
          <WebSettingsProvider initialSettings={settings}>
            <RouteScrollRestorer />
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
            <ScrollToTop />
            <OnboardingModal />
            <BookDemoModal />
            <SupportChatbot />
          </WebSettingsProvider>
        )}
      </body>
    </html>
  );
}
