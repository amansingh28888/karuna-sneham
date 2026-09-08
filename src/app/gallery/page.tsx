import GalleryClient from "./GalleryClient";
import { getPublishedGallery } from "@/lib/data";

export const metadata = { title: "Gallery | Karuna Sneham Foundation" };

export default async function GalleryPage() {
  const items = await getPublishedGallery();
  return <GalleryClient items={items} />;
}
