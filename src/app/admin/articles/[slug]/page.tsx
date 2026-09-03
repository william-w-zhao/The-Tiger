import { getArticleBySlug } from "@/lib/queries/articles";
import { notFound } from "next/navigation";
import ArticleEditor from "@/components/admin/articleEditor";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  return <ArticleEditor initialArticle={article} />;
}
