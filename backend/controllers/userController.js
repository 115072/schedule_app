import { getAllUsers, getUserById, makeUser } from "../models/userModel.js";

export async function fetchAllUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function fetchUserById(req, res) {
  try {
    const users = await getUserById(req.params.id);
    res.json(users);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function postUser(req, res) {
  try {
    const users = await makeUser(req.body);
    res.json(users);
  } catch (error) {
    console.error("Error posting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
