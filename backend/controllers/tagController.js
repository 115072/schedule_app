import {
  getAllTags,
  getTagById,
  makeTag,
  updateTagById,
} from "../models/tagModel.js";

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

export async function postTag(req, res) {
  try {
    const tags = await makeTag(req.body);
    res.json(tags);
  } catch (error) {
    console.error("Error posting tag:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function putTagById(req, res) {
  try {
    const tags = await updateTagById({ id: req.params.id, ...req.body });
    res.json(tags);
  } catch (error) {
    console.error("Error updating tag:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
