import { Router } from "express";
import getPathInfo from "../utils/pathHelper";

const { __dirname } = getPathInfo(import.meta.url);

const router = Router();

router.route("/").get().post().patch().delete();

export default router