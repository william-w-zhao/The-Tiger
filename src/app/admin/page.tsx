import { signOut } from "@/lib/actions/auth";
import ArticleList from "@/components/admin/articleList";
import { getArticles } from "@/lib/queries/articles";
import { createArticle } from "@/lib/actions/articles";

export default async function AdminPage() {
  const articles = await getArticles();
  return (
    <>
      <div className="flex items-center justify-center relative">
        <hr className="text-gray-300 mb-2" />
        <button
          onClick={createArticle}
          className="absolute right-0 enabled:hover:underline enabled:hover:cursor-pointer disabled:opacity-50"
        >
          New Article
        </button>
      </div>
      <ArticleList initialArticles={articles}></ArticleList>
    </>
  );
}
