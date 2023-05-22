import { ILoginUserDTO } from "../dtos/ILoginUserDTO";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IUserCreatedResponse } from "../responses/ICreatedUserResponse";
import { inject, injectable } from "tsyringe";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import jwtConfig from "../../../utils/jwtConfig";
import { AppError } from "../../../shared/errors/AppError";
import { ILoginResponse } from "../responses/ILoginResponse";


@injectable()
export class UserService {
	constructor(@inject("IUsersRepository") private usersRepository: IUsersRepository){ }

	async createUser(userInfo: ICreateUserDTO):Promise<IUserCreatedResponse>{
		const hashedPassword = await hash(userInfo.password, 8);
		const userToCreate = {
			...userInfo,
			password: hashedPassword
		};
		
		const userAlreadyExists = await this.usersRepository?.getUserByEmail(userInfo.email);		

		if(userAlreadyExists)
			throw new AppError("This email is already in use", 400);

		const user = await this.usersRepository.createUser(userToCreate);

		return {
			email: user.email,
			name: user.name
		};
	}

	async login(userInfo: ILoginUserDTO): Promise<ILoginResponse> {
		// Procurando se existe um usuário no banco de dados com base no email
		const user = await this.usersRepository.getUserByEmail(userInfo.email);

		if(!user)
			throw new AppError("Email/Password might be wrong", 400);
		
		// Utilizar o método "compare" para verificar se as senhas coincidem
		const passwordMatch = await compare(userInfo.password, user.password);

		if(!passwordMatch)
			throw new AppError("Email/Password might be wrong", 400);

		const token = sign(
			{
				userId: user.id
			}, 
			jwtConfig.secretKey, 
			jwtConfig.options
		);

		return {token};
	}
}