import { useAppSelector } from "@/store/hooks";
import type { Event } from "@/utils/types";
import { useRef, useState } from "react";
import TagBadge from "../TagBadge";
import { selectTagById } from "@/store/tagsSlice";

export default function TimelineFraction({
  events,
  timePos,
}: {
  events: Event[];
  timePos: string;
}) {
  const gridTemplateRows = events.map(() => "1fr").join(" ");

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const x: number = e.clientX - rect.left;

    setPos({
      x: Math.max(
        8,
        rect.left + x - (tooltipRef.current?.offsetWidth || 0) / 2
      ),
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
          const clr = useAppSelector((s) => selectTagById(s, e.tagID))?.color;
          return (
            <div
              style={{ backgroundColor: clr ? clr : "#00000000" }}
              key={idx}
            ></div>
          );
        })}
      </div>
      <div
        ref={tooltipRef}
        className="fixed pointer-events-none p-2 bg-neutral-100 text-neutral-900 shadow-lg shadow-[rgba(0,0,0,0.50)] rounded-sm flex flex-col gap-2 max-w-64"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: visible ? 1 : 0,
        }}
      >
        {events.map((e, i) => {
          const clr = useAppSelector((s) => selectTagById(s, e.tagID))?.color;
          return (
            <span className="flex flex-row gap-2 items-center" key={i}>
              <TagBadge color={clr} />
              <span className="truncate">{e.description}</span>
            </span>
          );
        })}
        <span className="font-light">{timePos}</span>
      </div>
    </div>
  );
}
