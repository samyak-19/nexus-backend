import express from "express";
import { votePost } from "../controllers/voteController.js";

import { protectRoute } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post(
  "/",
  protectRoute,
  votePost
);


export default router;