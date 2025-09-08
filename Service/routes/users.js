import express from "express";
import { authRegister, authLogin, refreshToken, getAllUsers, getUserById, updateUser, deleteUser} from "../controllers/users.js"; 
import { requireApiKey, requireAdmin, requireAuth, requireRole  } from "../middlewares/auth.js";   

const router = express.Router();

// Đăng ký, đăng nhập, CRUD người dùng
router.post("/register", authRegister);
router.post("/login", authLogin);
router.post("/refresh", refreshToken);
router.get("/", requireAuth, requireRole(["admin"]), getAllUsers);
router.get("/:id", requireAuth, getUserById);
router.put("/:id", requireAuth, updateUser);
router.delete("/:id", requireAuth, deleteUser);


export default router;
