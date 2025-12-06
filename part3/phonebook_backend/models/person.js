import mongoose from "mongoose"

const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)

console.log("connecting to ", url);
try {
  await mongoose.connect(url, { family: 4 })
  console.log('connected to MongoDB')

} catch (error) {
  console.error("error connecting to MongoDB:", error)
  process.exit(1)
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model("Person", personSchema)