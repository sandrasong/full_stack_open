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


const mostLikes = (blogs) => {
  const groupedByAuthor = lodash.groupBy(blogs, "author")
  const authorLikes = lodash.mapValues(groupedByAuthor, blogArray => lodash.sumBy(blogArray, "likes"))
  const authorList = lodash.map(authorLikes, (value, key) => ({
    author: key,
    likes: value
  }))
  return authorList.reduce((mostLikes, author) => 
  mostLikes.likes > author.likes ? mostLikes : author, {})
}
export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }