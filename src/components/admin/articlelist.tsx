import Link from "next/link";
import type { ArticleType } from "@/types/article";

export default function ArticleList({ articles }: { articles: ArticleType[] }) {
  return (
    <ul className="divide-y divide-gray-200">
      {articles.map((article) => (
        <li key={article.id}>
          <Link
            href={`/admin/articles/${article.slug}`}
            className="flex justify-between py-3 hover:bg-gray-50"
          >
            <span className="font-medium">{article.title}</span>
            <span className="text-gray-500">{article.author}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
