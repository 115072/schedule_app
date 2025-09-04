import { useContext, useEffect, useState } from "react";
import NewTagInput from "./NewTagInput";
import {
  InputShownContext,
  InputShownDispatchContext,
} from "./TagInputContext";

const NewRootTagButton = () => {
  const [inputShown, setInputShown] = useState(false);
  const globalInputShown = useContext(InputShownContext);
  const dispatchGlobalInputShown = useContext(InputShownDispatchContext);

  useEffect(() => {
    if (!globalInputShown) {
      setInputShown(false);
    }
  }, [globalInputShown]);

  return (
    <>
      <div
        onClick={() => {
          if (!globalInputShown) {
            setInputShown(true);
            dispatchGlobalInputShown(true);
          }
        }}
        hidden={inputShown}
        className="flex flex-row h-8 w-full px-2 items-center justify-between select-none cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-700"
      >
        <div className="flex flex-row items-center gap-1">
          <span className="material-symbols-outlined">add</span>
          <div>New tag</div>
        </div>
      </div>
      <NewTagInput
        hidden={!inputShown}
        parentTag={null}
        level={0}
      ></NewTagInput>
    </>
  );
};

export default NewRootTagButton;
