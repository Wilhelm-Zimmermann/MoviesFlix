import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { ILoginUserDTO } from "../dtos/ILoginUserDTO";
import { IUserCreatedResponse } from "../responses/ICreatedUserResponse";

export interface IUsersRepository{
    createUser(user: ICreateUserDTO):Promise<IUserCreatedResponse>;
    getUserById(id: string):Promise<IUserCreatedResponse>;
    getUserByEmail(email: string):Promise<ILoginUserDTO>;
}