import express, { request, response } from "express"
import bcrypt from "bcrypt"
import User from "../models/user.js"

const usersRouter = express.Router()

usersRouter.get("/", async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    // password length restriction
    if (password.length < 3) {
      return response.status(400).json({ error: "password must be at least 3 characters" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

      const savedUser = await user.save()
      response.status(201).json(savedUser)
  } catch (error) {
    next(error) // pass error to error handling middleware
  }
})

export default usersRouter