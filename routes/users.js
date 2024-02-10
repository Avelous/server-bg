import express from "express";
import { getUser, changePassword } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.patch("/changepassword", verifyToken, changePassword);

export default router;
