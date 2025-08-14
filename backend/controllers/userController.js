import {
  getAllUsers,
  getUserById,
  makeUser,
  updateUserById,
  removeUserById,
  logInUserSql,
} from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const users = await makeUser({ ...req.body, password: hashedPassword });
    res.json(users);
  } catch (error) {
    console.error("Error posting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function putUserById(req, res) {
  try {
    const users = await updateUserById({ id: req.params.id, ...req.body });
    res.json(users);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteUserById(req, res) {
  try {
    const users = await removeUserById(req.params.id);
    res.json(users);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function logInUser(req, res) {
  try {
    const users = await logInUserSql(req.body);
    if (!users) {
      return res.status(401).json("you are not allowed to log in");
    }
    const passwordsMatch = await bcrypt.compare(
      req.body.password,
      users.password
    );
    if (!passwordsMatch) {
      return res.status(401).json("you are not allowed to log in");
    } else {
      const generatedToken = jwt.sign(
        { id: users.id, role: users.role },
        "mony",
        { expiresIn: "1h" }
      );
      res.json({ token: generatedToken });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
