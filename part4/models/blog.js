import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
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