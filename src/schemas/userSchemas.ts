import Joi from "joi";
import { CreateUser } from "../utils/interfaces/createData";

export const userSchema = Joi.object<CreateUser>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
