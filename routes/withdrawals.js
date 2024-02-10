import express from "express";
import { createWithdrawal, getWithdrawals } from "../controllers/withdrawals.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getWithdrawals);


/* UPDATE */
router.patch("/createwithdrawal", verifyToken, createWithdrawal);


export default router;
