import { getAllUsers } from "../models/userModel.js";

export async function fetchAllUsers(req, res) {
  try {
    const tags = await getAllUsers();
    res.json(tags);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
