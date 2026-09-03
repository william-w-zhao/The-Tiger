import { getArticles } from "@/lib/queries/articles";
import ArticleEntry from "@/components/articles/articleEntry";

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-[90%] mx-auto lg:max-w-[55%]">
      <h1 className="text-3xl font-bold border-b border-gray-300 pb-1 mb-2">
        Latest
      </h1>
      <div className="divide-y divide-gray-200">
        {articles.map((article) => (
          <ArticleEntry key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
