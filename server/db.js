// db.js — MongoDB connection via Mongoose
import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌  MONGODB_URI is not defined in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      // Recommended options for modern Mongoose
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log("🍃  Connected to MongoDB");
  } catch (err) {
    console.error("❌  MongoDB connection error:", err.message);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️   MongoDB disconnected");
    isConnected = false;
  });
}

export default mongoose;