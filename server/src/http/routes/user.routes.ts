import express from "express";
import uploadConfig from "../../utils/uploadConfig";
import multer from "multer";
import { UserController } from "../../modules/users/useCases/UserController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
const userRouter = express.Router();
const userController = new UserController();

const uploadProfilePhoto = multer({
	storage: uploadConfig.storage,
	fileFilter: (req,file, cb) => {
		if(file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
			cb(null, true);
		}else{
			cb(null, false);
		}
	}
});

userRouter.get("/users/get-profile", ensureAuthenticated, userController.getUserProfile);
userRouter.post("/users/create", userController.createUser);
userRouter.post("/users/login", userController.login);
userRouter.patch("/users/upload", uploadProfilePhoto.single("profilePhoto"),ensureAuthenticated, userController.uploadProfilePhoto);
userRouter.patch("/users/reset-password", userController.updateUserPassword);

export { userRouter };