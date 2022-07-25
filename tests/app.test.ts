import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/config/database.js";
import { createUser, createLogin } from "./factories/userFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
  await prisma.$executeRaw`DELETE FROM tests WHERE name = 'test'`;
});

describe("User tests suite", () => {
  it("given email and password, create user", async () => {
    const login = createLogin();
    const response = await supertest(app).post("/").send(login);
    expect(response.status).toBe(201);
  });

  it("given email that already exists, fail to create user", async () => {
    const login = createLogin();
    await createUser(login);

    const response = await supertest(app).post("/").send(login);
    expect(response.status).toBe(409);
  });

  it("missing email or password, fail to create user", async () => {
    const login = createLogin();
    delete login.email;
    const response = await supertest(app).post("/").send(login);
    expect(response.status).toBe(422);

    const login2 = createLogin();
    delete login2.password;
    const response2 = await supertest(app).post("/").send(login);
    expect(response2.status).toBe(422);
  });

  it("given email and password, recive token", async () => {
    const login = createLogin();
    await createUser(login);

    const response = await supertest(app).post("/login").send(login);
    const token = response.body.token;
    console.log("TOKEN", token);
    expect(token).not.toBeNull();
  });

  it("given email that doesnt exists, fail to login", async () => {
    const login = createLogin();
    const response = await supertest(app).post("/login").send(login);
    expect(response.status).toBe(404);
  });

  it("given wrong password, fail to login", async () => {
    const login = createLogin();
    await createUser(login);
    delete login.password;

    const response = await supertest(app)
      .post("/login")
      .send({ ...login, password: "qualquerCoisa" });
    expect(response.status).toBe(409);
  });
});

describe("Tests tests suite", () => {
  it("create new test", async () => {
    const login = createLogin();
    const { token } = await createUser(login);

    const response = await supertest(app)
      .post("/test")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test",
        pdfUrl:
          "https://bootcampra.notion.site/Projeto-20-RepoProvas-27d678dab2584fc980f1686285d1d04c",
        category: "Prática",
        teacher: "Diego Pinho",
        discipline: "JavaScript",
      });
    expect(response.status).toEqual(201);
  });

  it("try to create new test without full data, and fail", async () => {
    const login = createLogin();
    const { token } = await createUser(login);

    const response = await supertest(app)
      .post("/test")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
        pdfUrl:
          "https://bootcampra.notion.site/Projeto-20-RepoProvas-27d678dab2584fc980f1686285d1d04c",
        category: "Prática",
        teacher: "Diego Pinho",
        discipline: "JavaScript",
      });
    expect(response.status).toEqual(422);
  });

  it("try to create new test without token, and fail", async () => {
    const login = createLogin();
    const { token } = await createUser(login);

    const response = await supertest(app)
      .post("/test")
      .set("Authorization", `Bearer notToken`)
      .send({
        name: "test",
        pdfUrl:
          "https://bootcampra.notion.site/Projeto-20-RepoProvas-27d678dab2584fc980f1686285d1d04c",
        category: "Prática",
        teacher: "Diego Pinho",
        discipline: "JavaScript",
      });
    expect(response.status).toEqual(401);
  });

  it("get all tests orded by discipline", async () => {
    const login = createLogin();
    const { token } = await createUser(login);

    const response = await supertest(app)
      .get("/tests/discipline")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it("get all tests orded by teacher", async () => {
    const login = createLogin();
    const { token } = await createUser(login);

    const response = await supertest(app)
      .get("/tests/teacher")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
