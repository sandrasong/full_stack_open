import { test, after, beforeEach, describe } from "node:test"
import assert from "node:assert"
import mongoose from "mongoose"
import supertest from "supertest"
import app from "../app.js"
import helper from "./test_helper.js"
import Blog from "../models/blog.js"

const api = supertest(app)

describe("when there is initally blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test("blogs are returned as json", async () => {
    await api.get("/api/blogs").expect(200).expect("content-Type", /application\/json/)
  })

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs")
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test("blogs has the proper id property as id", async () => {
    const response = await api.get("/api/blogs").expect(200)
    const blogs = response.body
    
    // Check each blog has id property
    blogs.forEach(blog => {
      assert(blog.id, "this blog should have id property")
      assert(!blog._id, "this blog should not have _id")
    })
  })

  describe("addition of a new blog", () => {
    test("a new blog can be added", async () => {
      const newBlog = {
        "title": "Testing blog 3",
        "author": "Random",
        "url": "https://fullstackopen.com",
        "likes": 2
      }
    
      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("content-Type", /application\/json/)
    
      const response = await api.get("/api/blogs")
      const blogTitles = response.body.map(b => b.title)
      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
      assert(blogTitles.includes("Testing blog 3"))
    })
    
    test("if the likes property is missing from the request, it will default to 0", async () => {
      const newBlog = {
        "title": "Testing blog 3",
        "author": "Random",
        "url": "https://fullstackopen.com"
      }
    
      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("content-Type", /application\/json/)
        
      assert.strictEqual(response.body.likes, 0)
    })
    
    test("blog without title is not added", async () => {
      const noTitleBlog = {
        "author": "Random",
        "url": "https://fullstackopen.com"
      }
      const noUrlBlog = {
        "title": "Testing blog 3",
        "author": "Random"
      }
    
      await api
        .post("/api/blogs")
        .send(noTitleBlog)
        .expect(400)
    
      await api
        .post("/api/blogs")
        .send(noUrlBlog)
        .expect(400)
    
      // Check the blog list length is not +1
      const response = await api.get("/api/blogs")
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })

  describe("deletion of a note", () => {
    test("succeeds with code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = await blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  describe("update a blog", () => {
    test("update a blog's likes amount", async () => {
      const newLikes = 200
      const blogs = await helper.blogsInDb()
      const blogToUpdate = blogs[0]

      const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: newLikes }).expect(200)
      assert.strictEqual(response.body.likes, newLikes)
    })
  })

})

after(async () => {
  await mongoose.connection.close()
})