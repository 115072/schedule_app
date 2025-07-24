import db from "../db.js";

export async function getAllEvents() {
  const result = await db.query("SELECT * FROM evententry");
  return result.rows;
}

export async function getEventById(id) {
  const result = await db.query("SELECT * FROM evententry WHERE id = $1", [id]);
  return result.rows;
}
