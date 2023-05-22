import { Movie, Rating } from "@prisma/client";
import { CreateMovieDTO } from "../dtos/CreateMovieDTO";

export interface IMoviesRepository {
    getRatedMovies(): Promise<Movie[] | null>;
    findMovieById(movieId: number): Promise<Movie>;
    createMovie(movie: CreateMovieDTO): Promise<Movie>;
    updateMovieAverageRate(rate: number, movieId: number): Promise<Movie | null>
}