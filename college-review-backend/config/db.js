import mongoose from "mongoose";

const MONGO_URI_PRIMARY = process.env.MONGO_URI || "mongodb://mongo:27017/college-reviews";
const MONGO_URI_FALLBACK = "mongodb://127.0.0.1:27017/college-reviews";

export const connectDB = async () => {
  try {
    console.log("Trying to connect to MongoDB...");
    const conn = await mongoose.connect(MONGO_URI_PRIMARY);
    console.log(`Connected to MongoDB at ${MONGO_URI_PRIMARY}`);
    return conn.connection;
  } catch (primaryError) {
    console.warn("Primary Mongo connection failed. Trying localhost...");
    try {
      const conn = await mongoose.connect(MONGO_URI_FALLBACK);
      console.log(`Fallback: Connected to MongoDB at ${MONGO_URI_FALLBACK}`);
      return conn.connection;
    } catch (fallbackError) {
      console.error("MongoDB connection failed:", fallbackError.message);
      process.exit(1);
    }
  }
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connection is open and ready!");

});
