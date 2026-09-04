"use client";

import { useState } from "react";
import { ArrowRight, MapPin, Clock, Briefcase, TrendingUp, Zap, Star, Heart, Users, X, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Job {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
}

const jobs: Job[] = [
  { title: "Senior Full-Stack Engineer",   department: "Engineering",     location: "Remote / India", type: "Full-time", experience: "4+ years" },
  { title: "AI/ML Engineer",               department: "AI Research",     location: "Remote / India", type: "Full-time", experience: "3+ years" },
  { title: "DevOps Engineer",              department: "Infrastructure",   location: "Remote",         type: "Full-time", experience: "3+ years" },
  { title: "Senior UI/UX Designer",        department: "Design",          location: "Remote / India", type: "Full-time", experience: "4+ years" },
];

const perks = [
  { icon: TrendingUp, title: "Competitive Salary",  desc: "Top-of-market packages with equity options" },
  { icon: Zap,        title: "Remote-First",         desc: "Work from anywhere in the world" },
  { icon: Star,       title: "Learning Budget",      desc: "$2,000/year for courses and conferences" },
  { icon: Heart,      title: "Health Benefits",      desc: "Full health, dental, and vision coverage" },
  { icon: Users,      title: "Great Team",           desc: "Work with world-class engineers and designers" },
  { icon: Briefcase,  title: "Impactful Work",       desc: "Build products used by millions worldwide" },
];

export default function Careers({ hideViewAll = false }: { hideViewAll?: boolean }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", resume: "", coverLetter: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    setTimeout(() => {
      if (!form.name || !form.email || !form.phone || !form.resume) {
        setError("Please fill out all required fields.");
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", resume: "", coverLetter: "" });
    }, 1200);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setSuccess(false);
    setError("");
  };

  return (
    <section className="py-24 border-t relative overflow-hidden text-slate-650 bg-gradient-to-b from-[#fafbfc] to-slate-50 border-slate-200/50" id="careers">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.015)_1px,transparent_1px)] [background-size:24px_24px] opacity-80 pointer-events-none z-0" />
      <div className="absolute top-1/4 left-[-10%] w-[40%] h-[40%] bg-[radial-gradient(circle,_rgba(124,58,237,0.02)_0%,_transparent_70%)] blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="text-center mb-16">
          <span className="inline-block text-[10.5px] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full border border-purple-200/50 text-purple-600 bg-purple-50"
          >
            Careers
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-sora">Build the Future With Us</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Join a team of ambitious engineers, designers, and builders working on high-impact projects for global clients.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Block: Open Positions */}
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-6 font-sora">
              Open Positions
            </p>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.title}
                  onClick={() => setSelectedJob(job)}
                  className="p-5 rounded-2xl cursor-pointer bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 hover:border-slate-300 transition-all duration-300 flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded border border-purple-200/50 text-purple-600 bg-purple-50"
                      >
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Hiring
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-3 font-sora">{job.title}</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />{job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />{job.type}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />{job.experience}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-1">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>

            {!hideViewAll && (
              <div className="mt-8">
                <Link href="/careers" className="ng-btn-primary">
                  View All Openings <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Right Block: Perks */}
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-6 font-sora">
              Why Work With Us
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {perks.map((perk) => (
                <div key={perk.title} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-md transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-purple-500/5 border border-purple-500/10 mb-4 shrink-0">
                    <perk.icon className="w-4.5 h-4.5 text-[var(--accent-primary)]" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 font-sora">{perk.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-500">{perk.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-semibold text-slate-600">Glassdoor Rating: 4.9 / 5</span>
              </div>
              <p className="text-xs text-slate-550 italic leading-relaxed">
                &ldquo;The most collaborative and technically challenging place I&apos;ve ever worked. Real ownership, real impact.&rdquo;
              </p>
              <div className="text-[10px] text-slate-450 mt-3 font-semibold">— Senior Engineer, 3 years at eVeda</div>
            </div>
          </div>

        </div>

        {/* ── Life & Culture Showcase ── */}
        <div className="mt-24 pt-16 border-t border-slate-200/60">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block text-[10.5px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-purple-200/50 text-purple-600 bg-purple-50"
              >
                Life at eVeda
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight font-sora">
                Where Builders Do Their Best Work
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                We are building a culture of high performance, creative freedom, and absolute engineering integrity. 
                We believe in hiring great people and getting out of their way. We don't track hours, we track impact.
              </p>
              <div className="space-y-3">
                {[
                  "Work on global products serving millions of users.",
                  "Continuous learning with paid courses & books budget.",
                  "Autonomous execution with direct access to leaders.",
                  "Flexible remote-first culture with high accountability."
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Images (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl aspect-[4/3] group/c1 bg-slate-100">
                <img 
                  src="/images/careers/team_collab.png" 
                  alt="eVeda Developers Collaboration" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/c1:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/c1:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-[10px] font-bold uppercase tracking-wider font-sora">Collaborative Sprint</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl aspect-[4/3] group/c2 bg-slate-100">
                <img 
                  src="/images/careers/workstation.png" 
                  alt="Developer Workstation" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/c2:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/c2:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-[10px] font-bold uppercase tracking-wider font-sora">Deep Focus Workstation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Popup */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl z-10 text-slate-800 backdrop-blur-xl">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="text-[9px] font-bold uppercase tracking-wider text-purple-600">
                Careers • {selectedJob.department}
              </span>
              <h3 className="text-slate-900 font-extrabold text-lg mt-1 font-sora">
                Apply for {selectedJob.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 flex flex-wrap gap-x-3 gap-y-1 font-medium">
                <span>{selectedJob.location}</span>
                <span>•</span>
                <span>{selectedJob.type}</span>
                <span>•</span>
                <span>{selectedJob.experience} exp</span>
              </p>
            </div>

            {success ? (
              <div className="text-center py-8 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-slate-900 font-bold text-lg mb-1 font-sora">Application Submitted!</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                  Thank you for applying to Eveda Online Services. We review applications within 48 hours and will email you with the next steps if your profile fits.
                </p>
                <button 
                  onClick={closeModal}
                  className="mt-6 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe" 
                      className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-purple-500 focus:bg-white focus:ring-1 focus:ring-purple-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@company.com" 
                      className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-purple-500 focus:bg-white focus:ring-1 focus:ring-purple-500/20"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210" 
                      className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-purple-500 focus:bg-white focus:ring-1 focus:ring-purple-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Resume / Portfolio Link *</label>
                    <input 
                      type="url" 
                      required 
                      value={form.resume}
                      onChange={(e) => setForm({ ...form, resume: e.target.value })}
                      placeholder="https://drive.google.com/..." 
                      className="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-purple-500 focus:bg-white focus:ring-1 focus:ring-purple-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Cover Letter</label>
                  <textarea 
                    rows={3} 
                    value={form.coverLetter}
                    onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                    placeholder="Tell us why you are interested in this position..." 
                    className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none resize-none focus:border-purple-500 focus:bg-white focus:ring-1 focus:ring-purple-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-11 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 rounded-lg transition-all cursor-pointer"
                >
                  {submitting ? "Submitting Application..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
