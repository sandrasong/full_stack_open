import Blog from "../models/blog.js"

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

export default { initialBlogs, blogsInDb }