import { Router } from "express";
import getHealthStatus from "../controllers/rootController/health.controller";
import { getPathInfo } from "../utils/pathHelper";

const { __dirname } = getPathInfo(import.meta.url);

const router = Router();

router.get("/", getHealthStatus);

export default router;
