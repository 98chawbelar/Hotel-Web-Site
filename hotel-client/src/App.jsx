import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import HotelRegistration from "./components/HotelRegistration";
import Layout from "./pages/hotelOwner/Layout";
import Dasboard from "./pages/hotelOwner/Dasboard";
import AddRooms from "./pages/hotelOwner/AddRooms";
import ListRooms from "./pages/hotelOwner/ListRooms";
const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {false && <HotelRegistration />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dasboard />} />
            <Route path="add-rooms" element={<AddRooms />} />
            <Route path="list-rooms" element={<ListRooms />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
