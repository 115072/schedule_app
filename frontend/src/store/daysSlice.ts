import type { Event } from "@/utils/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { getMonthDays } from "@/utils/translateMonthNum";

//TODO connect to API

export interface DayEvents {
  date: string;
  events: Event[];
}

function fetchDaysOfMonth(arr: DayEvents[], month: number) {
  // Fake data
  //TODO fetch from API
  arr.splice(0);
  for (let i = 1; i <= getMonthDays(month); i++) {
    const day: Date = new Date(2025, month, i + 1);
    arr.push({
      date: day.toUTCString(),
      events:
        i % month != 0
          ? []
          : [
              {
                startTimestamp: day.setUTCHours(4, 0),
                durationMin: 15,
                description: "This is a test event",
                tagID: 3,
              },
              {
                startTimestamp: day.setUTCHours(7, 30),
                durationMin: 120,
                description: "This is a test event",
                tagID: 1,
              },
              {
                startTimestamp: day.setUTCHours(8, 30),
                durationMin: 120,
                description: "This is a test event",
                tagID: 2,
              },
              {
                startTimestamp: day.setUTCHours(12, 0),
                durationMin: 300,
                description: "This is a test event",
                tagID: 32,
              },
              {
                startTimestamp: day.setUTCHours(13, 30),
                durationMin: 160,
                description: "This is a test event",
                tagID: 123,
              },
              {
                startTimestamp: day.setUTCHours(14, 30),
                durationMin: 220,
                description: "This is a test event",
                tagID: 12,
              },
            ],
    });
  }
}

const initialState: { selDayIdx: number | null; days: DayEvents[] } = {
  selDayIdx: null,
  days: [],
};

export const daysSlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    fetchMonth: (state, action: PayloadAction<number>) => {
      fetchDaysOfMonth(state.days, action.payload);
      state.selDayIdx = 0;
    },
    setSelDay: (state, action: PayloadAction<number>) => {
      state.selDayIdx = action.payload - 1;
    },
    addNewEvent: (state, action: PayloadAction<Event>) => {
      if (!state.selDayIdx) return;
      state.days[state.selDayIdx].events.push(action.payload);
      state.days[state.selDayIdx].events.sort(
        (a, b) => a.startTimestamp - b.startTimestamp
      );
    },
  },
});

export default daysSlice.reducer;
export const { fetchMonth, setSelDay, addNewEvent } = daysSlice.actions;

export const selectDays = (state: RootState) => state.days;
export const selectSelDay = (state: RootState) => {
  if (state.days.selDayIdx != null) {
    return state.days.days[state.days.selDayIdx];
  } else {
    return null;
  }
};
