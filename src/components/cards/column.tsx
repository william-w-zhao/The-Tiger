import Link from "next/link";
import { ItemType, Orientation } from "@/types/layouts";
import { CardEmpty, CardImage, CardTitle, CardByline } from "./atoms";
import DroppableSlot from "./droppable";

export function Column({
  moduleID,
  items,
  editMode,
  orientation,
  removeSlot,
}: {
  moduleID?: string;
  items: ItemType[];
  editMode: boolean;
  orientation: Orientation;
  removeSlot?: (index: number) => void;
}) {
  return (
    <section className="flex flex-col divide-y divide-gray-200 px-4">
      {items.map(({ index, article }) => {
        const content = article ? (
          // image on top of text
          orientation === "vertical" ? (
            <>
              <Link
                href={`/articles/${article.slug}`}
                className="flex flex-col h-full justify-center"
              >
                <CardImage article={article} className="group flex-1 min-h-0" />
                <CardTitle
                  article={article}
                  className="text-lg lg:text-xl mt-2 shrink-0"
                />
                <CardByline article={article} />
              </Link>
              {editMode && removeSlot && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeSlot(index);
                  }}
                  className="absolute top-2 right-2 z-20 text-3xl text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              )}
            </>
          ) : (
            // image to the right of text
            <>
              <Link
                href={`/articles/${article.slug}`}
                className="group flex flex-col-reverse lg:flex-row gap-4 lg:items-center h-full"
              >
                <div className="min-w-0 flex-1">
                  <CardTitle
                    article={article}
                    className="text-lg lg:text-base line-clamp-2"
                  />
                  <CardByline article={article} />
                </div>
                <CardImage
                  article={article}
                  className="w-full aspect-4/3 lg:w-24 lg:h-24 lg:aspect-auto shrink-0"
                />
              </Link>
              {editMode && removeSlot && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeSlot(index);
                  }}
                  className="absolute top-2 right-2 z-20 text-3xl text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              )}
            </>
          )
        ) : (
          <CardEmpty editMode={editMode}></CardEmpty>
        );
        const slotClass = "flex-1 min-h-0 py-4 relative";
        return editMode && moduleID ? (
          <DroppableSlot
            key={index}
            moduleID={moduleID}
            index={index}
            className={slotClass}
          >
            {content}
          </DroppableSlot>
        ) : (
          <div key={index} className={slotClass}>
            {content}
          </div>
        );
      })}
    </section>
  );
}
