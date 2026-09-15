import PackagesClient from "./PackagesClient";
import { getActivePackages, getSiteSettings } from "@/lib/data";

export const metadata = {
  title: "Celebration Packages | Celebrate Birthday with NGO",
  description: "Celebrate your birthday or special occasion with underprivileged children. Choose a celebration package to sponsor meals, cakes, and educational kits.",
};

export default async function PackagesPage() {
  const [packages, settings] = await Promise.all([getActivePackages(), getSiteSettings()]);

  return <PackagesClient packages={packages} settings={settings} />;
}
