import { useAppDispatch, useAppSelector } from "@/store/hooks";
import TagSelectTree from "./TagSelectTree";
import { use, useEffect, useReducer } from "react";
import { selectTags, fetchTags, selectSelTagId } from "@/store/tagsSlice";
import {
  InputShownContext,
  InputShownDispatchContext,
} from "./TagInputContext";
import NewRootTagButton from "./NewRootTagButton";

const TagSelectList = ({ onChange }: { onChange: any }) => {
  const tags = useAppSelector(selectTags);
  const selTagId = useAppSelector(selectSelTagId);
  const dispatch = useAppDispatch();

  const [inputShown, inputShownDispatch] = useReducer(inputShownReducer, false);

  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  useEffect(() => {
    onChange(selTagId);
  }, [selTagId]);

  return (
    <div className="flex flex-col">
      <label className="pb-2">Select a tag:</label>
      <div className="min-w-full">
        <InputShownContext value={inputShown}>
          <InputShownDispatchContext value={inputShownDispatch}>
            <TagSelectTree tags={tags}></TagSelectTree>
            <NewRootTagButton />
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
