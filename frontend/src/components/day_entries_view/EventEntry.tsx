import { type Event } from "@/utils/types";
import Button from "@/components/Button";

//TODO 3-dot menu instead of buttons

const EventEntry = ({ event }: { event: Event }) => {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 p-3 rounded-sm">
      <div className="font-bold mb-1">{event.description}</div>
      <div>Started: {new Date(event.startTimestamp).toUTCString()}</div>
      <div>Duration: {event.durationMin}min</div>
      <div className="flex flex-row justify-end gap-4">
        <Button
          action={() => {
            console.log("edit");
          }}
        >
          Edit
        </Button>
        <Button
          type="danger"
          action={() => {
            console.log("delete");
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EventEntry;
