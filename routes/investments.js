import express from "express";
import { getInvestments, endInvestment, createInvestmentFromBalance } from "../controllers/investments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getInvestments);

/* UPDATE */
router.patch("/endInvestment", verifyToken, endInvestment);
router.patch("/createInvestmentFromBalance", verifyToken, createInvestmentFromBalance);


export default router;
