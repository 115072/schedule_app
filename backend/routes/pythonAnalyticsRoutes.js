import express from "express";
import { testt } from "../controllers/pythonAnalyticsController.js";

const router = express.Router();

router.get("/python", testt);

export default router;
