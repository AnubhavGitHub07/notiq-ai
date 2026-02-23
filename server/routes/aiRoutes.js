import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  generateQuestions,
  summarizeNote,
  generateTags,
  chatWithNote
} from "../controllers/aiController.js";

import aiRateLimiter from "../middleware/aiRateLimiter.js";

const router = express.Router();

router.use(protect);
router.use(aiRateLimiter);

router.post("/questions", generateQuestions);
router.post("/summarize", summarizeNote);
router.post("/tags", generateTags);
router.post("/chat", chatWithNote);

export default router;
