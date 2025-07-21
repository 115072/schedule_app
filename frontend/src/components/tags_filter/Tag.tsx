import { useState } from "react";

const Tag = ({
  name,
  color,
  level,
  isLast,
}: {
  name: string;
  color: string;
  level: number;
  isLast: boolean;
}) => {
  const [isActive, setActive] = useState(false);

  return (
    <div
      className={
        "flex flex-row items-center select-none cursor-pointer " +
        (isActive
          ? "bg-neutral-800 text-neutral-100 dark:bg-neutral-300 dark:text-neutral-800 transition-colors"
          : "")
      }
      onClick={() => setActive(!isActive)}
    >
      <div className="flex flex-row">
        {Array.from({ length: level }, (_, i) => (
          <div
            key={i}
            className={
              "size-[28px] grid grid-cols-2 grid-rows-2 text-neutral-400 dark:text-neutral-600 " +
              (isActive ? "text-neutral-600 dark:text-neutral-400" : "")
            }
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
      <div className="flex flex-row items-center gap-1 pl-[0.45rem]">
        <div
          className="size-4 rounded-xs"
          style={{ backgroundColor: color }}
        ></div>
        <div>{name}</div>
      </div>
    </div>
  );
};

export default Tag;
