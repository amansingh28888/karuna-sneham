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
  title: "Karuna Sneham Foundation | Saving a Smile, Building a Better Tomorrow",
  description:
    "Celebrate your birthday, anniversary, or special occasion by sharing happiness with underprivileged children — through Karuna Sneham Foundation.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${fraunces.variable} ${karla.variable}`}>
      <body>
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
