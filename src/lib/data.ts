import { createClient, isSupabaseConfigured } from "./supabase/server";
import {
  Package,
  GalleryItem,
  Testimonial,
  ImpactStatistics,
  SiteSettings,
  fallbackSettings,
} from "./types";

const emptyImpact: ImpactStatistics = {
  id: 1,
  children_supported: 0,
  events_organized: 0,
  meals_distributed: 0,
  volunteers: 0,
  updated_at: new Date().toISOString(),
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return fallbackSettings;
  const supabase = createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  return (data as SiteSettings) ?? fallbackSettings;
}

export async function getActivePackages(): Promise<Package[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = createClient();
  const { data } = await supabase
    .from("packages")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  return (data as Package[]) ?? [];
}

export async function getPublishedGallery(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = createClient();
  const { data } = await supabase
    .from("gallery")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return (data as GalleryItem[]) ?? [];
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return (data as Testimonial[]) ?? [];
}

export async function getImpactStatistics(): Promise<ImpactStatistics> {
  if (!isSupabaseConfigured) return emptyImpact;
  const supabase = createClient();
  const { data } = await supabase.from("impact_statistics").select("*").eq("id", 1).single();
  return (data as ImpactStatistics) ?? emptyImpact;
}
