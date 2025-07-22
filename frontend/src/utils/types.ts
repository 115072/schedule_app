
export interface Event {
  startTimestamp: number,
  durationMin: number,
  description: string,
  tags?: EventTag[]
}

export interface EventTag {
  name: string,
  color: string,
  subtags?: EventTag[]
}