"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Trash2, CheckCircle, ArrowLeft, Calculator, Search, User, ChevronDown, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/crm/shared/PageHeader";
import { useCRM } from "@/lib/crm-context";

interface Item { id: string; description: string; quantity: number; unitPrice: number; discount: number; total: number; }
interface Lead  { _id: string; leadId: string; name: string; email: string; phone: string; company: string; }

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full px-3 py-2 rounded-lg text-[13px] outline-none transition-all"
      style={{ background: "var(--crm-surface)", border: "1px solid var(--crm-border)", color: "var(--crm-text)" }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--crm-primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(16,185,129,0.10)"; }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--crm-border)";  e.currentTarget.style.boxShadow = "none"; }}
      {...props}
    />
  );
}

export default function NewInvoicePage() {
  const router   = useRouter();
  const { user } = useCRM();
  const isTC     = user?.role === "telecaller";

  const [saving,    setSaving]    = useState(false);
  const [leads,     setLeads]     = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadSearch, setLeadSearch]    = useState("");
  const [showLeadDrop, setShowLeadDrop] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);

  const [client,    setClient]    = useState({ name: "", email: "", phone: "", company: "" });
  const [taxRate,   setTaxRate]   = useState(18);
  const [billingDate, setBillingDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [dueDate,     setDueDate]     = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 15);
    return d.toISOString().split("T")[0];
  });
  
  const [amountPaid, setAmountPaid] = useState("0");
  const [bankDetails, setBankDetails] = useState("Bank Name: HDFC Bank\nAccount Name: Eveda Online Services\nAccount Number: 50200012345678\nIFSC Code: HDFC0001234\nBranch: Haridwar\nUPI ID: eveda@hdfc");
  const [terms,     setTerms]     = useState("Payment is due within 15 days of invoice date. Late payments may incur interest charges of 1.5% per month.");
  
  const [items,     setItems]     = useState<Item[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0, discount: 0, total: 0 },
  ]);

  // Fetch leads (telecaller gets only assigned, admin gets all)
  useEffect(() => {
    setLeadsLoading(true);
    const params = new URLSearchParams({ limit: "100" });
    fetch(`/api/leads?${params}`)
      .then((r) => r.json())
      .then((json) => setLeads(json.data ?? []))
      .catch(() => toast.error("Could not load leads"))
      .finally(() => setLeadsLoading(false));
  }, []);

  // Filter leads
  const filteredLeads = useMemo(() =>
    leads.filter((l) =>
      !leadSearch ||
      l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.leadId.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.includes(leadSearch)
    ),
    [leads, leadSearch]
  );

  const selectLead = async (lead: Lead) => {
    setSelectedLead(lead);
    setClient({ name: lead.name, email: lead.email, phone: lead.phone, company: lead.company });
    setShowLeadDrop(false);
    setLeadSearch("");

    try {
      const res = await fetch(`/api/quotations?leadId=${lead._id}`);
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        // Look for sent, approved or accepted quotations first
        const quote = json.data.find((q: any) => ["sent", "approved", "accepted"].includes(q.status)) || json.data[0];
        
        toast.success(`Found Quotation ${quote.quotationId}! Auto-populating items & pricing.`);
        setSelectedQuoteId(quote._id);

        if (quote.items && quote.items.length > 0) {
          const mappedItems = quote.items.map((item: any, idx: number) => ({
            id: String(idx + 1),
            description: item.description || "",
            quantity: Number(item.quantity || 1),
            unitPrice: Number(item.unitPrice || 0),
            discount: Number(item.discount || 0),
            total: Number(item.total || 0)
          }));
          setItems(mappedItems);
        }
        if (quote.taxRate !== undefined) {
          setTaxRate(Number(quote.taxRate));
        }
      } else {
        setSelectedQuoteId(null);
      }
    } catch (err) {
      console.error("Failed to load approved quotation:", err);
      setSelectedQuoteId(null);
    }
  };

  const clearLead = () => {
    setSelectedLead(null);
    setSelectedQuoteId(null);
    setClient({ name: "", email: "", phone: "", company: "" });
    setItems([{ id: "1", description: "", quantity: 1, unitPrice: 0, discount: 0, total: 0 }]);
  };

  const updateItem = (id: string, field: keyof Item, value: string | number) => {
    setItems((prev) => prev.map((item) => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: value };
      const price = updated.unitPrice * updated.quantity;
      updated.total = price - (price * updated.discount / 100);
      return updated;
    }));
  };

  const addItem    = () => setItems((p) => [...p, { id: Date.now().toString(), description: "", quantity: 1, unitPrice: 0, discount: 0, total: 0 }]);
  const removeItem = (id: string) => setItems((p) => p.filter((i) => i.id !== id));

  const subtotal  = items.reduce((s, i) => s + i.total, 0);
  const taxAmount = subtotal * taxRate / 100;
  const total     = subtotal + taxAmount;

  const handleSave = async () => {
    if (isTC && !selectedLead) {
      toast.error("Please select one of your assigned leads first");
      return;
    }
    if (!client.name || !client.email || !client.phone) { toast.error("Client details required"); return; }
    if (!items.some(i => i.description && i.unitPrice > 0)) { toast.error("Add at least one item with a price"); return; }
    if (Number(amountPaid) > total) {
      toast.error("Amount paid cannot exceed total invoice value");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: selectedLead?._id ?? null,
          quotation: selectedQuoteId,
          leadName: client.name,
          leadEmail: client.email,
          leadPhone: client.phone,
          leadCompany: client.company,
          items: items.filter(i => i.description),
          subtotal,
          taxRate,
          taxAmount,
          total,
          amountPaid: Number(amountPaid),
          billingDate,
          dueDate,
          bankDetails,
          terms,
          status: Number(amountPaid) >= total ? "paid" : Number(amountPaid) > 0 ? "partially_paid" : "unpaid"
        }),
      });

      if (res.ok) {
        toast.success("Invoice created successfully!");
        router.push("/dashboard/invoices");
      } else {
        const err = await res.json();
        toast.error(err.error ?? "Failed to save");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/dashboard/invoices")}
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <PageHeader
            title="Create Tax Invoice"
            subtitle="Raise a new bill. Lock client info directly from leads."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Customer Details */}
          <div className="p-6 rounded-xl space-y-4" style={SURFACE_STYLE}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" />
                Customer / Client Information
              </h3>
              {selectedLead && (
                <button
                  onClick={clearLead}
                  className="text-[10px] text-red-500 font-semibold hover:underline"
                >
                  Change Lead
                </button>
              )}
            </div>

            {/* Searchable Lead Dropdown */}
            {!selectedLead && (
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                  Select Lead to Auto-fill Details *
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone..."
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                    value={leadSearch}
                    onChange={(e) => {
                      setLeadSearch(e.target.value);
                      setShowLeadDrop(true);
                    }}
                    onFocus={() => setShowLeadDrop(true)}
                  />
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {showLeadDrop && (
                  <div
                    className="absolute left-0 right-0 mt-1.5 max-h-56 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg z-50 py-1 divide-y divide-slate-50"
                    onMouseLeave={() => setShowLeadDrop(false)}
                  >
                    {leadsLoading ? (
                      <p className="p-3 text-xs text-slate-500 text-center">Loading your leads...</p>
                    ) : filteredLeads.length === 0 ? (
                      <p className="p-3 text-xs text-slate-500 text-center">No matching leads found</p>
                    ) : (
                      filteredLeads.map((l) => (
                        <div
                          key={l._id}
                          onClick={() => selectLead(l)}
                          className="px-4 py-2 hover:bg-slate-50 cursor-pointer transition-colors text-left"
                        >
                          <p className="text-xs font-bold text-slate-800">{l.name} ({l.leadId})</p>
                          <p className="text-[10px] text-slate-500">{l.email} · {l.phone}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Client Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">Client Name</label>
                <Input
                  value={client.name}
                  onChange={(e) => setClient({ ...client, name: e.target.value })}
                  placeholder="Client full name"
                  disabled={isTC && !!selectedLead}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">Client Email</label>
                <Input
                  value={client.email}
                  onChange={(e) => setClient({ ...client, email: e.target.value })}
                  placeholder="client@company.com"
                  disabled={isTC && !!selectedLead}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">Phone Number</label>
                <Input
                  value={client.phone}
                  onChange={(e) => setClient({ ...client, phone: e.target.value })}
                  placeholder="+91..."
                  disabled={isTC && !!selectedLead}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">Company Name (Optional)</label>
                <Input
                  value={client.company}
                  onChange={(e) => setClient({ ...client, company: e.target.value })}
                  placeholder="e.g. Acme Corp"
                  disabled={isTC && !!selectedLead}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Items List */}
          <div className="p-6 rounded-xl space-y-4" style={SURFACE_STYLE}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-semibold text-slate-800">Invoice Line Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Item Row
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={item.id} className="grid grid-cols-12 gap-3 items-center border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div className="col-span-5">
                    <label className="block text-[10px] text-slate-400 font-semibold mb-1">Description *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
                      placeholder="e.g. Website design services"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] text-slate-400 font-semibold mb-1 text-center">Qty</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs text-center focus:ring-1 focus:ring-emerald-500 outline-none"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] text-slate-400 font-semibold mb-1">Unit Price</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 outline-none font-medium"
                      placeholder="0"
                      value={item.unitPrice || ""}
                      onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] text-slate-400 font-semibold mb-1">Disc (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
                      placeholder="0"
                      value={item.discount || ""}
                      onChange={(e) => updateItem(item.id, "discount", Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-1 text-center pt-5">
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Calculations, Dates and Terms */}
        <div className="space-y-6">
          {/* Billing Dates & Options */}
          <div className="p-6 rounded-xl space-y-4" style={SURFACE_STYLE}>
            <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Invoice Options
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Billing Date *</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                value={billingDate}
                onChange={(e) => setBillingDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Payment Due Date *</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Initial Paid Advance (INR)</label>
              <input
                type="number"
                min="0"
                max={total}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 font-bold text-emerald-600"
                placeholder="0"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
              />
            </div>
          </div>

          {/* Pricing Calculator Card */}
          <div className="p-6 rounded-xl space-y-4" style={SURFACE_STYLE}>
            <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-emerald-600" />
              Invoice Summary
            </h3>
            
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-800">Rs.{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>GST Tax Rate:</span>
                <select
                  className="px-2 py-0.5 border border-slate-200 rounded text-[11px] focus:ring-1 focus:ring-emerald-500"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                >
                  <option value="0">0% (GST Exempt)</option>
                  <option value="5">5% GST</option>
                  <option value="12">12% GST</option>
                  <option value="18">18% GST (Standard)</option>
                  <option value="28">28% GST</option>
                </select>
              </div>
              <div className="flex justify-between">
                <span>GST Tax Amount:</span>
                <span className="font-semibold text-slate-800">Rs.{taxAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t border-slate-100 pt-2 flex justify-between text-sm font-bold text-slate-800">
                <span>TOTAL AMOUNT:</span>
                <span>Rs.{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Initial Paid:</span>
                <span>Rs.{Number(amountPaid).toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-red-500">
                <span>OUTSTANDING DUE:</span>
                <span>Rs.{Math.max(0, total - Number(amountPaid)).toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm disabled:opacity-50"
            >
              {saving ? "Creating Invoice..." : "Create & Save Invoice"}
            </button>
          </div>

          {/* Instructions and Bank Details */}
          <div className="p-6 rounded-xl space-y-4" style={SURFACE_STYLE}>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Bank payment instructions
              </label>
              <textarea
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 h-28 resize-none font-mono text-[10px] whitespace-pre"
                value={bankDetails}
                onChange={(e) => setBankDetails(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Terms & conditions
              </label>
              <textarea
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 h-20 resize-none"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
