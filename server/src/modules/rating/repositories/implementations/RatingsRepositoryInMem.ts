import { Rating } from "@prisma/client";
import { ICreateRatingDTO } from "../../dtos/CreateRatingDTO";
import { IUpdateRatingDTO } from "../../dtos/UpdateRatingDTO";
import { IRatingsRepository } from "../IRatingsRepository";
import { randomUUID } from "crypto";

export class RatingsRepositoryInMem implements IRatingsRepository{
	public ratings: Rating[];

	constructor(){
		this.ratings = [];
	}

	async createRating(rating: ICreateRatingDTO): Promise<Rating> {
		const ratingToCreate = {
			...rating,
			id: randomUUID()
		};

		this.ratings.push(ratingToCreate);

		return ratingToCreate;
	}

	async updateRating(rating: IUpdateRatingDTO): Promise<Rating> {
		const ratingToUpdate = this.ratings.find(x => x.id === rating.id);

		ratingToUpdate.rate = rating.rate;

		return ratingToUpdate;
	}

	async findRatingByUserIdAndMovieId(userId: string, movieId: number): Promise<Rating> {
		const rating = this.ratings.find(x => x.userId === userId && x.movieId === movieId);

		return rating;
	}

	async listRatingsByMovieId(movieId: number): Promise<Rating[]> {
		const ratingsByMovie = this.ratings.filter(x => x.movieId === movieId);

		return ratingsByMovie;
	}   
}