import { createClient } from "@/lib/supabase/server";
import { normalizeArticle } from "@/lib/utils/articles";
import { ArticleType } from "@/types/article";
import { slugify } from "../utils/slugify";
import { articleSelect } from "@/types/article";

export async function getArticles() {
    const supabase = await createClient();

    const {data, error} = await supabase
    .from('articles')
    .select(articleSelect)
    .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }
    return data.map(normalizeArticle);
}

// article id (singular)
export async function getArticleById(articleID: string) {
    const supabase = await createClient();

    const {data, error} = await supabase
    .from('articles')
    .select('*')
    .eq('id', articleID)
    .single()

    if (error) {
        if (error.code === 'PGRST116') {
            return null
        }
        throw new Error(error.message);
    }
    return normalizeArticle(data);
}

// article ids (plural)
export async function getArticlesByIDs(ids: string[]) {
    const supabase = await createClient()

    const {data, error} = await supabase
    .from("articles")
    .select("*")
    .in("id", ids)

    if (error) {
        throw new Error(error.message);
    }
    return data.map(normalizeArticle);
}

// article slug
export async function getArticleBySlug(slug: string) {
    const supabase = await createClient();

    const {data, error} = await supabase
    .from('articles')
    .select(articleSelect) 
    .eq('slug', slug)
    .single()

    if (error) {
        if (error.code === 'PGRST116') {
            return null
        }
        throw new Error(error.message);
    }
    return normalizeArticle(data);
}

// author id (NOT SLUG)
export async function getArticlesByAuthor(authorID: string) {
    const supabase = await createClient()

    const {data, error} = await supabase
    .from('article_authors')
    .select('article:articles(*)')
    .eq('author_id', authorID)
    .order('created_at', { referencedTable: 'articles', ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map((row) => row.article as unknown as ArticleType);
}