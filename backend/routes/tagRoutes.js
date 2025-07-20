import express from "express";
import {
  fetchAllTags,
  fetchTagById,
  postTag,
} from "../controllers/tagController.js";

const router = express.Router();

router.get("/tags", fetchAllTags);
router.get("/tag/:id", fetchTagById);
router.post("/tag", postTag);

export default router;
