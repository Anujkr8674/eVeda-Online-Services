"use client";

import React, { createContext, useContext, useState } from "react";
import { COMPANY } from "@/lib/utils";
import type { WebsiteSettings } from "@/lib/settings";

const defaultSettings: WebsiteSettings = {
  phone: COMPANY.phone,
  email: COMPANY.email,
  supportEmail: COMPANY.supportEmail,
  whatsapp: COMPANY.whatsapp,
  address: COMPANY.location,
  location: COMPANY.location,
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14649.6!2d85.2896!3d23.3641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1035ec9bf83%3A0x6ec8f9f38fe2fc8e!2sRatu%20Rd%2C%20Ranchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin",
  social: { ...COMPANY.social },
};

const WebSettingsContext = createContext<{
  settings: WebsiteSettings;
  refreshSettings: () => Promise<void>;
}>({
  settings: defaultSettings,
  refreshSettings: async () => {},
});

export function WebSettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: WebsiteSettings;
}) {
  const [settings, setSettings] = useState<WebsiteSettings>(initialSettings || defaultSettings);

  const refreshSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const json = await res.json();
      if (json.data) {
        const finalAddress = json.data.address || settings.address;
        setSettings((prev) => ({
          ...prev,
          phone: json.data.phone || prev.phone,
          email: json.data.email || prev.email,
          supportEmail: json.data.supportEmail || prev.supportEmail,
          whatsapp: json.data.whatsapp || prev.whatsapp,
          address: finalAddress,
          location: finalAddress,
          mapEmbed: json.data.mapEmbed || prev.mapEmbed,
          social: json.data.social || prev.social,
        }));
      }
    } catch (e) {
      console.error("Error refreshing settings:", e);
    }
  };

  return (
    <WebSettingsContext.Provider value={{ settings, refreshSettings }}>
      {children}
    </WebSettingsContext.Provider>
  );
}

export function useWebSettings() {
  return useContext(WebSettingsContext);
}
