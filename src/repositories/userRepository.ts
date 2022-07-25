import prisma from "../config/database.js";
import { CreateUser } from "../utils/interfaces/createData.js";

export async function createUser(data: CreateUser) {
  await prisma.user.create({ data: { ...data, token: "MISSING" } });
}

export async function findUserbyEmail(email: string) {
  return await prisma.user.findFirst({ where: { email: email } });
}

export async function updateUserToken(email: string, token: string) {
  return await prisma.user.update({ where: { email }, data: { token } });
}

export const userRepository = { createUser, findUserbyEmail, updateUserToken };
