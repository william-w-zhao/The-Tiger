"use client";

import { useDroppable } from "@dnd-kit/react";

export default function DroppableSlot({
  moduleID,
  index,
  className,
  children,
}: {
  moduleID: string;
  index: number;
  className: string;
  children: React.ReactNode;
}) {
  const { ref, isDropTarget } = useDroppable({ id: `${moduleID}:${index}` });
  return (
    <div
      ref={ref}
      data-over={isDropTarget}
      className={`group/drop ${className}`}
    >
      {children}
    </div>
  );
}
