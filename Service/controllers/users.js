import UserModel from "../model/users.js";
import bcrypt from "bcryptjs";
import { buildApiKey } from "../utils/apiKey.js";

export const authRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email, password are required" });
    }

    const exists = await UserModel.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email: email.toLowerCase(),
      password: hashed
    });

    return res.status(201).json({
      message: "Registered successfully",
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    const apiKey = buildApiKey(user._id.toString(), user.email);
    user.currentApiKey = apiKey;
    await user.save();

    return res.json({
      message: "Login successful",
      apiKey
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Lấy tất cả người dùng
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");

    res.status(200).json({ data: users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy 1 người dùng theo ID
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
};

// CRUD người dùng

// Cập nhật người dùng
export const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.email) {
      updates.email = updates.email.toLowerCase();
    }
    const user = await UserModel.findByIdAndUpdate(
  req.params.id, 
  updates, 
  { new: true }
).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa mềm người dùng
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }
    res.status(200).json({ message: "User deleted (soft)" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
