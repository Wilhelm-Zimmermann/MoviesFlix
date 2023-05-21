import { prismaClient } from "../../../../utils/prisma";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { ILoginUserDTO } from "../../dtos/ILoginUserDTO";
import { IUserCreatedResponse } from "../../responses/ICreatedUserResponse";
import { IUsersRepository } from "../IUsersRepository";


export class UsersRepository implements IUsersRepository{
	async createUser(userInfo: ICreateUserDTO): Promise<IUserCreatedResponse> {
		const { name, email } = userInfo;
		await prismaClient.user.create({ data : userInfo });
		
		return {
			email,
			name
		};
	}
	
	async getUserById(id: string): Promise<IUserCreatedResponse> {
		const userToReturn = await prismaClient.user.findUnique({
			where:{
				id
			}
		});
		
		return {
			email: userToReturn.email,
			name: userToReturn.name
		};
	}
	
	async getUserByEmail(userEmail: string): Promise<ILoginUserDTO | null> {
		
		const user = await prismaClient.user.findFirst({
			where : {
				email: userEmail
			}
		});

		if(!user) 
			return null;

		const userToReturn = {
			email: user.email,
			password: user.password
		};

		return userToReturn;
	}
}