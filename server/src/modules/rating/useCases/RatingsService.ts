import { inject, injectable } from "tsyringe";
import { IRatingsRepository } from "../repositories/IRatingsRepository";
import { ICreateRatingDTO } from "../dtos/CreateRatingDTO";
import { Rating } from "@prisma/client";
import { IMoviesRepository } from "../../movies/repositories/IMoviesRepository";
import { IUsersRepository } from "../../users/repositories/IUsersRepository";
import { AppError } from "../../../shared/errors/AppError";

interface RatingResponse {
	movieUrl: string;
}

@injectable()
export class RatingsService {
	constructor(
		@inject("IRatingsRepository") private ratingsRepository: IRatingsRepository,
		@inject("IMoviesRepository") private moviesRepository: IMoviesRepository,
		@inject("IUsersRepository") private usersRepository: IUsersRepository
	){}

	async createRating(ratingToCreate: ICreateRatingDTO): Promise<RatingResponse> {
		const userExists = await this.usersRepository.getUserById(ratingToCreate.userId);
		const movieExists = await this.moviesRepository.findMovieById(ratingToCreate.movieId);
		const ratedMovieDetailsUrl = `http://localhost:8080/movies/details/${ratingToCreate.movieId}`;

		if(!userExists)
			throw new AppError("User not found", 404);
		
		if(!movieExists)
			throw new AppError("Movie not found", 404);

		const ratingAlreadyExists = await this.ratingsRepository.findRatingByUserIdAndMovieId(ratingToCreate.userId, ratingToCreate.movieId);

		let rating;
		if(ratingAlreadyExists){
			rating = await this.ratingsRepository.updateRating({ id: ratingAlreadyExists.id, rate: ratingToCreate.rate });

			const movieRatings = await this.ratingsRepository.listRatingsByMovieId(ratingToCreate.movieId);
			const ratingsAverage = movieRatings.reduce((accumulator, currentValue) => accumulator + currentValue["rate"], 0);
			
			await this.moviesRepository.updateMovieAverageRate(ratingsAverage, movieExists.id);

			return {movieUrl: ratedMovieDetailsUrl};
		}

		rating = await this.ratingsRepository.createRating(ratingToCreate);

		const movieRatings = await this.ratingsRepository.listRatingsByMovieId(ratingToCreate.movieId);

		const ratingsAverage = movieRatings.reduce((accumulator, currentValue) => accumulator + currentValue["rate"], 0);

		await this.moviesRepository.updateMovieAverageRate(ratingsAverage, movieExists.id);


		return {movieUrl: ratedMovieDetailsUrl};
	}

	
}