import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import { SelectedDayContext, type TDayData } from "./SelectedDayContext";
import MonthView from "./components/month_overview/MonthView";
import Tags from "./components/tags_filter/Tags";
import DayEntriesView from "./components/day_entries_view/DayEntriesView";
import "./App.css";

function App() {
  const [selDay, setSelDay] = useState<TDayData>(null);

  return (
    <>
      <Header></Header>
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
      <Footer></Footer>
    </>
  );
}

export default App;
