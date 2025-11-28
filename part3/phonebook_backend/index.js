import cors from "cors"
import express from "express"
import morgan from "morgan"
const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))

morgan.token("content", (req) => (JSON.stringify(req.body)))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))

app.get('/info', (request, response) => {
  response.type('text/plain')
  response.send(`phonebook has info for ${persons.length} people\n${Date()}`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
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
  if (persons.find(p => p.name === newPerson.name)) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }

  let id = Math.floor(Math.random() * 1e5)
  newPerson.id = String(id)
  persons = persons.concat(newPerson)

  response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})