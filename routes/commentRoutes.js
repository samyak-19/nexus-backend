import express from "express";

import {
  createComment,
  getPostComments,
} from "../controllers/commentController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protectRoute, createComment);

router.get("/:postId", getPostComments);

export default router;