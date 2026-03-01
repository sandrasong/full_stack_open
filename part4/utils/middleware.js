import logger from "./logger.js"

// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

// Get token from the request authorization header
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    // use request.token to get the token
    request.token = authorization.replace("Bearer ", "")
  }
  next()
}


// handler of requests with invalid person id
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  // For debugging and writing error handler
  console.log("Error name:", error.name)
  console.log("Error code:", error.code)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    return response.status(400).json({ error: "invalid user, username already exist" })
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" })
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired"})
  }

  next(error)
}

export default { unknownEndpoint, errorHandler, tokenExtractor }