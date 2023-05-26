import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserService } from "./UserService";

export class UserController {
	async createUser(req: Request, res: Response): Promise<Response> {
		const userService = container.resolve<UserService>(UserService);
		const { email, name, password } = req.body;
		const user = await userService.createUser({email, name, password, profileImageUrl: ""});

		return res.status(201).json(user);
	}

	async login(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;
		
		const userService = container.resolve<UserService>(UserService);
		const token = await userService.login({email, password});

		return res.status(200).json(token);
	}

	async uploadProfilePhoto(req: Request, res: Response): Promise<Response> {		
		const userService = container.resolve<UserService>(UserService);

		const { id } = req.user;
		const profilePhoto = req.file.filename;

		await userService.uploadUserPhoto(id, profilePhoto);
		const userProfileImageUrl = `http://localhost:8080/users/upload/${profilePhoto}`;

		return res.status(200).json({profilePhoto: userProfileImageUrl});
	}

	async updateUserPassword(req: Request, res:Response): Promise<Response> {
		const userService = container.resolve<UserService>(UserService);
		const { email, password } = req.body;

		const updatedUser = await userService.updateUserPassword(email, password);

		return res.status(200).json(updatedUser);
	}

	async getUserProfile(req: Request, res:Response): Promise<Response> {
		const userService = container.resolve<UserService>(UserService);
		const { id } = req.user;

		const userProfile = await userService.getUserProfile(id);
		const userProfileImageUrl = `http://localhost:8080/users/upload/${userProfile.profileImageUrl}`;

		return res.status(200).json({
			...userProfile,
			profileImageUrl: userProfileImageUrl
		});
	}
}