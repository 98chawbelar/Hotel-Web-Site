import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, ref: "User" },
    room: { type: String, required: true, ref: "Room" },
    hotel: { type: String, required: true, ref: "Hotel" },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    guests: { type: Number, required: true },
    status: {
      type: String,
      enum: ["reserved", "cancelled", "confirmed"],
      default: "reserved",
    },
    paymentMethod: { type: String, required: true, default: "pay at hotel" },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
