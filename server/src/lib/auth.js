import jwt from "jsonwebtoken";

const COOKIE_NAME = "admin_token";
const TOKEN_TTL = "7d";

export function signAdminToken(admin) {
  return jwt.sign({ sub: admin.id, username: admin.username }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_TTL,
  });
}

export function verifyAdminToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function adminCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
