import { MetadataRoute } from "next";

const BASE_URL = "https://evedaonlineservices.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: `${BASE_URL}`, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/about`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/portfolio`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${BASE_URL}/careers`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/contact`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/case-studies`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/technologies`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/solutions`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/privacy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const servicePages = [
    "web", "mobile", "saas", "ai", "cloud", "devops", "whatsapp-marketing", "seo", "social-media-marketing", "ppc", "3d-video-editing", "graphic-designing", "book-designing", "book-branding", "erp", "design", "transform", "support",
  ].map((id) => ({
    url: `${BASE_URL}/services/${id}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...servicePages].map((page) => ({
    ...page,
    lastModified: now,
  }));
}
