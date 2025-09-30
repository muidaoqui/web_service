import { verifyAccessToken } from "../utils/jwt.js";

/**
 * Middleware xác thực user bằng JWT Access Token
 */
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    const decoded = verifyAccessToken(token);
    req.authUser = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token is not valid" });
  }
};

/**
 * Middleware kiểm tra role
 */
export function requireRole(roles = []) {
  return (req, res, next) => {
    if (!req.authUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!roles.includes(req.authUser.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
}
