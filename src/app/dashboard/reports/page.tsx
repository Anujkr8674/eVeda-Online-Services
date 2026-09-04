"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Download, TrendingUp, Users2, DollarSign, Target, Loader2 } from "lucide-react";
import PageHeader from "@/components/crm/shared/PageHeader";
import toast from "react-hot-toast";

const COLORS = ["#5b5bd6", "#7c3aed", "#0891b2", "#16a34a", "#d97706", "#ea580c", "#ec4899", "#6366f1"];

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

interface TooltipPayloadItem { color?: string; name?: string; value?: number | string; }
interface TooltipProps { active?: boolean; payload?: TooltipPayloadItem[]; label?: string | number; }

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-[12px]"
        style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", boxShadow: "var(--crm-shadow-lg)" }}>
        <p style={{ color: "var(--crm-text-muted)" }} className="mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="font-medium" style={{ color: p.color ?? "var(--crm-text)" }}>
            {p.name}: {typeof p.value === "number" && p.name === "Revenue" ? `₹${p.value.toLocaleString("en-IN")}` : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load reports");
        return res.json();
      })
      .then((d) => {
        setData(d);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error loading analytics data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleExport = () => {
    if (!data) return;
    try {
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Metric,Value\n"
        + `Total Revenue,${data.kpis?.totalRevenue}\n`
        + `Total Leads,${data.kpis?.totalLeads}\n`
        + `Conversion Rate,${data.kpis?.conversionRate}\n`
        + `Avg Deal Value,${data.kpis?.avgDealValue}\n`;
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `eveda_crm_report_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Summary report exported successfully!");
    } catch {
      toast.error("Failed to export report");
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-purple-650 animate-spin" />
        <p className="text-[13px]" style={{ color: "var(--crm-text-muted)" }}>Analyzing pipeline intelligence…</p>
      </div>
    );
  }

  const kpis = data?.kpis ?? { totalRevenue: "₹0", totalLeads: 0, conversionRate: "0%", avgDealValue: "₹0", raw: { totalRevenue: 0, totalLeads: 0, conversionRate: 0, avgDealValue: 0 } };
  const monthlyData = data?.monthlyData ?? [];
  const sourceData = data?.sourceData ?? [];
  const teamData = data?.teamData ?? [];

  return (
    <div>
      <PageHeader
        title="Analytics & Reports"
        subtitle="Business intelligence and performance metrics"
        badge="Reports"
        badgeColor="#16a34a"
        actions={
          <button onClick={handleExport} className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-colors"
            style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}>
            <Download className="w-4 h-4" /> Export Report
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Revenue",   value: kpis.totalRevenue, change: "+18%", icon: DollarSign,  color: "#16a34a" },
          { label: "Total Leads",     value: String(kpis.totalLeads), change: "+12%", icon: Users2,      color: "#5b5bd6" },
          { label: "Conversion Rate", value: kpis.conversionRate, change: "+3%",  icon: TrendingUp,  color: "#7c3aed" },
          { label: "Avg Deal Value",  value: kpis.avgDealValue,  change: "+8%",  icon: Target,      color: "#d97706" },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} className="rounded-xl p-5" style={SURFACE_STYLE}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${kpi.color}12`, color: kpi.color }}>
                <kpi.icon className="w-4 h-4" strokeWidth={1.9} />
              </div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                style={{ color: "var(--crm-success)", background: "rgba(22,163,74,0.10)" }}>{kpi.change}</span>
            </div>
            <p className="text-[26px] font-semibold tracking-tight" style={{ color: "var(--crm-text-strong)" }}>{kpi.value}</p>
            <p className="text-[12px] mt-0.5" style={{ color: "var(--crm-text-muted)" }}>{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <motion.div className="rounded-xl p-5" style={SURFACE_STYLE} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h3 className="text-[14px] font-semibold mb-4" style={{ color: "var(--crm-text-strong)" }}>Monthly Revenue</h3>
          {monthlyData.length === 0 ? (
            <div className="h-[210px] flex items-center justify-center text-[12px]" style={{ color: "var(--crm-text-muted)" }}>
              No monthly data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={monthlyData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.30} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "#8a8f99", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#8a8f99", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 100000 ? `₹${(v/100000).toFixed(1)}L` : `₹${v}`} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} fill="url(#revGrad)" name="Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <motion.div className="rounded-xl p-5" style={SURFACE_STYLE} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-[14px] font-semibold mb-4" style={{ color: "var(--crm-text-strong)" }}>Leads vs Conversions</h3>
          {monthlyData.length === 0 ? (
            <div className="h-[210px] flex items-center justify-center text-[12px]" style={{ color: "var(--crm-text-muted)" }}>
              No monthly data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "#8a8f99", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#8a8f99", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="leads"     fill="#5b5bd6" radius={[6,6,0,0]} name="Leads" />
                <Bar dataKey="converted" fill="#16a34a" radius={[6,6,0,0]} name="Converted" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div className="rounded-xl p-5" style={SURFACE_STYLE} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h3 className="text-[14px] font-semibold mb-4" style={{ color: "var(--crm-text-strong)" }}>Lead Sources</h3>
          {sourceData.length === 0 ? (
            <div className="h-[160px] flex items-center justify-center text-[12px]" style={{ color: "var(--crm-text-muted)" }}>
              No source distribution data
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} innerRadius={40}>
                    {sourceData.map((_item: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 space-y-1.5">
                {sourceData.map((s: any, i: number) => (
                  <div key={s.name} className="flex items-center justify-between text-[12px]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                      <span style={{ color: "var(--crm-text-muted)" }}>{s.name}</span>
                    </div>
                    <span className="font-medium" style={{ color: "var(--crm-text)" }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        <motion.div className="lg:col-span-2 rounded-xl overflow-hidden" style={SURFACE_STYLE} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "var(--crm-border-faint)" }}>
            <h3 className="text-[14px] font-semibold" style={{ color: "var(--crm-text-strong)" }}>Team Performance</h3>
          </div>
          {teamData.length === 0 ? (
            <div className="py-12 text-center text-[12px]" style={{ color: "var(--crm-text-muted)" }}>
              No telecaller assignment metrics
            </div>
          ) : (
            teamData.map((member: any, i: number) => {
              const rate = member.leads > 0 ? Math.round((member.converted / member.leads) * 100) : 0;
              return (
                <div key={member.name} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center gap-4 px-5 py-4 border-b" style={{ borderColor: "var(--crm-border-faint)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-semibold text-white shrink-0"
                      style={{ background: `linear-gradient(135deg,${COLORS[i % COLORS.length]},${COLORS[(i+1)%COLORS.length]})` }}>
                      {member.name.charAt(0)}
                    </div>
                    <span className="text-[13px] font-medium truncate" style={{ color: "var(--crm-text)" }}>{member.name}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] font-semibold" style={{ color: "#5b5bd6" }}>{member.leads}</p>
                    <p className="text-[10px]" style={{ color: "var(--crm-text-subtle)" }}>Leads</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] font-semibold" style={{ color: "var(--crm-success)" }}>{member.converted}</p>
                    <p className="text-[10px]" style={{ color: "var(--crm-text-subtle)" }}>Converted</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px]" style={{ color: "var(--crm-text-subtle)" }}>Rate</span>
                      <span className="text-[12px] font-semibold" style={{ color: "var(--crm-text)" }}>{rate}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--crm-surface-muted)" }}>
                      <div className="h-full rounded-full" style={{ width: `${rate}%`, background: `linear-gradient(90deg,${COLORS[i % COLORS.length]},${COLORS[(i+1)%COLORS.length]})` }} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </motion.div>
      </div>
    </div>
  );
}
