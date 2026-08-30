import { createClient } from "@/lib/supabase/server";
import { normalizeArticle } from "@/lib/utils/articles";
import { slugify } from "../utils/slugify";
import { articleSelect } from "@/types/article";

export async function getAuthors() {
    const supabase = await createClient();

    const {data, error} = await supabase
    .from('authors')
    .select('*')
    .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

// author id
export async function getAuthorById(id: string) {
    const supabase = await createClient();

    const {data, error} = await supabase
    .from('authors')
    .select('*')
    .eq('id', id)
    .single()

    if (error) {
        if (error.code === 'PGRST116') {
            return null
        }
        throw new Error(error.message);
    }
    return data;
}

// article slug
export async function getAuthorBySlug(slug: string) {
    const supabase = await createClient();

    const {data, error} = await supabase
    .from('authors')
    .select('*')
    .eq('slug', slug)
    .single()

    if (error) {
        if (error.code === 'PGRST116') {
            return null
        }
        throw new Error(error.message);
    }
    return data;
}