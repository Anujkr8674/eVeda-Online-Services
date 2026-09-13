import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyToken, TOKEN_KEY } from "@/lib/auth";
import { COMPANY } from "@/lib/utils";
import { invalidateWebsiteSettingsCache } from "@/lib/settings";

async function getUser(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  if (!token) return null;
  return verifyToken(token);
}

const DEFAULT_SETTINGS = {
  phone: COMPANY.phone,
  email: COMPANY.email,
  supportEmail: COMPANY.supportEmail,
  whatsapp: COMPANY.whatsapp,
  address: COMPANY.location,
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14649.6!2d85.2896!3d23.3641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1035ec9bf83%3A0x6ec8f9f38fe2fc8e!2sRatu%20Rd%2C%20Ranchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin",
};

// ── GET /api/settings ──
export async function GET(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ data: DEFAULT_SETTINGS, source: "mock" });
  }

  try {
    const supabase = getServerSupabase()!;
    const { data, error } = await supabase
      .from("website_settings")
      .select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const dbSettings: Record<string, any> = {};
    (data ?? []).forEach((row) => {
      dbSettings[row.key] = row.value;
    });

    const merged = {
      phone: dbSettings.phone ?? DEFAULT_SETTINGS.phone,
      email: dbSettings.email ?? DEFAULT_SETTINGS.email,
      supportEmail: dbSettings.supportEmail ?? DEFAULT_SETTINGS.supportEmail,
      whatsapp: dbSettings.whatsapp ?? DEFAULT_SETTINGS.whatsapp,
      address: dbSettings.address ?? DEFAULT_SETTINGS.address,
      mapEmbed: dbSettings.mapEmbed ?? DEFAULT_SETTINGS.mapEmbed,
    };

    return NextResponse.json({ data: merged, source: "database" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── PUT /api/settings ──
export async function PUT(req: NextRequest) {
  const user = await getUser(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database credentials not configured" }, { status: 503 });
  }

  try {
    const supabase = getServerSupabase()!;
    const body = await req.json();

    // Perform upsert for each setting key
    const keys = ["phone", "email", "supportEmail", "whatsapp", "address", "mapEmbed"];
    const upserts = keys
      .filter((k) => body[k] !== undefined)
      .map((k) => ({
        key: k,
        value: body[k],
      }));

    if (upserts.length === 0) {
      return NextResponse.json({ error: "No valid settings provided" }, { status: 400 });
    }

    const { error } = await supabase
      .from("website_settings")
      .upsert(upserts, { onConflict: "key" });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    invalidateWebsiteSettingsCache();
    return NextResponse.json({ success: true, updatedKeys: upserts.map((u) => u.key) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
