import express from "express";
import { fetchAllEvents } from "../controllers/eventEntryController.js";

const router = express.Router();

router.get("/events", fetchAllEvents);

export default router;
