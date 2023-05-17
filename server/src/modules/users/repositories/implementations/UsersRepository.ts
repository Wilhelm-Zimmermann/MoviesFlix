import { prismaClient } from "../../../../utils/prisma";
import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { IGetUserDTO } from "../../dtos/IGetUserDTO";
import { IUsersRepository } from "../IUsersRepository";


export class UsersRepository implements IUsersRepository{
	async createUser(userInfo: ICreateUserDTO): Promise<IGetUserDTO> {
		const { name, email } = userInfo;
		await prismaClient.user.create({ data : userInfo });

		return {
			email,
			name
		};
	}

	async getUserById(id: string): Promise<IGetUserDTO> {
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

}