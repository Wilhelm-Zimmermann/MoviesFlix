import { Request, Response } from "express";
import { container } from "tsyringe";
import { MoviesService } from "./MoviesService";

export class MoviesController {
	async getAllMovies(req: Request, res: Response): Promise<Response> {
		const moviesService = container.resolve<MoviesService>(MoviesService);

		const movies = await moviesService.getAllMovies();

		return res.status(200).json(movies);
	}

	async getRatedMovies(req: Request, res: Response): Promise<Response> {
		const moviesService = container.resolve<MoviesService>(MoviesService);

		const movies = await moviesService.getRatedMovies();

		return res.status(200).json(movies);
	}

	async getMovieDetail(req: Request, res: Response): Promise<Response> {
		const moviesService = container.resolve<MoviesService>(MoviesService);
		const { movieId } = req.params;

		const movie = await moviesService.getMovieDetail(Number(movieId));

		return res.status(200).json(movie);
	}

	async createMovie(req: Request, res: Response): Promise<Response> {
		const {name, description, imageURL, id} = req.body;
		const moviesService = container.resolve<MoviesService>(MoviesService);

		const movie = await moviesService.createMovie({ name, description, imageURL, id});

		return res.status(201).json(movie);
	}

	async findMovieByQuery(req: Request, res: Response): Promise<Response> {
		const { q } = req.query; 
		const moviesService = container.resolve<MoviesService>(MoviesService);

		const movie = await moviesService.findMovieByQuery(q.toString());

		return res.status(201).json(movie);
	}
}