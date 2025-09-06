import User from "../model/users.js";
import { parseApiKey } from "../utils/apiKey.js";

/**
 * Middleware xác thực apiKey (user đã đăng nhập)
 */
export async function requireApiKey(req, res, next) {
  const apiKey =
    req.query.apiKey ||
    req.headers["x-api-key"] ||
    req.headers.authorization?.replace("Bearer ", "");

  if (!apiKey) {
    return res.status(401).json({ message: "Missing apiKey" });
  }

  const parsed = parseApiKey(apiKey);
  if (!parsed) {
    return res.status(401).json({ message: "Invalid apiKey format" });
  }

  const user = await User.findOne({
    _id: parsed.userId,
    email: parsed.email.toLowerCase(),
  });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (user.isDeleted) {
    return res.status(403).json({ message: "User is deactivated" });
  }

  if (user.currentApiKey !== apiKey) {
    return res.status(401).json({ message: "apiKey not authorized" });
  }

  req.authUser = user;
  next();
}

/**
 * Middleware yêu cầu role = admin
 * (chỉ gọi được sau khi đã qua requireApiKey)
 */
export function requireAdmin(req, res, next) {
  if (!req.authUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.authUser.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
}

/**
 * Middleware yêu cầu chỉ cần đăng nhập (role = user hoặc admin)
 * Dùng cho những API như /orders
 */
export function requireUser(req, res, next) {
  if (!req.authUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.authUser.role !== "user" && req.authUser.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Users only" });
  }
  next();
}
