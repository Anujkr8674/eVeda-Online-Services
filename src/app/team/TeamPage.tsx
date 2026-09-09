"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/common/PageHero";
import FounderVision from "@/components/sections/FounderVision";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Users, Sparkles, Send, ArrowRight } from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaGithub, FaInstagram, FaFacebookF, FaEnvelope } from "react-icons/fa";
import { COMPANY } from "@/lib/utils";
import Link from "next/link";

const STATIC_TEAM_MEMBERS = [
  {
    id: "static-founder",
    name: "Geetanjali Singh",
    role: "Founder & Visionary",
    expertise: "Creative Direction, Publishing & Digital Ecosystem Strategy",
    image: "/images/team/geet.png",
    email: "geetanjalisingh@evedaonlineservices.com",
    linkedin: "https://www.linkedin.com/in/geetanjali-singh-83a53a100/",
    instagram: "https://www.instagram.com/nirved1326/?hl=en",
    facebook: "https://www.facebook.com/geetanjali.singh.92102",
    twitter: "https://x.com/EVedaSpeaks",
  },
  {
    id: "static-1",
    name: "Dr. Rahul Sharma",
    role: "Managing Director",
    expertise: "Enterprise Systems & AI Strategy",
    image: "/images/team/rahul.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    id: "static-7",
    name: "Satya Prakash Yadav",
    role: "Director",
    expertise: "Strategic Growth & Enterprise Partnerships",
    image: "/images/team/satya.jpg",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    id: "static-2",
    name: "Priya Malhotra",
    role: "Creative Director",
    expertise: "Brand Strategy & Human-Centric UX",
    image: "/images/team/priya.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    id: "static-3",
    name: "Vikram Singhania",
    role: "Director of Operations",
    expertise: "Global Delivery & Agile Scale",
    image: "/images/team/vikram.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    id: "static-4",
    name: "Sneha Reddy",
    role: "Director of Client Success",
    expertise: "Client Partnerships & Product Growth",
    image: "/images/team/sneha.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    id: "static-5",
    name: "Aryan Kapoor",
    role: "Director of Engineering",
    expertise: "Cloud Infrastructure & Hyper-Scale Systems",
    image: "/images/team/aryan.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    id: "static-6",
    name: "Ananya Roy",
    role: "Director of Product",
    expertise: "SaaS Roadmap & AI-First Frameworks",
    image: "/images/team/ananya.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    id: "static-8",
    name: "Harsh Kumar",
    role: "IT Administrator",
    expertise: "Enterprise Infrastructure & Security Operations",
    image: "/images/team/harsh.jpg",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    id: "static-9",
    name: "Shovam Kumar",
    role: "Senior Full Stack Developer",
    expertise: "Full Stack Architecture & Scalable Cloud Apps",
    image: "/images/team/shovam_v2.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    id: "static-10",
    name: "Badal Kumar Singh",
    role: "Senior Full Stack Developer",
    expertise: "Full Stack Development & Scalable Backend Solutions",
    image: "/images/team/badal.jpg",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    id: "static-11",
    name: "Kunal Bose",
    role: "Senior Full Stack Developer",
    expertise: "Full Stack Engineering & Modern Web Architectures",
    image: "/images/team/kunal.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    id: "static-12",
    name: "Anuj Kumar",
    role: "Full Stack Developer",
    expertise: "Full Stack Web & Database Engineering",
    image: "/images/team/anuj.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    id: "static-13",
    name: "Ravi Kumar",
    role: "Senior Performance Marketing",
    expertise: "Performance Marketing & Digital Growth Strategy",
    image: "/images/team/ravi.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    id: "static-14",
    name: "Saovik Biswas",
    role: "Senior App Developer",
    expertise: "Mobile Application Design & Cross-Platform Systems",
    image: "/images/team/saovik.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    id: "static-15",
    name: "Vikash Mahto",
    role: "Senior SEO Executive & Developer",
    expertise: "Search Engine Optimization & Frontend Web Development",
    image: "/images/team/vikash.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    id: "static-16",
    name: "Roshni Kumar Singh",
    role: "Graphic Designer",
    expertise: "UI/UX & Graphic Design",
    image: "/images/team/roshni.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    id: "static-17",
    name: "Anurag",
    role: "Cinematographer",
    expertise: "Cinematography & Media Production",
    image: "/images/team/anurag.png",
    linkedin: "",
    twitter: "",
    github: ""
  }
];

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>(STATIC_TEAM_MEMBERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          // Sort by sortOrder if available
          const sorted = [...json.data].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
          setTeamMembers(sorted);
        }
      })
      .catch((err) => console.error("Error loading team members:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* ── 1. Page Header ── */}
      <PageHero
        badge="Our Experts"
        title="Meet the Minds Driving"
        titleHighlight="eVeda Engineering"
        description="A premium collective of directors, product leaders, and veteran system architects building the future of software."
        breadcrumbs={[{ label: "Team" }]}
      />

      {/* ── Founder & Visionary Feature Section ── */}
      <FounderVision variant="full" id="founder" />

      {/* ── 2. Grid Section ── */}
      <section className="py-20 lg:py-24 max-w-[1400px] mx-auto px-4 sm:px-6 relative">
        <div className="absolute top-[20%] left-[-5%] w-[40%] h-[40%] bg-[radial-gradient(circle,_rgba(124,58,237,0.025)_0%,_transparent_70%)] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-[radial-gradient(circle,_rgba(6,182,212,0.025)_0%,_transparent_70%)] blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider text-[#7C3AED] bg-purple-50 border border-purple-200/60 mb-3.5 shadow-xs">
            <Users className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Our Team</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 font-sora leading-tight mb-4">
            Meet Our <span className="text-[#7C3AED]">Team Members</span>
          </h2>

          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            The talented architects, engineers, designers, and specialists driving digital innovation and building future-ready solutions at E Veda.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-slate-200/80 rounded-3xl p-6 h-[400px] flex flex-col justify-between animate-pulse">
                <div className="space-y-4">
                  <div className="w-full aspect-[4/3] rounded-2xl bg-slate-100" />
                  <div className="h-5 bg-slate-100 rounded w-2/3" />
                  <div className="h-4 bg-slate-100 rounded w-1/3" />
                  <div className="h-12 bg-slate-100 rounded w-full" />
                </div>
                <div className="h-8 bg-slate-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id || i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--accent-global)]/30 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-global)] to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden shadow-inner group-hover:scale-[1.01] transition-transform duration-300">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-700">
                        <User className="w-12 h-12" />
                      </div>
                    )}

                    {/* Small floating sparkles on directors */}
                    {(member.role.toLowerCase().includes("director") || member.role.toLowerCase().includes("md")) && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-slate-100 py-1 px-2.5 rounded-full flex items-center gap-1.5 shadow-md">
                        <Sparkles className="w-3 h-3 text-[var(--accent-global)]" />
                        <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">Leadership</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-black text-slate-900 font-sora tracking-tight mb-1 group-hover:text-[var(--accent-global)] transition-colors duration-250">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[var(--accent-global)] uppercase tracking-wider mb-4">
                      {member.role}
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                      {member.expertise}
                    </p>
                  </div>
                </div>

                {/* Footer Socials */}
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-2">
                    {member.linkedin && member.linkedin !== "#" && member.linkedin.trim() !== "" && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-[#7C3AED] hover:text-white transition-all duration-250 shadow-sm"
                        title="LinkedIn Profile"
                      >
                        <FaLinkedinIn className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.twitter && member.twitter !== "#" && member.twitter.trim() !== "" && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-[#7C3AED] hover:text-white transition-all duration-250 shadow-sm"
                        title="Twitter Profile"
                      >
                        <FaTwitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.instagram && member.instagram !== "#" && member.instagram.trim() !== "" && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-purple-50 text-[#E1306C] flex items-center justify-center hover:scale-110 hover:bg-[#E1306C] hover:text-white transition-all duration-250 shadow-sm"
                        title="Instagram Profile"
                      >
                        <FaInstagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.facebook && member.facebook !== "#" && member.facebook.trim() !== "" && (
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-purple-50 text-[#1877F2] flex items-center justify-center hover:scale-110 hover:bg-[#1877F2] hover:text-white transition-all duration-250 shadow-sm"
                        title="Facebook Profile"
                      >
                        <FaFacebookF className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.github && member.github !== "#" && member.github.trim() !== "" && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-[#7C3AED] hover:text-white transition-all duration-250 shadow-sm"
                        title="GitHub Profile"
                      >
                        <FaGithub className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-8 h-8 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center hover:scale-110 hover:bg-[#7C3AED] hover:text-white transition-all duration-250 shadow-sm"
                        title={`Email ${member.name}`}
                      >
                        <FaEnvelope className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    eVeda Partner
                  </span>
                </div>

              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ── 3. Join Us Callout ── */}
      <section className="bg-slate-950 border-t border-white/[0.06] py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06] blur-[120px]" style={{ background: "radial-gradient(circle, var(--accent-global) 0%, transparent 70%)" }} />

        <div className="max-w-[800px] mx-auto px-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-[var(--accent-global)] bg-[var(--accent-global-dim)] mb-6">
            Join Our Mission
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sora tracking-tight mb-4">
            Want to Build What's <span className="text-[var(--accent-global)]">Next?</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-normal">
            We are always looking for passionate engineers, system architects, and design thinkers who want to build high-performance products.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/careers"
              className="px-6 py-3.5 bg-gradient-to-r from-[var(--accent-global)] to-purple-650 text-white font-bold text-sm rounded-xl flex items-center gap-2 hover:-translate-y-0.5 transition-transform duration-250 shadow-lg shadow-purple-500/20"
            >
              View Open Roles <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 bg-slate-900 border border-white/[0.08] hover:bg-slate-800 text-white font-bold text-sm rounded-xl flex items-center gap-2 transition-colors duration-250"
            >
              Get in Touch <Send className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
