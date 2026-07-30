import SitePage from "@/components/SitePage";
import { readContent } from "@/lib/content-store";

// Die Inhalte kommen aus Redis und ändern sich über den Admin-Bereich. Ohne
// das hier würde Next die Seite beim Deploy einmal vorrendern und Änderungen
// erst beim nächsten Deploy zeigen.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await readContent();
  return <SitePage content={content} />;
}
