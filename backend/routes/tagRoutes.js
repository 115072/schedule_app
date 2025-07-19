import express from "express";
import { fetchAllTags, fetchTagById } from "../controllers/tagController.js";

const router = express.Router();

router.get("/tags", fetchAllTags);
router.get("/tag/:id", fetchTagById);

export default router;
