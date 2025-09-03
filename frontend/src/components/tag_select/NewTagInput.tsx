import { addNewTag, fetchTags, type EventTag } from "@/store/tagsSlice";
import { useContext, useState } from "react";
import { SwatchesPicker, type ColorResult } from "react-color";
import { InputShownDispatchContext } from "./TagInputContext";
import { useAppDispatch } from "@/store/hooks";

const NewTagInput = ({
  hidden,
  parentTag,
  level,
}: {
  hidden: boolean;
  parentTag: EventTag;
  level: number;
}) => {
  const dispatch = useAppDispatch();

  const [colorPickerShown, setColorPickerShown] = useState(false);
  const [pickedColor, setPickedColor] = useState(parentTag.color);
  const [newTagName, setNewTagName] = useState("");

  const handleColorChange = (color: ColorResult) => {
    setPickedColor(color.hex);
    setColorPickerShown(false);
  };

  const dispatchGlobalInputShown = useContext(InputShownDispatchContext);

  const handleClose = () => {
    setPickedColor(parentTag.color);
    setColorPickerShown(false);
    setNewTagName("");
    dispatchGlobalInputShown(false);
  };

  const handleSubmit = () => {
    if (newTagName.trim() === "" || newTagName === null) {
      return;
    }
    dispatch(
      addNewTag({
        id: 0,
        name: newTagName,
        color: pickedColor,
        parenttag: parentTag.id,
      })
    ).then(() => {
      dispatch(fetchTags());
    });
    handleClose();
  };

  return (
    <div
      hidden={hidden}
      className="flex flex-row h-8 w-full px-2 items-center justify-between select-none group relative"
    >
      <div
        className="flex flex-row items-center gap-1 w-full"
        style={{ marginLeft: level * 28 }}
      >
        <div
          onClick={() => setColorPickerShown(!colorPickerShown)}
          className="size-5 rounded-xs hover:cursor-pointer"
          style={{ backgroundColor: pickedColor }}
        ></div>
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          className="border-2 w-full"
        />
      </div>
      <div className="flex flex-row">
        <div
          onClick={() => handleClose()}
          className="hover:bg-neutral-400 flex items-center group/tooltip hover:cursor-pointer"
        >
          <span className="material-symbols-outlined">close</span>
        </div>
        <div
          onClick={() => handleSubmit()}
          className="hover:bg-neutral-400 flex items-center hover:cursor-pointer"
        >
          <span className="material-symbols-outlined">check</span>
        </div>
      </div>
      <div hidden={!colorPickerShown} className="absolute top-[110%]">
        <SwatchesPicker onChange={handleColorChange}></SwatchesPicker>
      </div>
    </div>
  );
};

export default NewTagInput;
