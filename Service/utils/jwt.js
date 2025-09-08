import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET || "myaccesssecret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "myrefreshsecret";

// Tạo access token (15 phút)
export function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );
}

// Tạo refresh token (7 ngày)
export function generateRefreshToken(user) {
  return jwt.sign(
    { id: user._id },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
}

// Verify access token
export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

// Verify refresh token
export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}
