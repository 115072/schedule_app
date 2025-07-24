import { setSelDay, type DayEvents } from "@/store/daysSlice";
import { useAppDispatch } from "@/store/hooks";
import type { Event } from "@/utils/types";
import TimelineFraction from "./TimelineFraction";

interface TimeFrac {
  fr: number;
  events: Event[];
}

const sortedTimestamps = (date: Date, events: Event[]): number[] => {
  const timestamps: number[] = [
    new Date(date).setUTCHours(0, 0, 0, 0),
    new Date(date).setUTCHours(23, 59, 59, 999),
  ];
  events.forEach((e) => {
    timestamps.push(e.startTimestamp);
    timestamps.push(e.startTimestamp + e.durationMin * 60000);
  });

  const uniques = [...new Set(timestamps)];
  uniques.sort();
  return uniques;
};

const calcTimeFractions = (day: DayEvents): TimeFrac[] => {
  if (day === undefined) return [];
  const stamps: number[] = sortedTimestamps(new Date(day.date), day.events);
  const timeFractions: TimeFrac[] = [];

  for (let i = 0; i < stamps.length - 1; i++) {
    const frac = {
      fr: Math.abs(stamps[i] - stamps[i + 1]),
      events: day.events.filter((e) => {
        const start = e.startTimestamp;
        const end = e.startTimestamp + 60000 * e.durationMin;
        return stamps[i] >= start && stamps[i + 1] <= end;
      }),
    };
    timeFractions.push(frac);
  }

  return timeFractions;
};

const DayBar = ({ day }: { day: DayEvents }) => {
  const dispatch = useAppDispatch();

  const timeFracs = calcTimeFractions(day);
  const gridTemplateColumns = timeFracs.map((tf) => `${tf.fr}fr`).join(" ");

  return (
    <div className="grid grid-cols-[1.5rem_auto] gap-2 items-center transition-all hover:font-bold min-h-10 hover:min-h-16 cursor-pointer">
      <a className="text-end text-xl">{new Date(day.date).getUTCDate()}</a>
      <div
        className="grid bg-neutral-200 dark:bg-neutral-800 rounded-sm h-full"
        onClick={() => dispatch(setSelDay(new Date(day.date).getUTCDate()))}
        style={{
          gridTemplateColumns,
        }}
      >
        {timeFracs.map((tf, idx) => (
          <TimelineFraction events={tf.events} key={idx}></TimelineFraction>
        ))}
      </div>
    </div>
  );
};

export default DayBar;
