import { Router } from "express";
import { signIn, signUp } from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { userSchema } from "../schemas/userSchemas.js";

const userRouter = Router();

userRouter.post("/login", validateSchemaMiddleware(userSchema), signIn);
userRouter.post("/", validateSchemaMiddleware(userSchema), signUp);

export default userRouter;
