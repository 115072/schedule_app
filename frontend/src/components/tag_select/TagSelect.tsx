import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectSelTag,
  selectSelTagId,
  setSelTag,
  type EventTag,
} from "@/store/tagsSlice";
import { useContext, useEffect, useState } from "react";
import NewTagInput from "./NewTagInput";
import {
  InputShownContext,
  InputShownDispatchContext,
} from "./TagInputContext";

const TagSelect = ({ tag, level = 0 }: { tag: EventTag; level?: number }) => {
  const [inputShown, setInputShown] = useState(false);
  const globalInputShown = useContext(InputShownContext);
  const dispatchGlobalInputShown = useContext(InputShownDispatchContext);

  const selTagId = useAppSelector(selectSelTagId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!globalInputShown) {
      setInputShown(false);
    }
  }, [globalInputShown]);

  return (
    <>
      <div
        onClick={() => {
          dispatch(setSelTag(tag.id));
        }}
        className={
          "flex flex-row h-8 w-full px-2 items-center justify-between select-none cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-700 group " +
          (selTagId == tag.id ? "bg-blue-200" : "")
        }
      >
        <div
          className="flex flex-row items-center gap-1"
          style={{ marginLeft: level * 28 }}
        >
          <div
            className="size-5 rounded-xs"
            style={{ backgroundColor: tag.color }}
          ></div>
          <div>{tag.name}</div>
        </div>
        <div className="flex flex-row">
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="not-group-hover:invisible group-hover:visible hover:bg-neutral-400 flex items-center group/tooltip"
          >
            <span className="material-symbols-outlined">more_vert</span>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (!globalInputShown) {
                setInputShown(true);
                dispatchGlobalInputShown(true);
              }
            }}
            className="not-group-hover:invisible group-hover:visible hover:bg-neutral-400 flex items-center"
          >
            <span className="material-symbols-outlined">add</span>
          </div>
        </div>
      </div>
      <NewTagInput
        hidden={!inputShown}
        parentTag={tag}
        level={level + 1}
      ></NewTagInput>
    </>
  );
};

export default TagSelect;
