import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";
import { getSiteSettings } from "@/lib/data";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://karunasneham.org"),
  title: {
    default: "Karuna Sneham Foundation | NGO for Children & Education",
    template: "%s | Karuna Sneham Foundation",
  },
  description:
    "Karuna Sneham Foundation is a trusted NGO in India dedicated to underprivileged children and education. Celebrate your birthday or special occasion by donating food and education support.",
  keywords: ["Karuna Sneham Foundation", "NGO", "NGO for children", "child education NGO", "NGO for underprivileged children", "best NGO", "NGO donation", "birthday celebration NGO", "celebrate birthday with children", "Varanasi NGO"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://karunasneham.org",
    siteName: "Karuna Sneham Foundation",
    title: "Karuna Sneham Foundation | NGO for Children & Education",
    description: "Support underprivileged children through Karuna Sneham Foundation. Donate for child education or celebrate your special day with kids in need.",
    images: [
      {
        url: "/children.jpeg",
        width: 1200,
        height: 630,
        alt: "Karuna Sneham Foundation - Children celebrating",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karuna Sneham Foundation | NGO for Children",
    description: "Celebrate your birthday or special occasion by sharing happiness with underprivileged children.",
    images: ["/children.jpeg"],
  },
  alternates: {
    canonical: "/",
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Karuna Sneham Foundation",
    url: "https://karunasneham.org",
    logo: "https://karunasneham.org/logo-cropped.jpeg",
    description: "Karuna Sneham Foundation is a trusted NGO for children's welfare and education in India, allowing you to celebrate your birthday or special occasion by sharing happiness with underprivileged children.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B25, Badri Nagar Colony, Varanasi, Nathupur, Bhulanpur Pac",
      addressLocality: "Varanasi",
      addressRegion: "Uttar Pradesh",
      postalCode: "221108",
      addressCountry: "IN"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9296804691",
      contactType: "customer support"
    },
    sameAs: [
      "https://www.instagram.com/karunasneham.ngo"
    ]
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${karla.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer settings={settings} />
        <WhatsAppFloatingButton
          number={settings.whatsapp_number}
          message={settings.whatsapp_order_message}
        />
      </body>
    </html>
  );
}
