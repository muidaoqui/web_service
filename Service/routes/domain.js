import express from "express";
import domainController from "../controllers/domain.js";
import { requireApiKey, requireAdmin  } from "../middlewares/auth.js"; 

const router = express.Router();

// Guest (không cần login)
router.get("/", domainController.getAll);
router.get("/:id", domainController.getById);

// Admin (cần login + role admin)
router.post("/", requireApiKey, requireAdmin, domainController.create);
router.put("/:id", requireApiKey, requireAdmin, domainController.update);
router.delete("/:id", requireApiKey, requireAdmin, domainController.delete);

export default router;