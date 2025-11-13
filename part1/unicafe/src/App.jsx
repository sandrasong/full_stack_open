import { useState } from 'react'

const Display = (props) => (
  <>
    <h1>statistics</h1>
    <p>good: {props.good}</p>
    <p>neutral: {props.neutral}</p>
    <p>bad: {props.bad}</p>
  </>
)

const Button = ({onClick, children}) => (
  <button onClick={onClick}>{children}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood}>good</Button>
      <Button onClick={handleNeutral}>neutral</Button>
      <Button onClick={handleBad}>bad</Button>
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
