import prisma from "../config/database.js";
import {
  CreateTests,
  CreateTeacherDiscipline,
} from "../utils/interfaces/createData.js";

async function findCategoryByName(name: string) {
  const response = await prisma.category.findFirst({ where: { name } });
  return response;
}

async function findDisciplineByName(name: string) {
  const response = await prisma.discipline.findFirst({ where: { name } });
  return response;
}

async function findTeacherByName(name: string) {
  const response = await prisma.teacher.findFirst({ where: { name } });
  return response;
}

async function findTeacherDiscipline({
  teacherId,
  disciplineId,
}: CreateTeacherDiscipline) {
  const response = await prisma.teacherDiscipline.findFirst({
    where: { AND: { disciplineId, teacherId } },
  });
  return response;
}

async function insert(data: CreateTests) {
  const response = await prisma.test.create({
    data,
  });
  return response;
}

async function findAllTestsByDiscipline() {
  const response = await prisma.term.findMany({
    include: {
      Discipline: {
        include: {
          TeacherDiscipline: {
            include: {
              teachers: true,
              Test: {
                include: {
                  categories: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return response;
}

async function findAllTestsByTeacher() {
  const response = await prisma.teacherDiscipline.findMany({
    include: {
      teachers: true,
      disciplines: true,
      Test: {
        include: {
          categories: true,
        },
      },
    },
  });
  return response;
}

export const testRepository = {
  findCategoryByName,
  findDisciplineByName,
  findTeacherByName,
  findTeacherDiscipline,
  insert,
  findAllTestsByDiscipline,
  findAllTestsByTeacher,
};
