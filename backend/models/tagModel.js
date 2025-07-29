import db from "../db.js";

export async function getAllTags() {
  const result = await db.query("SELECT * FROM tag");
  /*
  const rowcounter = result.rows.length;
  const tagsList = [];
  for (let index = 0; index < rowcounter; index++) {
    tagsList.push(await buildTagTree(result.rows[index]));
  }
  //Ez volt az en verziom, amit chatgpt minimalis segitsegevel csinaltam.
  //Megy gond nélkül, de azt mondta, hogy ennel van gyorsabb megoldas is es inkabb haszanljam azt
  */
  const promises = result.rows.map((row) => buildTagTree(row));
  const tagsList = await Promise.all(promises);
  return tagsList;
}

export async function getTagById(id) {
  const result = await db.query("SELECT * FROM tag WHERE id = $1", [id]);
  const baseTag = result.rows[0];
  return await buildTagTree(baseTag);
}

async function buildTagTree(tag) {
  const children = await db.query("SELECT * FROM tag WHERE parenttag = $1", [
    tag.id,
  ]);
  tag.children = await Promise.all(children.rows.map(buildTagTree));
  return tag;
}

export async function makeTag(tag) {
  const { name, hexcolor, parenttag } = tag;

  const result = await db.query(
    "INSERT INTO tag (name, hexcolor, parenttag) VALUES ($1,$2,$3) RETURNING * ",
    [name, hexcolor, parenttag]
  );
  return result.rows[0];
}

export async function updateTagById(tag) {
  const { id, name, hexcolor, parenttag } = tag;

  const result = await db.query(
    "UPDATE tag SET name = $1, hexcolor = $2, parenttag = $3 WHERE id = $4 RETURNING * ",
    [name, hexcolor, parenttag, id]
  );
  return result.rows[0];
}

export async function removeTagById(id) {
  await db.query("DELETE FROM tag WHERE id = $1", [id]);
  return "The tag and its children tags are deleted";
}
