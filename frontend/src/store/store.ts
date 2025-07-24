import { configureStore } from "@reduxjs/toolkit";
import selDayReducer from "@/store/selectedDaySlice";
import tagsReducer from "@/store/tagsSlice"
import daysReducer from "@/store/daysSlice"

export const store = configureStore({
  reducer: {
    selDay: selDayReducer,
    tags: tagsReducer,
    days: daysReducer
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
