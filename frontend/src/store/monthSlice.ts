import type { Event } from "@/utils/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { getMonthDays } from "@/utils/translateMonthNum";
import client from "@/api/client";

// Types, interfaces, constants

export interface DayEvents {
  date: string;
  events: Event[];
}

const initialState: { selDayIdx: number | null; days: DayEvents[] } = {
  selDayIdx: null,
  days: [],
};

const sortEvents = (events: Event[]): Event[] => {
  return events.sort((a, b) => {
    return a.startTimestamp - b.startTimestamp;
  });
};

const fetchMonthHelper = async (month: number) => {
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
        id: e.id,
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

    arr[dayIdx].events = sortEvents(arr[dayIdx].events);
  }

  return arr;
};

// Thunks

export const addNewEvent = createAsyncThunk(
  "days/addNewEvent",
  async (event: Event, { getState }) => {
    const state = getState() as RootState;
    const selDayIdx = state.month.selDayIdx;
    if (selDayIdx == null) return;

    await client({
      url: `/event`,
      method: "post",
      data: {
        day: new Date(state.month.days[selDayIdx].date)
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

export const deleteEvent = createAsyncThunk(
  "days/deleteEvent",
  async (eventId?: number) => {
    if (!eventId) return;
    await client({
      url: `/event/${eventId}`,
      method: "delete",
    });
    return eventId;
  }
);

export const updateEvent = createAsyncThunk(
  "days/updateEvent",
  async (event: Event) => {
    if (!event.id) return;
    // TODO
    const dateObj = new Date(event.startTimestamp);
    await client({
      url: `/event/${event.id}`,
      method: "put",
      data: {
        day: dateObj.toISOString().split("T")[0],
        start: `${dateObj.getUTCHours()}:${dateObj.getUTCMinutes()}:00`,
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

export const fetchMonth = createAsyncThunk("days/fetchMonth", fetchMonthHelper);

export const updateMonth = createAsyncThunk(
  "days/updateMonth",
  async (_, { getState }) => {
    const days = (getState() as RootState).month.days;
    const currMonth = new Date(days[0].date).getUTCMonth();
    return await fetchMonthHelper(currMonth);
  }
);

// Slice

export const monthSlice = createSlice({
  name: "month",
  initialState,
  reducers: {
    setSelDay: (state, action: PayloadAction<number>) => {
      state.selDayIdx = action.payload - 1;
    },
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
        }
      )
      .addCase(
        updateMonth.fulfilled,
        (state, action: PayloadAction<DayEvents[]>) => {
          state.days = action.payload;
        }
      )
      .addCase(addNewEvent.fulfilled, () => {})
      .addCase(addNewEvent.rejected, () => {
        console.error("Failed to add new event");
      })
      .addCase(deleteEvent.fulfilled, () => {})
      .addCase(updateEvent.fulfilled, () => {});
  },
});

export default monthSlice.reducer;
export const { setSelDay } = monthSlice.actions;

export const selectDays = (state: RootState) => state.month.days;
export const selectSelDay = (state: RootState) => {
  if (state.month.selDayIdx != null) {
    return state.month.days[state.month.selDayIdx];
  } else {
    return null;
  }
};

export const selectFilteredDays = (
  state: RootState,
  filteredTagIds: number[]
) => {
  if (filteredTagIds.length === 0) return state.month.days;

  return state.month.days.map((day) => ({
    ...day,
    events: day.events.filter(
      (e) => e.tagID && filteredTagIds.includes(e.tagID)
    ),
  }));
};
