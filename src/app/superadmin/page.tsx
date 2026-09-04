import type { Metadata } from "next";
import LoginPage from "@/components/crm/shared/LoginPage";

export const metadata: Metadata = { title: "SuperAdmin Login — eVeda CRM" };

export default function SuperAdminLoginPage() {
  return (
    <LoginPage
      role="superadmin"
      title="SuperAdmin Control"
      subtitle="Full system access — authorized personnel only"
      defaultEmail="superadmin@evedaonlineservices.com"
      accentColor="#7c3aed"
      icon="crown"
    />
  );
}
