import { verifyAdminToken, ADMIN_COOKIE_NAME } from "../lib/auth.js";
import { prisma } from "../lib/prisma.js";

export async function requireAdmin(req, res, next) {
  const token = req.cookies?.[ADMIN_COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  let payload;
  try {
    payload = verifyAdminToken(token);
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }

  const admin = await prisma.admin.findUnique({ where: { id: payload.sub } });
  if (!admin) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }

  // Tokens issued before the last password change are no longer trusted.
  if (payload.iat < Math.floor(admin.passwordChangedAt.getTime() / 1000)) {
    return res.status(401).json({ error: "Session ended because the password was changed" });
  }

  req.admin = payload;
  next();
}
