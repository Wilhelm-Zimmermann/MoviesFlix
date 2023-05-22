import { Rating } from "@prisma/client";
import { ICreateRatingDTO } from "../dtos/CreateRatingDTO";
import { IUpdateRatingDTO } from "../dtos/UpdateRatingDTO";

export interface IRatingsRepository{
    createRating(rating: ICreateRatingDTO): Promise<Rating | null>;
    updateRating(rating: IUpdateRatingDTO): Promise<Rating | null>;
    findRatingByUserIdAndMovieId(userId: string, movieId: number): Promise<Rating | null>;
    listRatingsByMovieId(movieId: number): Promise<Rating[]>;
}