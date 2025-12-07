import cors from "cors"
import express from "express"
import morgan from "morgan"
import "dotenv/config"
import Person from "./models/person.js"

const app = express()

app.use(express.static("dist"))
app.use(express.json())
app.use(cors())

morgan.token("content", (req) => (JSON.stringify(req.body)))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))

app.get('/info', async (request, response) => {
  const persons = await Person.find({})
  response.type('text/plain')
  response.send(`phonebook has info for ${persons.length} people\n${Date()}`)
})

app.get('/api/persons', async (request, response) => {
  const persons = await Person.find({})
  response.json(persons)
})

app.get("/api/persons/:id", async (request, response, next) => {
  const id = request.params.id
  try {
    const person = await Person.findById(id)
    if(person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

app.delete("/api/persons/:id", async (request, response, next) => {
  try {
    const id = request.params.id
    await Person.findByIdAndDelete(id)
    response.status(204).end()
  } catch (e) {
    next(error)
  }
})

app.post("/api/persons", async (request, response, next) => {
  const newPerson = request.body
  if(!newPerson.number) {
    return response.status(400).json({
      error: "number is missing"
    })
  }
  if(!newPerson.name) {
    return response.status(400).json({
      error: "name is missing"
    })
  } 
  const person = new Person({
    name: newPerson.name,
    number: newPerson.number,
  })

  try {
    const result = await person.save()
    response.json(result)
  } catch (e) {
    next(e)
  }
})

app.put("/api/persons/:id", async (request, response, next) => {
  const { name, number } = request.body
  try {
    const person = await Person.findById(request.params.id)
    if (!person) {
      return response.status(404).end()
    }
    person.name = name
    person.number = number

    const updatedPerson = await person.save()
    return response.json(updatedPerson)

  } catch (e) {
    next(e)
  }
})

// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// handler of requests with invalid person id
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }
  
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})