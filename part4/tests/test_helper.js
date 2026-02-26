import Blog from "../models/blog.js"
import User from "../models/user.js"

const initialBlogs = [
  {
    "title": "Testing blog",
    "author": "Random",
    "url": "https://fullstackopen.com",
    "likes": 1
  },
  {
    "title": "Testing blog 2",
    "author": "Random",
    "url": "https://fullstackopen.com",
    "likes": 5
  }
]

const nonExistingId = async () => {

}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

export default { initialBlogs, blogsInDb, usersInDb }