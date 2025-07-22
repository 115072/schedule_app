import { useAppDispatch } from "@/store/hooks";
import { set } from "@/store/selectedDaySlice";

const DayBar = ({ date }: { date: Date }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="grid grid-cols-[1.5rem_auto] gap-2 items-center transition-all hover:font-bold min-h-10 hover:min-h-16 cursor-pointer">
      <a className="text-end text-xl">{date.getUTCDate()}</a>
      <div
        className="bg-neutral-200 dark:bg-neutral-800 rounded-sm h-full"
        onClick={() => dispatch(set(date.toDateString()))}
      ></div>
    </div>
  );
};

export default DayBar;
