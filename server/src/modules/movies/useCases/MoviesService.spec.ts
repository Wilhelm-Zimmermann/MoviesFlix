import "reflect-metadata";
import { MoviesRepositoryInMem } from "../repositories/implementations/MoviesRepositoryInMem";
import { MoviesService } from "./MoviesService";
import { AppError } from "../../../shared/errors/AppError";

let moviesRepository: MoviesRepositoryInMem;
let moviesService: MoviesService;

describe("Movies Service", () => {
	beforeEach(() => {
		moviesRepository = new MoviesRepositoryInMem();
		moviesService = new MoviesService(moviesRepository);
	});

	describe("Create Movie", () => {
		it("should be able to create a movie", async () => {
			const movie = await moviesService.createMovie({
				id: 1,
				description: "Kuririin morre",
				name: "Dragon Ball",
				imageURL: "http://localhost.jpg"
			});

			expect(movie.id).toEqual(1);
		});

		it("should not be able to create a movie with the same id", async () => {
			await moviesService.createMovie({
				id: 1,
				description: "Kuririin morre",
				name: "Dragon Ball",
				imageURL: "http://localhost.jpg"
			});

			await expect(moviesService.createMovie({
				id: 1,
				description: "Kuririin morre",
				name: "Dragon Ball",
				imageURL: "http://localhost.jpg"
			})).rejects.toEqual(new AppError("This movie already exists", 409));
		});
	});

	describe("Get rated Movies", () => {
		it("should be able to get all rated movies", async () => {
			await moviesService.createMovie({
				id: 1,
				description: "Kuririin morre",
				name: "Dragon Ball",
				imageURL: "http://localhost.jpg"
			});

			await moviesService.createMovie({
				id: 2,
				description: "freeeeeeeeeezaaaaaaaaa",
				name: "Dragon Ball",
				imageURL: "http://localhost.jpg"
			});

			expect(moviesRepository.movies.length).toEqual(2);
		});
	});

	describe("Get movie Detail", () => {
		it("should be able to get a movie details", async () => {
			const movieToCreate = await moviesService.createMovie({
				id: 1,
				description: "Kuririin morre",
				name: "Dragon Ball",
				imageURL: "http://localhost.jpg"
			});

			const movie = await moviesService.getMovieDetail("1");

			expect(movie.summary).toEqual(movieToCreate.description);
		});

		it("should not be able to get a movie details with a non numerical id", async () => {
			await moviesService.createMovie({
				id: 1,
				description: "Kuririin morre",
				name: "Dragon Ball",
				imageURL: "http://localhost.jpg"
			});

			await expect(moviesService.getMovieDetail("daslkjfas")).rejects.toEqual(new AppError("Can not convert this param to a number", 400));
		});
	});
});