import { useAppDispatch } from "@/store/hooks";
import { toggleFilter, type EventTag } from "@/store/tagsSlice";
// import { useState } from "react";

const Tag = ({
  tag,
  level = 0,
  isLast = false,
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
      <div className="flex flex-row">
        {Array.from({ length: level }, (_, i) => (
          <div
            key={i}
            className={"size-8 grid grid-cols-2 grid-rows-2 text-neutral-500"}
          >
            <div className={i === level - 1 ? "" : ""}></div>
            <div
              className={
                (i === level - 1 ? "border-l-2 border-b-2" : "border-l-2") +
                " " +
                (isLast && i === level - 1 ? "rounded-bl-md" : "")
              }
            ></div>
            <div className={i === level - 1 ? "" : ""}></div>
            <div
              className={isLast && i === level - 1 ? "" : "border-l-2"}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center gap-1 pl-[0.55rem]">
        <div
          className="size-4 rounded-xs"
          style={{ backgroundColor: tag.color }}
        ></div>
        <div>{tag.name}</div>
      </div>
    </div>
  );
};

export default Tag;
