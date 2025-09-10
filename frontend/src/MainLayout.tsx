import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
