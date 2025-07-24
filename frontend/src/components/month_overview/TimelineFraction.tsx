import { useAppSelector } from "@/store/hooks";
import { findTagById, selectTags } from "@/store/tagsSlice";
import type { Event } from "@/utils/types";

export default function TimelineFraction({ events }: { events: Event[] }) {
  const tags = useAppSelector(selectTags);

  const gridTemplateRows = events.map(() => "1fr").join(" ");

  return (
    <div
      className="grid"
      style={{
        gridTemplateRows,
      }}
    >
      {events.map((e, idx) => {
        const clr = findTagById(e.tagID, tags)?.color;
        return (
          <div
            style={{ backgroundColor: clr ? clr : "#00000000" }}
            key={idx}
          ></div>
        );
      })}
    </div>
  );
}
