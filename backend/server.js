import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import morgan from "morgan";
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
dotenv.config();
app.use("/api/v1/auth", authRoutes);
const PORT = 8080;
app.get("/", () => {
  console.log("hello blinkit");
});
await mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to mongodb"));
app.listen(PORT, (req, res) => {
  console.log(`running on port ${PORT}`);
});
