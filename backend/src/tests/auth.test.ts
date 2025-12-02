import request from "supertest";
import app from "../app";

describe("Auth Endpoints", () => {
  it("should fail registration with short password", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      password: "123", // Too short (Zod requires 6)
    });

    expect(res.statusCode).toEqual(400);
  });

  it("should fail login with non-existent user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "UserThatDoesNotExist12345",
      password: "password123",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Invalid credentials");
  });
});
