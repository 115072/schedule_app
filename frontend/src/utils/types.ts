import type { EventTag } from "@/store/tagsSlice";

export interface Event {
  startTimestamp: number,
  durationMin: number,
  description: string,
  tags?: EventTag[]
}

