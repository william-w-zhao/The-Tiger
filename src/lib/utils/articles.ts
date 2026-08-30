import { ArticleType } from "@/types/article";

// re-format article data returned by supabase so that author data is one array of authors
export function normalizeArticle(article: any): ArticleType {
  return {
    ...article,
    authors:
      article.article_authors
        ?.sort((a: any, b: any) => a.author_order - b.author_order)
        .map((row: any) => row.author) ?? [],
  };
}