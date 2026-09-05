import { createPublicClient } from "../supabase/public";

export async function getIssues() {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("issues")
    .select("*")
    .order("issue_date", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getIssueByID(issueID: string) {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("issues")
    .select("*")
    .eq("id", issueID)
    .single();

  if (error) throw error;

  return data;
}

export async function getIssueBySlug(slug: string) {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("issues")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data;
}