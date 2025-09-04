import { useAppDispatch, useAppSelector } from "@/store/hooks";
import TagFilterTree from "./TagFilterTree";
import { useEffect, useState } from "react";
import { selectTags, fetchTags } from "@/store/tagsSlice";

//TODO add 'reset filter' button

const TagFilterList = () => {
  const [shown, setShown] = useState(false);
  const tags = useAppSelector(selectTags);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  return (
    <div className="flex flex-col">
      <div
        className="text-xl items-center py-2 px-6 mb-4 max-w-fit rounded-md cursor-pointer bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        onClick={() => setShown(!shown)}
      >
        {shown ? "A" : "V"} Filter
      </div>
      <div className={"px-6 max-w-[20vw] " + (shown ? "" : "hidden")}>
        <TagFilterTree tags={tags}></TagFilterTree>
      </div>
    </div>
  );
};

export default TagFilterList;
