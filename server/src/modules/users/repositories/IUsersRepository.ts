import { ICreateUserDTO } from "../dtos/ICreateUserDto";
import { IGetUserDTO } from "../dtos/IGetUserDTO";

export interface IUsersRepository{
    createUser(user: ICreateUserDTO):Promise<IGetUserDTO>;
    getUserById(id: string):Promise<IGetUserDTO>;
}