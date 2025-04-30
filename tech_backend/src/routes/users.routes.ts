import { Router } from "express";
import usersController from "../controllers/userController/users.controller";

const router = Router();

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser);

router
  .route("/:_id")
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

export default router;
