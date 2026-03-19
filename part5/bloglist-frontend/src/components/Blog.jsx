import { useState } from "react"

const Blog = ({ blog }) => {
  const [displayDetail, setDisplayDetail] = useState(false)
  console.log(blog)

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
        <p>{blog.likes}</p>
        <p>{blog.user.name}</p>
      </div>
    </div>  
  )}

export default Blog