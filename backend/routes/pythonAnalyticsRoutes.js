import express from "express";
import {
  testt,
  piechart,
  scatter,
} from "../controllers/pythonAnalyticsController.js";

const router = express.Router();

router.get("/python", testt);
router.post("/piechart", piechart);
router.post("/scatter", scatter);

export default router;
