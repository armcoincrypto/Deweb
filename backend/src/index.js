import "dotenv/config";
import express from "express";
import cors from "cors";
import "./db.js";
import { runSeed } from "./seed.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import bidRoutes from "./routes/bids.js";
import inquiryRoutes from "./routes/inquiries.js";
import contactRoutes from "./routes/contact.js";
import configRoutes from "./routes/config.js";
import activityRoutes from "./routes/activity.js";
import serviceRoutes from "./routes/services.js";
import offerRoutes from "./routes/offers.js";
import adminRoutes from "./routes/admin.js";
import supportRoutes from "./routes/support.js";
import setupRoutes from "./routes/setup.js";
import listingRoutes from "./routes/listings.js";
import dealChatRoutes from "./routes/dealChat.js";
import leadRoutes from "./routes/leads.js";

runSeed();

const app = express();
const port = Number(process.env.PORT || 3000);
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:8001";

app.set("trust proxy", 1);
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "deweb-backend", version: "3.0" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/config", configRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/setup", setupRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/deal-chat", dealChatRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(port, () => {
  console.log(`DEWEB API running on http://localhost:${port}`);
});
