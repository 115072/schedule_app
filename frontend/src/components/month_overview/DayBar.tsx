import {
  useSelectedDayContext,
  type IDayData,
} from "@/utils/SelectedDayContext";

const DayBar = ({ day, month }: IDayData) => {
  const { setter: setSelDay } = useSelectedDayContext();

  return (
    <div className="grid grid-cols-[1.5rem_auto] gap-2 items-center transition-all hover:font-bold min-h-10 hover:min-h-16 cursor-pointer">
      <a className="text-end text-xl">{day}</a>
      <div
        className="bg-neutral-200 dark:bg-neutral-800 rounded-sm h-full"
        onClick={() => setSelDay({ day, month })}
      ></div>
    </div>
  );
};

export default DayBar;
