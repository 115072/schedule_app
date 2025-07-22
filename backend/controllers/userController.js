import { getAllUsers, getUserById } from "../models/userModel.js";

export async function fetchAllUsers(req, res) {
  try {
    const tags = await getAllUsers();
    res.json(tags);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function fetchUserById(req, res) {
  try {
    const tags = await getUserById(req.params.id);
    res.json(tags);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
