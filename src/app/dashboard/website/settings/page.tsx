"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Save, Mail, Phone, MapPin, MessageSquare, Map } from "lucide-react";
import PageHeader from "@/components/crm/shared/PageHeader";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

export default function WebSettingsPage() {
  const [form, setForm] = useState({
    phone: "",
    email: "",
    supportEmail: "",
    whatsapp: "",
    address: "",
    mapEmbed: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("Failed to load settings");
      const json = await res.json();
      if (json.data) {
        setForm({
          phone: json.data.phone || "",
          email: json.data.email || "",
          supportEmail: json.data.supportEmail || "",
          whatsapp: json.data.whatsapp || "",
          address: json.data.address || "",
          mapEmbed: json.data.mapEmbed || "",
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update settings");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Web Settings"
        subtitle="Manage contact details, support emails, address info, and Google Maps location dynamically"
        badge="Global Settings"
        badgeColor="#3b82f6"
      />

      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 text-sm text-red-500 bg-red-500/10 rounded-xl border border-red-500/20">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 mb-6 text-sm text-green-500 bg-green-500/10 rounded-xl border border-green-500/20">
          <CheckCircle2 className="w-4 h-4" />
          <span>Global site settings updated successfully! Changes will propagate instantly.</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-600 animate-spin" />
          <p className="text-xs text-slate-500">Loading configurations...</p>
        </div>
      ) : (
        <div className="max-w-3xl" style={SURFACE_STYLE}>
          <div className="p-6 border-b" style={{ borderColor: "var(--crm-border-faint)" }}>
            <h3 className="font-bold text-sm" style={{ color: "var(--crm-text-strong)" }}>Site Configuration Parameters</h3>
            <p className="text-xs mt-1" style={{ color: "var(--crm-text-muted)" }}>Changes made here automatically update in all call-to-actions, headers, footers, and maps across the main website.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  Primary Call Center Phone*
                </label>
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 90318 06381"
                  className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                  style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}
                />
              </div>

              {/* Whatsapp */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                  WhatsApp Direct Message Link*
                </label>
                <input
                  type="text"
                  required
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder="+919031806381"
                  className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                  style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  General Inquiries Email*
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="info@evedaonlineservices.com"
                  className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                  style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}
                />
              </div>

              {/* Support Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  Technical Support Email*
                </label>
                <input
                  type="email"
                  required
                  value={form.supportEmail}
                  onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
                  placeholder="support@evedaonlineservices.com"
                  className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                  style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                Office Physical Location Address*
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="509, RR Tower, Ratu Road, Ranchi"
                className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}
              />
            </div>

            {/* Google Map Embed */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Map className="w-3.5 h-3.5 text-orange-400" />
                Google Maps iframe Embed Source URL (src value only)
              </label>
              <textarea
                rows={3}
                value={form.mapEmbed}
                onChange={(e) => setForm({ ...form, mapEmbed: e.target.value })}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full bg-slate-500/5 border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 resize-none"
                style={{ borderColor: "var(--crm-border)", color: "var(--crm-text)" }}
              />
            </div>

            <div className="pt-4 border-t flex justify-end" style={{ borderColor: "var(--crm-border-faint)" }}>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-95 disabled:opacity-50 cursor-pointer"
                style={{ background: "linear-gradient(135deg,#3b82f6,#1d4ed8)" }}
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving configurations..." : "Save Settings"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
