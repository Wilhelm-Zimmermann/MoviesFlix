import { container } from "tsyringe";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/users/repositories/implementations/UsersRepository";

container.register<IUsersRepository>(
	"IUsersRepository",
	{useClass : UsersRepository}
);