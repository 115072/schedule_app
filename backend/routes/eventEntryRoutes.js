import express from "express";
import {
  fetchAllEvents,
  fetchEventById,
  postEvent,
} from "../controllers/eventEntryController.js";

const router = express.Router();

router.get("/events", fetchAllEvents);
router.get("/event/:id", fetchEventById);
router.post("/event", postEvent);

export default router;
