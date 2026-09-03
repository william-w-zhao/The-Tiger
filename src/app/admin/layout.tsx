import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: editor } = await supabase
    .from("editor_whitelist")
    .select("email")
    .eq("email", user.email?.toLowerCase() ?? "")
    .maybeSingle();

  if (!editor) redirect("/login");
  return <>{children}</>;
}
