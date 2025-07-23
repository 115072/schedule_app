import db from "../db.js";

export async function getAllUsers() {
  const result = await db.query("SELECT * FROM users ");
  return result.rows;
}

export async function getUserById(id) {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows;
}

export async function makeUser(user) {
  const { username, password, role } = user;

  const result = await db.query(
    "INSERT INTO users (username, password, role) VALUES ($1,$2,$3) RETURNING * ",
    [username, password, role]
  );
  return result.rows[0];
}

export async function updateUserById(user) {
  const { id, username, password, role } = user;

  const result = await db.query(
    "UPDATE users SET username = $1, password = $2, role = $3 WHERE id = $4 RETURNING * ",
    [username, password, role, id]
  );
  return result.rows[0];
}

export async function removeUserById(id) {
  await db.query("DELETE FROM users WHERE id = $1", [id]);
  return "The user is deleted";
}
