import { ArticleType } from "@/types/article";

export function CardEmpty({
  editMode,
  assignSlot,
}: {
  editMode: boolean;
  assignSlot?: (index: number, id: string) => void;
}) {
  return (
    <div
      className={`h-full p-3 flex items-center justify-center border-2 border-dashed border-gray-200`}
    ></div>
  );
}

export function CardImage({
  article,
  className,
}: {
  article: ArticleType;
  className: String;
}) {
  if (!article.image_url) {
    return null;
  }
  return (
    <div className={`overflow-hidden rounded ${className}`}>
      <img
        alt={article.title}
        src={article.image_url}
        className="w-full h-full object-cover object-center"
      ></img>
    </div>
  );
}

export function CardTitle({
  article,
  className,
}: {
  article: ArticleType;
  className: string;
}) {
  if (!article.title) {
    return null;
  }
  return (
    <h1
      className={`relative inline-block font-semibold leading-tight ${className}`}
    >
      <span className="relative z-10">{article.title}</span>
      <span className="pointer-events-none absolute left-0 bottom-0 w-full h-2.5 bg-orange-300 origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100" />
    </h1>
  );
}

export function CardByline({ article }: { article: ArticleType }) {
  return (
    <h2 className="text-md text-gray-600 shrink-0">By {article.author}</h2>
  );
}
