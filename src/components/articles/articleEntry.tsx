import Link from "next/link";
import { ArticleType } from "@/types/article";

export default function ArticleEntry({ article }: { article: ArticleType }) {
  return (
    <div className="flex gap-4 py-3 px-2 h-44">
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Link
          href={`/articles/${article.slug}`}
          className="italic text-2xl font-bold hover:underline hover:cursor-pointer hover:text-orange-400 active:text-orange-400 line-clamp-2"
        >
          {article.title}
        </Link>
        <h2 className="italic text-lg text-gray-500 line-clamp-2 leading-tight">
          {article.description}
        </h2>
        <p className="text-l text-gray-500 mt-auto shrink-0">
          By {article.author}
        </p>
      </div>

      {article.image_url && (
        <Link href={`/articles/${article.slug}`} className="shrink-0">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-32 h-full object-cover rounded"
          />
        </Link>
      )}
    </div>
  );
}
