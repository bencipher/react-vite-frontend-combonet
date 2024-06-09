import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/main.scss";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import BeltComponent from "../components/BeltComponent";

const BaseLayout = ({ searchHandler }: any) => {
  return (
    <>
      <BeltComponent />
      <Navbar />
      <Outlet />
      <SearchBar searchFunction={searchHandler} />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default BaseLayout;
