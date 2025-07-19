import express from "express";
import cors from "cors";
import tagRoutes from "./routes/tagRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", tagRoutes);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
