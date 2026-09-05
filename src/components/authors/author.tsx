import Link from "next/link";
import { getArticlesByAuthor } from "@/lib/queries/articles";
import { AuthorType } from "@/types/author";

function getClassYear(name: string) {
  const classYearMatch = name.match(/\s*('\d{2})$/);
  const displayName = classYearMatch ? name.replace(/\s*'\d{2}$/, "") : name;
  return classYearMatch?.[1];
}

function getName(name: string) {
  const classYear = getClassYear(name);
  const displayName = classYear ? name.replace(/\s*'\d{2}$/, "") : name;
  return displayName;
}

export default async function Author({ author }: { author: AuthorType }) {
  const articles = await getArticlesByAuthor(author.id);
  const classYear = getClassYear(author.name);
  const displayName = getName(author.name);

  return (
    <div className="w-full max-w-[90%] mx-auto lg:max-w-[55%]">
      <h1 className="text-5xl font-bold mb-2">
        {displayName}
        {classYear && (
          <sup className="relative -top-3 ml-1 text-2xl">{classYear}</sup>
        )}
      </h1>

      <hr className="text-gray-300 mb-4" />

      {author.bio && (
        <p className="text-xl text-gray-600 mb-6 whitespace-pre-wrap">
          {author.bio}
        </p>
      )}

      <hr className="text-gray-300 mb-4" />

      {articles.length === 0 ? (
        <p className="text-gray-500">No articles yet.</p>
      ) : (
        <div className="flex flex-col divide-y divide-gray-200">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group flex gap-4 py-4 hover:opacity-80"
            >
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="text-orange-400">{article.section}</h3>
                <h2 className="text-2xl font-bold italic line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-500 italic line-clamp-2">
                  {article.description}
                </p>
              </div>

              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-32 h-24 object-cover rounded shrink-0"
                />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
