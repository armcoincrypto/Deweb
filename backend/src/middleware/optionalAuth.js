import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "deweb-dev-secret-change-me";

export function optionalAuth(req, _res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next();
  try {
    const payload = jwt.verify(token, secret);
    req.userId = payload.userId;
  } catch {
    // ignore invalid token for public routes
  }
  next();
}
