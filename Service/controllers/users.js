import bcrypt from "bcryptjs";
import UserModel from "../model/users.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

// ========== REGISTER ==========
export const authRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email, password are required" });
    }

    const exists = await UserModel.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
    });

    const { password: _, ...safeUser } = user.toObject();
    return res.status(201).json({ message: "Registered successfully", user: safeUser });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ========== LOGIN ==========
export const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user || user.isDeleted) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const { password: _, ...safeUser } = user.toObject();
    return res.json({ message: "Login successful", accessToken, refreshToken, user: safeUser });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ========== REFRESH TOKEN ==========
export const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Refresh token required" });

    const decoded = verifyRefreshToken(token);
    const user = await UserModel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(user);
    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

// ========== GET CURRENT USER ==========
export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.authUser.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user: user.toObject() });
  } catch (err) {
    console.error("getMe error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========== UPDATE CURRENT USER ==========
export const updateMe = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.email) {
      updates.email = updates.email.toLowerCase();
    }

    // Không cho phép tự đổi role
    delete updates.role;

    if (updates.oldPassword && updates.newPassword) {
      const user = await UserModel.findById(req.authUser.id);
      const ok = await bcrypt.compare(updates.oldPassword, user.password);
      if (!ok) {
        return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
      }
      updates.password = await bcrypt.hash(updates.newPassword, 10);
      delete updates.oldPassword;
      delete updates.newPassword;
    }

    const user = await UserModel.findByIdAndUpdate(req.authUser.id, updates, {
      new: true,
    }).select("-password");

    res.json({ data: user });
  } catch (err) {
    console.error("updateMe error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========== GET ALL USERS (admin only) ==========
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ========== GET USER BY ID ==========
export const getUserById = async (req, res) => {
  try {
    const requester = req.authUser; // từ middleware requireAuth
    const userId = req.params.id;

    if (requester.role !== "admin" && requester.id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ========== UPDATE USER ==========
export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Không cho update role nếu không phải admin
    if (req.authUser.role !== "admin") {
      delete updates.role;
    }

    if (updates.email) {
      updates.email = updates.email.toLowerCase();
    }

    if (updates.oldPassword && updates.newPassword) {
      const user = await UserModel.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });

      const ok = await bcrypt.compare(updates.oldPassword, user.password);
      if (!ok) return res.status(400).json({ message: "Mật khẩu cũ không đúng" });

      updates.password = await bcrypt.hash(updates.newPassword, 10);
      delete updates.oldPassword;
      delete updates.newPassword;
    }

    const user = await UserModel.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ========== DELETE USER ==========
export const deleteUser = async (req, res) => {
  try {
    const requester = req.authUser;
    const userId = req.params.id;

    if (requester.role !== "admin" && requester.id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }
    res.status(200).json({ message: "User deleted (soft)" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
