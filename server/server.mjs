import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.mjs";
import cors from "cors";
import authRoutes from "./routes/auth-routes.mjs";
import countryRoutes from "./routes/country-routes.mjs";
import postRoutes from "./routes/post-routes.mjs";
import userRoutes from "./routes/user.routes.mjs";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: "https://travel-project-eight-phi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

connectDB();

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use("/api/auth", authRoutes);
app.use("/api", countryRoutes);
app.use("/api", postRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// https://stackoverflow.com/a/37309212/2518608
