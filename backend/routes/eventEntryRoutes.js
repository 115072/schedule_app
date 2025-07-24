import express from "express";
import {
  fetchAllEvents,
  fetchEventById,
} from "../controllers/eventEntryController.js";

const router = express.Router();

router.get("/events", fetchAllEvents);
router.get("/event/:id", fetchEventById);

export default router;
