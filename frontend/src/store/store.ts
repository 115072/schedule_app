import { configureStore } from "@reduxjs/toolkit";
import tagsReducer from "@/store/tagsSlice";
import daysReducer from "@/store/daysSlice";

export const store = configureStore({
  reducer: {
    tags: tagsReducer,
    days: daysReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
