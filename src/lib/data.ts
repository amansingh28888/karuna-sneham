import { createClient, isSupabaseConfigured } from "./supabase/server";
import {
  Package,
  GalleryItem,
  Testimonial,
  ImpactStatistics,
  SiteSettings,
  fallbackSettings,
  fallbackPackages,
  fallbackImpact,
  fallbackTestimonials,
  fallbackGallery,
} from "./types";

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return fallbackSettings;
  try {
    const supabase = createClient();
    const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
    return (data as SiteSettings) ?? fallbackSettings;
  } catch {
    return fallbackSettings;
  }
}

export async function getActivePackages(): Promise<Package[]> {
  if (!isSupabaseConfigured) return fallbackPackages;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("packages")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    return data && data.length > 0 ? (data as Package[]) : fallbackPackages;
  } catch {
    return fallbackPackages;
  }
}

export async function getPublishedGallery(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured) return fallbackGallery;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    return data && data.length > 0 ? (data as GalleryItem[]) : fallbackGallery;
  } catch {
    return fallbackGallery;
  }
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured) return fallbackTestimonials;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    return data && data.length > 0 ? (data as Testimonial[]) : fallbackTestimonials;
  } catch {
    return fallbackTestimonials;
  }
}

export async function getImpactStatistics(): Promise<ImpactStatistics> {
  if (!isSupabaseConfigured) return fallbackImpact;
  try {
    const supabase = createClient();
    const { data } = await supabase.from("impact_statistics").select("*").eq("id", 1).single();
    return (data as ImpactStatistics) ?? fallbackImpact;
  } catch {
    return fallbackImpact;
  }
}
