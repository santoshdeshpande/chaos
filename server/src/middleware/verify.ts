import { NextFunction, Request, Response } from "express";
import HttpException from "../common/http-exception";
import * as jwt from "jsonwebtoken";
import { Claims } from "../account/service";
import { createService } from "../account/service-factory";

const service = createService();
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"] || "";
  if (!authHeader) {
    next(new HttpException(401, "Token missing in header"));
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    next(new HttpException(401, "Token missing in header"));
  }
  const secret = process.env.JWT_SECRET as string;
  try {
    const { email, id } = jwt.verify(token, secret) as Claims;
    const user = await service.findUserByEmail(email);
    if (!user) {
      next(new HttpException(401, "Invalid token"));
    }
    req.currentUser = user;
    next();
  } catch (e) {
    next(new HttpException(401, "Token missing in header"));
  }
};
