import db from "../db.js";

export async function getAllUsers() {
  const result = await db.query("SELECT * FROM users ");
  return result.rows;
}
