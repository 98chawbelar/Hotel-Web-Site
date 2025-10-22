import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRoute from "./routes/hotelRoutes.js";
import { connectCloudinary } from "./configs/cloudinary.js";
import { roomRouter } from "./routes/roomRoute.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Connect to the database
connectDB();

// Connect to Cloudinary
connectCloudinary();

// Initialize Express app
const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing for all routes

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// API to listen to Clerk webhooks
app.use("/api/clerk", clerkWebhooks);

// First API endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// User route
app.use("/api/user", userRouter);
// Hotel route
app.use("/api/hotels", hotelRoute);
// Room route
app.use("/api/rooms", roomRouter);
// Booing route
app.use("/api/bookings", bookingRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
