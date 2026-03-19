import { useState, useEffect } from 'react'
import Notification from "./components/Notification"
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  
  // UI Display logic
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(b => setBlogs(b)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser")

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    // Send username & password to server using POST request
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        "loggedInUser", JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
    } catch {
      setErrorMessage({
        type: "error",
        content: "wrong username or password"
      })
      
      // use setTimeout to clear the error msg
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()

    window.localStorage.removeItem("loggedInUser")
    setUser(null)
  }

  const addBlog = async blogObject => {  
      // Send the newBlog via blogService.create
      try {
        const blog = await blogService.create(blogObject)
  
        // Update the blogs state
        setBlogs(blogs.concat(blog))
  
        // Send success notification
        setErrorMessage({
          type: "success",
          content: `A new blog ${blog.title} by ${blog.author} added`
        })
        setTimeout(() => {setErrorMessage(null)}, 5000)
      } catch (error) {
        console.log(error)
        setErrorMessage({
          type: "error", 
          content: "Creating new blog failed"
        })
        setTimeout(() => {setErrorMessage(null)}, 5000)
      }
    }

  const LoginForm = () => (
    <>
      <h3>Log in to blog system</h3>
      <form onSubmit={handleLogin}>
        <div>
        <label>
          Username
          <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        </label>
        </div>
        <div>
        <label>
          Password
          <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
        </label>
        </div>
        <button type="submit">log in</button>
      </form>
    </>
  )

  const DisplayBlogs = () => (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {!user && LoginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in<button onClick={handleLogout}>log out</button></p>
          <Togglable hideButton="Create New Blog">
            <BlogForm createBlog={addBlog}/> 
          </Togglable>
          {DisplayBlogs()}
      </div>
      )}
    </div>
  )
}

export default App