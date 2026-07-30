import type { Metadata } from "next";
import { isAuthenticated } from "@/lib/auth";
import BuilderClient from "@/components/builder/BuilderClient";
import AdminLogin from "@/components/admin/AdminLogin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website-Builder",
  robots: { index: false, follow: false },
};

export default async function BuilderPage() {
  // Vorerst hinter demselben Passwort wie der Admin-Bereich. Wenn der Builder
  // später für Absolvent/innen geöffnet wird, braucht es hier eigene Zugänge.
  if (!(await isAuthenticated())) {
    return <AdminLogin />;
  }

  return <BuilderClient />;
}
