import mongoose from "mongoose";
import dotenv from "dotenv";

const uri = process.env.TEST_MONGO_URI || process.env.MONGO_URI;


dotenv.config();

export const connectTestDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test_college_reviews";
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const disconnectTestDB = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
};
