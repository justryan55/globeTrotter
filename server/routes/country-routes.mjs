import express from "express";
import jwt from "jsonwebtoken";
import countryModel from "../models/countryModel.mjs";
import { checkToken } from "../config/helpers.mjs";
import userModel from "../models/userModel.mjs";

const router = express.Router();

router.get("/getCountry", async (req, res) => {
  try {
    const countries = await countryModel.find();

    return res.status(200).json({
      success: true,
      message: "Countries obtained from database",
      payload: { countries },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving countries",
      error: err,
    });
  }
});

router.get("/getCountriesVisited", async (req, res) => {
  const authHeader = req.headers["authorisation"];

  try {
    const { email } = await checkToken(authHeader);

    const user = await userModel.find({ email: email });
    const countriesVisitedByUser = user[0].countries_visited;

    return res.status(200).json({
      success: true,
      message: "Countries visited by user obtained",
      payload: { countriesVisitedByUser },
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/toggleCountry", async (req, res) => {
  try {
    const { countryName, countryCode, token } = req.body;
    const secretKey = process.env.SECRET_KEY;
    const decodedToken = jwt.verify(token, secretKey);
    const userEmail = decodedToken.email;

    const user = await userModel.findOne({ email: userEmail });

    if (user.countries_visited.includes(countryName)) {
      await userModel.findOneAndUpdate(
        {
          email: userEmail,
        },
        { $pull: { countries_visited: countryName } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: `${countryName} removed`,
      });
    } else {
      await userModel.findOneAndUpdate(
        { email: userEmail },
        { $addToSet: { countries_visited: countryName } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: `${countryName} added`,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
