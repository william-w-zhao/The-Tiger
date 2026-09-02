"use server";                                    // if called from the client editor
import { ModuleConfig } from "@/types/layouts";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function updateSlot(moduleID: string, index: number, articleID: string) {
  const supabase = await createClient();

  const { data, error: readError } = await supabase
    .from("modules")
    .select("config")
    .eq("id", moduleID)
    .single();

  if (readError) throw new Error(readError.message);

  const config = (data.config ?? {}) as ModuleConfig;
  const slots = [...(config.slots ?? [])]; 
  slots[index] = articleID;

  const { error: writeError } = await supabase
    .from("modules")
    .update({ config: { ...config, slots } })
    .eq("id", moduleID);

  if (writeError) throw new Error(writeError.message);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteSlot(moduleID: string, index: number) {
  const supabase = await createClient()
  
  const {data, error: readError} = await supabase
  .from("modules")
  .select("config")
  .eq("id", moduleID)
  .single()

  if (readError) throw new Error(readError.message)

  const config = (data.config ?? {}) as ModuleConfig
  const slots = (config.slots ?? []).map((s, i) => (i === index ? null : s));
  const { error: writeError } = await supabase
  .from("modules")
  .update({ config: { ...config, slots } })
  .eq("id", moduleID);

  if (writeError) throw new Error(writeError.message);

  revalidatePath("/"); revalidatePath("/admin");
}