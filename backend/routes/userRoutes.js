import express from "express";
import { fetchAllUsers, fetchUserById } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", fetchAllUsers);
router.get("/user/:id", fetchUserById);

export default router;
