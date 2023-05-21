import { Movie, Rating } from "@prisma/client";
import { CreateMovieDTO } from "../dtos/CreateMovieDTO";

export interface IMoviesRepository {
    getRatedMovies(): Promise<Movie>;
    rateMovie(userId: string, movieId: string, rate: number): Promise<Rating>;
    findMovieById(movieId: number): Promise<Movie>;
    createMovie(movie: CreateMovieDTO): Promise<Movie>;
}