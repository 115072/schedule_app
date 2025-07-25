import { getMonthName, getOrdinal } from "@/utils/translateMonthNum";
import EventEntry from "./EventEntry";

import { useAppSelector } from "@/store/hooks";
import { selectSelDay } from "@/store/daysSlice";
import CreateEntry from "./CreateEntry";

const DayEntriesView = () => {
  const selDay = useAppSelector(selectSelDay);

  return (
    <div className="w-[30vw] px-4 h-[80dvh] overflow-scroll sticky top-24">
      <div className="flex flex-row sticky top-0 bg-neutral-300 dark:bg-neutral-900 justify-between items-center pb-4">
        <span className="text-3xl font-bold">
          {getOrdinal(new Date(selDay ? selDay.date : Date()).getUTCDate())}{" "}
          {getMonthName(new Date(selDay ? selDay.date : Date()).getUTCMonth())}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <CreateEntry></CreateEntry>
        {selDay?.events.map((event, i) => (
          <EventEntry event={event} key={i}></EventEntry>
        ))}
      </div>
    </div>
  );
};

export default DayEntriesView;
