import express from "express";
import hostingController from "../controllers/hosting.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = express.Router();

/**
 * Hosting routes phân quyền:
 * - Guest: getAll, getById
 * - Admin: create, update, delete
 */

// Guest cũng xem được
router.get("/", hostingController.getAll);
router.get("/:id", hostingController.getById);

// Admin CRUD hosting
router.post("/", requireAuth, requireRole(["admin"]), hostingController.create);
router.put("/:id", requireAuth, requireRole(["admin"]), hostingController.update);
router.delete("/:id", requireAuth, requireRole(["admin"]), hostingController.delete);

export default router;
