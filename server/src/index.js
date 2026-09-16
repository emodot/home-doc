import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { careRequestsRouter } from "./routes/careRequests.js";
import { contactRouter } from "./routes/contact.js";
import { adminAuthRouter } from "./routes/adminAuth.js";
import { adminRouter } from "./routes/admin.js";
import { submissionRateLimit } from "./middleware/rateLimit.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/care-requests", submissionRateLimit, careRequestsRouter);
app.use("/api/contact", submissionRateLimit, contactRouter);
app.use("/api/admin", adminAuthRouter);
app.use("/api/admin", adminRouter);

app.use((req, res) => res.status(404).json({ error: "Not found" }));

const port = process.env.PORT || 4000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Home Doc server listening on port ${port}`);
});
