import Tags from "./tags_filter/Tags";
import MonthView from "./month_overview/MonthView";
import DayEntriesView from "./day_entries_view/DayEntriesView";
import "./Main.css";

const Main = () => {
  return (
    <div className="main-content">
      <main>
        <Tags></Tags>
        <MonthView></MonthView>
      </main>
      <DayEntriesView active={true}></DayEntriesView>
    </div>
  );
};

export default Main;
