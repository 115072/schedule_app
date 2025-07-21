
export interface Event {
  startTime: Date,
  durationMin: number,
  description: string,
  tags: string[]
}

export interface EventTag {
  name: string,
  color: string,
  subtags?: EventTag[]
}