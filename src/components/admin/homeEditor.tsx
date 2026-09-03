"use client";
import { useState } from "react";
import { ModuleType } from "@/types/layouts";
import { updateSlot, deleteSlot } from "@/lib/actions/layouts";
import { ArticleType } from "@/types/article";
import HomeLayout from "../layout/homelayout";
import { DragDropProvider, useDraggable } from "@dnd-kit/react";

function DraggableArticle({ article }: { article: ArticleType }) {
  const { ref } = useDraggable({ id: article.id });
  return (
    <div
      ref={ref}
      className="shrink-0 w-40 p-2 border rounded cursor-grab bg-white text-sm truncate"
    >
      {article.title}
    </div>
  );
}

export default function HomeEditor({
  initialModules,
  articlesByIDs,
}: {
  initialModules: ModuleType[];
  articlesByIDs: Record<string, ArticleType>;
}) {
  const [modules, setModules] = useState(initialModules);

  const assignSlot = async (
    moduleID: string,
    index: number,
    articleID: string,
  ) => {
    const savedModules = modules;
    setModules((prev) =>
      prev.map((module) =>
        module.id !== moduleID
          ? module
          : {
              ...module,
              config: {
                ...module.config,
                slots: module.config.slots.map((slot, i) =>
                  i === index ? articleID : slot,
                ),
              },
            },
      ),
    );

    try {
      await updateSlot(moduleID, index, articleID);
    } catch (e) {
      setModules(savedModules);
      alert("Couldn't save — are you signed in as an editor?");
    }
  };

  const removeSlot = async (moduleID: string, index: number) => {
    const savedModules = modules;
    setModules((prev) =>
      prev.map((module) =>
        module.id !== moduleID
          ? module
          : {
              ...module,
              config: {
                ...module.config,
                slots: module.config.slots.map((slot, i) =>
                  i === index ? null : slot,
                ),
              },
            },
      ),
    );

    try {
      await deleteSlot(moduleID, index);
    } catch (e) {
      setModules(savedModules);
      alert("No access");
    }
  };

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        const { source, target } = event.operation;
        if (event.canceled || !source || !target) {
          return;
        }
        const [moduleID, index] = String(target.id).split(":");
        assignSlot(moduleID, Number(index), String(source.id));
      }}
    >
      <main>
        <div className="flex gap-4 overflow-x-auto px-4 py-4 mb-6 rounded-xl bg-orange-100">
          {Object.values(articlesByIDs).map((a) => (
            <DraggableArticle key={a.id} article={a} />
          ))}
        </div>
        <HomeLayout
          modules={modules}
          articlesByIDs={articlesByIDs}
          editMode={true}
          assignSlot={assignSlot}
          removeSlot={removeSlot}
        ></HomeLayout>
      </main>
    </DragDropProvider>
  );
}
