"use client";

import PageHero from "@/components/common/PageHero";
import Careers from "@/components/sections/Careers";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <PageHero
        badge="We're Hiring"
        title="Join a Team That"
        titleHighlight="Builds the Future"
        description="Eveda Online Services is growing fast. We're looking for exceptional engineers, designers, and builders who want to do the best work of their careers."
        breadcrumbs={[{ label: "Careers" }]}
      />
      <Careers hideViewAll={true} />
      <FAQ />
      <Contact />
    </div>
  );
}
