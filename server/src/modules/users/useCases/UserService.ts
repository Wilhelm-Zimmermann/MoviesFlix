import { ICreateUserDTO } from "../dtos/ICreateUserDto";
import { IGetUserDTO } from "../dtos/IGetUserDTO";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class UserService {
	constructor(@inject("IUsersRepository") private usersRepository: IUsersRepository){ }

	async createUser(userInfo: ICreateUserDTO):Promise<IGetUserDTO>{
		const user = await this.usersRepository.createUser(userInfo);

		return {
			email: user.email,
			name: user.name
		};
	}
}