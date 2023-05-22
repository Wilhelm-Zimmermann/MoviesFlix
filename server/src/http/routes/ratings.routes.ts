import express from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { RatingsController } from "../../modules/rating/useCases/RatingsController";
const ratingsRouter = express.Router();

const ratingsController = new RatingsController();

ratingsRouter.post("/ratings/:movieId",ensureAuthenticated, ratingsController.createRating);

export { ratingsRouter };