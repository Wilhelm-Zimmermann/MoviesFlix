import express from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { MoviesController } from "../../modules/movies/useCases/MoviesController";
const moviesRouter = express.Router();

const moviesController = new MoviesController();

moviesRouter.get("/movies", moviesController.getAllMovies);
moviesRouter.get("/movies/rated", moviesController.getRatedMovies);
moviesRouter.get("/movies/search", moviesController.findMovieByQuery);
moviesRouter.get("/movies/details/:movieId", moviesController.getMovieDetail);
moviesRouter.post("/movies/create", moviesController.createMovie);

export { moviesRouter };