import prisma from "../src/config/database.js";

async function main() {
  await prisma.term.createMany({
    data: [
      {
        number: 1,
      },
      {
        number: 2,
      },
      {
        number: 3,
      },
      {
        number: 4,
      },
      {
        number: 5,
      },
      {
        number: 6,
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      {
        name: "Projeto",
      },
      {
        name: "Prática",
      },
      {
        name: "Recuperação",
      },
    ],
  });

  await prisma.teacher.createMany({
    data: [
      {
        name: "Diego Pinho",
      },
      {
        name: "Bruna Hamori",
      },
    ],
  });

  await prisma.discipline.createMany({
    data: [
      {
        name: "HTML e CSS",
        termId: 1,
      },
      {
        name: "JavaScript",
        termId: 2,
      },
      {
        name: "React",
        termId: 3,
      },
      {
        name: "Humildade",
        termId: 4,
      },
      {
        name: "Planejamento",
        termId: 5,
      },
      {
        name: "Autoconfiança",
        termId: 6,
      },
    ],
  });

  await prisma.teacherDiscipline.createMany({
    data: [
      {
        teacherId: 1,
        disciplineId: 1,
      },
      {
        teacherId: 1,
        disciplineId: 2,
      },
      {
        teacherId: 1,
        disciplineId: 3,
      },
      {
        teacherId: 2,
        disciplineId: 4,
      },
      {
        teacherId: 2,
        disciplineId: 5,
      },
      {
        teacherId: 2,
        disciplineId: 6,
      },
    ],
  });

  await prisma.test.createMany({
    data: [
      {
        name: "nome da pratica",
        pdfUrl:
          "https://bootcampra.notion.site/Projeto-20-RepoProvas-27d678dab2584fc980f1686285d1d04c",
        categoryId: 1,
        teacherDisciplineId: 1,
      },
      {
        name: "nome da pratica",
        pdfUrl:
          "https://bootcampra.notion.site/Projeto-20-RepoProvas-27d678dab2584fc980f1686285d1d04c",
        categoryId: 2,
        teacherDisciplineId: 2,
      },
      {
        name: "nome da pratica",
        pdfUrl:
          "https://bootcampra.notion.site/Projeto-20-RepoProvas-27d678dab2584fc980f1686285d1d04c",
        categoryId: 3,
        teacherDisciplineId: 3,
      },
      {
        name: "nome da pratica",
        pdfUrl:
          "https://bootcampra.notion.site/Projeto-20-RepoProvas-27d678dab2584fc980f1686285d1d04c",
        categoryId: 1,
        teacherDisciplineId: 4,
      },
      {
        name: "nome da pratica",
        pdfUrl:
          "https://bootcampra.notion.site/Projeto-20-RepoProvas-27d678dab2584fc980f1686285d1d04c",
        categoryId: 2,
        teacherDisciplineId: 5,
      },
      {
        name: "nome da pratica",
        pdfUrl:
          "https://bootcampra.notion.site/Projeto-20-RepoProvas-27d678dab2584fc980f1686285d1d04c",
        categoryId: 3,
        teacherDisciplineId: 6,
      },
    ],
  });
}

main()
  .catch((err) => console.error(err))
  .finally(async () => prisma.$disconnect());
