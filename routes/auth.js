import express from "express";
import {
  login,
  verifyUser,
  requestOtpWithEmail,
  verifyUserWithEmail,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/requestotpwithemail", requestOtpWithEmail);

router.patch("/verifyuser", verifyUser);
router.patch("/verifyuserwithemail", verifyUserWithEmail);

export default router;
