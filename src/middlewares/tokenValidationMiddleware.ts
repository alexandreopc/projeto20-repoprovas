import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async function tokenValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization ? authorization.replace("Bearer ", "") : null;

  if (!token) {
    return res.status(400).send("token not provided");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).send("invalid token");
    }
  });
  const decodedToekn = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );

  res.locals.userId = decodedToekn.userId;
  res.locals.email = decodedToekn.email;

  next();
}
