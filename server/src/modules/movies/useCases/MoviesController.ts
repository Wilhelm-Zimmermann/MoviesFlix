import { Request, Response } from "express";
import { container } from "tsyringe";
import { MoviesService } from "./MoviesService";

export class MoviesController {
	async getAllMovies(req: Request, res: Response): Promise<Response> {
		const moviesService = container.resolve<MoviesService>(MoviesService);

		const movies = await moviesService.getAllMovies();

		return res.status(200).json({ movies });
	}

	async createMovie(req: Request, res: Response): Promise<Response> {
		const {name, description, imageURL, id} = req.body;
		const moviesService = container.resolve<MoviesService>(MoviesService);

		const movie = await moviesService.createMovie({ name, description, imageURL, id});

		return res.status(201).json({ movie });
	}
}