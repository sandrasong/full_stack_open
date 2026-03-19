import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    console.log("BlogForm newBlog object is:", newBlog)

    // reset newBlog state to initial
    setNewBlog({
      title: "",
      author: "",
      url: "",
      likes: 0
    })
  }

    return (
      <div>
        <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
      <div>
        <label>
          Title:
          <input 
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({
              ...newBlog, 
              title: target.value
            })}
          />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input 
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({
              ...newBlog, 
              author: target.value
            })}
          />
        </label>
      </div>
      <div>
        <label>
          URL:
          <input 
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({
              ...newBlog, 
              url: target.value
            })}
          />
        </label>
      </div>
      <button type="submit">create new blog</button>
    </form>
    </div>
    )
}

export default BlogForm