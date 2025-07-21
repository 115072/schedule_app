import { type Event } from "@/utils/types";

const EventEntry = ({ event }: { event: Event }) => {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 p-3 rounded-sm">
      <div className="font-bold mb-1">{event.description}</div>
      <div>Started: {event.startTime.toLocaleTimeString()}</div>
      <div>Duration: {event.durationMin}min</div>
    </div>
  );
};

export default EventEntry;
