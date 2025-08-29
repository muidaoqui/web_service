import express from "express";
import { getDomainInfo } from "../controllers/checkDomain.js";

const router = express.Router();

router.get("/", getDomainInfo);

export default router;
