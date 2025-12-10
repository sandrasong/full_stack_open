import lodash from "lodash"

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, currentBlog) => total + currentBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((mostLikes, blog) => 
    mostLikes.likes > blog.likes ? mostLikes : blog, {})
}

const mostBlogs = (blogs) => {
  const countByAuthor = lodash.countBy(blogs, "author")
  const authorList = lodash.map(countByAuthor, (value, key) => ({
    author: key,
    blogs: value
  }))
  return authorList.reduce((mostBlogs, author) => 
  mostBlogs.blogs > author.blogs ? mostBlogs : author, {})
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs }