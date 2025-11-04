import { useAppSelector } from "@/store/hooks";
import { findTagById, selectTags } from "@/store/tagsSlice";
import type { Event } from "@/utils/types";

export default function TimelineFraction({ events }: { events: Event[] }) {
  const tags = useAppSelector(selectTags);

  const gridTemplateRows = events.map(() => "1fr").join(" ");

  return (
    <div className="relative group block">
      <div
        className="grid h-full"
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
      {events.length != 0 ? (
        <div className="absolute hidden group-hover:block bottom-[120%] left-1/2 -translate-x-1/2 p-2 bg-neutral-100 text-neutral-900 shadow-lg shadow-[rgba(0,0,0,0.50)] rounded-sm">
          {events.map((e) => {
            return <div>{e.description}</div>;
          })}
        </div>
      ) : null}
    </div>
  );
}
