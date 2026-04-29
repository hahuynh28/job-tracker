//application.routes.js

import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
  getApplicationById,
} from "../controllers/application.controller.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createApplication);

router.get("/", getApplications);

router.patch("/:id", updateApplication);

router.delete("/:id", deleteApplication);

router.get("/:id", getApplicationById);

export default router;
