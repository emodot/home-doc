import { verifyAdminToken, ADMIN_COOKIE_NAME } from "../lib/auth.js";

export function requireAdmin(req, res, next) {
  const token = req.cookies?.[ADMIN_COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    req.admin = verifyAdminToken(token);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
}
