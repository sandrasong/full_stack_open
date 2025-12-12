import express, { response } from "express"
import Blog from "../models/blog.js"

const router = express.Router()

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post("/", async (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (e) {
    next(e)
  }
})

router.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(e) {
    next(e)
  }
})

router.put("/:id", async (request, response, next) => {
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

export default router