import Link from "next/link";
import { ItemType } from "@/types/layouts";
import { CardEmpty, CardImage, CardTitle, CardByline } from "./atoms";

export function Hero({
  items,
  editMode,
  assignSlot,
  removeSlot,
}: {
  items: ItemType[];
  editMode: boolean;
  assignSlot?: (index: number, id: string) => void;
  removeSlot?: (index: number) => void;
}) {
  const featured = items[0];

  return (
    <section className="lg:border-gray-200 lg:px-4">
      {featured?.article ? (
        <div className="relative">
          <Link href={`/articles/${featured.article.slug}`} className="group">
            <CardImage article={featured.article} className="aspect-4/3" />
            <CardTitle article={featured.article} className="text-3xl mt-2" />
            <CardByline article={featured.article} />
          </Link>
          {editMode && removeSlot && (
            <button
              onClick={(e) => {
                e.preventDefault;
                removeSlot(0);
              }}
              className="absolute top-1 right-2 z-20 text-4xl text-red-500 hover:text-red-700 font-bold"
            >
              ×
            </button>
          )}
        </div>
      ) : (
        <CardEmpty editMode={editMode} assignSlot={assignSlot} />
      )}
    </section>
  );
}
