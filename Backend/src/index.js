// const express = require("express");
import express from "express";
import cors from "cors";

import "dotenv/config";

import fs from "fs";
import path from "path";

import { clerkMiddleware } from "@clerk/express"; //npm install @clerk/nextjs

import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";
import job from "./lib/cron.js";
import clerkWebhook from "./webhooks/clerk.webhooks.js";

const app = express();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL; // to connect frontend apis to backend

const publicDir = path.join(process.cwd(), "public");

// it is important that you don't parse the webhook data, it should be in the raw format

app.use(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhook,
);

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true })); // allow to send cookies
app.use(clerkMiddleware());
User();

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// if the public directory is exist m serve the static file
// this is for production build

if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*ant}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("server is running on PORT:", PORT);

  if (process.env.NODE_ENV === "production") {
    job.start();
  }
});
