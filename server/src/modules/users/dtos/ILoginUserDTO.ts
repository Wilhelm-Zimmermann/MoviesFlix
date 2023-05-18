import { ICreateUserDTO } from "./ICreateUserDTO";

export type ILoginUserDTO = Omit<ICreateUserDTO, "name">