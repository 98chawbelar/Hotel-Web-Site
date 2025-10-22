import { CiCalendar, CiSearch } from "react-icons/ci";
import { cities } from "../assets/assets";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Hero = () => {
  const { navigate, getToken, axios, setSearchedCities } = useAppContext();
  const [destination, setDestination] = useState("");

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination = ${destination}`);

    // call api to save recent searched city
    await axios.post(
      "/api/user/store-recent-search",
      { recentSearchedCity: destination },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );

    // Add destination to searchedCities max 3 recent searched cities
    setSearchedCities((prevSearchedCities) => {
      const updatedSearchedCities = [...prevSearchedCities, destination];
      if (updatedSearchedCities > 3) {
        updatedSearchedCities.shift();
      }
      return updatedSearchedCities;
    });
  };

  return (
    <div
      className="flex flex-col text-white items-start justify-center 
      px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 
      bg-[url('/hero_image.webp')] bg-no-repeat bg-cover bg-center 
      h-screen w-full overflow-hidden"
    >
      {/* Tagline */}
      <p className="bg-[#49B9FF]/30 px-3.5 py-1 rounded-full mt-24 sm:mt-28 md:mt-32 text-xs sm:text-sm md:text-base">
        The Ultimate Hotel Experience
      </p>

      {/* Heading */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold md:font-extrabold leading-tight max-w-xl mt-4">
        Discover Your Perfect Gateway Destination
      </h1>

      {/* Description */}
      <p className="max-w-md sm:max-w-lg md:max-w-xl mt-2 text-sm sm:text-base">
        Unparalleled Luxury and comfort await at the world's most exclusive
        hotels and resorts. Start your journey today.
      </p>

      {/* Form */}
      <form
        onSubmit={onSearch}
        className="bg-white text-gray-700  rounded-lg px-6 py-4 mt-8 
        flex flex-col sm:flex-row flex-wrap gap-4 w-full max-w-4xl"
      >
        {/* Destination */}
        <div className="flex-1 min-w-[150px]">
          <div className="flex items-center gap-2">
            <CiCalendar className="h-4" />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            list="destinations"
            id="destinationInput"
            type="text"
            className="w-full rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        {/* Check-in */}
        <div className="flex-1 min-w-[150px]">
          <div className="flex items-center gap-2">
            <CiCalendar className="h-4" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className="w-full rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        {/* Check-out */}
        <div className="flex-1 min-w-[150px]">
          <div className="flex items-center gap-2">
            <CiCalendar className="h-4" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="w-full rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col min-w-[100px]">
          <label htmlFor="guests">Guests</label>
          <input
            min={1}
            max={10}
            id="guests"
            type="number"
            className="w-full rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="0"
          />
        </div>

        {/* Search Button */}
        <button
          className="flex  items-center justify-center gap-2 rounded-md bg-black text-white py-3 px-5 my-auto cursor-pointer 
          w-full sm:w-auto hover:bg-gray-800 transition"
        >
          <CiSearch className="h-5" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
