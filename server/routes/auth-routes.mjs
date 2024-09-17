import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.mjs";
import { checkToken } from "../config/helpers.mjs";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedpassword,
    });

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(500).json({
        success: false,
        message: "An account with this email address already exists",
      });
    }

    if (!firstName) {
      return res.status(500).json({
        success: false,
        message: "You must enter a first name",
      });
    }

    if (!lastName) {
      return res.status(500).json({
        success: false,
        message: "You must enter a last name",
      });
    }

    if (!email) {
      return res.status(500).json({
        success: false,
        message: "You must enter an email address",
      });
    }

    if (!password || password.length < 5) {
      return res.status(500).json({
        success: false,
        message: "You must enter a valid password",
      });
    }

    if (password !== confirmPassword) {
      return res.status(500).json({
        success: false,
        message: "Passwords do not match",
      });
    } else {
      const userCreated = await newUser.save();
      return res.status(200).json({
        success: true,
        message: "User created",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json("No user associated with that email address");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json("Invalid password");
  }

  const secretKey = process.env.SECRET_KEY;

  const payload = {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    countries_visited: user.countries_visited,
    friends: user.friends,
    followers: user.followers,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });

  res.status(200).json({
    message: "User is logged in",
    token: token,
  });
});

router.get("/getUser", async (req, res) => {
  const authHeader = req.headers["authorisation"];
  const {
    userId,
    firstName,
    lastName,
    email,
    countriesVisited,
    friends,
    followers,
  } = await checkToken(authHeader);

  return res.status(200).json({
    success: true,
    message: "User details identified",
    payload: {
      userId,
      firstName,
      lastName,
      email,
      countriesVisited,
      friends,
      followers,
    },
  });
});

export default router;
