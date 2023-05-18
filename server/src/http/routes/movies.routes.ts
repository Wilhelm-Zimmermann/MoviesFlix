import express from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
const moviesRouter = express.Router();

moviesRouter.get("/movies", ensureAuthenticated, (req, res) => {
	res.send("LOGADO");
});


export { moviesRouter };