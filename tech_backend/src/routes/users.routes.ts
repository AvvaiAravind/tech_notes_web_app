import { Router } from "express";
import usersController from "../controllers/userController/users.controller";
import getPathInfo from "../utils/pathHelper";

const { __dirname } = getPathInfo(import.meta.url);

const router = Router();

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

export default router;
