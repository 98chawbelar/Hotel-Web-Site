import Navbar from "../../components/hotelOwner/Navbar";
import Sidebar from "../../components/hotelOwner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

const Layout = () => {
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner]);

  return (
    <div className="flex flex-col h-screen   ">
      <Navbar />
      <div className="flex h-fit">
        <Sidebar />
        <div className="flex-1 p-4 pt-10 md:px-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
