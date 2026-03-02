import { useState, useEffect } from 'react'
import Notification from "./components/Notification"
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

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
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch {
      setErrorMessage("wrong username or password")
      
      // use setTimeout to clear the error msg
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()

    window.localStorage.removeItem("loggedInUser")
    setUser(null)
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
          {DisplayBlogs()}
      </div>
      )}
    </div>
  )
}

export default App