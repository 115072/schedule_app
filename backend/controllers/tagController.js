import {
  getAllTags,
  getTagById,
  makeTag,
  updateTagById,
  removeTagById,
  getTagByMonth,
  getTagByDays,
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

export async function deleteTagById(req, res) {
  try {
    const tags = await removeTagById(req.params.id);
    res.json(tags);
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function fetchTagByMonth(req, res) {
  try {
    const event = await getTagByMonth({
      year: req.params.year,
      month: req.params.month,
    });
    res.json(event);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function fetchTagByDays(req, res) {
  try {
    const result = await getTagByDays({
      year: req.params.year,
      month: req.params.month,
    });
    const resultObject = {};
    result.forEach((row) => {
      const dateKey = row.day.toISOString().split("T")[0];
      if (resultObject[dateKey]) {
        resultObject[dateKey].push({ sum: row.sum, name: row.name });
      } else {
        resultObject[dateKey] = [{ sum: row.sum, name: row.name }];
      }
    });
    res.json(resultObject);
  } catch (error) {
    console.error("githup commit test:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
