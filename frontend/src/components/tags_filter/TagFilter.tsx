import { useAppDispatch } from "@/store/hooks";
import { toggleFilter, type EventTag } from "@/store/tagsSlice";
// import { useState } from "react";

const TagFilter = ({
  tag,
  level = 0,
}: {
  tag: EventTag;
  level?: number;
  isLast?: boolean;
}) => {
  // const [isActive, setActive] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div
      className={
        "flex flex-row h-8 w-64 items-center select-none cursor-pointer transition-colors border-2 box-border hover:bg-neutral-800 hover:text-neutral-100 dark:hover:bg-neutral-200 dark:hover:text-neutral-900 " +
        (tag.filter == "active"
          ? "bg-neutral-400 dark:bg-neutral-700 border-transparent "
          : "") +
        (tag.filter == "partial"
          ? "border-dashed border-neutral-500 dark:border-neutral-600 "
          : "border-transparent ")
      }
      onClick={() => dispatch(toggleFilter(tag))}
    >
      <div
        className="flex flex-row items-center gap-1"
        style={{ marginLeft: level * 24 }}
      >
        <div
          className="size-4 rounded-xs"
          style={{ backgroundColor: tag.color }}
        ></div>
        <div>{tag.name}</div>
      </div>
    </div>
  );
};

export default TagFilter;
