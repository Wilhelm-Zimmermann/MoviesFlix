import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserService } from "./UserService";

export class UserController {
	async createUser(req: Request, res: Response): Promise<Response> {
		const { email, name, password } = req.body;
		const userService = container.resolve<UserService>(UserService);
		const user = await userService.createUser({email, name, password});

		return res.status(201).json(user);
	}

	async login(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;
		const userService = container.resolve<UserService>(UserService);
		const token = await userService.login({email, password});

		return res.status(200).json({token});
	}
}