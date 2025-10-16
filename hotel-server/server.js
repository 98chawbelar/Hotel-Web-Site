import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

// Connect to the database
connectDB();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
