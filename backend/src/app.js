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

export default app;
