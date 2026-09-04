import type { Metadata } from "next";
import LoginPage from "@/components/crm/shared/LoginPage";

export const metadata: Metadata = { title: "Telecaller Login — eVeda CRM" };

export default function TelecallerLoginPage() {
  return (
    <LoginPage
      role="telecaller"
      title="Telecaller Portal"
      subtitle="Sign in to manage your leads & follow-ups"
      defaultEmail="telecaller1@evedaonlineservices.com"
      accentColor="#0891b2"
      icon="users"
    />
  );
}
