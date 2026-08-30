import { getArticles } from "@/lib/queries/articles";

export default async function Home() {
  const articles = await getArticles();

  return (
    <main>
      <h1>Articles</h1>
      {articles.map((article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </main>
  );
}
