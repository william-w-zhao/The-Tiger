import { createPublicClient } from "../supabase/public";

export async function getAuthors() {
    const supabase = createPublicClient();

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
    const supabase = createPublicClient();

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
    const supabase = createPublicClient();

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