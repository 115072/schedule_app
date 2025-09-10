import express from "express";
import { testt, piechart } from "../controllers/pythonAnalyticsController.js";

const router = express.Router();

router.get("/python", testt);
router.post("/piechart", piechart);

export default router;
