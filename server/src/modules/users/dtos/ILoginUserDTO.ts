import { ICreateUserDTO } from "./ICreateUserDTO";

export type ILoginUserDTO = Pick<ICreateUserDTO, "email" | "password">