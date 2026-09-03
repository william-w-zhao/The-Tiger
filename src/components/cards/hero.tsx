import Link from "next/link";
import { ItemType } from "@/types/layouts";
import { CardEmpty, CardImage, CardTitle, CardByline } from "./atoms";
import DroppableSlot from "./droppable";

export function Hero({
  moduleID,
  items,
  editMode,
  removeSlot,
}: {
  moduleID?: string;
  items: ItemType[];
  editMode: boolean;
  removeSlot?: (index: number) => void;
}) {
  const featured = items[0];

  const content = featured?.article ? (
    <>
      <Link href={`/articles/${featured.article.slug}`} className="group">
        <CardImage article={featured.article} className="flex-1 min-h-0" />
        <CardTitle article={featured.article} className="text-3xl mt-2" />
        <CardByline article={featured.article} />
      </Link>
      {editMode && removeSlot && (
        <button
          onClick={(e) => {
            e.preventDefault();
            removeSlot(0);
          }}
          className="absolute top-1 right-2 z-20 text-4xl text-red-500 hover:text-red-700 font-bold"
        >
          ×
        </button>
      )}
    </>
  ) : (
    <CardEmpty editMode={editMode}></CardEmpty>
  );

  const slotClass = "flex-1 py-4 relative";

  return (
    <section className="flex flex-col lg:border-gray-200 lg:px-4">
      {editMode && moduleID ? (
        <DroppableSlot moduleID={moduleID} index={0} className={slotClass}>
          {content}
        </DroppableSlot>
      ) : (
        <div className={slotClass}>{content}</div>
      )}
    </section>
  );
}
