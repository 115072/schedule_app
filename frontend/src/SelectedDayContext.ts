import {createContext,useContext, type Dispatch, type SetStateAction} from "react";

export interface DayData {
  day: number
  month: string
}

export interface DayDataContext {
  data: DayData,
  setter: Dispatch<SetStateAction<DayData>>
}

export const SelectedDayContext = createContext<DayDataContext | undefined>(undefined);

export const useSelectedDayContext = () => {
  const ctx = useContext(SelectedDayContext);

  if (ctx === undefined) {
    throw new Error("useSelectedDayContext must be used with a SelectedDayContext")
  }

  return ctx;
}