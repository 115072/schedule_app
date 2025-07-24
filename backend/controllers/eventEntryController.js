import { getAllEvents } from "../models/eventEntryModel.js";

export async function fetchAllEvents(req, res) {
  try {
    const users = await getAllEvents();
    res.json(users);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
