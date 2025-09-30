import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} from "../controllers/order.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = express.Router();

// User tạo đơn & xem đơn của mình
router.post("/", requireAuth, createOrder);
router.get("/my", requireAuth, getMyOrders);
router.get("/:id", requireAuth, getOrderById);

// Admin quản lý tất cả order
router.get("/", requireAuth, requireRole(["admin"]), getAllOrders);
router.put("/:id", requireAuth, requireRole(["admin"]), updateOrderStatus);
router.delete("/:id", requireAuth, requireRole(["admin"]), deleteOrder);

export default router;
