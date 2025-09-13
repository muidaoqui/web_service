import express from "express";
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder } from "../controllers/orders.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = express.Router();

// User tạo đơn & xem đơn của mình
router.post("/", requireAuth, createOrder);
router.get("/my", requireAuth, getMyOrders);

// Admin quản lý tất cả order
router.get("/", requireAuth, requireRole(["admin"]), getAllOrders);
router.put("/:id", requireAuth, requireRole(["admin"]), updateOrderStatus);
router.delete("/:id", requireAuth, requireRole(["admin"]), deleteOrder);

export default router;
