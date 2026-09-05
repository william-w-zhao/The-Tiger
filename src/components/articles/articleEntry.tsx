import Link from "next/link";
import { ArticleType } from "@/types/article";

export default function ArticleEntry({ article }: { article: ArticleType }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex gap-4 py-3 px-2 h-44 hover:bg-gray-50"
    >
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <h2 className="italic text-2xl font-bold line-clamp-2 group-hover:underline group-hover:text-blue-600 group-active:text-blue-800">
          {article.title}
        </h2>
        <h2 className="italic text-lg text-gray-500 line-clamp-2 leading-tight">
          {article.description}
        </h2>
        <p className="text-l text-gray-500 mt-auto shrink-0">
          By {article.author}
        </p>
      </div>

      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-32 h-full object-cover rounded shrink-0"
        />
      )}
    </Link>
  );
}
