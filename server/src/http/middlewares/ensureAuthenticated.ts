import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import jwtConfig from "../../utils/jwtConfig";
import { AppError } from "../../shared/errors/AppError";

interface IPayload{
    sub:string;
}

export default async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

	const bearerToken = req.headers.authorization;

	if (!bearerToken) {
		throw new AppError("Token missing");
	}

	const [, token] = bearerToken.split(" ");

	try{
		const {sub: user_id} = verify(token, jwtConfig.secretKey) as IPayload;

		next();
	}catch(err){
		throw new AppError("Invalid Token");
	}
}