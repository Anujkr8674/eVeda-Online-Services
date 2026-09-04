"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Bell, Lock, Mail, MessageSquare, Database,
  Shield, CreditCard, Save, CheckCircle, ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/crm/shared/PageHeader";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

const TABS = [
  { id: "profile",   label: "Profile",        icon: User      },
  { id: "security",  label: "Security",       icon: Lock      },
  { id: "notifs",    label: "Notifications",  icon: Bell      },
  { id: "email",     label: "Email",          icon: Mail      },
  { id: "whatsapp",  label: "WhatsApp",       icon: MessageSquare },
  { id: "database",  label: "Database",       icon: Database  },
  { id: "billing",   label: "Billing",        icon: CreditCard },
  { id: "advanced",  label: "Advanced",       icon: Shield    },
];

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full px-3 py-2 rounded-lg text-[13px] outline-none transition-all"
      style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--crm-primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,91,214,0.10)"; }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--crm-border)";  e.currentTarget.style.boxShadow = "none"; }}
      {...props}
    />
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)}
      className="relative w-9 h-5 rounded-full transition-colors"
      style={{ background: checked ? "var(--crm-primary)" : "var(--crm-border-strong)" }}>
      <motion.div
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
        animate={{ left: checked ? "calc(100% - 18px)" : "2px" }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [notifs, setNotifs] = useState({
    emailLead: true, emailQuote: true, emailTicket: false,
    pushLead:  true, pushQuote:  false, pushTicket:  true,
    digest:    true,
  });

  const save = () => toast.success("Settings saved successfully");

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your account, integrations, and CRM preferences" />

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <div className="rounded-xl p-2 h-fit lg:sticky lg:top-20" style={SURFACE_STYLE}>
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors mb-0.5"
                style={active
                  ? { background: "rgba(91,91,214,0.08)", color: "var(--crm-primary)" }
                  : { color: "var(--crm-text-muted)" }
                }
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--crm-surface-hover)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                <div className="flex items-center gap-2.5">
                  <t.icon className="w-4 h-4" strokeWidth={active ? 2.2 : 1.8} />
                  {t.label}
                </div>
                {active && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>

        <div>
          {tab === "profile" && (
            <motion.div className="rounded-xl p-6 space-y-5" style={SURFACE_STYLE} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h2 className="text-[16px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Profile Information</h2>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>Update your personal details and contact information.</p>
              </div>

              <div className="flex items-center gap-4 pb-5 border-b" style={{ borderColor: "var(--crm-border-faint)" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-[20px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}>A</div>
                <div>
                  <button className="px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors"
                    style={{ background: "var(--crm-surface)", color: "var(--crm-text)", border: "1px solid var(--crm-border)" }}>
                    Change photo
                  </button>
                  <p className="text-[11px] mt-1" style={{ color: "var(--crm-text-subtle)" }}>JPG, PNG or GIF · max 2MB</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Full name</label>
                  <Input defaultValue="Admin User" />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Email</label>
                  <Input type="email" defaultValue="admin@evedaonlineservices.com" disabled />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Phone</label>
                  <Input defaultValue="+91 9000000002" />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Department</label>
                  <Input defaultValue="Sales" />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end" style={{ borderColor: "var(--crm-border-faint)" }}>
                <button onClick={save} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}>
                  <Save className="w-3.5 h-3.5" /> Save changes
                </button>
              </div>
            </motion.div>
          )}

          {tab === "security" && (
            <motion.div className="rounded-xl p-6 space-y-5" style={SURFACE_STYLE} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h2 className="text-[16px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Security</h2>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>Manage password, 2FA, and active sessions.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Current password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>New password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Confirm password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 flex items-center justify-between"
                style={{ background: "var(--crm-surface-muted)", border: "1px solid var(--crm-border-faint)" }}>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Two-factor authentication</p>
                  <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>Add an extra layer of security to your account</p>
                </div>
                <Toggle checked={false} onChange={() => toast("2FA setup coming soon")} />
              </div>

              <div className="pt-3 border-t flex justify-end" style={{ borderColor: "var(--crm-border-faint)" }}>
                <button onClick={save} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}>
                  <Save className="w-3.5 h-3.5" /> Update password
                </button>
              </div>
            </motion.div>
          )}

          {tab === "notifs" && (
            <motion.div className="rounded-xl p-6 space-y-5" style={SURFACE_STYLE} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h2 className="text-[16px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Notifications</h2>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>Choose what you want to be notified about.</p>
              </div>

              {[
                { key: "emailLead" as const,  label: "Email · New lead assigned",        desc: "Receive an email when a new lead is assigned to you" },
                { key: "emailQuote" as const, label: "Email · Quotation updates",        desc: "Be notified when quotations are approved or sent" },
                { key: "emailTicket" as const,label: "Email · Support tickets",          desc: "Receive emails for ticket assignments and replies" },
                { key: "pushLead" as const,   label: "Push · Lead activity",             desc: "Real-time push notifications for lead events" },
                { key: "pushQuote" as const,  label: "Push · Quotation activity",        desc: "Push alerts for quotation status changes" },
                { key: "pushTicket" as const, label: "Push · Ticket activity",           desc: "Push alerts for ticket activity" },
                { key: "digest" as const,     label: "Weekly digest",                    desc: "Get a summary of your CRM activity every Monday" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4 py-3 border-b" style={{ borderColor: "var(--crm-border-faint)" }}>
                  <div>
                    <p className="text-[13px] font-medium" style={{ color: "var(--crm-text-strong)" }}>{item.label}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>{item.desc}</p>
                  </div>
                  <Toggle checked={notifs[item.key]} onChange={(v) => setNotifs({ ...notifs, [item.key]: v })} />
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <button onClick={save} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}>
                  <Save className="w-3.5 h-3.5" /> Save preferences
                </button>
              </div>
            </motion.div>
          )}

          {tab === "email" && (
            <motion.div className="rounded-xl p-6 space-y-5" style={SURFACE_STYLE} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h2 className="text-[16px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Email Configuration</h2>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>SMTP settings for outgoing email and notifications.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>SMTP Host</label>
                  <Input defaultValue="smtp.gmail.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>SMTP Port</label>
                  <Input defaultValue="587" />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Username</label>
                  <Input defaultValue="info@evedaonlineservices.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Password</label>
                  <Input type="password" placeholder="App password" />
                </div>
              </div>

              <div className="rounded-lg p-3 flex items-center gap-2" style={{ background: "rgba(22,163,74,0.06)", border: "1px solid rgba(22,163,74,0.2)" }}>
                <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "var(--crm-success)" }} />
                <span className="text-[12px]" style={{ color: "var(--crm-success)" }}>Email service is connected and working</span>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2" style={{ borderColor: "var(--crm-border-faint)" }}>
                <button className="px-3 py-2 rounded-lg text-[13px] font-medium transition-colors"
                  style={{ background: "var(--crm-surface)", color: "var(--crm-text)", border: "1px solid var(--crm-border)" }}>
                  Send test email
                </button>
                <button onClick={save} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}>
                  <Save className="w-3.5 h-3.5" /> Save settings
                </button>
              </div>
            </motion.div>
          )}

          {tab === "whatsapp" && (
            <motion.div className="rounded-xl p-6 space-y-5" style={SURFACE_STYLE} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h2 className="text-[16px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>WhatsApp Business API</h2>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>Configure WhatsApp integration for automated client messages.</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>WhatsApp Token</label>
                  <Input type="password" placeholder="EAAxxxxxxxxxxxxxxxx" />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Phone Number ID</label>
                  <Input placeholder="123456789012345" />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Business Account ID</label>
                  <Input placeholder="987654321098765" />
                </div>
              </div>

              <div className="rounded-lg p-3 flex items-center gap-2" style={{ background: "rgba(217,119,6,0.06)", border: "1px solid rgba(217,119,6,0.2)" }}>
                <Bell className="w-4 h-4 shrink-0" style={{ color: "var(--crm-warning)" }} />
                <span className="text-[12px]" style={{ color: "var(--crm-warning)" }}>WhatsApp credentials not configured yet — add them to enable messaging</span>
              </div>

              <div className="pt-3 border-t flex justify-end" style={{ borderColor: "var(--crm-border-faint)" }}>
                <button onClick={save} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}>
                  <Save className="w-3.5 h-3.5" /> Save credentials
                </button>
              </div>
            </motion.div>
          )}

          {tab === "database" && (
            <motion.div className="rounded-xl p-6 space-y-5" style={SURFACE_STYLE} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h2 className="text-[16px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Database (Supabase)</h2>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>Manage your Supabase connection and run database operations.</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Supabase URL</label>
                  <Input placeholder="https://your-project.supabase.co" />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Service Role Key</label>
                  <Input type="password" placeholder="eyJxxxxxx…" />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <button className="p-3 rounded-lg text-[12px] font-medium transition-colors"
                  style={{ background: "var(--crm-surface)", color: "var(--crm-text)", border: "1px solid var(--crm-border)" }}>
                  Test connection
                </button>
                <button className="p-3 rounded-lg text-[12px] font-medium transition-colors"
                  style={{ background: "var(--crm-surface)", color: "var(--crm-text)", border: "1px solid var(--crm-border)" }}>
                  Backup database
                </button>
                <button className="p-3 rounded-lg text-[12px] font-medium transition-colors"
                  style={{ background: "var(--crm-surface)", color: "var(--crm-text)", border: "1px solid var(--crm-border)" }}>
                  Run migrations
                </button>
              </div>

              <div className="rounded-lg p-3 flex items-center gap-2" style={{ background: "rgba(91,91,214,0.06)", border: "1px solid rgba(91,91,214,0.2)" }}>
                <Database className="w-4 h-4 shrink-0" style={{ color: "var(--crm-primary)" }} />
                <span className="text-[12px]" style={{ color: "var(--crm-primary)" }}>Tip — the SQL schema is in <code className="font-mono">supabase/schema.sql</code> at project root</span>
              </div>
            </motion.div>
          )}

          {tab === "billing" && (
            <motion.div className="rounded-xl p-6" style={SURFACE_STYLE} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-[16px] font-semibold mb-1" style={{ color: "var(--crm-text-strong)" }}>Billing & Plans</h2>
              <p className="text-[12px] mb-5" style={{ color: "var(--crm-text-muted)" }}>Manage your subscription and billing details.</p>

              <div className="rounded-xl p-5 mb-5"
                style={{ background: "linear-gradient(135deg,rgba(91,91,214,0.06),rgba(124,58,237,0.06))", border: "1px solid rgba(91,91,214,0.20)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "var(--crm-primary)" }}>Current plan</p>
                    <p className="text-[20px] font-semibold mt-1" style={{ color: "var(--crm-text-strong)" }}>Enterprise</p>
                    <p className="text-[12px] mt-1" style={{ color: "var(--crm-text-muted)" }}>Unlimited users · all integrations · priority support</p>
                  </div>
                  <button className="px-3.5 py-2 rounded-lg text-[12px] font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}>
                    Manage plan
                  </button>
                </div>
              </div>

              <p className="text-[12px]" style={{ color: "var(--crm-text-muted)" }}>Next billing date: <strong style={{ color: "var(--crm-text)" }}>July 1, 2026</strong></p>
            </motion.div>
          )}

          {tab === "advanced" && (
            <motion.div className="rounded-xl p-6 space-y-4" style={SURFACE_STYLE} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h2 className="text-[16px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Advanced</h2>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>Power-user settings. Be careful here.</p>
              </div>

              <div className="rounded-lg p-4 flex items-center justify-between" style={{ background: "var(--crm-surface-muted)", border: "1px solid var(--crm-border-faint)" }}>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Export all data</p>
                  <p className="text-[12px]" style={{ color: "var(--crm-text-muted)" }}>Download a complete export of leads, quotations, tickets</p>
                </div>
                <button className="px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors"
                  style={{ background: "var(--crm-surface)", color: "var(--crm-text)", border: "1px solid var(--crm-border)" }}>
                  Export
                </button>
              </div>

              <div className="rounded-lg p-4 flex items-center justify-between"
                style={{ background: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.2)" }}>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: "var(--crm-danger)" }}>Delete account</p>
                  <p className="text-[12px]" style={{ color: "var(--crm-text-muted)" }}>Permanently delete this CRM workspace. This cannot be undone.</p>
                </div>
                <button className="px-3 py-1.5 rounded-md text-[12px] font-semibold text-white"
                  style={{ background: "var(--crm-danger)" }}>
                  Delete
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
