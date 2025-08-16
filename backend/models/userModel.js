import db from "../db.js";

export async function getAllUsers() {
  const result = await db.query("SELECT * FROM users ");
  return result.rows;
}

export async function getUserById(id) {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

export async function makeUser(user) {
  const { username, password, role, email } = user;

  const result = await db.query(
    "INSERT INTO users (username, password, role, email) VALUES ($1,$2,$3,$4) RETURNING * ",
    [username, password, role, email]
  );
  return result.rows[0];
}

export async function updateUserById(user) {
  const { id, username, password, role, email } = user;

  const result = await db.query(
    "UPDATE users SET username = $1, password = $2, role = $3, email = $4 WHERE id = $5 RETURNING * ",
    [username, password, role, email, id]
  );
  return result.rows[0];
}

export async function removeUserById(id) {
  await db.query("DELETE FROM users WHERE id = $1", [id]);
  return "The user is deleted";
}

export async function logInUserSql(user) {
  const { username } = user;
  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
}
