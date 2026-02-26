import { test, after, beforeEach, describe } from "node:test"
import assert from "node:assert"
import mongoose from "mongoose"
import supertest from "supertest"
import app from "../app.js"
import helper from "./test_helper.js"
import bcrypt from "bcrypt"
import User from "../models/user.js"

const api = supertest(app)

describe("when there is initally one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("secret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test("creating a new user", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mluukkai",
      name: "Matt Luukkainen",
      password: "salainen",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })

  test("creation fails with proper statuscode and message if username already exist", async ()=> {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: "root",
      name: "Superuser",
      password: "secret"
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes("invalid user, username already exist"))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test("creation fails with proper statuscode and message if password is shorter than 3 character", async ()=> {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "hellas",
      name: "Arto Hellas",
      password: "12"
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes("password must be at least 3 characters"))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test("creation fails with proper statuscode and message if username is shorter than 3 character", async ()=> {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "he",
      name: "Arto Hellas",
      password: "12456"
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes("`username` (`he`, length 2) is shorter than the minimum allowed length"))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async() => {
  await mongoose.connection.close()
})