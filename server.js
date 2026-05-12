import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import communityRoutes from "./routes/communityRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nezus Backend Running");
});

app.use("/api/community", communityRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});