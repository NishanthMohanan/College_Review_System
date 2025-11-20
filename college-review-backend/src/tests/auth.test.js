import request from "supertest";
import app from "../app.js";
import User from "../models/userModel.js";
import { connectTestDB, disconnectTestDB } from "./setupTestDB.js";

beforeAll(async () => {
  await connectTestDB();
  await User.deleteMany();
});

afterAll(async () => {
  await disconnectTestDB();
});

describe(" AUTH API", () => {
  const userData = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  };

  test("Register new user", async () => {
    const res = await request(app).post("/api/auth/register").send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  test("Login user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: userData.email,
      password: userData.password,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
