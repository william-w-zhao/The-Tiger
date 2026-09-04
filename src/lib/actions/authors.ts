import { createClient } from "../supabase/server";
import { slugify } from "../utils/slugify";
import { parseAuthorNames } from "../utils/authors";

export async function getAuthorByName(name: string) {
    const cleanName = name.trim()
    const nameSlug = slugify(cleanName)

    const supabase = await createClient()
    const {data: author, error: readError} = await supabase
    .from("authors")
    .select("*")
    .eq("slug", nameSlug)
    .maybeSingle()
    
    if (readError) throw new Error(readError.message)
    if (author) return author

    const {data: newAuthor, error: writeError} = await supabase
    .from("authors")
    .insert({ name: cleanName, slug: nameSlug })
    .select()
    .single()
    
    if (writeError) throw writeError;
    return newAuthor;
}

export async function linkAuthorsToArticles(articleID: string, authors: string) {
    const supabase = await createClient()
    
    const authorNames = parseAuthorNames(authors)
    
    const { error: deleteError } = await supabase
    .from("article_authors").delete().eq("article_id", articleID);
    
    if (deleteError) throw deleteError;

    const authorRecords = [];
    for (const name of authorNames) {
        authorRecords.push(await getAuthorByName(name));
    }

    if (authorRecords.length === 0) return;

    const rows = authorRecords.map((author, index) => ({
        article_id: articleID,
        author_id: author.id,
        author_order: index,
    }));

    const { error: insertError } = await supabase
        .from("article_authors").insert(rows);
        
    if (insertError) throw insertError;
}