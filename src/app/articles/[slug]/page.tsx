import type { Metadata } from "next";
import { getArticleBySlug } from "@/lib/queries/articles";
import Article from "@/components/articles/article";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: article.title,
    description: article.description,
    authors: article.authors.map((author) => ({ name: author.name })),

    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      images: article.image_url
        ? [
            {
              url: article.image_url,
              alt: article.title,
            },
          ]
        : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    return <div>Article not found</div>;
  }

  return <Article article={article} />;
}
