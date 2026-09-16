import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { signAdminToken, adminCookieOptions, ADMIN_COOKIE_NAME } from "../lib/auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

export const adminAuthRouter = Router();

adminAuthRouter.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const passwordMatches = await bcrypt.compare(password, admin.passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = signAdminToken(admin);
  res.cookie(ADMIN_COOKIE_NAME, token, adminCookieOptions());
  return res.json({ data: { username: admin.username } });
});

adminAuthRouter.post("/logout", (req, res) => {
  res.clearCookie(ADMIN_COOKIE_NAME, adminCookieOptions());
  return res.json({ data: { loggedOut: true } });
});

adminAuthRouter.get("/me", requireAdmin, (req, res) => {
  return res.json({ data: { username: req.admin.username } });
});
