import { configureStore } from "@reduxjs/toolkit";
import selDayReducer from "@/store/selectedDaySlice";

export const store = configureStore({
  reducer: {
    selDay: selDayReducer
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
