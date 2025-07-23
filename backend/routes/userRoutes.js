import express from "express";
import {
  fetchAllUsers,
  fetchUserById,
  postUser,
  putUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", fetchAllUsers);
router.get("/user/:id", fetchUserById);
router.post("/user", postUser);
router.put("/user/:id", putUserById);

export default router;
