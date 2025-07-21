import express from "express";
import {
  fetchAllTags,
  fetchTagById,
  postTag,
  putTagById,
} from "../controllers/tagController.js";

const router = express.Router();

router.get("/tags", fetchAllTags);
router.get("/tag/:id", fetchTagById);
router.post("/tag", postTag);
router.put("/tag/:id", putTagById);

export default router;
