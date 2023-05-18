import express from "express";
import { UserController } from "../../modules/users/useCases/UserController";
const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/users/create", userController.createUser);
userRouter.post("/users/login", userController.login);

export { userRouter };