import { signOut } from "@/lib/actions/auth";
import ArticleList from "@/components/admin/articleList";
import { getArticles } from "@/lib/queries/articles";
import { createArticle } from "@/lib/actions/articles";

export default async function AdminPage() {
  const articles = await getArticles();
  return (
    <>
      <div className="flex justify-end mb-2">
        <button
          onClick={createArticle}
          className="enabled:hover:underline enabled:hover:cursor-pointer disabled:opacity-50"
        >
          New Article
        </button>
      </div>
      <div className="border border-gray-300 rounded-lg p-4">
        <ArticleList initialArticles={articles}></ArticleList>
      </div>
    </>
  );
}
