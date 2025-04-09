import { Router } from "express";
import {
  createArt,
  deleteArtById,
  getAllArts,
  getArtById,
  updateArtById,
} from "../controllers/artController.js";
const router = Router();

router.get("/", getAllArts);
router.post("/", createArt);
router.get("/:id", getArtById);
router.delete("/:id", deleteArtById);
router.put("/:id", updateArtById);

export default router;
