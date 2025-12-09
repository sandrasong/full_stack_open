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

export default { dummy, totalLikes, favoriteBlog }