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

adminAuthRouter.post("/change-password", requireAdmin, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Current and new password are required" });
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ error: "New password must be at least 8 characters" });
  }
  if (newPassword === currentPassword) {
    return res.status(400).json({ error: "New password must be different from the current one" });
  }

  const admin = await prisma.admin.findUnique({ where: { id: req.admin.sub } });
  if (!admin) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const passwordMatches = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ error: "Current password is incorrect" });
  }

  const updated = await prisma.admin.update({
    where: { id: admin.id },
    data: {
      passwordHash: await bcrypt.hash(newPassword, 10),
      passwordChangedAt: new Date(),
    },
  });

  // Every existing session is now invalid, so issue a fresh one for this device.
  res.cookie(ADMIN_COOKIE_NAME, signAdminToken(updated), adminCookieOptions());
  return res.json({ data: { changed: true } });
});
