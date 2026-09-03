"use server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { ArticleType } from "@/types/article";

export async function updateArticle(article: ArticleType) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: editor } = await supabase
    .from("editor_whitelist").select("email")
    .eq("email", user.email?.toLowerCase() ?? "").maybeSingle();
  if (!editor) throw new Error("Unauthorized");

  const { authors, id, ...columns } = article;
  const { error } = await supabase.from("articles").update(columns).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/articles/[slug]", "page");
  revalidatePath("/admin");
}

export async function deleteArticle(articleID: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", articleID);

  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/articles/[slug]", "page");
  revalidatePath("/admin");

  redirect("/admin");
}

export async function createArticle() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: editor } = await supabase
    .from("editor_whitelist").select("email")
    .eq("email", user.email?.toLowerCase() ?? "").maybeSingle();
  if (!editor) throw new Error("Unauthorized");

  const slug = `untitled-${Date.now()}`;
  const { data, error } = await supabase
    .from("articles")
    .insert({ title: "Untitled", slug, section: "", description: "", content: "", author: "" })
    .select("slug")
    .single();
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  redirect(`/admin/articles/${data.slug}`);
}