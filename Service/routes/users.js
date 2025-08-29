import express from "express";
import { authRegister, authLogin, getAllUsers, getUserById, createUser, updateUser, deleteUser} from "../controllers/users.js";    

const router = express.Router();

// Đăng ký, đăng nhập, CRUD người dùng
router.post("/register", authRegister);
router.post("/login", authLogin);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


export default router;
