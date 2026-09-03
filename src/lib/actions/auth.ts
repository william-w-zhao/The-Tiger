"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect("/login?error=" + encodeURIComponent(error.message));
  }
  redirect("/admin");
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const email = (formData.get("email") as string).toLowerCase();
  const password = formData.get("password") as string;

  const { data: allowed } = await supabase.rpc("is_whitelisted", {
    check_email: email,
  });
  if (!allowed) {
    redirect("/login?error=" + encodeURIComponent("Unauthorized sign-up"));
  }

  // 2. actually create the account   ← this was missing
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    redirect("/login?error=" + encodeURIComponent(error.message));
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}