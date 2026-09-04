import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured, logActivity } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";
import { sendEmail, quotationEmailTemplate } from "@/lib/email";
import { generateQuotationPDF } from "@/lib/pdf";
import type { Quotation as QuotationType } from "@/types/crm";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

function guardDB() {
  return !isSupabaseConfigured()
    ? NextResponse.json({ error: "Database not configured" }, { status: 503 })
    : null;
}

async function syncInvoiceFromQuotation(supabase: any, data: any, user: any) {
  try {
    const { data: existingInvoice } = await supabase
      .from("invoices")
      .select("*")
      .eq("quotation_id", data.id)
      .maybeSingle();

    if (existingInvoice) {
      const newAmountPaid = Number(existingInvoice.amount_paid || 0);
      const newDueAmount = Math.max(0, Number(data.total) - newAmountPaid);
      let newStatus = "unpaid";
      if (newDueAmount <= 0) {
        newStatus = "paid";
      } else if (newAmountPaid > 0) {
        newStatus = "partially_paid";
      }

      await supabase
        .from("invoices")
        .update({
          lead_name:       data.lead_name,
          lead_email:      data.lead_email,
          lead_phone:      data.lead_phone,
          lead_company:    data.lead_company ?? "",
          items:           data.items ?? [],
          subtotal:        data.subtotal,
          discount_amount: data.discount_amount ?? 0,
          tax_rate:        data.tax_rate ?? 18,
          tax_amount:      data.tax_amount,
          total:           data.total,
          due_amount:      newDueAmount,
          status:          newStatus,
          updated_at:      new Date().toISOString(),
        })
        .eq("id", existingInvoice.id);

      await logActivity({
        type: "invoice_updated",
        description: `Invoice ${existingInvoice.invoice_id} auto-updated to match quotation ${data.quotation_id} pricing`,
        entityType: "invoice",
        entityId: existingInvoice.id,
        entityName: existingInvoice.invoice_id,
        performedBy: String(user.sub),
        performedByName: String(user.name),
      });
    } else {
      const { nextInvoiceId } = await import("@/lib/supabase");
      const invoiceId = await nextInvoiceId(supabase);
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 15);

      const { data: newInv, error: invErr } = await supabase
        .from("invoices")
        .insert({
          invoice_id:      invoiceId,
          lead_id:         data.lead_id ?? null,
          quotation_id:    data.id,
          lead_name:       data.lead_name,
          lead_email:      data.lead_email,
          lead_phone:      data.lead_phone,
          lead_company:    data.lead_company ?? "",
          items:           data.items ?? [],
          subtotal:        data.subtotal,
          discount_amount: data.discount_amount ?? 0,
          tax_rate:        data.tax_rate ?? 18,
          tax_amount:      data.tax_amount,
          total:           data.total,
          amount_paid:     0,
          due_amount:      data.total,
          status:          "unpaid",
          billing_date:    new Date().toISOString(),
          due_date:        dueDate.toISOString(),
          terms:           "Payment is due within 15 days of invoice date.",
          bank_details:    "Bank Name: HDFC Bank\nAccount Name: Eveda Online Services\nAccount Number: 50200012345678\nIFSC Code: HDFC0001234\nBranch: New Delhi\nUPI ID: evedaonlineservices@hdfc",
          created_by:      user.sub,
        })
        .select()
        .single();

      if (invErr) {
        console.error("[syncInvoice] Failed to auto-create invoice:", invErr.message);
      } else {
        await logActivity({
          type: "invoice_created",
          description: `Invoice ${invoiceId} auto-generated for Quotation ${data.quotation_id}`,
          entityType: "invoice",
          entityId: newInv.id,
          entityName: invoiceId,
          performedBy: String(user.sub),
          performedByName: String(user.name),
        });
      }
    }
  } catch (invoiceErr: any) {
    console.error("[syncInvoice] Invoice handler failed:", invoiceErr.message);
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dbErr = guardDB(); if (dbErr) return dbErr;

  const supabase = getServerSupabase()!;
  const { id } = await params;
  const { data, error } = await supabase.from("quotations").select("*").eq("id", id).single();
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dbErr = guardDB(); if (dbErr) return dbErr;

  const supabase = getServerSupabase()!;
  const { id } = await params;
  const body = await req.json();

  /* ── Approve ── */
  if (body.action === "approve") {
    if (user.role !== "admin" && user.role !== "superadmin")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { data, error } = await supabase
      .from("quotations")
      .update({
        status: "approved",
        approved_by: user.sub,
        approved_at: new Date().toISOString(),
        admin_remarks: body.adminRemarks ?? "",
      })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) return NextResponse.json({ error: error?.message ?? "Not found" }, { status: 404 });

    await logActivity({
      type: "quotation_approved",
      description: `Quotation ${data.quotation_id} approved`,
      entityType: "quotation",
      entityId: data.id,
      entityName: data.quotation_id,
      performedBy: String(user.sub),
      performedByName: String(user.name),
    });

    // ── Auto Create/Update Invoice with finalized pricing ─────────
    await syncInvoiceFromQuotation(supabase, data, user);

    return NextResponse.json({ data });
  }

  /* ── Reject ── */
  if (body.action === "reject") {
    const { data, error } = await supabase
      .from("quotations")
      .update({
        status: "rejected",
        admin_remarks: body.adminRemarks ?? "",
      })
      .eq("id", id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  }

  /* ── Send ── */
  if (body.action === "send") {
    const { data, error } = await supabase
      .from("quotations")
      .update({ status: "sent", sent_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error || !data) return NextResponse.json({ error: error?.message ?? "Not found" }, { status: 404 });

    // ── Auto-update the linked lead status → "quotation_sent" ──────
    if (data.lead_id) {
      const { error: leadErr } = await supabase
        .from("leads")
        .update({
          status: "quotation_sent",
          updated_at: new Date().toISOString(),
        })
        .eq("id", data.lead_id);

      if (leadErr) {
        console.error("[Quotation] Failed to update lead status:", leadErr.message);
      } else {
        await logActivity({
          type: "lead_updated",
          description: `Lead status auto-updated to "Quotation Sent" after ${data.quotation_id} was dispatched`,
          entityType: "lead",
          entityId: data.lead_id,
          entityName: data.lead_name,
          performedBy: String(user.sub),
          performedByName: String(user.name),
          metadata: { quotationId: data.quotation_id, trigger: "quotation_sent" },
        });
      }
    }

    // ── Auto Create/Update Invoice with finalized pricing when quotation is sent ──
    await syncInvoiceFromQuotation(supabase, data, user);

    // Build QuotationType payload for PDF + email
    const payload: QuotationType = {
      _id: data.id,
      quotationId: data.quotation_id,
      lead: data.lead_id ?? "",
      leadName: data.lead_name,
      leadEmail: data.lead_email,
      leadPhone: data.lead_phone,
      leadCompany: data.lead_company,
      items: data.items,
      subtotal: data.subtotal,
      discountAmount: data.discount_amount,
      taxRate: data.tax_rate,
      taxAmount: data.tax_amount,
      total: data.total,
      currency: data.currency,
      status: data.status,
      validUntil: data.valid_until,
      terms: data.terms,
      notes: data.notes,
      adminRemarks: data.admin_remarks,
      createdBy: data.created_by,
      approvedBy: data.approved_by,
      approvedAt: data.approved_at,
      sentAt: data.sent_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    try {
      const pdfBuffer = await generateQuotationPDF(payload);
      const html = quotationEmailTemplate(data.lead_name, data.quotation_id, data.total);
      await sendEmail({
        to: data.lead_email,
        subject: `Quotation ${data.quotation_id} from ${process.env.PDF_COMPANY_NAME}`,
        html,
        attachments: [{ filename: `${data.quotation_id}.pdf`, content: pdfBuffer, contentType: "application/pdf" }],
      });
    } catch (err) {
      console.error("[Quotation] Email send failed:", err);
    }

    await logActivity({
      type: "quotation_sent",
      description: `Quotation ${data.quotation_id} sent to ${data.lead_email}`,
      entityType: "quotation",
      entityId: data.id,
      entityName: data.quotation_id,
      performedBy: String(user.sub),
      performedByName: String(user.name),
    });

    return NextResponse.json({ data });
  }

  /* ── Generic update ── */
  const update: Record<string, unknown> = {};
  if (body.status !== undefined)       update.status        = body.status;
  if (body.adminRemarks !== undefined) update.admin_remarks = body.adminRemarks;
  if (body.terms !== undefined)        update.terms         = body.terms;
  if (body.notes !== undefined)        update.notes         = body.notes;

  const { data, error } = await supabase
    .from("quotations")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin" && user.role !== "superadmin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const dbErr = guardDB(); if (dbErr) return dbErr;

  const supabase = getServerSupabase()!;
  const { id } = await params;
  const { error } = await supabase.from("quotations").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
