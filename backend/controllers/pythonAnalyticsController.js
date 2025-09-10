import axios from "axios";

export async function testt(req, res) {
  try {
    const response = await axios.get("http://python-analytics:8000/");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function piechart(req, res) {
  try {
    const response = await axios.post("http://python-analytics:8000/pie", {
      dates: req.body.dates,
      // user: req.user.id,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
