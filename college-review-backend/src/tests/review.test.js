import request from "supertest";
import app from "../app.js";
import { connectTestDB, disconnectTestDB } from "./setupTestDB.js";
import User from "../models/userModel.js";
import College from "../models/collegeModel.js";
import Review from "../models/reviewModel.js";

let token;
let collegeId;
let reviewId;

beforeAll(async () => {
  await connectTestDB();
  await User.deleteMany();
  await College.deleteMany();
  await Review.deleteMany();

  // Create user and get token
  const user = await request(app).post("/api/auth/register").send({
    name: "Reviewer",
    email: "reviewer@example.com",
    password: "password123",
  });
  token = user.body.token;

  // Create college
  const college = await College.create({
    name: "Test College",
    location: "City",
    description: "Great college",
  });
  collegeId = college._id.toString();
});

afterAll(async () => {
  await disconnectTestDB();
});

describe(" REVIEW API", () => {
  test("Create review", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Great Experience",
        comment: "Faculty were awesome!",
        rating: 5,
        collegeId,
      });

    expect(res.statusCode).toBe(201);
    reviewId = res.body.review._id;
  });

  test("Get reviews for a college", async () => {
    const res = await request(app).get(`/api/reviews/college/${collegeId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBeGreaterThan(0);
  });

  test("Update review", async () => {
    const res = await request(app)
      .put(`/api/reviews/${reviewId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ comment: "Updated review comment" });
    expect(res.statusCode).toBe(200);
    expect(res.body.review.comment).toBe("Updated review comment");
  });

  test("Delete review", async () => {
    const res = await request(app)
      .delete(`/api/reviews/${reviewId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
