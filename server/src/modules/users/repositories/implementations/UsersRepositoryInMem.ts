import { User } from "@prisma/client";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";
import { randomUUID } from "crypto";

export class UsersRepositoryInMem implements IUsersRepository{
	public users: User[];

	constructor(){
		this.users = [];
	}

	async createUser(user: ICreateUserDTO): Promise<User> {
		const id = randomUUID();
		this.users.push({
			name: user.name,
			email: user.email,
			id,
			password: user.password,
			profileImageUrl: user.profileImageUrl
		});

		return {
			name: user.name,
			email: user.email,
			id,
			password: user.password,
			profileImageUrl: user.profileImageUrl
		};
	}

	async getUserById(id: string): Promise<User> {
		const user = this.users.find(x => x.id === id);

		return user;
	}

	async getUserByEmail(email: string): Promise<User> {
		const user = this.users.find(x => x.email === email);

		return user;
	}

	async updateUserProfilePhoto(id: string, profilePhoto: string): Promise<User> {
		const user = this.users.find(x => x.id === id);

		user.profileImageUrl = profilePhoto;

		return user;
	}

	updateUserPassword(id: string, passwordToReset: string): Promise<User> {
		throw new Error("Method not implemented.");
	}

}