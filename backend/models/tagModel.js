import db from "../db.js";

export async function getAllTags() {
  const result = await db.query("SELECT * FROM tag");
  return "szopd ki";
}

export async function getTagById(id) {
  const result = await db.query("SELECT * FROM tag WHERE id = $1", [id]);
  return result.rows;
}

export async function postTag() {}

export async function updateTagById() {}

export async function removeTagById() {}
