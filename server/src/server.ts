import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "./shared/container/";
import "express-async-errors";
import { router } from "./http/routes";
import { AppError } from "./shared/errors/AppError";
const app = express();
const port = 8080;

app.use(cors({
	origin:"http://localhost:3000",
	methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
	credentials: true
}));
app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if(err instanceof AppError){
		return res.status(err.statusCode).json({ error : err.message });
	}
	return res.status(500).json({ error : "Internal Server - Error : " + err.message });
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});