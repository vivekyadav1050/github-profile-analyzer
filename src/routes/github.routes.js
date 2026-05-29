import { Router } from "express";

import {
  analyzeProfile,
  getProfiles,
  getProfile,
} from "../controllers/github.controller.js";

const router = Router();

router.post("/analyze", analyzeProfile);

router.get("/profiles", getProfiles);

router.get("/profiles/:username", getProfile);

export default router;