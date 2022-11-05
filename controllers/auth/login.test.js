// const mongoose = require("mongoose");
// const request = require("supertest");
// require("dotenv").config();

// const app = require("../../app");
// const { User } = require("../../models");

// const { DB_TEST_HOST, PORT } = process.env;

// describe("test login controller", () => {
//   let server;
//   beforeAll(() => {
//     mongoose
//       .connect(DB_TEST_HOST)
//       .then(() => {
//         server = app.listen(PORT, () => {});
//       })
//       .catch(() => {
//         process.exit(1);
//       });
//   });
//   afterAll((done) => {
//     mongoose.disconnect(done);
//     server.close();
//   });

//   test("login with valid body, return token and users object", async () => {
//     const {
//       status,
//       body: {
//         data: { token, user }
//       }
//     } = await request(app)
//       .post("/api/auth/login")
//       .set("Content-type", "application/json")
//       .send({
//         email: "yulia@gmail.com",
//         password: "123456"
//       });

//     expect(status).toBe(200);
//     expect(typeof token).toBe("string");
//     expect(typeof user).toBe("object");
//     expect(typeof user.email).toBe("string");
//     expect(typeof user.subscription).toBe("string");
//   });

//   test("login without body", async () => {
//     const {
//       status,
//       body: { message }
//     } = await request(app)
//       .post("/api/auth/login")
//       .set("Content-type", "application/json")
//       .send();

//     expect(status).toBe(400);
//     expect(message).toBe('"email" is required');
//   });

//   test("login without email", async () => {
//     const {
//       status,
//       body: { message }
//     } = await request(app)
//       .post("/api/auth/login")
//       .set("Content-type", "application/json")
//       .send({
//         password: "123456"
//       });

//     expect(status).toBe(400);
//     expect(message).toBe('"email" is required');
//   });

//   test("login without password", async () => {
//     const {
//       status,
//       body: { message }
//     } = await request(app)
//       .post("/api/auth/login")
//       .set("Content-type", "application/json")
//       .send({
//         email: "yulia@gmail.com"
//       });

//     expect(status).toBe(400);
//     expect(message).toBe('"password" is required');
//   });

//   test("login with invalid email", async () => {
//     const {
//       status,
//       body: { message }
//     } = await request(app)
//       .post("/api/auth/login")
//       .set("Content-type", "application/json")
//       .send({
//         email: "yuliagmail.com",
//         password: "123456"
//       });

//     expect(status).toBe(400);
//     expect(message).toBe("Please enter a valid email address");
//   });

//   test("login with incorrect email", async () => {
//     const {
//       status,
//       body: { message }
//     } = await request(app)
//       .post("/api/auth/login")
//       .set("Content-type", "application/json")
//       .send({
//         email: "yulia12@gmail.com",
//         password: "123456"
//       });

//     expect(status).toBe(401);
//     expect(message).toBe("Email or password is wrong");
//   });

//   test("login with invalid password", async () => {
//     const {
//       status,
//       body: { message }
//     } = await request(app)
//       .post("/api/auth/login")
//       .set("Content-type", "application/json")
//       .send({
//         email: "yulia@gmail.com",
//         password: "12345"
//       });

//     expect(status).toBe(400);
//     expect(message).toBe(
//       '"password" length must be at least 6 characters long'
//     );
//   });

//   test("login with incorrect password", async () => {
//     const {
//       status,
//       body: { message }
//     } = await request(app)
//       .post("/api/auth/login")
//       .set("Content-type", "application/json")
//       .send({
//         email: "yulia@gmail.com",
//         password: "1234567"
//       });

//     expect(status).toBe(401);
//     expect(message).toBe("Email or password is wrong");
//   });
// });
