import expess from "express";
import { getThemes, getThemeById, createTheme, updateTheme, deleteTheme } from "../controllers/theme.js";

const router = expess.Router();

router.get("/", getThemes);
router.get("/:id", getThemeById);
router.post("/", createTheme);
router.put("/:id", updateTheme);
router.delete("/:id", deleteTheme);

export default router;