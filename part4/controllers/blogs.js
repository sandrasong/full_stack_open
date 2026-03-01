import express from "express"
import jwt from "jsonwebtoken"
import Blog from "../models/blog.js"
import User from "../models/user.js"

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body

    // Decode the token from request header to get user id
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      // 401 unauthorized error
      return response.status(401).json({ error: "token invalid" })
    }

    const creator = await User.findById(decodedToken.id)
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
    creator.blogs = creator.blogs.concat(savedBlog._id)
    await creator.save()

    response.status(201).json(savedBlog)
  } catch (e) {
    next(e)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

    // Decode the token from request header to get user id
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      // 401 unauthorized error
      return response.status(401).json({ error: "token invalid" })
    }

    // Check if blog creator is current user
    if (blog.user.toString() === decodedToken.id.toString()) {
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