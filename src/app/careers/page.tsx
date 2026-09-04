import type { Metadata } from "next";
import CareersPage from "./CareersPage";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Eveda Online Services — work on exciting projects, grow fast, and be part of a world-class engineering team.",
};

export default function Page() {
  return <CareersPage />;
}
