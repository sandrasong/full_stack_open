import { test, after, beforeEach } from "node:test"
import assert from "node:assert"
import mongoose from "mongoose"
import supertest from "supertest"
import app from "../app.js"
import helper from "./test_helper.js"
import Blog from "../models/blog.js"

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test("blogs are returned as json", async () => {
  await api.get("/api/blogs").expect(200).expect("content-Type", /application\/json/)
})

test.only("blogs has the proper id property as id", async () => {
  const response = await api.get("/api/blogs").expect(200)
  const blogs = response.body
  
  // Check each blog has id property
  blogs.forEach(blog => {
    assert(blog.id, "this blog should have id property")
    assert(!blog._id, "this blog should not have _id")
  })
})

after(async () => {
  await mongoose.connection.close()
})