import { User } from "@prisma/client";
import { prismaClient } from "../../../../utils/prisma";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository{
	async createUser(userInfo: ICreateUserDTO): Promise<User | null> {
		const user = await prismaClient.user.create({ data : userInfo });

		return user;
	}
	
	async getUserById(id: string): Promise<User | null> {
		const userToReturn = await prismaClient.user.findUnique({
			where:{
				id
			}
		});
		
		return userToReturn;
	}
	
	async getUserByEmail(userEmail: string): Promise<User | null> {
		
		const user = await prismaClient.user.findFirst({
			where : {
				email: userEmail
			}
		});

		return user;
	}
}