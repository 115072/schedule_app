import { useAppDispatch, useAppSelector } from "@/store/hooks";
import TagSelectTree from "./TagSelectTree";
import { useEffect, useReducer } from "react";
import { selectTags, fetchTags } from "@/store/tagsSlice";
import {
  InputShownContext,
  InputShownDispatchContext,
} from "./TagInputContext";

const TagSelectList = () => {
  const tags = useAppSelector(selectTags);
  const dispatch = useAppDispatch();

  const [inputShown, inputShownDispatch] = useReducer(inputShownReducer, false);

  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  return (
    <div className="flex flex-col">
      <label className="pb-2">Select a tag:</label>
      <div className="min-w-full">
        <InputShownContext value={inputShown}>
          <InputShownDispatchContext value={inputShownDispatch}>
            <TagSelectTree tags={tags}></TagSelectTree>
          </InputShownDispatchContext>
        </InputShownContext>
      </div>
    </div>
  );
};

const inputShownReducer = (state: boolean, action: boolean) => {
  return action;
};

export default TagSelectList;
