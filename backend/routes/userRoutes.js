import express from "express";
import {
  fetchAllUsers,
  fetchUserById,
  postUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", fetchAllUsers);
router.get("/user/:id", fetchUserById);
router.post("/user", postUser);

export default router;
