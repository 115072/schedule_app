import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 5432,
});

app.get("/api/test", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json({ time: result.rows[0].now });
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
