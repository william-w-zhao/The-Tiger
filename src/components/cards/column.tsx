import Link from "next/link";
import { ItemType, Orientation } from "@/types/layouts";
import { CardEmpty, CardImage, CardTitle, CardByline } from "./atoms";

export function Column({
  items,
  editMode,
  orientation,
  assignSlot,
  removeSlot,
}: {
  items: ItemType[];
  editMode: boolean;
  orientation: Orientation;
  assignSlot?: (index: number, id: string) => void;
  removeSlot?: (index: number) => void;
}) {
  return (
    <section className="flex flex-col divide-y divide-gray-200 px-4">
      {items.map(({ index, article }) =>
        article ? (
          // image on top of text
          orientation === "vertical" ? (
            <div key={index} className="flex-1 min-h-0 py-4 relative">
              <Link
                href={`/articles/${article.slug}`}
                className="flex flex-col h-full"
              >
                <CardImage article={article} className="group flex-1 min-h-0" />
                <CardTitle
                  article={article}
                  className="text-xl mt-2 shrink-0"
                />
                <CardByline article={article} />
              </Link>
              {editMode && removeSlot && (
                <button
                  onClick={(e) => {
                    e.preventDefault;
                    removeSlot(index);
                  }}
                  className="absolute top-2 right-2 z-20 text-3xl text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              )}
            </div>
          ) : (
            // image to the right of text
            <div key={index} className="flex-1 py-4 relative">
              <Link
                href={`/articles/${article.slug}`}
                className="group flex gap-4 items-center"
              >
                <div className="min-w-0 flex-1">
                  <CardTitle
                    article={article}
                    className="text-md line-clamp-2"
                  />
                  <CardByline article={article} />
                </div>
                <CardImage article={article} className="w-24 h-24 shrink-0" />
              </Link>
              {editMode && removeSlot && (
                <button
                  onClick={(e) => {
                    e.preventDefault;
                    removeSlot(index);
                  }}
                  className="absolute top-2 right-2 z-20 text-3xl text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              )}
            </div>
          )
        ) : (
          <CardEmpty
            key={index}
            editMode={editMode}
            assignSlot={assignSlot}
          ></CardEmpty>
        ),
      )}
    </section>
  );
}
