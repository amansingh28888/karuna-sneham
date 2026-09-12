import PackagesClient from "./PackagesClient";
import { getActivePackages, getSiteSettings } from "@/lib/data";

export const metadata = { title: "Celebration Packages | Karuna Sneham Foundation" };

export default async function PackagesPage() {
  const [packages, settings] = await Promise.all([getActivePackages(), getSiteSettings()]);

  return <PackagesClient packages={packages} settings={settings} />;
}
