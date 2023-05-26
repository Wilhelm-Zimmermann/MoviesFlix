import { Movie, Rating } from "@prisma/client";
import { IMoviesRepository } from "../IMoviesRepository";
import { prismaClient } from "../../../../utils/prisma";
import { CreateMovieDTO } from "../../dtos/CreateMovieDTO";

export class MoviesRepository implements IMoviesRepository {
	async createMovie(movie: CreateMovieDTO): Promise<Movie> {
		const movieCreated = await prismaClient.movie.create({ data: {
			id: movie.id,
			name: movie.name,
			averageRate: 0,
			imageURL: movie.imageURL,
			description: movie.description,
		}});

		return movieCreated;
	}

	async getRatedMovies(): Promise<Movie[] | null> {
		const ratedMovies = await prismaClient.movie.findMany({
			orderBy:[
				{
					averageRate: "desc"
				}
			],
		});

		return ratedMovies;
	}

	async findMovieById(movieId: number): Promise<Movie | null> {
		const movie = await prismaClient.movie.findFirst({
			where : { id: movieId }
		});

		return movie;
	}

	async updateMovieAverageRate(rate: number, movieId: number): Promise<Movie | null> {
		const movie = await prismaClient.movie.update({
			where : { 
				id: movieId
			},
			data : {
				averageRate: rate
			}
		});

		return movie;
	}
}