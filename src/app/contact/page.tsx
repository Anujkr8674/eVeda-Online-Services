import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Project Today",
  description:
    "Get in touch with Eveda Online Services. Whether you have a project in mind or want a free consultation — our team is ready to help. We serve clients worldwide.",
  alternates: { canonical: "https://evedaonlineservices.com/contact" },
  openGraph: {
    title: "Contact Eveda Online Services — Start Your Project",
    description: "Reach out for a free consultation. We'd love to learn about your project and how we can help you succeed.",
    url: "https://evedaonlineservices.com/contact",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <ContactPage />;
}
