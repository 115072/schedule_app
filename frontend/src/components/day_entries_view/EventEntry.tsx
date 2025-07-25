import { type Event } from "@/utils/types";
import Button from "@/components/Button";

const EventEntry = ({ event }: { event: Event }) => {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 p-3 rounded-sm">
      <div className="font-bold mb-1">{event.description}</div>
      <div>Started: {new Date(event.startTimestamp).toUTCString()}</div>
      <div>Duration: {event.durationMin}min</div>
      <div className="flex flex-row justify-end gap-4">
        <Button
          text="Edit"
          action={() => {
            console.log("edit");
          }}
        ></Button>
        <Button
          text="Delete"
          type="danger"
          action={() => {
            console.log("delete");
          }}
        ></Button>
      </div>
    </div>
  );
};

export default EventEntry;
