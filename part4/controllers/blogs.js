import express from "express"
import Blog from "../models/blog.js"
import User from "../models/user.js"

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body
  const creator = await User.findOne({})
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: creator
  })

  try {
    // update the blog database
    const savedBlog = await blog.save()

    // update the user database
    creator.blogs = creator.blogs.concat(savedBlog._id)
    await creator.save()

    response.status(201).json(savedBlog)
  } catch (e) {
    next(e)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(e) {
    next(e)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  const { likes } = request.body

  try{
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }

    blog.likes = likes
    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  } catch (e) {
    next(e)
  }
})

export default blogsRouter