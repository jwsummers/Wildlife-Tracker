import express from "express";
import cors from "cors";
import sightingsRouter from "./routes/sightings.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Route setup
app.use("/api/sightings", sightingsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
