import Router from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  likeArt,
  unlikeArt,
} from "../controllers/userController.js";

const router = Router();

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers);
router.post("/:id/like", likeArt);
router.post("/:id/unlike", unlikeArt);

export default router;
