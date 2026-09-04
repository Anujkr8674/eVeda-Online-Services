import type { Metadata } from "next";
import GalleryPage from "./GalleryPage";

export const metadata: Metadata = {
  title: "Our Gallery — Life & Office at Eveda Online Services",
  description:
    "Explore the visual journey of Eveda Online Services. View our premium workspace, collaborative brainstorming sessions, and company culture events.",
  alternates: { canonical: "https://evedaonlineservices.com/gallery" },
};

export default function Page() {
  return <GalleryPage />;
}
