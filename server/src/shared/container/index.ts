import { container } from "tsyringe";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/users/repositories/implementations/UsersRepository";
import { IMoviesRepository } from "../../modules/movies/repositories/IMoviesRepository";
import { MoviesRepository } from "../../modules/movies/repositories/implementations/MoviesRepository";

container.register<IUsersRepository>(
	"IUsersRepository",
	{useClass : UsersRepository}
);

container.register<IMoviesRepository> (
	"IMoviesRepository",
	{ useClass : MoviesRepository }
);