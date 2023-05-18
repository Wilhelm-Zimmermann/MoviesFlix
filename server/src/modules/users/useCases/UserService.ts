import { ILoginUserDTO } from "../dtos/ILoginUserDTO";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IUserCreatedResponse } from "../responses/ICreatedUserResponse";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import jwtConfig from "../../../utils/jwtConfig";


@injectable()
export class UserService {
	constructor(@inject("IUsersRepository") private usersRepository: IUsersRepository){ }

	async createUser(userInfo: ICreateUserDTO):Promise<IUserCreatedResponse>{
		const hashedPassword = await hash(userInfo.password, 8);
		const userToCreate = {
			...userInfo,
			password: hashedPassword
		};

		const user = await this.usersRepository.createUser(userToCreate);

		return {
			email: user.email,
			name: user.name
		};
	}

	async login(userInfo: ILoginUserDTO): Promise<string> {
		const user = await this.usersRepository.getUserByEmail(userInfo.email);

		const token = sign(
			{
				email: user.email
			}, 
			jwtConfig.secretKey, 
			jwtConfig.options
		);

		return token;
	}
}