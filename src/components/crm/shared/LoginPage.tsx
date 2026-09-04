"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Eye, EyeOff, Mail, Lock, Zap, AlertCircle,
  ArrowRight, Shield, Users, Crown, CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import type { UserRole } from "@/types/crm";

interface LoginPageProps {
  role: UserRole;
  title: string;
  subtitle: string;
  defaultEmail?: string;
  accentColor?: string;
  icon?: "crown" | "shield" | "users";
}

const ROLE_ICONS = { crown: Crown, shield: Shield, users: Users };

const FEATURES = [
  "Real-time lead tracking & analytics",
  "Automated quotation & PDF generation",
  "WhatsApp + email integrations",
  "Role-based access for your whole team",
];

export default function LoginPage({
  role, title, subtitle, defaultEmail = "",
  accentColor = "#5b5bd6", icon = "shield",
}: LoginPageProps) {
  const [email,    setEmail]    = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const router = useRouter();
  const Icon = ROLE_ICONS[icon];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Invalid credentials");
        return;
      }

      const userRole: UserRole = data.user.role;
      const allowed: UserRole[] = role === "telecaller" ? ["telecaller"]
        : role === "admin" ? ["admin", "developer", "designer", "cloud_engineer", "seo_expert", "marketer", "marketing"]
        : ["superadmin"];

      if (!allowed.includes(userRole)) {
        setError("You don't have access to this portal");
        await fetch("/api/auth/logout", { method: "POST" });
        return;
      }

      toast.success(`Welcome back, ${data.user.name}!`);
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--crm-bg)", color: "var(--crm-text)" }}
    >
      {/* Left: marketing / feature panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[44%] p-12 relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${accentColor} 0%, #4338ca 60%, #6d28d9 100%)`,
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute -bottom-32 -right-16 w-104 h-104 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)", filter: "blur(80px)" }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top: logo */}
        <div className="relative flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-white leading-tight">Eveda Online Services</p>
            <p className="text-[11px] text-white/70">Premium CRM System</p>
          </div>
        </div>

        {/* Middle: pitch */}
        <div className="relative">
          <motion.h2
            className="text-[34px] font-semibold text-white leading-[1.15] tracking-tight max-w-md"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            Build your sales engine.<br />
            Close deals faster.
          </motion.h2>
          <motion.p
            className="text-[14px] text-white/75 mt-3 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            A modern command center for leads, quotations, projects and team performance — purpose-built for IT teams.
          </motion.p>

          <ul className="mt-7 space-y-2.5">
            {FEATURES.map((f, i) => (
              <motion.li
                key={f}
                className="flex items-center gap-2.5 text-[13px] text-white/85"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "rgba(255,255,255,0.95)" }} />
                {f}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Bottom: testimonial */}
        <div className="relative">
          <div
            className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)" }}
          >
            <p className="text-[13px] text-white/90 leading-relaxed">
              &ldquo;We replaced three tools with eVeda CRM. Our lead conversion improved by 38% in the first quarter.&rdquo;
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-7 h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-[11px] font-semibold text-white">
                R
              </div>
              <div>
                <p className="text-[12px] font-medium text-white">Rohan Khanna</p>
                <p className="text-[10px] text-white/65">Head of Sales · Velocity Labs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg,${accentColor},#7c3aed)` }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <p className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>
              eVeda CRM
            </p>
          </div>

          {/* Role badge */}
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium mb-5"
            style={{ background: `${accentColor}10`, color: accentColor, border: `1px solid ${accentColor}22` }}
          >
            <Icon className="w-3 h-3" />
            {title}
          </div>

          <h1 className="text-[28px] font-semibold tracking-tight" style={{ color: "var(--crm-text-strong)" }}>
            Sign in to your account
          </h1>
          <p className="text-[13px] mt-1.5" style={{ color: "var(--crm-text-muted)" }}>{subtitle}</p>

          {error && (
            <motion.div
              className="flex items-center gap-2 mt-5 px-3 py-2.5 rounded-lg text-[13px]"
              style={{
                background: "rgba(220,38,38,0.06)",
                border: "1px solid rgba(220,38,38,0.20)",
                color: "var(--crm-danger)",
              }}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--crm-text-faint)" }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg text-[14px] outline-none transition-all"
                  style={{
                    background: "var(--crm-surface)",
                    border: "1px solid var(--crm-border)",
                    color: "var(--crm-text)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${accentColor}1f`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--crm-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-medium" style={{ color: "var(--crm-text)" }}>Password</label>
                <button type="button" className="text-[11px] font-medium" style={{ color: accentColor }}>
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--crm-text-faint)" }} />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg text-[14px] outline-none transition-all"
                  style={{
                    background: "var(--crm-surface)",
                    border: "1px solid var(--crm-border)",
                    color: "var(--crm-text)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${accentColor}1f`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--crm-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--crm-text-subtle)" }}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[14px] font-semibold text-white mt-2 transition-all"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, #6d28d9 100%)`,
                boxShadow: `0 1px 2px 0 ${accentColor}40, 0 0 0 1px ${accentColor}30`,
              }}
              whileHover={{ scale: loading ? 1 : 1.005 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>Sign in <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </form>

          {/* Demo credentials note */}
          <div
            className="mt-6 p-3 rounded-lg text-[12px]"
            style={{
              background: "var(--crm-surface-muted)",
              border: "1px solid var(--crm-border-faint)",
              color: "var(--crm-text-muted)",
            }}
          >
            <span className="font-medium" style={{ color: "var(--crm-text)" }}>Demo mode</span>
            <span> — credentials are pre-configured in </span>
            <code className="px-1 py-0.5 rounded text-[11px] font-mono" style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border-faint)" }}>
              .env
            </code>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-8">
            <Link href="/" className="text-[12px]" style={{ color: "var(--crm-text-subtle)" }}>
              ← Back to website
            </Link>
            <div className="flex items-center gap-3 text-[11px]" style={{ color: "var(--crm-text-faint)" }}>
              <Link href="/admin" className="hover:underline">Admin</Link>
              <Link href="/telecallers" className="hover:underline">Telecallers</Link>
              <Link href="/superadmin" className="hover:underline">SuperAdmin</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
