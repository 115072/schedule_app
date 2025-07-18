import { type Event } from "@/utils/types";

import "@/styles/EventEntry.css";

const EventEntry = ({ event }: { event: Event }) => {
  return (
    <div className="event-entry-cont">
      <div className="event-entry-desc">{event.description}</div>
      <div>Started: {event.startTime.toLocaleTimeString()}</div>
      <div>Duration: {event.durationMin}</div>
    </div>
  );
};

export default EventEntry;
