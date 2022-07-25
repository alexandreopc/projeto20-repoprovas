import {
  User,
  Category,
  Test,
  TeacherDiscipline,
  Teacher,
  Discipline,
  Term,
} from "@prisma/client";

export type CreateUser = Omit<User, "id" | "token">;
export type CreateTests = Omit<Test, "id">;
export type CreateTeacherDiscipline = Omit<TeacherDiscipline, "id">;
