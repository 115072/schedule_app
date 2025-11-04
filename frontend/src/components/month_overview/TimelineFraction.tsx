import { useAppSelector } from "@/store/hooks";
import { findTagById, selectTags } from "@/store/tagsSlice";
import type { Event } from "@/utils/types";
import { useRef, useState } from "react";

export default function TimelineFraction({ events }: { events: Event[] }) {
  const tags = useAppSelector(selectTags);
  const gridTemplateRows = events.map(() => "1fr").join(" ");

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;

    setPos({
      x: rect.left + x - (tooltipRef.current?.offsetWidth || 0) / 2,
      y: rect.top - (tooltipRef.current?.offsetHeight || 0) - 8,
    });
  };

  return (
    <div>
      <div
        ref={triggerRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onMouseMove={handleMouseMove}
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
        <div
          ref={tooltipRef}
          className="fixed pointer-events-none p-2 bg-neutral-100 text-neutral-900 shadow-lg shadow-[rgba(0,0,0,0.50)] rounded-sm"
          style={{
            left: pos.x,
            top: pos.y,
            opacity: visible ? 1 : 0,
          }}
        >
          {events.map((e, i) => {
            return <div key={i}>{e.description}</div>;
          })}
        </div>
      ) : null}
    </div>
  );
}
