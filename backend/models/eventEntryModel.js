import db from "../db.js";

export async function getAllEvents() {
  const result = await db.query("SELECT * FROM evententry");
  return result.rows;
}

export async function getEventById(id) {
  const result = await db.query("SELECT * FROM evententry WHERE id = $1", [id]);
  return result.rows;
}

export async function makeEvent(event) {
  const { description, start, duration, day, tag, users } = event;

  const result = await db.query(
    "INSERT INTO evententry (description, start, duration, day, tag, users) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ",
    [description, start, duration, day, tag, users]
  );
  return result.rows[0];
}
