const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message.message}
    </div>
  )
}

export default Notification