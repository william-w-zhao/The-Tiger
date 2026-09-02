import { createClient } from "../supabase/server";


// get layout modules from given id (home, news)
export async function getLayoutModules(id: string) {
    const supabase = await createClient();

    const {data, error} = await supabase
    .from("modules")
    .select("*")
    .eq("layout_id", id)
    .order("module_order", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
}