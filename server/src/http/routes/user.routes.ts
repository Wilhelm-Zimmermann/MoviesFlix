import express from "express";
import uploadConfig from "../../utils/uploadConfig";
import multer from "multer";
import { UserController } from "../../modules/users/useCases/UserController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
const userRouter = express.Router();
const userController = new UserController();
const uploadProfilePhoto = multer(uploadConfig);

userRouter.get("/users/get-profile", ensureAuthenticated, userController.getUserProfile);
userRouter.post("/users/create", userController.createUser);
userRouter.post("/users/login", userController.login);
userRouter.patch("/users/upload", uploadProfilePhoto.single("profilePhoto"),ensureAuthenticated, userController.uploadProfilePhoto);
userRouter.patch("/users/reset-password", userController.updateUserPassword);

export { userRouter };