import mongoose from "mongoose"

if (process.argv.length < 3) {
  console.log("missing password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstacksandra:${password}@cluster0.cbkewiz.mongodb.net/phonebook?appName=Cluster0`

mongoose.set("strictQuery",false)
await mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 3) {
  const result = await Person.find({})
  result.forEach(person => {console.log(person)})
  await mongoose.connection.close()
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const newPerson = new Person({
    name: name,
    number: number,
  })

  await newPerson.save()
  console.log(`added ${name}, number: ${number} to phonebook`)
  await mongoose.connection.close()

  // Promise syntax version:
  // newPerson.save().then(result => {
  //   console.log(`added ${name} number: ${number} to phonebook`)
  //   mongoose.connection.close()
  // })
}