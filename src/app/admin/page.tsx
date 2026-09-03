import { signOut } from "@/lib/actions/auth";
import ArticleList from "@/components/admin/articlelist";
import { getArticles } from "@/lib/queries/articles";
import { ArticleType } from "@/types/article";
import Link from "next/link";

export default async function AdminPage() {
  const articles = await getArticles();
  return (
    <>
      <ArticleList articles={articles}></ArticleList>
    </>
  );
}
