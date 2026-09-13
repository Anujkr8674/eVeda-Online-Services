import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { COMPANY } from "@/lib/utils";

export interface WebsiteSettings {
  phone: string;
  email: string;
  supportEmail: string;
  whatsapp: string;
  address: string;
  location: string;
  mapEmbed: string;
  social: {
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
    youtube: string;
    facebook: string;
  };
}

let cachedSettings: WebsiteSettings | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes server-side in-memory cache

export function invalidateWebsiteSettingsCache() {
  cachedSettings = null;
  cacheTimestamp = 0;
}

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  const fallback: WebsiteSettings = {
    phone: COMPANY.phone,
    email: COMPANY.email,
    supportEmail: COMPANY.supportEmail,
    whatsapp: COMPANY.whatsapp,
    address: COMPANY.location,
    location: COMPANY.location,
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14649.6!2d85.2896!3d23.3641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1035ec9bf83%3A0x6ec8f9f38fe2fc8e!2sRatu%20Rd%2C%20Ranchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin",
    social: { ...COMPANY.social },
  };

  const now = Date.now();
  if (cachedSettings && (now - cacheTimestamp < CACHE_TTL_MS)) {
    return cachedSettings;
  }

  if (!isSupabaseConfigured()) {
    cachedSettings = fallback;
    cacheTimestamp = now;
    return fallback;
  }

  try {
    const supabase = getServerSupabase();
    if (!supabase) {
      cachedSettings = fallback;
      cacheTimestamp = now;
      return fallback;
    }

    // Wrap query with a 2-second timeout so network lag never freezes SSR
    const fetchPromise = supabase
      .from("website_settings")
      .select("*");
      
    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) =>
      setTimeout(() => reject(new Error("Supabase query timed out")), 2000)
    );

    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

    if (error || !data) {
      return cachedSettings || fallback;
    }

    const dbSettings: Record<string, any> = {};
    data.forEach((row: { key: string; value: any }) => {
      dbSettings[row.key] = row.value;
    });

    const finalAddress = dbSettings.address || fallback.address;

    const result: WebsiteSettings = {
      phone: dbSettings.phone || fallback.phone,
      email: dbSettings.email || fallback.email,
      supportEmail: dbSettings.supportEmail || fallback.supportEmail,
      whatsapp: dbSettings.whatsapp || fallback.whatsapp,
      address: finalAddress,
      location: finalAddress,
      mapEmbed: dbSettings.mapEmbed || fallback.mapEmbed,
      social: dbSettings.social || fallback.social,
    };

    cachedSettings = result;
    cacheTimestamp = Date.now();
    return result;
  } catch (e) {
    console.error("Error fetching website settings on server (using cache/fallback):", e);
    return cachedSettings || fallback;
  }
}
