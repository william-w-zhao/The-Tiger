"use server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { ArticleType } from "@/types/article";
import { slugify } from "../utils/slugify";
import { linkAuthorsToArticles } from "./authors";

export async function updateArticle(article: ArticleType) {
  const supabase = await createClient();

  // verify user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: editor } = await supabase
    .from("editor_whitelist").select("email")
    .eq("email", user.email?.toLowerCase() ?? "")
    .maybeSingle();
  if (!editor) throw new Error("Unauthorized");

  // only generate a new slug on first-write for link stability
  const { authors, id, ...columns } = article;
  if (columns.slug?.startsWith("untitled-")) {
    columns.slug = slugify(columns.title)
  }
  const { error } = await supabase.from("articles").update(columns).eq("id", id);
  if (error) throw new Error(error.message);

  await linkAuthorsToArticles(id, columns.author ?? "")

  revalidatePath("/");
  revalidatePath("/articles/[slug]", "page");
  revalidatePath("/admin");
  revalidatePath("/authors/[slug]", "page");

  return { slug: columns.slug };
}

// delete article
export async function deleteArticle(articleID: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", articleID);

  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/articles/[slug]", "page");
  revalidatePath("/admin");
}

// create new article
export async function createArticle() {
  const supabase = await createClient();

  // verify user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: editor } = await supabase
    .from("editor_whitelist").select("email")
    .eq("email", user.email?.toLowerCase() ?? "").maybeSingle();
  if (!editor) throw new Error("Unauthorized");

  // create blank article with unique date-based slug
  const slug = `untitled-${Date.now()}`;
  const { data, error } = await supabase
    .from("articles")
    .insert({ id: crypto.randomUUID(), title: "", slug, section: "", description: "", content: "", author: "" })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  redirect(`/admin/articles/${data.id}`);
}