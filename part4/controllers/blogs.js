import express from "express"
import jwt from "jsonwebtoken"
import Blog from "../models/blog.js"
import User from "../models/user.js"
import { userExtractor } from '../utils/middleware.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    const user = request.user

    const creator = await User.findById(user)
    if (!creator) {
      return response.status(400).json({ error: "UserId missing or invalid"})
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: creator._id
    })

    // update the blog database
    const savedBlog = await blog.save()

    // update the user database
    const updatedCreator = await User.findById(user)
    updatedCreator.blogs = updatedCreator.blogs.concat(savedBlog._id)
    await updatedCreator.save()

    response.status(201).json(savedBlog)
  } catch (e) {
    next(e)
  }
})

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    // Check if blog creator is current user
    if (blog.user.toString() === user) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else 
      return response.status(401).json({ error: "user invalid" })

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