import express from "express";
import cors from "cors";
import tagRoutes from "./routes/tagRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventEntryRoutes.js";
import pythonAnalyticsRoutes from "./routes/pythonAnalyticsRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", tagRoutes);
app.use("/", userRoutes);
app.use("/", eventRoutes);
app.use("/", pythonAnalyticsRoutes);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
