import cors from "cors"
import express from "express"
import morgan from "morgan"
import "dotenv/config"
import Person from "./models/person.js"

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))

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

app.get("/api/persons/:id", async (request, response) => {
  const id = request.params.id
  const person = await Person.findById(id)
  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", async (request, response) => {
  const id = request.params.id
  await Person.findByIdAndDelete(id)
  response.status(204).end()
})

app.post("/api/persons", async (request, response) => {
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
  // if (persons.find(p => p.name === newPerson.name)) {
  //   return response.status(400).json({
  //     error: "name must be unique"
  //   })
  // }
  const person = new Person({
    name: newPerson.name,
    number: newPerson.number,
  })
  const result = await person.save()
  response.json(result)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})