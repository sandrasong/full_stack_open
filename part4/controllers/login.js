import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/user.js"

const loginRouter = express.Router()

// send post request with user name and password
loginRouter.post("/", async (request, response) => {
  // find user from the user database with username
  const { username, password } = request.body
  const user = await User.findOne({ username })

  // check if the sent password is matched with the stored passwordhash in db
  const passwordCorrect = user && await bcrypt.compare(password, user.passwordHash)
  console.log("user", user)
  if (!passwordCorrect) {
    return response.status(401).json({ error: "invalid username or password" })
  }
  
  // after verifying password, generate token. If user or password is incorrect, send reponse with error code
  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  // send the response with token, username, and name
  response.status(200).send({token, username: user.username, name: user.name})
})

export default loginRouter