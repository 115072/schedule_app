import db from "../db.js";

export async function getAllUsers() {
  const result = await db.query("SELECT * FROM users ");
  return result.rows;
}

export async function getUserById(id) {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows;
}

export async function makeUser(tag) {
  const { username, password, role } = tag;

  const result = await db.query(
    "INSERT INTO users (username, password, role) VALUES ($1,$2,$3) RETURNING * ",
    [username, password, role]
  );
  return result.rows[0];
}
