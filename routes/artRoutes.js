import { Router } from "express";
// import { getAllArt, likeArt } from "../controllers/artController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();

// router.get("/", getAllArt);
// router.post("/like/:artId", authMiddleware, likeArt);

export default router;
