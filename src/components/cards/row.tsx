import Link from "next/link";
import { ItemType, Orientation } from "@/types/layouts";
import { CardEmpty, CardImage, CardTitle, CardByline } from "./atoms";

export function Row({
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
    <section
      className="grid divide-x divide-gray-200"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map(({ index, article }) =>
        article ? (
          // image on top of text
          orientation === "vertical" ? (
            <div key={index} className="p-4 relative">
              <Link href={`articles/${article.slug}`}>
                <CardImage article={article} className="aspect-4/3"></CardImage>
                <CardTitle
                  article={article}
                  className={"text-xl mt-2"}
                ></CardTitle>
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
            <div key={index} className="flex gap-4 items-start relative">
              <Link href={`articles/${article.slug}`}>
                <div className="min-w-0 flex-1">
                  <CardTitle article={article} className="text-lg" />
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
