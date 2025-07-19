import { getAllTags, getTagById } from "../models/tagModel.js";

export async function fetchAllTags(req, res) {
  try {
    const tags = await getAllTags();
    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function fetchTagById(req, res) {
  try {
    const tags = await getTagById(req.params.id);
    res.json(tags);
  } catch (error) {
    console.error("Error fetching tag:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
