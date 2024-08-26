import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import countryModel from "./models/countryModel.mjs";

configDotenv();

let resultData;
let saveCounter = 0;
const mongoDB = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log("MongoDB connection success");
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
};

await connectDB();

const url = ["https://restcountries.com/v3.1/all"];

url.map(async (url) => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    resultData = [...json];

    for (let i = 0; i < resultData.length; i++) {
      let country = new countryModel({
        name: resultData[i].name.common,
        code: resultData[i].cca3,
      });
      await country.save();
      console.log("saved" + " " + resultData[i].name.common);
      saveCounter++;
      if (saveCounter === resultData.length) {
        mongoose
          .disconnect()
          .then(() =>
            console.log("saved successfully and mongoDB disconnected")
          )
          .catch((error) => console.log(error));
      }
    }
  } catch (error) {
    console.log(error);
  }
});
