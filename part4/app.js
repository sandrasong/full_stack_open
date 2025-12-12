import express from 'express'
import mongoose from 'mongoose'
import config from "./utils/config.js"
import logger from "./utils/logger.js"
import router from "./controllers/blogs.js"
import middleware from './utils/middleware.js'

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

app.use("/api/blogs", router)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

export default app