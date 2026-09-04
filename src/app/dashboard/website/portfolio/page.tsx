"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, AlertCircle, Folder, Link, Award, Sparkles } from "lucide-react";
import PageHeader from "@/components/crm/shared/PageHeader";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

interface PortfolioProject {
  id: string;
  projectId: string;
  title: string;
  tags: string[];
  category: string;
  image: string;
  description: string;
  outcomes: string[];
  accent: string;
}

export default function PortfolioCMSPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Form State
  const [form, setForm] = useState({
    projectId: "",
    title: "",
    category: "Fintech",
    image: "",
    description: "",
    accent: "#5b5bd6",
    tagsInput: "",
    outcomesInput: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      if (!res.ok) throw new Error("Failed to fetch portfolio projects");
      const json = await res.json();
      setProjects(json.data ?? []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedProject(null);
    setForm({
      projectId: String(projects.length + 1),
      title: "",
      category: "Fintech",
      image: "",
      description: "",
      accent: "#5b5bd6",
      tagsInput: "",
      outcomesInput: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: PortfolioProject) => {
    setSelectedProject(p);
    setForm({
      projectId: p.projectId,
      title: p.title,
      category: p.category,
      image: p.image,
      description: p.description,
      accent: p.accent,
      tagsInput: p.tags.join(", "),
      outcomesInput: p.outcomes.join(", "),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio project?")) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      projectId: form.projectId,
      title: form.title,
      category: form.category,
      image: form.image || "/images/portfolio/1.jpg",
      description: form.description,
      accent: form.accent,
      tags: form.tagsInput.split(",").map(t => t.trim()).filter(Boolean),
      outcomes: form.outcomesInput.split(",").map(o => o.trim()).filter(Boolean),
    };

    try {
      if (selectedProject) {
        // PATCH
        const res = await fetch(`/api/portfolio/${selectedProject.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update project");
      } else {
        // POST
        const res = await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create project");
      }
      setIsModalOpen(false);
      fetchPortfolio();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Portfolio CMS"
        subtitle="Manage filterable showcase items & metrics displayed in the website portfolio grid"
        badge="CMS Projects"
        badgeColor="#5b5bd6"
        actions={
          <button 
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all cursor-pointer"
            style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)", boxShadow: "0 1px 2px 0 rgba(91,91,214,0.25)" }}>
            <Plus className="w-4 h-4" /> Add Showcase Project
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
          <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 border-t-purple-600 animate-spin" />
          <p className="text-xs text-slate-500">Loading showcase items...</p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div 
                key={project.id} 
                className="rounded-xl overflow-hidden flex flex-col justify-between" 
                style={SURFACE_STYLE}
                whileHover={{ y: -1 }}
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden border-b" style={{ borderColor: "var(--crm-border)" }}>
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <Folder className="w-10 h-10" />
                      </div>
                    )}
                    
                    <span 
                      className="absolute top-3 left-3 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md"
                      style={{ background: project.accent, color: "#fff" }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-extrabold text-sm mb-1.5 leading-snug line-clamp-1" style={{ color: "var(--crm-text-strong)" }}>
                      {project.title}
                    </h3>
                    <p className="text-xs line-clamp-2 leading-relaxed mb-4" style={{ color: "var(--crm-text-muted)" }}>
                      {project.description}
                    </p>

                    <div className="space-y-1.5 mb-2">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Metrics Highlights:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.outcomes?.map((outcome, idx) => (
                          <span key={idx} className="text-[9px] px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-600">
                            {outcome}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t flex justify-end gap-2" style={{ borderColor: "var(--crm-border-faint)" }}>
                  <button 
                    onClick={() => handleOpenEdit(project)}
                    className="p-1.5 rounded hover:bg-slate-500/10 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
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
              className="relative w-full max-w-2xl rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col"
              style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)" }}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center justify-between pb-3 border-b mb-4" style={{ borderColor: "var(--crm-border-faint)" }}>
                <h3 className="text-base font-bold flex items-center gap-1.5" style={{ color: "var(--crm-text-strong)" }}>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  {selectedProject ? "Edit Showcase Item" : "Create Showcase Item"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-500/10 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Project Title*</label>
                    <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                      placeholder="e.g. Decentralized Finance Payment System" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Internal Reference ID*</label>
                    <input type="text" required value={form.projectId} onChange={e => setForm({...form, projectId: e.target.value})}
                      placeholder="e.g. 1" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Showcase Category*</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                      className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}>
                      <option value="Fintech">Fintech</option>
                      <option value="AI & ML">AI & ML</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="SaaS">SaaS</option>
                      <option value="DevOps">DevOps</option>
                      <option value="E-Commerce">E-Commerce</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Color Theme (Accent)</label>
                    <input type="color" value={form.accent} onChange={e => setForm({...form, accent: e.target.value})}
                      className="w-full h-9 bg-transparent border rounded-lg px-1.5 py-0.5 outline-none cursor-pointer" style={{ borderColor: "var(--crm-border)" }} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Cover Image Path</label>
                    <input type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                      placeholder="/images/portfolio/1.jpg" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Service Tags (comma separated)</label>
                  <input type="text" value={form.tagsInput} onChange={e => setForm({...form, tagsInput: e.target.value})}
                    placeholder="e.g. Web3, Blockchain, API Dev" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Project Deliverable Outcomes (comma separated metrics)</label>
                  <input type="text" value={form.outcomesInput} onChange={e => setForm({...form, outcomesInput: e.target.value})}
                    placeholder="e.g. $10M+ daily volume, Under 2s latency sync, 40% fuel savings" className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Detailed Description*</label>
                  <textarea required rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    placeholder="Outline the case study summary and what eVeda engineered..." className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500 resize-none font-medium" style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }} />
                </div>

                <div className="pt-4 border-t flex justify-end gap-3" style={{ borderColor: "var(--crm-border-faint)" }}>
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg border text-xs font-semibold hover:bg-slate-500/10 transition-colors"
                    style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}>
                    {saving ? "Saving..." : "Save Project"}
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
