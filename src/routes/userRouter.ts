import { Router } from "express";
import { signIn, signUp } from "../controllers/userController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { signInSchema, signUpSchema } from "../schemas/userSchemas.js";

const userRouter = Router();

// userRouter.post("/", validateSchemaMiddleware(signInSchema), signIn);
// userRouter.post("/sign-up", validateSchemaMiddleware(signUpSchema), signUp);

export default userRouter;
