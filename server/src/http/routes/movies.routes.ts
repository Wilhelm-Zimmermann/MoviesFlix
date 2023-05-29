import express from "express";
import { MoviesController } from "../../modules/movies/useCases/MoviesController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
const moviesRouter = express.Router();

const moviesController = new MoviesController();

moviesRouter.get("/movies", moviesController.getAllMovies);
moviesRouter.get("/movies/rated", moviesController.getRatedMovies);
moviesRouter.get("/movies/search", moviesController.findMovieByQuery);
moviesRouter.get("/movies/details/:movieId",ensureAuthenticated, moviesController.getMovieDetail);
moviesRouter.post("/movies/create", ensureAuthenticated,  moviesController.createMovie);

export { moviesRouter };