import db from "../db.js";

export async function getAllUsers() {
  const result = await db.query("SELECT * FROM users ");
  return result.rows;
}

export async function getUserById(id) {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows;
}
