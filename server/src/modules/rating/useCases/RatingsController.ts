import { Request, Response } from "express";
import { container } from "tsyringe";
import { RatingsService } from "./RatingsService";

export class RatingsController {
	async createRating(req: Request, res: Response): Promise<Response> {
		const { rate } = req.body;
		const { movieId } = req.params;
		const { id } = req.user;
		
		const ratingService = container.resolve<RatingsService>(RatingsService);
		const rating = await ratingService.createRating({ rate, userId: id, movieId: Number(movieId) });

		return res.status(201).json({ rating });
	}
}