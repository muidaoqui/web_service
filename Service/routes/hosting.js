import express from "express";
import hostingController from "../controllers/hosting.js";

const router = express.Router();

// CRUD
router.post("/", hostingController.create);
router.get("/", hostingController.getAll);
router.get("/:id", hostingController.getById);
router.put("/:id", hostingController.update);
router.delete("/:id", hostingController.delete);

export default router;
