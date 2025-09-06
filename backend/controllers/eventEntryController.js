import {
  getAllEvents,
  getEventById,
  makeEvent,
  updateEventById,
  removeEventById,
  getEventByDate,
  getEventByDateAndId,
  getEventByYearAndMonth,
} from "../models/eventEntryModel.js";

export async function fetchAllEvents(req, res) {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function fetchEventById(req, res) {
  try {
    const event = await getEventById(req.params.id);
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function postEvent(req, res) {
  try {
    const event = await makeEvent(req.body);
    res.json(event);
  } catch (error) {
    console.error("Error posting event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function putEventById(req, res) {
  try {
    const oldEvent = await getEventById(req.params.id);
    const request = req.body;
    const newEvent = { ...oldEvent, ...request };
    const event = await updateEventById(newEvent);
    res.json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteEventById(req, res) {
  try {
    const event = await removeEventById(req.params.id);
    res.json(event);
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function fetchEventByDate(req, res) {
  try {
    const event = await getEventByDate(req.params.date);
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function fetchEventByDateAndId(req, res) {
  try {
    const event = await getEventByDateAndId({
      day: req.params.date,
      id: req.params.id,
    });
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function fetchEventByYearAndMonth(req, res) {
  try {
    const event = await getEventByYearAndMonth({
      year: req.params.year,
      month: req.params.month,
    });
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
