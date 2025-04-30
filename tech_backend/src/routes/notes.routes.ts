import { Router } from "express";
import notesController from "../controllers/notesController/notes.controller";

const router = Router();

router.route("/").get(notesController.getAllNotes);
//   .post(notesController.createNewNote);

export default router;
