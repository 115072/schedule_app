import { useState } from "react";
import { SelectedDayContext, type TDayData } from "@/utils/SelectedDayContext";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MonthView from "@/components/month_overview/MonthView";
import DayEntriesView from "@/components/day_entries_view/DayEntriesView";
import TagsList from "@/components/tags_filter/TagsList";

function App() {
  const [selDay, setSelDay] = useState<TDayData>(null);

  return (
    <>
      <Header></Header>
      <div className="flex flex-row min-w-screen">
        <SelectedDayContext.Provider
          value={{
            data: selDay,
            setter: setSelDay,
          }}
        >
          <div className="w-full">
            <TagsList></TagsList>
            <MonthView></MonthView>
          </div>
          <DayEntriesView active={true}></DayEntriesView>
        </SelectedDayContext.Provider>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
