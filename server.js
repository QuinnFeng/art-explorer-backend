import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import artRoutes from "./routes/artRoutes.js";
import user from "./models/user.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/art", artRoutes);
app.use("/api/user",userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
