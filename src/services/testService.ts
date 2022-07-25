import { testRepository } from "../repositories/testRepository.js";
import { CreateTeacherDiscipline } from "../utils/interfaces/createData.js";

async function insertTest({ name, pdfUrl, category, discipline, teacher }) {
  const categoryResponse = await testRepository.findCategoryByName(category);
  if (!categoryResponse) {
    throw {
      status: 404,
      message: `category not found`,
    };
  }

  const disciplineResponse = await testRepository.findDisciplineByName(
    discipline
  );
  if (!disciplineResponse) {
    throw {
      status: 404,
      message: `discipline not found`,
    };
  }

  const teacherResponse = await testRepository.findTeacherByName(teacher);
  if (!teacherResponse) {
    throw {
      status: 404,
      message: `teacher not found`,
    };
  }

  const teacherDisciplineId = await validateTeacherDiscipline(
    teacherResponse.id,
    disciplineResponse.id
  );

  const response = await testRepository.insert({
    name,
    pdfUrl,
    categoryId: categoryResponse.id,
    teacherDisciplineId,
  });
  return response;
}

async function validateTeacherDiscipline(
  teacherResponse: number,
  disciplineResponse: number
) {
  const teacherDisciplineResponse = await testRepository.findTeacherDiscipline({
    teacherId: teacherResponse,
    disciplineId: disciplineResponse,
  });
  if (!teacherDisciplineResponse) {
    throw {
      status: 404,
      message: `teacher isnt in this discipline`,
    };
  }
  return teacherDisciplineResponse.id;
}

async function getAllTestsByDiscipline() {
  const response = await testRepository.findAllTestsByDiscipline();
  return response;
}

async function getAllTestsByTeacher() {
  const response = await testRepository.findAllTestsByTeacher();
  return response;
}

export default {
  insertTest,
  getAllTestsByDiscipline,
  getAllTestsByTeacher,
};
