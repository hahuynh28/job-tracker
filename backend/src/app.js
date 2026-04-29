// app.js

import express from "express";
import prisma from "./db/prismaClient.js";
import authRoutes from "./routes/auth.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection error" });
  }
});

export default app;
