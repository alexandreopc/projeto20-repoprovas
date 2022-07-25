import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { userRepository } from "../repositories/userRepository.js";
import { CreateUser } from "../utils/interfaces/createData.js";

async function signUp(data: CreateUser) {
  const { email, password: unhashedPassword } = data;

  const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
  const password = bcrypt.hashSync(unhashedPassword, salt);

  const user = await userRepository.findUserbyEmail(email);
  if (user) {
    throw { status: 409, message: "email already in use" };
  }

  await userRepository.createUser({ email, password });
}

async function signIn(data: CreateUser) {
  const { email, password } = data;

  const user = await userRepository.findUserbyEmail(email);
  if (!user) {
    throw { status: 404, message: "no user with this email" };
  }
  const { id: userId, password: hashedPassword, token } = user;

  const login = bcrypt.compareSync(password, hashedPassword);
  if (!login) {
    throw { status: 409, message: "wrong password" };
  }

  return findToken(userId, email, token);
}

export async function findToken(userId: number, email: string, token: string) {
  if (token === "MISSING") {
    return createToken(userId, email);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err) {
      console.log("atualizou token invalido");
      return await createToken(userId, email);
    }
  }

  return token;
}

async function createToken(userId: number, email: string) {
  const config = { expiresIn: 60 * 60 * 6 };
  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, config);
  await userRepository.updateUserToken(email, token);
  return token;
}

export const userService = { signIn, signUp };
