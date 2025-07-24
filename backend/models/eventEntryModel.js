import db from "../db.js";

export async function getAllEvents() {
  const result = await db.query("SELECT * FROM evententry");
  return result.rows;
}
