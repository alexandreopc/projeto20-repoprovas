import { Router } from "express";
import {
  insertTest,
  getAllTestsByDiscipline,
  getAllTestsByTeacher,
} from "../controllers/testController.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.post(
  "/test",
  tokenValidationMiddleware,
  validateSchemaMiddleware(testSchema),
  insertTest
);
testRouter.get(
  "/tests/discipline",
  tokenValidationMiddleware,
  getAllTestsByDiscipline
);
testRouter.get(
  "/tests/teacher",
  tokenValidationMiddleware,
  getAllTestsByTeacher
);

export default testRouter;
