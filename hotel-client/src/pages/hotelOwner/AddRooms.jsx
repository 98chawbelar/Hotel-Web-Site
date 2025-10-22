import { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddRooms = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free Wi-Fi": false,
      "Air Conditioning": false,
      "Room Service": false,
      "Free Swimming Pool": false,
      "Mountain View": false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Check If All Inputs are filled
    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !inputs.amenities ||
      !Object.values(images).some((image) => image)
    ) {
      toast.error("Please Fill In All The Details ");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      // Converting Amenities to Array & keeping only enabled Amenities
      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append("amenities", JSON.stringify(amenities));

      // Adding Images to FormData
      Object.keys(images).forEach((key) => {
        images[key] && formData.append("images", images[key]);
      });
      const { data } = await axios.post("/api/rooms/", formData, {
        headers: { Authorization: `Bearer ${await getToken()} ` },
      });
      if (data.success) {
        toast.success(data.message);
        setInputs({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Free Wi-Fi": false,
            "Air Conditioning": false,
            "Room Service": false,
            "Free Swimming Pool": false,
            "Mountain View": false,
          },
        });
        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Title
        align={"left"}
        font={"outfit"}
        title={"Add Room"}
        subTitle={
          "Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience."
        }
      />
      {/* Upload Area For Images */}
      <p className="text-gray-800 mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              className="max-h-13 cursor-pointer opacity-80 "
              alt=""
            />
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const maxSize = 10 * 1024 * 1024; // 10 MB
                  if (file.size > maxSize) {
                    toast.error("Please upload an image smaller than 1.5MB");
                    e.target.value = ""; // reset the input
                    return;
                  }
                  setImages({ ...images, [key]: file });
                  toast.success("Image uploaded successfully!");
                }
              }}
            />
          </label>
        ))}
      </div>

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        {/* Room Type */}
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            value={inputs.roomType}
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            <option value="">Select Room Type</option>
            <option value="King Bed">King Bed</option>
            <option value="Twin Bed">Twin Bed</option>
            <option value="Deluxe King Bed">Deluxe King Bed</option>
            <option value="Deluxe Twin Bed">Deluxe Twin Bed</option>
            {/* 3 persons can stay in family suite */}
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        {/* Price Of Room */}
        <div>
          <p className="text-gray-900 mt-4">
            Price <span className="text-xs">/night</span>
          </p>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
          />
        </div>
      </div>

      {/* Amenities */}
      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
            />
            <label htmlFor={`amenities${index + 1}`}> {amenity}</label>
          </div>
        ))}
      </div>
      <button
        disabled={loading}
        className="bg-primary text-white px-8 py-2 rounded mt-8  cursor-pointer"
      >
        {loading ? "Adding..." : "Add Room"}
      </button>
    </form>
  );
};

export default AddRooms;
