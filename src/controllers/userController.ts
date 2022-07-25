import { Request, Response } from "express";
import { userService } from "../services/userService.js";
import { CreateUser } from "../utils/interfaces/createData.js";

export async function signIn(req: Request, res: Response) {
  const body: CreateUser = req.body;
  const token = await userService.signIn(body);
  res.send(token).status(200);
}

export async function signUp(req: Request, res: Response) {
  const body: CreateUser = req.body;
  await userService.signUp(body);
  res.sendStatus(201);
}
