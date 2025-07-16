import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:4000/api/test")
      .then((res) => res.json())
      .then((data) => {
        console.log("Response from backend:", data);
      })
      .catch((err) => {
        console.error("Failed to fetch:", err);
      });
  }, []);

  return (
    <>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </>
  );
}

export default App;
