import express from "express";
import {
  createCommunity,
  getCommunities,
  getSingleCommunity,
} from "../controllers/communityController.js";

const router = express.Router();

router.post("/create", createCommunity);

router.get("/", getCommunities);

router.get("/:slug", getSingleCommunity);

export default router;