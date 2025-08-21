import express from "express";
import {
  fetchAllTags,
  fetchTagById,
  postTag,
  putTagById,
  deleteTagById,
  fetchTagByMonth,
  fetchTagByDays,
} from "../controllers/tagController.js";

const router = express.Router();

router.get("/tags", fetchAllTags);
router.get("/tag/:id", fetchTagById);
router.post("/tag", postTag);
router.put("/tag/:id", putTagById);
router.delete("/tag/:id", deleteTagById);
router.get("/tags/duration/month/:year/:month", fetchTagByMonth);
router.get("/tags/duration/day/:year/:month", fetchTagByDays);

export default router;
