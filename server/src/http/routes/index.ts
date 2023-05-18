import express from "express";
import { userRouter } from "./user.routes";
import { moviesRouter } from "./movies.routes";
const router = express.Router();

router.use(userRouter);
router.use(moviesRouter);

export { router };