import express from "express";
import {
  fetchAllEvents,
  fetchEventById,
  postEvent,
  putEventById,
  deleteEventById,
  fetchEventByDate,
  fetchEventByDateAndId,
  fetchEventByYearAndMonth,
} from "../controllers/eventEntryController.js";

const router = express.Router();

router.get("/events", fetchAllEvents);
router.get("/event/:id", fetchEventById);
router.post("/event", postEvent);
router.put("/event/:id", putEventById);
router.delete("/event/:id", deleteEventById);
router.get("/event/date/:date", fetchEventByDate);
router.get("/event/:date/:id", fetchEventByDateAndId);
router.get("/event/date/:year/:month", fetchEventByYearAndMonth);

export default router;
