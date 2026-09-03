"use server";
import { createClient } from "@/lib/supabase/server";
import { adminStorage } from "@/lib/firebase/admin";

async function requireEditor() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: editor } = await supabase
    .from("editor_whitelist").select("email")
    .eq("email", user.email?.toLowerCase() ?? "").maybeSingle();
  if (!editor) throw new Error("Unauthorized");
}

export async function uploadImage(formData: FormData): Promise<string> {
  await requireEditor();
  const file = formData.get("file") as File | null;
  const articleId = formData.get("articleId") as string | null;
  if (!file || !articleId) throw new Error("Missing file or articleId");

  const bytes = Buffer.from(await file.arrayBuffer());
  const bucket = adminStorage.bucket();
  const path = `images/${articleId}`;
  const ref = bucket.file(path);

  await ref.save(bytes, {
    contentType: file.type,
    metadata: { cacheControl: "public, max-age=31536000" },
  });
  await ref.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${path}?v=${Date.now()}`;
}

export async function deleteImage(articleId: string): Promise<void> {
  await requireEditor();
  try {
    await adminStorage.bucket().file(`images/${articleId}`).delete();
  } catch (e: any) {
    if (e?.code !== 404) throw e;
  }
}