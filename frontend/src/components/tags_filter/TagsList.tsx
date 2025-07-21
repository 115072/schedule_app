import type { EventTag } from "@/utils/types";
import TagTree from "./TagTree";
import { useState } from "react";

const TagsList = () => {
  const tags: EventTag[] = [
    {
      name: "Tag 1",
      color: "#e57373",
      subtags: [
        {
          name: "Tag 1.1",
          color: "#64b5f6",
        },
        {
          name: "Tag 1.2",
          color: "#81c784",
          subtags: [
            {
              name: "Tag 1.2.1",
              color: "#ffd54f",
            },
          ],
        },
        {
          name: "Tag 1.3",
          color: "#ba68c8",
        },
      ],
    },
    {
      name: "Tag 2",
      color: "#4db6ac",
    },
    {
      name: "Tag 1",
      color: "#f06292",
      subtags: [
        {
          name: "Tag 1.1",
          color: "#7986cb",
        },
        {
          name: "Tag 1.2",
          color: "#aed581",
          subtags: [
            {
              name: "Tag 1.2.1",
              color: "#ff8a65",
            },
          ],
        },
        {
          name: "Tag 1.3",
          color: "#4fc3f7",
        },
      ],
    },
  ];

  const [shown, setShown] = useState(true);

  return (
    <div className="flex flex-col pl-12">
      <div
        className="text-xl items-center py-2 px-6 mb-4 max-w-fit rounded-md cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        onClick={() => setShown(!shown)}
      >
        {shown ? "A" : "V"} Filter
      </div>
      <div className={"px-6 max-w-[20vw] " + (shown ? "" : "hidden")}>
        <TagTree tags={tags}></TagTree>
      </div>
    </div>
  );
};

export default TagsList;
