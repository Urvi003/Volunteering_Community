import express from "express";
import { checkout } from "../controllers/checkout.js";
import { getTotalDonations } from "../controllers/checkout.js";

const router = express.Router();

router.post("/checkout", checkout);
router.get("/donations/total", getTotalDonations);

export default router;