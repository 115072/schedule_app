import {createContext,useContext, type Dispatch, type SetStateAction} from "react";

export interface IDayData {
  day: number
  month: string
}

export type TDayData = IDayData|null

export interface DayDataContext {
  data: TDayData,
  setter: Dispatch<SetStateAction<TDayData>>
}

export const SelectedDayContext = createContext<DayDataContext | undefined>(undefined);

export const useSelectedDayContext = () => {
  const ctx = useContext(SelectedDayContext);

  if (ctx === undefined) {
    throw new Error("useSelectedDayContext must be used with a SelectedDayContext")
  }

  return ctx;
}