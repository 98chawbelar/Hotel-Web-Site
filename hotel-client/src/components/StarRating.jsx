import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export const StarRating = ({ rating = 4 }) => {
  return (
    <>
      {Array(5)
        .fill("")
        .map((_, index) =>
          rating > index ? (
            <FaStar
              alt="star-icon"
              key={index}
              className="h-4.5 w-4.5 text-amber-600"
            />
          ) : (
            <FaRegStar
              alt="star-icon"
              key={index}
              className="h-4.5 w-4.5 text-amber-600"
            />
          )
        )}
    </>
  );
};
