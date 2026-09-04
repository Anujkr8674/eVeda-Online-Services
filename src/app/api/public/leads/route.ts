import { NextRequest, NextResponse } from "next/server";
import {
  getServerSupabase,
  isSupabaseConfigured,
  nextLeadId,
  pickNextTelecaller,
  logActivity,
} from "@/lib/supabase";
import { sendEmail, leadThankYouTemplate, leadAdminNotificationTemplate } from "@/lib/email";

/* ── Anti-spam: lightweight in-memory rate limit ───────────────────
   Keeps the API safe in demo mode (per-IP, 5 submissions / 10 min)
   ──────────────────────────────────────────────────────────────── */
const submissions = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = submissions.get(ip);
  if (!rec || rec.resetAt < now) {
    submissions.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (rec.count >= MAX_PER_WINDOW) return false;
  rec.count += 1;
  return true;
}

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function isValidPhone(s: string) {
  // Accept 7–15 digits (with optional +, spaces, dashes)
  const digits = s.replace(/[\s+\-()]/g, "");
  return /^\d{7,15}$/.test(digits);
}

/* ────────────────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? req.headers.get("x-real-ip")
    ?? "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name    = String(body.name    ?? "").trim();
  const email   = String(body.email   ?? "").trim().toLowerCase();
  const phone   = String(body.phone   ?? "").trim();
  const company = String(body.company ?? "").trim();
  const service = String(body.service ?? "").trim();
  const budget  = String(body.budget  ?? "").trim();
  const message = String(body.message ?? "").trim();
  const metadata = body.metadata && typeof body.metadata === "object" ? body.metadata : {};

  // Honeypot — bots usually fill all fields including hidden ones
  if (typeof body.website === "string" && body.website.length > 0) {
    // Silent success to confuse bots
    return NextResponse.json({ success: true });
  }

  /* ── Validation ─────────────────────────────────────────────── */
  if (!name || name.length < 2)             return NextResponse.json({ error: "Please enter your name" }, { status: 400 });
  if (!email || !isValidEmail(email))       return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
  if (!phone || !isValidPhone(phone))       return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
  if (!message || message.length < 5)       return NextResponse.json({ error: "Please share a brief about your project" }, { status: 400 });

  const supabase = getServerSupabase();
  const services = service ? [service] : [];

  /* ── Auto-assign to a telecaller ─────────────────────────────── */
  const assignee = await pickNextTelecaller(supabase);

  /* ── Save lead ───────────────────────────────────────────────── */
  let leadRow: Record<string, unknown> | null = null;

  if (isSupabaseConfigured() && supabase) {
    const leadId = await nextLeadId(supabase);
    const { data, error } = await supabase
      .from("leads")
      .insert({
        lead_id:     leadId,
        name,
        email,
        phone,
        company,
        country:     "India",
        status:      assignee ? "assigned" : "new",
        priority:    "medium",
        source:      "website",
        services,
        budget,
        requirement: message,
        assigned_to: assignee?.id ?? null,
        created_by:  "public_form",
        notes:       [],
        calls:       [],
        tags:        ["website-form"],
        metadata,
      })
      .select()
      .single();

    if (error) {
      console.error("[public/leads] insert failed:", error);
      return NextResponse.json(
        { error: "Could not save your enquiry. Please try again or email us directly." },
        { status: 500 }
      );
    }

    leadRow = data;

    await logActivity({
      type: "lead_created",
      description: `New lead from website: ${name}${assignee ? ` → assigned to ${assignee.name}` : ""}`,
      entityType: "lead",
      entityId: String(data.id),
      entityName: name,
      performedBy: "public_form",
      performedByName: "Website Form",
      metadata: { source: "website", services, budget },
    });

    if (assignee) {
      await logActivity({
        type: "lead_assigned",
        description: `Lead ${leadId} auto-assigned to ${assignee.name}`,
        entityType: "lead",
        entityId: String(data.id),
        entityName: name,
        performedBy: "system",
        performedByName: "Auto-assignment",
        metadata: { telecallerId: assignee.id },
      });
    }
  } else {
    // No DB yet — still acknowledge so the marketing site works during setup
    console.warn(
      "[public/leads] Supabase not configured — submission accepted but NOT persisted.",
      { name, email, phone, company, service, message, assignee }
    );
  }

  /* ── Fire-and-forget emails ────────────────────────────────────── */
  if (process.env.MAIL_USER && process.env.MAIL_PASS) {
    // Send customer thank-you
    sendEmail({
      to: email,
      subject: `Thanks for reaching out — ${process.env.PDF_COMPANY_NAME ?? "Eveda Online Services"}`,
      html: leadThankYouTemplate(name, services.length ? services : ["Custom IT Solution"]),
    }).catch((err) => console.error("[public/leads] thank-you mail failed:", err));

    // Send admin notification
    sendEmail({
      to: process.env.PDF_COMPANY_EMAIL || process.env.MAIL_USER,
      subject: `[ALERT] New Lead Received: ${name} (${company || "No Company"})`,
      html: leadAdminNotificationTemplate(name, email, phone, company, services.length ? services : ["Custom IT Solution"], budget, message),
    }).catch((err) => console.error("[public/leads] Admin lead mail failed:", err));
  }

  return NextResponse.json({
    success: true,
    message: "Thanks! Our team will reach out within 24 hours.",
    leadId: leadRow?.lead_id ?? null,
  });
}
