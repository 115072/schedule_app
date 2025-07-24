import type { Event } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store"


export interface selDayState {
  date: string,
  events: Event[]
}

const initialState: selDayState = {
  date: Date(),
  events: fetchDayEvents(new Date())
}

function fetchDayEvents(date: Date):Event[] {
  // Example data for testing
  const arr: Event[] = []
  for (let i = 0; i < date.getUTCDate(); i++) {
    arr.push({startTimestamp: Date.now(), durationMin: 123, description: "Lorem ipsum dolor sit amet"})
  }
  return arr;
}

export const selDaySlice = createSlice({
  name: 'selDay',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
      state.events = fetchDayEvents(new Date(action.payload))
    }
  }
})

export default selDaySlice.reducer
export const {set} = selDaySlice.actions

export const selectSelDay = (state: RootState) => state.selDay
export const selectDate = (state: RootState) => state.selDay.date
export const selectEvents = (state: RootState) => state.selDay.events