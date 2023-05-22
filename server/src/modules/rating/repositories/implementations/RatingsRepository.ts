import { Rating } from "@prisma/client";
import { ICreateRatingDTO } from "../../dtos/CreateRatingDTO";
import { IRatingsRepository } from "../IRatingsRepository";
import { prismaClient } from "../../../../utils/prisma";
import { IUpdateRatingDTO } from "../../dtos/UpdateRatingDTO";

export class RatingsRepository implements IRatingsRepository{
	async createRating({userId, movieId, rate}: ICreateRatingDTO): Promise<Rating | null> {
		const ratingToCreate = await prismaClient.rating.create({ data : {
			userId,
			movieId,
			rate
		}});
		
		return ratingToCreate;
	}

	async updateRating({id, rate}: IUpdateRatingDTO): Promise<Rating | null> {
		const ratingToUpdate = await prismaClient.rating.update({
			where : {
				id
			},
			data: { rate }
		});
		return ratingToUpdate;
	}

	async listRatingsByMovieId(movieId: number): Promise<Rating[]> {
		const ratings = await prismaClient.rating.findMany({
			where: {movieId}
		});

		return ratings;
	}

	async findRatingByUserIdAndMovieId(userId: string, movieId: number): Promise<Rating | null> {
		const rating = await prismaClient.rating.findFirst({
			where : {userId, movieId}
		});

		return rating;
	}

}