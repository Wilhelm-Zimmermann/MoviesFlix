import { User } from "@prisma/client";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

export interface IUsersRepository{
    createUser(user: ICreateUserDTO):Promise<User | null>;
    getUserById(id: string):Promise<User | null>;
    getUserByEmail(email: string):Promise<User | null>;
    updateUserProfilePhoto(id: string, profilePhoto: string): Promise<User | null>
    updateUserPassword(id: string, passwordToReset: string): Promise<User | null>
}