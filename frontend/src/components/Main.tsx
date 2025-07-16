import Tags from "./tags_filter/Tags";
import MonthView from "./month_overview/MonthView";
import DayEntriesView from "./day_entries_view/DayEntriesView";
import "./Main.css";
import { SelectedDayContext, type TDayData } from "../SelectedDayContext";
import { useState } from "react";

const Main = () => {
  const [selDay, setSelDay] = useState<TDayData>(null);

  return (
    <div className="main-content">
      <SelectedDayContext.Provider
        value={{
          data: selDay,
          setter: setSelDay,
        }}
      >
        <main>
          <Tags></Tags>
          <MonthView></MonthView>
        </main>
        <DayEntriesView active={true}></DayEntriesView>
      </SelectedDayContext.Provider>
    </div>
  );
};

export default Main;
