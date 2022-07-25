import { NextFunction, Request, Response } from "express";

export function errorHandlerMiddleware(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (err.status && err.message)
    return res.status(err.status).send(err.message);
  if (err.details)
    return res.status(422).send(err.details.map(({ message }) => message));

  res.sendStatus(500);
}
