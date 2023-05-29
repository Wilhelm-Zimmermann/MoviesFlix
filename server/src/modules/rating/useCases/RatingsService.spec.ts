import "reflect-metadata";
import { MoviesRepositoryInMem } from "../../movies/repositories/implementations/MoviesRepositoryInMem";
import { UsersRepositoryInMem } from "../../users/repositories/implementations/UsersRepositoryInMem";
import { RatingsRepositoryInMem } from "../repositories/implementations/RatingsRepositoryInMem";
import { RatingsService } from "./RatingsService";
import { AppError } from "../../../shared/errors/AppError";

let usersRepository: UsersRepositoryInMem;
let moviesRepository: MoviesRepositoryInMem;
let ratingsRepository: RatingsRepositoryInMem;
let ratingsService: RatingsService; 

describe("Ratings Service", () => {
	beforeEach(() => {
		usersRepository = new UsersRepositoryInMem();
		moviesRepository = new MoviesRepositoryInMem();
		ratingsRepository = new RatingsRepositoryInMem();
		ratingsService = new RatingsService(ratingsRepository, moviesRepository, usersRepository);
	});

	describe("Create Rating", () => {
		it("should be able to create a rating", async () => {
			const user = await usersRepository.createUser({email: "jotarokujoh@gmail.com", name:"Jotaro", password:"1234", profileImageUrl:"https://localhost:8080/uploasdqsdjf"});
			const movie = await moviesRepository.createMovie({description: "za warrudooo", name: "jojos", id: 1, imageURL:"asdlçkfj"});

			await ratingsService.createRating({movieId: movie.id, userId: user.id, rate: 10});

			expect(movie.averageRate).toEqual(10);
		});

		it("should not be able to create a rating with non existing movie", async () => {
			const user = await usersRepository.createUser({email: "jotarokujoh@gmail.com", name:"Jotaro", password:"1234", profileImageUrl:"https://localhost:8080/uploasdqsdjf"});

			await expect(ratingsService.createRating({movieId: 12, userId: user.id, rate: 10})).rejects.toEqual(new AppError("Movie not found", 404));
		});

		it("should not be able to create a rating with non existing user", async () => {
			const movie = await moviesRepository.createMovie({description: "za warrudooo", name: "jojos", id: 1, imageURL:"asdlçkfj"});
			await expect(ratingsService.createRating({movieId: movie.id, userId: "lsdkjklçf", rate: 10})).rejects.toEqual(new AppError("User not found", 404));
		});
	});
});