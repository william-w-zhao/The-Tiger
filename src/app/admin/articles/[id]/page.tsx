import { getArticleById } from "@/lib/queries/articles";
import { notFound } from "next/navigation";
import ArticleEditor from "@/components/admin/articleEditor";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();
  return <ArticleEditor initialArticle={article} />;
}
