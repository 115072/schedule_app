import { useSelectedDayContext } from "@/utils/SelectedDayContext";
import { getMonthName, getOrdinal } from "@/utils/translateMonthNum";
import "@/styles/DayEntriesView.css";
import type { Event } from "@/utils/types";
import EventEntry from "./EventEntry";

interface Props {
  active: boolean;
}

const DayEntriesView = ({ active }: Props) => {
  const { data: selDay, setter: setSelDay } = useSelectedDayContext();

  const exampleData: Event = {
    description: "Lorem ipsum dolor sit amet",
    startTime: new Date(),
    durationMin: 69,
    tags: [],
  };

  if (!active || selDay === null) return;
  return (
    <div className="w-[30vw] px-4 max-h-[80vh] overflow-scroll">
      <div className="flex flex-row sticky top-0 bg-neutral-300 dark:bg-neutral-900 justify-between items-center pb-4">
        <button
          onClick={() => setSelDay(null)}
          className="text-6xl cursor-pointer select-none"
        >
          {">"}
        </button>
        <span className="text-3xl font-bold">
          {getOrdinal(selDay?.day)} {getMonthName(selDay?.month)}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: selDay.day }, () => (
          <EventEntry event={exampleData}></EventEntry>
        ))}
      </div>
    </div>
  );
};

export default DayEntriesView;
