import type { Event } from "@/utils/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { getMonthDays } from "@/utils/translateMonthNum";
import client from "@/api/client";

//TODO connect to API

export interface DayEvents {
  date: string;
  events: Event[];
}

const initialState: { selDayIdx: number | null; days: DayEvents[] } = {
  selDayIdx: null,
  days: [],
};

export const daysSlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    setSelDay: (state, action: PayloadAction<number>) => {
      state.selDayIdx = action.payload - 1;
    },
    // addNewEvent: (state, action: PayloadAction<Event>) => {
    //   if (!state.selDayIdx) return;
    //   state.days[state.selDayIdx].events.push(action.payload);
    //   state.days[state.selDayIdx].events.sort(
    //     (a, b) => a.startTimestamp - b.startTimestamp
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonth.pending, () => {
        console.log("fetching month...");
      })
      .addCase(
        fetchMonth.fulfilled,
        (state, action: PayloadAction<DayEvents[]>) => {
          state.days = action.payload;
          state.selDayIdx = 0;

          console.log(state.days);
        }
      )
      .addCase(addNewEvent.fulfilled, (state, action) => {
        if (action.payload == null || state.selDayIdx == null) return;
        state.days[state.selDayIdx].events.push(action.payload);
        state.days[state.selDayIdx].events.sort(
          (a, b) => a.startTimestamp - b.startTimestamp
        );
      })
      .addCase(addNewEvent.rejected, () => {
        console.error("Failed to add new event");
      });
  },
});

export const addNewEvent = createAsyncThunk(
  "days/addNewEvent",
  async (event: Event, { getState }) => {
    const state = getState() as RootState;
    const selDayIdx = state.days.selDayIdx;
    if (selDayIdx == null) return;

    await client({
      url: `/event`,
      method: "post",
      data: {
        day: new Date(state.days.days[selDayIdx].date)
          .toISOString()
          .split("T")[0],
        start: `${new Date(event.startTimestamp).getUTCHours()}:${new Date(
          event.startTimestamp
        ).getUTCMinutes()}:00`,
        duration: `${Math.floor(event.durationMin / 60)}:${
          event.durationMin % 60
        }:00`,
        description: event.description,
        tag: event.tagID,
      },
    });

    return event;
  }
);

export const fetchMonth = createAsyncThunk(
  "days/fetchMonth",
  async (month: number) => {
    let arr: DayEvents[] = [];
    for (let i = 1; i <= getMonthDays(month); i++) {
      const day: Date = new Date(2025, month, i + 1);
      arr.push({
        date: day.toUTCString(),
        events: [],
      });
    }

    const response = await client({
      url: `/event/date/${2025}/${month + 1}`,
      method: "get",
    });

    for (let [dateStr, evts] of Object.entries(response.data) as [
      string,
      Array<any>
    ][]) {
      const dayIdx: number = Number(dateStr.split("-")[2]) - 1;

      arr[dayIdx].events = evts.map(
        (e: any): Event => ({
          startTimestamp: new Date(arr[dayIdx].date).setUTCHours(
            e.start.split(":")[0],
            e.start.split(":")[1]
          ),
          durationMin:
            Number(e.duration.split(":")[0]) * 60 +
            Number(e.duration.split(":")[1]),
          description: e.description,
          //TODO
          tagID: e.tag,
        })
      );
    }

    return arr;
  }
);

export default daysSlice.reducer;
export const { setSelDay } = daysSlice.actions;

export const selectDays = (state: RootState) => state.days;
export const selectSelDay = (state: RootState) => {
  if (state.days.selDayIdx != null) {
    return state.days.days[state.days.selDayIdx];
  } else {
    return null;
  }
};
