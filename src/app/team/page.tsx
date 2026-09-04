import type { Metadata } from "next";
import TeamPage from "./TeamPage";

export const metadata: Metadata = {
  title: "Meet Our Team — Visionaries, Architects & Engineers",
  description:
    "Meet the high-performance directors, technology planners, and product engineers driving Eveda Online Services. Learn about our roles, expertise, and leadership.",
  alternates: { canonical: "https://evedaonlineservices.com/team" },
  openGraph: {
    title: "Meet Our Team — Eveda Online Services Leaders & Architects",
    description: "The leadership, design thinkers, and engineering veterans building digital product solutions that scale.",
    url: "https://evedaonlineservices.com/team",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <TeamPage />;
}
