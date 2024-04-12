import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

const BaseLayout = ({ searchHandler }) => {
  return (
    <>
      <Navbar />
      <Outlet />
      <SearchBar searchFunction={searchHandler} />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default BaseLayout;
