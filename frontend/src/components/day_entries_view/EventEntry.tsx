import { type Event } from "@/utils/types";
import Button from "@/components/Button";
import { deleteEvent, updateMonth } from "@/store/daysSlice";
import { useAppDispatch } from "@/store/hooks";
import CreateEntry from "./CreateEntry";
import { useState } from "react";
import { setSelTagId } from "@/store/tagsSlice";

//TODO 3-dot menu instead of buttons

const EventEntry = ({ event }: { event: Event }) => {
  const dispatch = useAppDispatch();

  const [isEditing, setEditing] = useState(false);

  return (
    <>
      <div
        hidden={isEditing}
        className="bg-neutral-200 dark:bg-neutral-800 p-3 rounded-sm"
      >
        <div className="font-bold mb-1">{event.description}</div>
        <div>Started: {new Date(event.startTimestamp).toUTCString()}</div>
        <div>Duration: {event.durationMin}min</div>
        <div className="flex flex-row justify-end gap-4">
          <Button
            action={() => {
              setEditing(true);
              dispatch(setSelTagId(event.tagID ?? null));
            }}
          >
            Edit
          </Button>
          <Button
            type="danger"
            action={() => {
              dispatch(deleteEvent(event.id)).then(() =>
                dispatch(updateMonth())
              );
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <div hidden={!isEditing}>
        <CreateEntry defaultEvent={event} closeFn={() => setEditing(false)} />
      </div>
    </>
  );
};

export default EventEntry;
