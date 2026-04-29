// src/controller/auth.controller.js

import bcrypt from "bcrypt";
import prisma from "../db/prismaClient.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    const emailNormalized = email ? email.trim().toLowerCase() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailNormalized || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    if (!emailRegex.test(emailNormalized)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (typeof password !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Password must be a string" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: emailNormalized },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: emailNormalized,
        passwordHash: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          createdAt: newUser.createdAt,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const emailNormalized = email ? email.trim().toLowerCase() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailNormalized || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    if (!emailRegex.test(emailNormalized)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        success: false,
        message: "Email and password must be strings",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: emailNormalized },
    });

    if (!user || !user.passwordHash) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
