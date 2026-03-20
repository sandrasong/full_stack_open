import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, update }) => {
  const [displayDetail, setDisplayDetail] = useState(false)

  const updateBlog = event => {
    event.preventDefault()
    const updatedBlogObject = { ...blog, likes: blog.likes + 1 }
    update(blog.id, updatedBlogObject)
  }

  const blogStyle = {
    padding: "16px 8px",
    border: "1px dashed grey",
    borderWidth: 1,
    marginBottom: 5,
    marginTop:5
  }

  return(
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDisplayDetail(true)} style={{ display: displayDetail ? "none" : "inline-block" }}>view detail</button>
        <button onClick={() => setDisplayDetail(false)} style={{ display: displayDetail ? "inline-block" : "none"}}>hide detail</button>
      </div>
      <div style={{ display: displayDetail ? "block":"none" }}>
        <p>{blog.url}</p>
        <p>{blog.likes}<button onClick={updateBlog}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </div>  
  )}

export default Blog