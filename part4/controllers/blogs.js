import express, { response } from "express"
import Blog from "../models/blog.js"

const router = express.Router()

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post("/", async (request, response) => {
  const body = new Blog(request.body)

  const savedBlog = await body.save()
  response.status(201).json(savedBlog)
})

export default router