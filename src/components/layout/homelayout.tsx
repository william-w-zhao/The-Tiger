import { Hero } from "@/components/cards/hero";
import { Row } from "@/components/cards/row";
import { Column } from "@/components/cards/column";
import { ModuleType } from "@/types/layouts";
import { ArticleType } from "@/types/article";

export default function HomeLayout({
  modules,
  articlesByIDs,
  editMode,
  assignSlot,
  removeSlot,
}: {
  modules: ModuleType[];
  articlesByIDs: Record<string, ArticleType>;
  editMode: boolean;
  assignSlot?: (moduleID: string, index: number, articleID: string) => void;
  removeSlot?: (moduleID: string, index: number) => void;
}) {
  const hero = modules.find((m) => m.type === "HERO");
  const cols = modules.filter((m) => m.type === "COLUMN");
  const left = cols.find((m) => m.config?.orientation === "vertical");
  const right = cols.find((m) => m.config?.orientation === "horizontal");
  const bottom = modules.find((m) => m.type === "ROW");

  const itemsFor = (module?: ModuleType) =>
    (module?.config?.slots ?? []).map((id, index) => ({
      index,
      article: id ? (articlesByIDs[id] ?? null) : null,
    }));

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] items-stretch lg:divide-x lg:divide-gray-200">
        <Column
          moduleID={left?.id}
          items={itemsFor(left)}
          orientation="vertical"
          editMode={editMode}
          removeSlot={
            removeSlot && left
              ? (index) => removeSlot(left.id, index)
              : undefined
          }
        />
        <Hero
          moduleID={hero?.id}
          items={itemsFor(hero)}
          editMode={editMode}
          removeSlot={
            removeSlot && hero
              ? (index) => removeSlot(hero.id, index)
              : undefined
          }
        />
        <Column
          moduleID={right?.id}
          items={itemsFor(right)}
          orientation="horizontal"
          editMode={editMode}
          removeSlot={
            removeSlot && right
              ? (index) => removeSlot(right.id, index)
              : undefined
          }
        />
      </div>
      <hr className="hidden lg:block h-[1.5px] w-full border-0 bg-[#DEDEDE] my-6" />
      <Row
        moduleID={bottom?.id}
        items={itemsFor(bottom)}
        orientation="vertical"
        editMode={editMode}
        removeSlot={
          removeSlot && bottom
            ? (index) => removeSlot(bottom.id, index)
            : undefined
        }
      />
    </div>
  );
}
