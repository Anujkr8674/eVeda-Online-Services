"use client";

import { useEffect, useRef, useState } from "react";
import PageHero from "@/components/common/PageHero";
import About from "@/components/sections/About";
import FounderVision from "@/components/sections/FounderVision";
import Contact from "@/components/sections/Contact";
import Image from "next/image";
import {
  CheckCircle2, Users, Award, TrendingUp, Globe,
  Target, Eye
} from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaGithub, FaInstagram, FaFacebookF, FaEnvelope } from "react-icons/fa";
import { COMPANY } from "@/lib/utils";

/* ─── Data ─────────────────────────────────────────────────────────── */

const STATIC_TEAM_MEMBERS = [
  {
    name: "Geetanjali Singh",
    role: "Founder & Visionary",
    expertise: "Creative Direction, Publishing & Digital Ecosystem Strategy",
    image: "/images/team/geetanjali.png",
    email: "geetanjalisingh@evedaonlineservices.com",
    linkedin: "https://www.linkedin.com/in/geetanjali-singh-83a53a100/",
    instagram: "https://www.instagram.com/nirved1326/?hl=en",
    facebook: "https://www.facebook.com/geetanjali.singh.92102",
    twitter: "https://x.com/EVedaSpeaks",
  },
  {
    name: "Dr. Rahul Sharma",
    role: "Managing Director",
    expertise: "Enterprise Systems & AI Strategy",
    image: "/images/team/rahul.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    name: "Satya Prakash Yadav",
    role: "Director",
    expertise: "Strategic Growth & Enterprise Partnerships",
    image: "/images/team/satya.jpg",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    name: "Priya Malhotra",
    role: "Creative Director",
    expertise: "Brand Strategy & Human-Centric UX",
    image: "/images/team/priya.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    name: "Vikram Singhania",
    role: "Director of Operations",
    expertise: "Global Delivery & Agile Scale",
    image: "/images/team/vikram.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    name: "Sneha Reddy",
    role: "Director of Client Success",
    expertise: "Client Partnerships & Product Growth",
    image: "/images/team/sneha.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    name: "Aryan Kapoor",
    role: "Director of Engineering",
    expertise: "Cloud Infrastructure & Hyper-Scale Systems",
    image: "/images/team/aryan.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    name: "Ananya Roy",
    role: "Director of Product",
    expertise: "SaaS Roadmap & AI-First Frameworks",
    image: "/images/team/ananya.png",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  {
    name: "Harsh Kumar",
    role: "IT Administrator",
    expertise: "Enterprise Infrastructure & Security Operations",
    image: "/images/team/harsh.jpg",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    name: "Shovam Kumar",
    role: "Senior Full Stack Developer",
    expertise: "Full Stack Architecture & Scalable Cloud Apps",
    image: "/images/team/shovam_v2.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    name: "Badal Kumar Singh",
    role: "Senior Full Stack Developer",
    expertise: "Full Stack Development & Scalable Backend Solutions",
    image: "/images/team/badal.jpg",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    name: "Kunal Bose",
    role: "Senior Full Stack Developer",
    expertise: "Full Stack Engineering & Modern Web Architectures",
    image: "/images/team/kunal.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    name: "Anuj Kumar",
    role: "Full Stack Developer",
    expertise: "Full Stack Web & Database Engineering",
    image: "/images/team/anuj.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    name: "Ravi Kumar",
    role: "Senior Performance Marketing",
    expertise: "Performance Marketing & Digital Growth Strategy",
    image: "/images/team/ravi.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    name: "Saovik Biswas",
    role: "Senior App Developer",
    expertise: "Mobile Application Design & Cross-Platform Systems",
    image: "/images/team/saovik.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    name: "Vikash Mahto",
    role: "Senior SEO Executive & Developer",
    expertise: "Search Engine Optimization & Frontend Web Development",
    image: "/images/team/vikash.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    name: "Roshni Kumar Singh",
    role: "Graphic Designer",
    expertise: "UI/UX & Graphic Design",
    image: "/images/team/roshni.png",
    linkedin: "",
    twitter: "",
    github: ""
  },
  {
    name: "Anurag",
    role: "Cinematographer",
    expertise: "Cinematography & Media Production",
    image: "/images/team/anurag.png",
    linkedin: "",
    twitter: "",
    github: ""
  }
];

const stats = [
  { icon: TrendingUp, value: "150+", label: "Projects Shipped", color: "#7c3aed" },
  { icon: Globe,      value: "50+",  label: "Global Clients",    color: "#06b6d4" },
  { icon: Users,      value: "25+",  label: "Tech Specialists",  color: "#22c55e" },
  { icon: Award,      value: "100%", label: "Client Uptime",     color: "#f97316" },
];

/* ─── Animated counter ─────────────────────────────────────────────── */
function useCounter(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);
  return { count, start };
}

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const num = parseInt(stat.value.replace(/\D/g, "")) || 0;
  const suffix = stat.value.replace(/[0-9]/g, "");
  const { count, start } = useCounter(num);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) start(); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [start]);

  return (
    <div ref={ref} className="flex items-center gap-4 p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${stat.color}12`, border: `1.5px solid ${stat.color}25` }}>
        <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
      </div>
      <div>
        <div className="text-3xl font-black tracking-tight text-slate-900 leading-none mb-1.5">{count}{suffix}</div>
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{stat.label}</div>
      </div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────────────────── */
export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>(STATIC_TEAM_MEMBERS);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          setTeamMembers(json.data);
        }
      })
      .catch((err) => console.error("Error loading team members:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc]">

       {/* CSS injection for infinite running marquee */}
      <style>{`
        @keyframes team-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-300px * ${teamMembers.length} - 1.5rem * ${teamMembers.length}));
          }
        }
        .team-marquee-track {
          display: flex;
          width: max-content;
          animation: team-marquee 35s linear infinite;
        }
        .team-marquee-wrap:hover .team-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── 1. Page Header ── */}
      <PageHero
        badge="About Us"
        title="Engineering Tomorrow's"
        titleHighlight="Digital Future"
        description={`${COMPANY.name} was founded in ${COMPANY.founded} with a singular mission: to make enterprise-grade software accessible to every ambitious business — not just the Fortune 500.`}
        breadcrumbs={[{ label: "About" }]}
      />

      {/* ── 2. About Section of Homepage ── */}
      <About isAboutPage={true} />

      {/* ── 2.5 The Vision Behind E Veda: Meet Geetanjali Singh ── */}
      <FounderVision variant="full" id="founder" />

      {/* ── 3. Stats Strip ── */}
      <section className="py-12 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
          </div>
        </div>
      </section>

      {/* ── 4. Our Mission Section ── */}
      <section className="py-24 bg-white border-b border-slate-200/60 relative overflow-hidden">
        <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] bg-[radial-gradient(circle,_rgba(124,58,237,0.03)_0%,_transparent_75%)] blur-[90px] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text & Pointers */}
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-[var(--accent-global)] bg-[var(--accent-global-dim)] mb-4">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-6 font-sora leading-tight">
                Democratizing <span className="text-[var(--accent-global)]">Enterprise Engineering</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                We believe that every fast-growing startup and ambitious scale-up deserves access to clean, modern, and high-performance product engineering. Our mission is to eliminate tech bottlenecks and deliver standard software architectures that perform under load.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "Senior-Led Execution", desc: "No junior engineers on your critical paths. Every line of code is reviewed by veteran tech leads." },
                  { title: "IP Security & Portability", desc: "Full code ownership and absolute security. We write clean, commented code that remains easily portable." },
                  { title: "Agile, Fast Cycles", desc: "Rapid 2-week iterations designed to ship features quickly, gather market feedback, and pivot fast." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3.5 items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7c3aed]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-0.5 font-sora">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Image Layout */}
            <div className="lg:col-span-6 relative">
              {/* Browser mockup frame */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="mx-auto w-[60%] h-4 rounded bg-white border border-slate-200 text-[8px] text-slate-400 flex items-center justify-center font-mono">
                    evedaonlineservices.com/mission
                  </div>
                </div>
                <div className="relative aspect-[16/10] bg-slate-50">
                  <Image
                    src="/images/careers/team_collab.png"
                    alt="eVeda team collaborating on code"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                </div>
              </div>
              {/* Floating decorative metric badge */}
              <div className="absolute bottom-[-16px] left-[-16px] bg-white border border-slate-200 rounded-xl p-3.5 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed]">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-0.5">SPEED TO MARKET</p>
                  <p className="text-xs font-bold text-slate-800 leading-none font-sora">30% Faster Ship Rate</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. Our Vision Section ── */}
      <section className="py-24 bg-slate-50 border-b border-slate-200/60 relative overflow-hidden">
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-[radial-gradient(circle,_rgba(6,182,212,0.03)_0%,_transparent_75%)] blur-[90px] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Image Layout */}
            <div className="lg:col-span-6 order-2 lg:order-1 relative">
              {/* Browser mockup frame */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="mx-auto w-[60%] h-4 rounded bg-white border border-slate-200 text-[8px] text-slate-400 flex items-center justify-center font-mono">
                    evedaonlineservices.com/vision
                  </div>
                </div>
                <div className="relative aspect-[16/10] bg-slate-50">
                  <Image
                    src="/images/careers/workstation.png"
                    alt="eVeda clean developer workstation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                </div>
              </div>
              {/* Floating decorative metric badge */}
              <div className="absolute bottom-[-16px] right-[-16px] bg-white border border-slate-200 rounded-xl p-3.5 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center text-[#06b6d4]">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-0.5">FORWARD THINKING</p>
                  <p className="text-xs font-bold text-slate-800 leading-none font-sora">AI-First Core Workflow</p>
                </div>
              </div>
            </div>

            {/* Right Column: Text & Pointers */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-[var(--accent-global)] bg-[var(--accent-global-dim)] mb-4">
                Our Vision
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-6 font-sora leading-tight">
                An AI-First <span className="text-[#06b6d4]">Technology Future</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                We envision a future where software operates autonomously, scaling with zero infrastructure limits. We aim to stay at the absolute cutting edge of artificial intelligence, multi-agent networks, and secure serverless systems to insulate our clients from tech obsolescence.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "Intelligent Workflows", desc: "Infusing machine learning models, custom vector spaces, and smart LLM chains into standard enterprise applications." },
                  { title: "Auto-Scalable Frameworks", desc: "Designing platforms that deploy on serverless architectures, minimizing monthly bills and maintenance overhead." },
                  { title: "Continuous Technical Evolution", desc: "Upskilling and adapting to next-generation libraries so your product stays secure, efficient, and forward-compliant." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3.5 items-start">
                    <div className="w-6 h-6 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#06b6d4]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-0.5 font-sora">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. Directors & Leaders Section (Infinite Marquee) ── */}
      <section className="py-24 bg-white border-b border-slate-200/60 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 mb-14">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-[var(--accent-global)] bg-[var(--accent-global-dim)] mb-4">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sora">
              Our Directors & <span className="text-[var(--accent-global)]">Leaders</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
              We are guided by a team of forward-thinking architects, creative designers, and delivery directors committed to long-term digital growth.
            </p>
          </div>
        </div>

        {/* Running Marquee Strip */}
        <div className="team-marquee-wrap relative w-full overflow-hidden py-4 select-none">
          {/* Edge fading masks */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="team-marquee-track gap-6">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-6">
                {teamMembers.map((member, i) => (
                  <div
                    key={`${setIdx}-${i}`}
                    className="w-[300px] shrink-0 bg-slate-50 border border-slate-200/80 rounded-3xl hover:shadow-xl hover:bg-white hover:border-[#7c3aed]/25 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Avatar Image Frame */}
                      <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="260px"
                        />
                      </div>

                      <div className="p-5 pb-0">
                        <h3 className="font-extrabold text-slate-900 text-sm mb-1 font-sora">
                          {member.name}
                        </h3>
                        <p className="text-[11px] font-bold text-[#7c3aed] uppercase tracking-wider mb-2.5">
                          {member.role}
                        </p>
                        <p className="text-xs text-slate-500 leading-normal mb-5 min-h-[36px]">
                          {member.expertise}
                        </p>
                      </div>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center justify-between p-5 pt-3.5 border-t border-slate-200/50">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        eVeda Partner
                      </span>
                      <div className="flex gap-2">
                        {member.linkedin && member.linkedin !== "#" && member.linkedin.trim() !== "" && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-purple-50 text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm" aria-label="LinkedIn">
                            <FaLinkedinIn className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.twitter && member.twitter !== "#" && member.twitter.trim() !== "" && (
                          <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-purple-50 text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm" aria-label="Twitter">
                            <FaTwitter className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.instagram && member.instagram !== "#" && member.instagram.trim() !== "" && (
                          <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-purple-50 text-[#E1306C] hover:bg-[#E1306C] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm" aria-label="Instagram">
                            <FaInstagram className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.facebook && member.facebook !== "#" && member.facebook.trim() !== "" && (
                          <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-purple-50 text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm" aria-label="Facebook">
                            <FaFacebookF className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.github && member.github !== "#" && member.github.trim() !== "" && (
                          <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-purple-50 text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm" aria-label="GitHub">
                            <FaGithub className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.email && (
                          <a href={`mailto:${member.email}`} className="w-7 h-7 rounded-full bg-purple-50 text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm" aria-label="Email">
                            <FaEnvelope className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Contact CTA ── */}
      <Contact />
    </div>
  );
}
