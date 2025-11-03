import { configureStore } from "@reduxjs/toolkit";
import tagsReducer from "@/store/tagsSlice";
import monthReducer from "@/store/monthSlice";

export const store = configureStore({
  reducer: {
    tags: tagsReducer,
    month: monthReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
