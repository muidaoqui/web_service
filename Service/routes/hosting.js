import express from "express";
import hostingController from "../controllers/hosting.js";
import { requireApiKey, requireAdmin } from "../middlewares/auth.js";

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
router.post("/", requireApiKey, requireAdmin, hostingController.create);
router.put("/:id", requireApiKey, requireAdmin, hostingController.update);
router.delete("/:id", requireApiKey, requireAdmin, hostingController.delete);

export default router;
