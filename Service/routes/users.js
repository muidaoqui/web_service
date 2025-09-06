import express from "express";
import { authRegister, authLogin, getAllUsers, getUserById, updateUser, deleteUser} from "../controllers/users.js"; 
import { requireApiKey, requireAdmin } from "../middlewares/auth.js";   

const router = express.Router();

// Đăng ký, đăng nhập, CRUD người dùng
router.post("/register", authRegister);
router.post("/login", authLogin);
router.get("/", requireApiKey, requireAdmin, getAllUsers);
router.get("/:id", requireApiKey, getUserById);
router.put("/:id", requireApiKey, updateUser);
router.delete("/:id", requireApiKey, deleteUser);


export default router;
