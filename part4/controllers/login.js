import express from "express"
import jwt from "jsonwebtoken"

const loginRouter = express.Router()

// send post request with user name and password
// find user from the user database with username
// check if the sent password is matched with the stored passwordhash in db
// after verifying password, generate token. If user or password is incorrect, send reponse with error code
// send the response with token, username, and name

export default loginRouter