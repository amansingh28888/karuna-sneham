import GalleryClient from "./GalleryClient";
import { getPublishedGallery } from "@/lib/data";

export const metadata = {
  title: "Gallery | NGO Events & Celebration with Children",
  description: "Explore the gallery of Karuna Sneham Foundation. See our NGO events for children, birthday celebrations, and educational drives in action.",
};

export default async function GalleryPage() {
  const items = await getPublishedGallery();
  return <GalleryClient items={items} />;
}
