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
	averageRate: number;
    image: {
        medium: string;
    };
}

interface MoviesQueryResponse {
	show: {
		id: number;
		name: string;
		summary: string;
		averageRate: number;
		image: {
			medium: string;
		};
	}
}

@injectable()
export class MoviesService{
	constructor(
		@inject("IMoviesRepository") private moviesRepository: IMoviesRepository,
	){}

	async getAllMovies(): Promise<MoviesResponse[]> {
		const moviesURL = "https://api.tvmaze.com/shows";
		const moviesOnDatabase = await this.moviesRepository.getRatedMovies();
		const moviesIDS = moviesOnDatabase.map(x => x.id);

		const {data: moviesData} = await axios.get<MoviesResponse[]>(moviesURL);

		const movies: MoviesResponse[] = moviesData.map(movie => {
			return {
				id: movie.id,
				name: movie.name,
				summary: movie.summary.substring(0, 150).concat("..."),
				averageRate: 0,
				image: {
					medium: movie.image.medium
				}
			};
		});       
		
		const filteredMovies = movies.filter(x => !moviesIDS.includes(x.id));

		return filteredMovies.slice(0, 100);
	}

	async getRatedMovies(): Promise<Movie[]> {
		const movies = await this.moviesRepository.getRatedMovies();     

		return movies.slice(0, 100);
	}

	async getMovieDetail(id: number): Promise<MoviesResponse | null> {
		const moviesURL = `https://api.tvmaze.com/shows/${id}`;
		const movieOnDatabase = await this.moviesRepository.findMovieById(id);
		let movie: MoviesResponse;

		if(movieOnDatabase){
			movie = {
				id,
				name: movieOnDatabase.name,
				summary: movieOnDatabase.description,
				averageRate: movieOnDatabase.averageRate,
				image: {
					medium: movieOnDatabase.imageURL
				}
			};

			return movie;
		}

		
		const {data: movieData} = await axios.get<MoviesResponse>(moviesURL);   

		movie = {
			id,
			name: movieData.name,
			summary: movieData.summary,
			averageRate: 0,
			image : {
				medium: movieData.image.medium
			}
		};

		return movie;
	}

	async createMovie(movie: CreateMovieDTO): Promise<Movie> {
		const movieAlreadyExists = await this.moviesRepository.findMovieById(movie.id);		

		if(movieAlreadyExists)
			throw new AppError("This movie already exists", 400);
		
		const movieToCreate = this.moviesRepository.createMovie(movie);

		return movieToCreate;
	}

	async findMovieByQuery(query: string): Promise<MoviesResponse[]> {
		const moviesQueryURL = `https://api.tvmaze.com/search/shows?q=${query}`;
		const {data: moviesData} = await axios.get<MoviesQueryResponse[]>(moviesQueryURL);

		const movies = moviesData.map(movie => {
			return {
				id: movie.show.id,
				name: movie.show.name,
				summary: movie.show.summary,
				averageRate: 0,
				image: {
					medium: movie.show.image.medium,
				}
			};
		});

		return movies.slice(0, 100);
	}
}