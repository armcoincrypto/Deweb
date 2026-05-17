import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "deweb-dev-secret-change-me";

export function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

function readToken(req) {
  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : null;
}

export function requireAuth(req, res, next) {
  const token = readToken(req);
  if (!token) {
    return res.status(401).json({ error: "Authentication required." });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}

export function optionalAuth(req, res, next) {
  const token = readToken(req);
  if (!token) {
    req.userId = null;
    return next();
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
  } catch {
    req.userId = null;
  }
  next();
}
