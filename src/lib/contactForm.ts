"use client";

import { createClient } from "./supabase/client";

export async function submitContactMessage(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const supabase = createClient();
  const { error } = await supabase.from("contact_messages").insert(data);
  if (error) throw error;
}
