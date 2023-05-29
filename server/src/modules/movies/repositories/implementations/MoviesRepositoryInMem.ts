import { Movie } from "@prisma/client";
import { CreateMovieDTO } from "../../dtos/CreateMovieDTO";
import { IMoviesRepository } from "../IMoviesRepository";
import { randomUUID } from "crypto";

export class MoviesRepositoryInMem implements IMoviesRepository{
	public movies: Movie[];

	constructor(){
		this.movies = [];
	}

	async getRatedMovies(): Promise<Movie[]> {
		return this.movies;
	}

	async findMovieById(movieId: number): Promise<Movie> {
		const movie = this.movies.find(x => x.id === movieId);

		return movie;
	}

	async createMovie(movie: CreateMovieDTO): Promise<Movie> {
		const movieToCreate = {
			...movie,
			averageRate: 0
		};

		this.movies.push(movieToCreate);

		return movieToCreate;
	}

	async updateMovieAverageRate(rate: number, movieId: number): Promise<Movie> {
		const movieToUpdate = this.movies.find(x => x.id === movieId);
		movieToUpdate.averageRate = rate;

		return movieToUpdate;
	}

}