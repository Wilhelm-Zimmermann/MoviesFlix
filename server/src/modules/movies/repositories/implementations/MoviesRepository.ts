import { Movie, Rating } from "@prisma/client";
import { IMoviesRepository } from "../IMoviesRepository";
import { prismaClient } from "../../../../utils/prisma";
import { CreateMovieDTO } from "../../dtos/CreateMovieDTO";

export class MoviesRepository implements IMoviesRepository {
	async createMovie(movie: CreateMovieDTO): Promise<Movie> {
		const movieCreated = await prismaClient.movie.create({ data: {
			id: movie.id,
			name: movie.name,
			averageRate: 0.0,
			imageURL: movie.imageURL,
			description: movie.description,
		}});

		return movieCreated;
	}

	getRatedMovies(): Promise<Movie> {
		throw new Error("Method not implemented.");
	}

	rateMovie(userId: string, movieId: string, rate: number): Promise<Rating> {
		throw new Error("Method not implemented.");
	}

	async findMovieById(movieId: number): Promise<Movie | null> {
		const movie = await prismaClient.movie.findFirst({
			where : { id: movieId }
		});

		return movie;
	}

}