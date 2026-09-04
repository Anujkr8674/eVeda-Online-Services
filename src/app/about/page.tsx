import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About Us — Our Story, Team & Values",
  description:
    "Eveda Online Services has grown to a global team of specialists. Learn about our mission, company values, leadership team, and what makes us the right technology partner.",
  alternates: { canonical: "https://evedaonlineservices.com/about" },
  openGraph: {
    title: "About Eveda Online Services — Our Story, Team & Values",
    description: "From a focused engineering firm to a global technology partner. Meet our team and learn what drives us.",
    url: "https://evedaonlineservices.com/about",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <AboutPage />;
}
