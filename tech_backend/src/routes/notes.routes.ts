import { Router } from "express";
import notesController from "../controllers/notesController/notes.controller";

const router = Router();

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.createNewNote);

router
  .route("/:id")
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);
export default router;
