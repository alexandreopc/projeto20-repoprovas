import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { faker } from "@faker-js/faker";

import { CreateUser } from "../../src/utils/interfaces/createData.js";
import prisma from "../../src/config/database.js";

export function createLogin() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export async function createUser(login: CreateUser) {
  const token = jwt.sign(login, process.env.JWT_SECRET);

  const user = await prisma.user.create({
    data: {
      email: login.email,
      password: login.password,
      token,
    },
  });

  return user;
}
