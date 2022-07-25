import { Request, Response } from "express";
import testService from "../services/testService.js";

export async function insertTest(req: Request, res: Response) {
  await testService.insertTest(req.body);
  res.sendStatus(201);
}

export async function getAllTestsByDiscipline(req: Request, res: Response) {
  const tests = await testService.getAllTestsByDiscipline();
  res.send(tests).status(200);
}

export async function getAllTestsByTeacher(req: Request, res: Response) {
  const tests = await testService.getAllTestsByTeacher();
  res.send(tests).status(200);
}
