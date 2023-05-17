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
}