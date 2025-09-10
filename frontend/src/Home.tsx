import MonthView from "@/components/month_overview/MonthView";
import DayEntriesView from "@/components/day_entries_view/DayEntriesView";

//TODO app styling

function Home() {
  return (
    <div className="flex flex-row min-w-screen pt-24">
      <div className="w-full">
        <MonthView></MonthView>
      </div>
      <DayEntriesView></DayEntriesView>
    </div>
  );
}

export default Home;
