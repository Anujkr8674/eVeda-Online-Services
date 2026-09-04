import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/admin/", "/telecallers/", "/superadmin/", "/api/"],
      },
    ],
    sitemap: "https://evedaonlineservices.com/sitemap.xml",
    host: "https://evedaonlineservices.com",
  };
}
