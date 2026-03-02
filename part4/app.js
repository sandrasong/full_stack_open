import express from 'express'
import mongoose from 'mongoose'
import config from "./utils/config.js"
import logger from "./utils/logger.js"
import blogsRouter from "./controllers/blogs.js"
import usersRouter from "./controllers/users.js"
import loginRouter from "./controllers/login.js"
import { errorHandler, unknownEndpoint, tokenExtractor, userExtractor } from './utils/middleware.js'

const app = express()

logger.info("connecting to ", config.MONGODB_URI)

try {
  await mongoose.connect(config.MONGODB_URI, { family: 4 })
  logger.info('connected to MongoDB')
} catch (e) {
  logger.error("error connecting to MongoDB:", e.message)
}

app.use(express.static("dist"))
app.use(express.json())
app.use(tokenExtractor)

app.use("/api/login", loginRouter)
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)

app.use(errorHandler)
app.use(unknownEndpoint)

export default app