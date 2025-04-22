import { Router } from "express";
import path from "path";
import getPathInfo from "../utils/pathHelper";

const { __dirname } = getPathInfo(import.meta.url);

const router = Router();

router.get(["/", "/index", "/index.html"], (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export default router;
