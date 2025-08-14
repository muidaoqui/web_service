import express from "express";
import domainController from "../controllers/domain.js";

const router = express.Router();

// CRUD
router.post("/", domainController.create);
router.get("/", domainController.getAll);
router.get("/:id", domainController.getById);
router.put("/:id", domainController.update);
router.delete("/:id", domainController.delete);

export default router;
