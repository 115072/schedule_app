import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MonthView from "@/components/month_overview/MonthView";
import DayEntriesView from "@/components/day_entries_view/DayEntriesView";

//TODO event tag management
//TODO app styling

function App() {
  // useEffect(() => {
  //   fetch("http://localhost:4000/api/test")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Response from backend:", data);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch:", err);
  //     });
  // }, []);

  return (
    <>
      <Header></Header>
      <div className="flex flex-row min-w-screen pt-24">
        <div className="w-full">
          <MonthView></MonthView>
        </div>
        <DayEntriesView></DayEntriesView>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
