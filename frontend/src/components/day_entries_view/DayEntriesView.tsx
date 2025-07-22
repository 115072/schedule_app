import { getMonthName, getOrdinal } from "@/utils/translateMonthNum";
import EventEntry from "./EventEntry";

import { useAppSelector } from "@/store/hooks";
import { selectEvents, selectDate } from "@/store/selectedDaySlice";

interface Props {
  active: boolean;
}

const DayEntriesView = ({ active }: Props) => {
  const events = useAppSelector(selectEvents);
  const date = useAppSelector(selectDate);

  if (!active) return;
  return (
    <div className="w-[30vw] px-4 max-h-[80vh] overflow-scroll">
      <div className="flex flex-row sticky top-0 bg-neutral-300 dark:bg-neutral-900 justify-between items-center pb-4">
        <button
          // onClick={() => setSelDay(null)}
          className="text-6xl cursor-pointer select-none"
        >
          x
        </button>
        <span className="text-3xl font-bold">
          {getOrdinal(new Date(date).getUTCDate())}{" "}
          {getMonthName(new Date(date).getUTCMonth())}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {events.map((event, i) => (
          <EventEntry event={event} key={i}></EventEntry>
        ))}
      </div>
    </div>
  );
};

export default DayEntriesView;
