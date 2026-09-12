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

  upi_id: "UJJ83981816501@Ujjivan",
  bank_details: null,

  updated_at: new Date().toISOString(),
};

export const fallbackPackages: Package[] = [
  {
    id: "pkg-1",
    name: "Joyful Meal Celebration",
    price: 1500,
    description: "Provide fresh, nutritious meals and sweet treats to a group of 15 children for your special day.",
    features: [
      "Nutritious warm meal & sweet dessert",
      "Personalized message banner for children",
      "Photo & video updates via WhatsApp",
      "Digital thank-you card",
    ],
    children_supported: 15,
    image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    sort_order: 1,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "pkg-2",
    name: "Smile & Happiness Feast",
    price: 3500,
    description: "Our most popular package. Complete festive lunch, 3kg custom celebration cake, and music session.",
    features: [
      "Full festive lunch meal & fruit drink",
      "3kg custom celebration cake cut with children",
      "Interactive games & music celebration",
      "Personalized video wish from the kids",
      "Full HD Digital photo album",
    ],
    children_supported: 35,
    image_url: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=800&auto=format&fit=crop",
    sort_order: 2,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "pkg-3",
    name: "Bright Future Celebration",
    price: 7500,
    description: "A transformative event providing gourmet celebration meals plus essential educational kit bags for 75 children.",
    features: [
      "Special gourmet celebration feast",
      "Custom multi-tier cake & sweets distribution",
      "Educational stationery kit & storybook for each child",
      "Live WhatsApp video stream / call during cake cutting",
      "Framed official certificate of appreciation",
    ],
    children_supported: 75,
    image_url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    sort_order: 3,
    active: true,
    created_at: new Date().toISOString(),
  },
];

export const fallbackImpact: ImpactStatistics = {
  id: 1,
  children_supported: 480,
  events_organized: 74,
  meals_distributed: 2850,
  volunteers: 45,
  updated_at: new Date().toISOString(),
};

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Priya & Rohit Sharma",
    occasion: "5th Wedding Anniversary",
    message: "Celebrating our anniversary with Karuna Sneham Foundation was the most fulfilling experience of our lives. Seeing 35 happy children singing and enjoying the feast warmed our hearts completely.",
    published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "t-2",
    name: "Rohan Mehta",
    occasion: "25th Birthday",
    message: "Instead of spending money at a expensive restaurant, I decided to sponsor meals for 50 children. The video wish they sent me on WhatsApp was the best birthday gift I have ever received!",
    published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "t-3",
    name: "Ananya Deshmukh",
    occasion: "Mother's Birthday Memorial",
    message: "Extremely transparent and heartfelt team. They executed the cake cutting and meal distribution beautifully and shared photos within hours. Highly recommended!",
    published: true,
    created_at: new Date().toISOString(),
  },
];

export const fallbackGallery: GalleryItem[] = [
  {
    id: "g-1",
    title: "Joyful Birthday Cake Cutting",
    description: "Children gathering round to sing and celebrate sponsored birthday milestone.",
    media_type: "image",
    storage_path: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=800&auto=format&fit=crop",
    event_date: "2026-08-15",
    published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g-2",
    title: "Nutritious Festive Meals Service",
    description: "Distributing freshly cooked nutritious lunch packs to underprivileged children.",
    media_type: "image",
    storage_path: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    event_date: "2026-08-01",
    published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g-3",
    title: "Educational Kit & Notebook Drive",
    description: "Handing out school bags, notebooks, and stationery items during anniversary sponsor drive.",
    media_type: "image",
    storage_path: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    event_date: "2026-07-20",
    published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g-4",
    title: "Interactive Music & Games Fun",
    description: "Children participating in drawing and singing games during festival celebration.",
    media_type: "image",
    storage_path: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop",
    event_date: "2026-07-10",
    published: true,
    created_at: new Date().toISOString(),
  },
];