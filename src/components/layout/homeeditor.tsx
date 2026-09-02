"use client";
import { useState } from "react";
import { ModuleType } from "@/types/layouts";
import { updateSlot, deleteSlot } from "@/lib/actions/layouts";
import { ArticleType } from "@/types/article";
import HomeLayout from "./homelayout";

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
    <main>
      <HomeLayout
        modules={modules}
        articlesByIDs={articlesByIDs}
        editMode={true}
        assignSlot={assignSlot}
        removeSlot={removeSlot}
      ></HomeLayout>
    </main>
  );
}
