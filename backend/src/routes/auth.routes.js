// src/routes/auth.routes.js

import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user,
  });
});

export default router;
