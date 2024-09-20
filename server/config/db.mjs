import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();
// eslint-disable-next-line no-undef
const mongoDB = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(mongoDB);
    if (connectDB) {
      console.log("Connected to database");
    } else {
      console.log((error) => error);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default connectDB;
