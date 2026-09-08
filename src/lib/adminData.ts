import { createClient } from "./supabase/client";
import {
  Package,
  GalleryItem,
  Testimonial,
  ImpactStatistics,
  SiteSettings,
  ContactMessage,
} from "./types";

const supabase = createClient();

// ---- Packages -------------------------------------------------------------

export async function listAllPackages(): Promise<Package[]> {
  const { data, error } = await supabase.from("packages").select("*").order("sort_order");
  if (error) throw error;
  return data as Package[];
}

export async function createPackage(data: Omit<Package, "id" | "created_at">) {
  const { error } = await supabase.from("packages").insert(data);
  if (error) throw error;
}

export async function updatePackage(id: string, data: Partial<Package>) {
  const { error } = await supabase.from("packages").update(data).eq("id", id);
  if (error) throw error;
}

export async function deletePackage(id: string) {
  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) throw error;
}

// ---- Gallery ----------------------------------------------------------------

export async function listAllGallery(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as GalleryItem[];
}

export async function createGalleryItem(data: Omit<GalleryItem, "id" | "created_at">) {
  const { error } = await supabase.from("gallery").insert(data);
  if (error) throw error;
}

export async function updateGalleryItem(id: string, data: Partial<GalleryItem>) {
  const { error } = await supabase.from("gallery").update(data).eq("id", id);
  if (error) throw error;
}

export async function deleteGalleryItem(id: string) {
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw error;
}

// ---- Testimonials -------------------------------------------------------

export async function listAllTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Testimonial[];
}

export async function createTestimonial(data: Omit<Testimonial, "id" | "created_at">) {
  const { error } = await supabase.from("testimonials").insert(data);
  if (error) throw error;
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>) {
  const { error } = await supabase.from("testimonials").update(data).eq("id", id);
  if (error) throw error;
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
}

// ---- Impact statistics --------------------------------------------------

export async function getImpactStatisticsAdmin(): Promise<ImpactStatistics> {
  const { data, error } = await supabase.from("impact_statistics").select("*").eq("id", 1).single();
  if (error) throw error;
  return data as ImpactStatistics;
}

export async function updateImpactStatistics(data: Partial<ImpactStatistics>) {
  const { error } = await supabase.from("impact_statistics").update(data).eq("id", 1);
  if (error) throw error;
}

// ---- Site settings ----------------------------------------------------------

export async function getSiteSettingsAdmin(): Promise<SiteSettings> {
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  if (error) throw error;
  return data as SiteSettings;
}

export async function updateSiteSettings(data: Partial<SiteSettings>) {
  const { error } = await supabase.from("site_settings").update(data).eq("id", 1);
  if (error) throw error;
}

// ---- Contact messages -----------------------------------------------------

export async function listContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as ContactMessage[];
}

export async function markMessageRead(id: string, is_read: boolean) {
  const { error } = await supabase.from("contact_messages").update({ is_read }).eq("id", id);
  if (error) throw error;
}

export async function deleteContactMessage(id: string) {
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) throw error;
}

// ---- Storage uploads --------------------------------------------------------

export async function uploadFile(
  file: File,
  bucket: "gallery" | "site-assets",
  folder: string
): Promise<string> {
  const path = `${folder}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
