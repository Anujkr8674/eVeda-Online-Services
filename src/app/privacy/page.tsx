"use client";

import PageHero from "@/components/common/PageHero";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "data-collection", title: "2. Information We Collect" },
  { id: "data-use", title: "3. How We Use Information" },
  { id: "data-sharing", title: "4. Information Sharing" },
  { id: "data-security", title: "5. Data Security & Storage" },
  { id: "user-rights", title: "6. Your Privacy Rights" },
  { id: "cookies", title: "7. Cookies & Tracking" },
  { id: "changes", title: "8. Changes to This Policy" },
  { id: "contact", title: "9. Contact Information" },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;
          const absoluteBottom = bottom + window.scrollY;
          if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: offset, behavior: "auto" });
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-800">
      <PageHero
        badge="Legal & Compliance"
        title="Privacy Policy"
        titleHighlight="& Data Protection"
        description="Last Updated: June 11, 2026. We are committed to protecting your privacy and security under global regulations."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        <div className="grid lg:grid-cols-12 gap-12 items-start border-t border-slate-200/60 pt-12">
          
          {/* Left Sidebar Table of Contents */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-2xl p-6 border border-slate-200/60 bg-white shadow-sm">
              <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4">
                Table of Contents
              </h3>
              <div className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
                    style={{
                      backgroundColor: activeSection === section.id ? "rgba(59, 130, 246, 0.08)" : "transparent",
                      color: activeSection === section.id ? "#2563eb" : "#475569",
                    }}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Data Compliance Assurance */}
            <div className="rounded-2xl p-6 border border-slate-200/60 bg-white shadow-sm">
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100/30 flex items-center justify-center mb-3">
                <Lock className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="text-slate-900 text-xs font-bold mb-1">SOC 2 Compliant Hosting</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                We deploy all cloud resources within ISO 27001 & SOC 2 certified database architectures.
              </p>
            </div>
          </div>

          {/* Right Side Content Body */}
          <div className="lg:col-span-8 space-y-12 bg-white border border-slate-200/60 rounded-3xl p-8 md:p-10 shadow-sm">
            {/* 1. Introduction */}
            <div id="introduction" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <h2 className="text-slate-900 font-bold text-lg m-0">1. Introduction</h2>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Welcome to Eveda Online Services. We value your trust and are dedicated to safeguarding the confidentiality of your personal and business data. This Privacy Policy outlines the types of information we collect, process, and protect when you interact with our website, our cloud CRM platform, and our custom software engineering services.
              </p>
            </div>

            {/* 2. Information We Collect */}
            <div id="data-collection" className="scroll-mt-24 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-blue-600" />
                <h2 className="text-slate-900 font-bold text-lg m-0">2. Information We Collect</h2>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 mb-3">
                Depending on how you use our platform, we collect both personal identification details and telemetry logs:
              </p>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-2 pl-2">
                <li><strong>Contact Details:</strong> Name, professional email, phone number, and physical office location.</li>
                <li><strong>Project Scope Metrics:</strong> Estimated budgets, technical stacks selected, and integration plans.</li>
                <li><strong>Usage Data:</strong> Device browser, IP address, page interactions, and network logs.</li>
              </ul>
            </div>

            {/* 3. How We Use Information */}
            <div id="data-use" className="scroll-mt-24 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-slate-900 font-bold text-lg m-0">3. How We Use Information</h2>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                We use the collected information for specific, legitimate business purposes:
              </p>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-2 pl-2 mt-3">
                <li>To prepare detailed project quotation packages and scope estimates.</li>
                <li>To authenticate and log activities in our secure developer CRM dashboards.</li>
                <li>To comply with state financial laws and customer invoicing mandates.</li>
              </ul>
            </div>

            {/* 4. Information Sharing */}
            <div id="data-sharing" className="scroll-mt-24 border-t border-slate-100 pt-8">
              <h2 className="text-slate-900 font-bold text-lg mb-3">4. Information Sharing</h2>
              <p className="text-xs leading-relaxed text-slate-600">
                We do not sell, rent, or lease customer data. Information is only shared with trusted subprocessors (such as billing services like Stripe, and database servers like Supabase) required to perform essential service operations.
              </p>
            </div>

            {/* 5. Data Security & Storage */}
            <div id="data-security" className="scroll-mt-24 border-t border-slate-100 pt-8">
              <h2 className="text-slate-900 font-bold text-lg mb-3">5. Data Security & Storage</h2>
              <p className="text-xs leading-relaxed text-slate-600">
                We utilize AES-256 grade encryption for all resting databases. TLS 1.3 tunnels are used during active network transits. Data is regularly backed up across distributed cloud regions to avoid physical server damage risks.
              </p>
            </div>

            {/* 6. Your Privacy Rights */}
            <div id="user-rights" className="scroll-mt-24 border-t border-slate-100 pt-8">
              <h2 className="text-slate-900 font-bold text-lg mb-3">6. Your Privacy Rights</h2>
              <p className="text-xs leading-relaxed text-slate-600">
                You hold full rights regarding your data. You may request copies of logged personal parameters, correct inaccuracies, or demand complete deletion of contact details at any point by contacting our security team.
              </p>
            </div>

            {/* 7. Cookies & Tracking */}
            <div id="cookies" className="scroll-mt-24 border-t border-slate-100 pt-8">
              <h2 className="text-slate-900 font-bold text-lg mb-3">7. Cookies & Tracking</h2>
              <p className="text-xs leading-relaxed text-slate-600">
                We use analytical cookies to evaluate website traffic speeds and improve performance. You may modify your device browser configuration to turn off tracking filters.
              </p>
            </div>

            {/* 8. Changes to This Policy */}
            <div id="changes" className="scroll-mt-24 border-t border-slate-100 pt-8">
              <h2 className="text-slate-900 font-bold text-lg mb-3">8. Changes to This Policy</h2>
              <p className="text-xs leading-relaxed text-slate-600">
                We reserve the right to revise this policy periodically. Any changes will be announced on this page with an updated modification date timestamp.
              </p>
            </div>

            {/* 9. Contact Information */}
            <div id="contact" className="scroll-mt-24 border-t border-slate-100 pt-8">
              <h2 className="text-slate-900 font-bold text-lg mb-3">9. Contact Information</h2>
              <p className="text-xs leading-relaxed text-slate-600 mb-4">
                For questions regarding this policy or data storage practices, please write to:
              </p>
              <p className="text-xs text-slate-805 font-bold leading-relaxed">
                Email: compliance@evedaonlineservices.com<br />
                Office: 53 eVeda Online Services Aryanagar, Haridwar, Uttarakhand
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
