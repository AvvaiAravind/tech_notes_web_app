import { Router } from "express";
import usersController from "../controllers/userController/users.controller";

const router = Router();

router.get("/getAllUsers", usersController.getAllUsers);

router.post("/createNewUser", usersController.createNewUser);

router.patch("/updateUser/:_id", usersController.updateUser);

router.delete("/deleteUser/:_id", usersController.deleteUser);

export default router;
