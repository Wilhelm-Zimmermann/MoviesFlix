import express from "express";
import { userRouter } from "./user.routes";
import { moviesRouter } from "./movies.routes";
import { ratingsRouter } from "./ratings.routes";
const router = express.Router();

router.use(userRouter);
router.use(moviesRouter);
router.use(ratingsRouter);

export { router };