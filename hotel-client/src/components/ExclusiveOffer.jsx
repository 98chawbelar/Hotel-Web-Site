import React from "react";
import Title from "./Title";
import { FaArrowRightLong } from "react-icons/fa6";
import { exclusiveOffers } from "../assets/assets";

const ExclusiveOffer = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <Title
          align={"left"}
          title={"Exclusive Offers"}
          subTitle={
            "Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
          }
        />
        <button className="group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12">
          View All Offers
          <FaArrowRightLong
            alt="arrow-icon"
            className="group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="group relative flex flex-col  items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundColor: "rgba(0,0,0,0.4)",
              backgroundBlendMode: "overlay",
            }}
          >
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white/50 text-black font-semibold rounded-full">
              {item.priceOff}% OFF
            </p>
            <div>
              <p className="text-2xl text-white font-medium ">{item.title}</p>
              <p>{item.description}</p>
              <p className="text-xs text-white/70 mt-3">
                Expires {item.expiryDate}
              </p>
            </div>
            <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
              View Offers
              <FaArrowRightLong
                alt="arrow-icon"
                className="invert group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffer;
