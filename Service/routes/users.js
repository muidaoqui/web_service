import express from "express";
import { authRegister } from "../controllers/users.js";    

const router = express.Router();

// Đăng ký
router.post("/register", authRegister);

export default router;
