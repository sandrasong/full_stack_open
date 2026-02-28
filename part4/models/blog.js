import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
})

blogSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject.__v
    delete returnObject._id
  }
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog