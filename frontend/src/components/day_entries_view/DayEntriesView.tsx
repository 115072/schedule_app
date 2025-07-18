import { useSelectedDayContext } from "@/utils/SelectedDayContext";
import { getMonthName } from "@/utils/translateMonthNum";
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
    <div className="day-entries-cont">
      <button onClick={() => setSelDay(null)}>CLOSE</button>
      <p>Day: {selDay?.day}</p>
      <p>Month: {getMonthName(selDay?.month)}</p>
      <div className="entries-list">
        <EventEntry event={exampleData}></EventEntry>
        <EventEntry event={exampleData}></EventEntry>
        <EventEntry event={exampleData}></EventEntry>
      </div>
    </div>
  );
};

export default DayEntriesView;
