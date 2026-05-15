import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import communityRoutes from "./routes/communityRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nezus Backend Running");
});

app.use("/api/community", communityRoutes);
app.use("/api/post", postRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/user", userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});