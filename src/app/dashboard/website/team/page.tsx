"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, AlertCircle, User, Sparkles } from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import PageHeader from "@/components/crm/shared/PageHeader";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string;
  image: string;
  linkedin: string;
  twitter: string;
  github: string;
  sortOrder: number;
}

export default function TeamCMSPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    role: "",
    expertise: "",
    image: "",
    linkedin: "",
    twitter: "",
    github: "",
    sortOrder: 0,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/team");
      if (!res.ok) throw new Error("Failed to fetch team members");
      const json = await res.json();
      setTeam(json.data ?? []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedMember(null);
    setForm({
      name: "",
      role: "",
      expertise: "",
      image: "",
      linkedin: "",
      twitter: "",
      github: "",
      sortOrder: team.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m: TeamMember) => {
    setSelectedMember(m);
    setForm({
      name: m.name,
      role: m.role,
      expertise: m.expertise,
      image: m.image,
      linkedin: m.linkedin,
      twitter: m.twitter,
      github: m.github,
      sortOrder: m.sortOrder,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete team member");
      setTeam(prev => prev.filter(m => m.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name,
      role: form.role,
      expertise: form.expertise,
      image: form.image || "/images/team/rahul.png",
      linkedin: form.linkedin,
      twitter: form.twitter,
      github: form.github,
      sortOrder: Number(form.sortOrder),
    };

    try {
      if (selectedMember) {
        // PATCH
        const res = await fetch(`/api/team/${selectedMember.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update team member");
      } else {
        // POST
        const res = await fetch("/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create team member");
      }
      setIsModalOpen(false);
      fetchTeam();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Team CMS"
        subtitle="Manage eVeda directors, tech leads, and dynamic team cards on the frontend website"
        badge="CMS Team"
        badgeColor="#10b981"
        actions={
          <button 
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all cursor-pointer"
            style={{ background: "linear-gradient(135deg,#10b981,#059669)", boxShadow: "0 1px 2px 0 rgba(16,185,129,0.25)" }}>
            <Plus className="w-4 h-4" /> Add Team Member
          </button>
        }
      />

      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 text-sm text-red-500 bg-red-500/10 rounded-xl border border-red-500/20">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-green-500/30 border-t-green-600 animate-spin" />
          <p className="text-xs text-slate-500">Loading team members...</p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <motion.div 
                key={member.id} 
                className="rounded-xl overflow-hidden flex flex-col justify-between" 
                style={SURFACE_STYLE}
                whileHover={{ y: -1 }}
              >
                <div>
                  <div className="flex items-center gap-3.5 p-5 border-b" style={{ borderColor: "var(--crm-border-faint)" }}>
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-900 border">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <User className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm" style={{ color: "var(--crm-text-strong)" }}>{member.name}</h3>
                      <p className="text-xs text-green-600 font-semibold">{member.role}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Expertise & Focus:</p>
                      <p className="text-xs leading-normal" style={{ color: "var(--crm-text-muted)" }}>{member.expertise}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mr-1">Socials:</span>
                      {member.linkedin && member.linkedin !== "#" && (
                        <FaLinkedinIn className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      {member.twitter && member.twitter !== "#" && (
                        <FaTwitter className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      {member.github && member.github !== "#" && (
                        <FaGithub className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span className="text-[9px] font-extrabold text-slate-500 uppercase ml-auto">Order: {member.sortOrder}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t flex justify-end gap-2" style={{ borderColor: "var(--crm-border-faint)" }}>
                  <button 
                    onClick={() => handleOpenEdit(member)}
                    className="p-1.5 rounded hover:bg-slate-500/10 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(member.id)}
                    className="p-1.5 rounded hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)} />
            
            <motion.div 
              className="relative w-full max-w-xl rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col"
              style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)" }}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center justify-between pb-3 border-b mb-4" style={{ borderColor: "var(--crm-border-faint)" }}>
                <h3 className="text-base font-bold flex items-center gap-1.5" style={{ color: "var(--crm-text-strong)" }}>
                  <Sparkles className="w-4 h-4 text-green-400" />
                  {selectedMember ? "Edit Director Profile" : "Register Team Member"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-500/10 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Full Name*</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="e.g. Vikram Singhania" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Designation / Role*</label>
                    <input type="text" required value={form.role} onChange={e => setForm({...form, role: e.target.value})}
                      placeholder="e.g. Director of Engineering" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Avatar Image Path (public directory)</label>
                    <input type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                      placeholder="e.g. /images/team/rahul.png" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Sort Order (number)</label>
                    <input type="number" value={form.sortOrder} onChange={e => setForm({...form, sortOrder: Number(e.target.value)})}
                      className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Expertise & Focus Highlights*</label>
                  <input type="text" required value={form.expertise} onChange={e => setForm({...form, expertise: e.target.value})}
                    placeholder="e.g. Cloud Architecture & Web3 Integrations" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">LinkedIn Profile</label>
                    <input type="text" value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})}
                      placeholder="https://linkedin.com/..." className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Twitter URL</label>
                    <input type="text" value={form.twitter} onChange={e => setForm({...form, twitter: e.target.value})}
                      placeholder="https://twitter.com/..." className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">GitHub URL</label>
                    <input type="text" value={form.github} onChange={e => setForm({...form, github: e.target.value})}
                      placeholder="https://github.com/..." className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                </div>

                <div className="pt-4 border-t flex justify-end gap-3" style={{ borderColor: "var(--crm-border-faint)" }}>
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg border text-xs font-semibold hover:bg-slate-500/10 transition-colors"
                    style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}>
                    {saving ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
