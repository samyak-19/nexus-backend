import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protectRoute } from "../middleware/authMiddleware.js";


import {
  createPost,
  getCommunityPosts,
  getSinglePost,
  getGlobalFeed,
} from "../controllers/postController.js";

const router = express.Router();

router.post(
  "/create",
  protectRoute,
  upload.single("image"),
  createPost
);

router.get("/community/:slug", getCommunityPosts);

router.get("/", getGlobalFeed);

router.get("/:id", getSinglePost);

export default router;