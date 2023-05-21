import { inject, injectable } from "tsyringe";
import { IMoviesRepository } from "../repositories/IMoviesRepository";
import { Movie } from "@prisma/client";
import axios from "axios";
import { CreateMovieDTO } from "../dtos/CreateMovieDTO";
import { AppError } from "../../../shared/errors/AppError";

interface MoviesResponse {
    id: number;
    name: string;
    summary: string;
    image: {
        medium: string;
    };
}

@injectable()
export class MoviesService{
	constructor(@inject("IMoviesRepository") private moviesRepository: IMoviesRepository){}

	async getAllMovies(): Promise<MoviesResponse[]> {
		const moviesURL = "https://api.tvmaze.com/shows";
		const {data: moviesData} = await axios.get<MoviesResponse[]>(moviesURL);   

		const movies: MoviesResponse[] = moviesData.map(movie => {
			return {
				id: movie.id,
				name: movie.name,
				summary: movie.summary.substring(0, 50).concat("..."),
				image: {
					medium: movie.image.medium
				}
			};
		});        

		return movies.slice(0, 10);
	}

	async createMovie(movie: CreateMovieDTO): Promise<Movie> {
		const movieAlreadyExists = await this.moviesRepository.findMovieById(movie.id);		

		if(movieAlreadyExists)
			throw new AppError("This movie already exists", 400);
		
		const movieToCreate = this.moviesRepository.createMovie(movie);


		return movieToCreate;
	}

	async updateMovieRate(movieId: number, rate: number): Promise<string> {
		const movie = await this.moviesRepository.findMovieById(movieId);

		return "Hello World";
	}
}