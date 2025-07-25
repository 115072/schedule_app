import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MonthView from "@/components/month_overview/MonthView";
import DayEntriesView from "@/components/day_entries_view/DayEntriesView";
import TagsList from "@/components/tags_filter/TagsList";

//TODO event tag management
//TODO app styling

function App() {
  return (
    <>
      <Header></Header>
      <div className="flex flex-row min-w-screen pt-24">
        <div className="w-full">
          <TagsList></TagsList>
          <MonthView></MonthView>
        </div>
        <DayEntriesView></DayEntriesView>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
