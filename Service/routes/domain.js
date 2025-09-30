import express from "express";
import domainController from "../controllers/domain.js";
import { requireAuth, requireRole  } from "../middlewares/auth.js"; 

const router = express.Router();

// Guest (không cần login)
router.get("/", domainController.getAll);
router.get("/:id", domainController.getById);

// Admin (cần login + role admin)
router.post("/", requireAuth, requireRole(["admin"]), domainController.create);
router.put("/:id", requireAuth, requireRole(["admin"]), domainController.update);
router.delete("/:id", requireAuth, requireRole(["admin"]), domainController.delete);

export default router;