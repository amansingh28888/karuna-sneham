export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  children_supported: number;
  image_url: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  media_type: "image" | "video";
  storage_path: string;
  event_date: string | null;
  published: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  occasion: string | null;
  message: string;
  published: boolean;
  created_at: string;
}

export interface ImpactStatistics {
  id: number;
  children_supported: number;
  events_organized: number;
  meals_distributed: number;
  volunteers: number;
  updated_at: string;
}

export interface SiteSettings {
  id: number;
  ngo_name: string;
  tagline: string;
  cin: string | null;
  founded_date: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  map_link: string | null;
  whatsapp_number: string;
  whatsapp_order_message: string;
  instagram_link: string | null;
  facebook_link: string | null;
  youtube_link: string | null;
  founder_name: string | null;
  founder_role: string | null;
  founder_bio: string | null;
  founder_image_url: string | null;
  upi_id: string | null;
  bank_details: string | null;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Fallback settings used only when Supabase is not configured.
export const fallbackSettings: SiteSettings = {
  id: 1,
  ngo_name: "Karuna Sneham Foundation",
  tagline: "Saving a smile, building a better tomorrow",

  cin: "U88900UP2026NPL250077",
  founded_date: "2026-07-14",

  phone: "+91 9296804691",
  email: "karunasneham.ngo@gmail.com",

  address:
    "B25, Badri Nagar Colony, Varanasi, Nathupur, Bhulanpur Pac, Varanasi, Varanasi, Uttar Pradesh, India, 221108",

  map_link: "https://share.google/Y1c8ioOVTg6BjOcnW",

  whatsapp_number: "919296804691",

  whatsapp_order_message:
    "Hello, I would like to book a celebration package for children through Karuna Sneham Foundation. Please share the available packages and details.",

  instagram_link: "https://www.instagram.com/karunasneham.ngo",

  facebook_link: null,
  youtube_link: null,

  founder_name: "Aman Singh",

  founder_role: "Founder, Karuna Sneham Foundation",

  founder_bio:
    'Aman Singh is the founder of Karuna Sneham Foundation, driven by a passion for creating meaningful social impact and bringing happiness to underprivileged children and communities. Alongside his work with the foundation, Aman is pursuing an MBA in Business Analytics at Chandigarh University, where he is developing his expertise in data analytics, business strategy, technology, and problem-solving. He believes that meaningful change happens when compassion is combined with action. Through Karuna Sneham Foundation, he aims to create opportunities for individuals to turn their special moments — such as birthdays and anniversaries — into moments of happiness for children in need. "A celebration becomes more meaningful when it brings a smile to someone who needs it."',

  founder_image_url: null,

  upi_id: null,
  bank_details: null,

  updated_at: new Date().toISOString(),
};