import { useState } from 'react'

const Display = ({good, neutral, bad}) => {
  let average = 0 
  let positive = 0
  let all = good + neutral + bad
  if (all != 0 ) {
    average = (1 * good - 1 * bad) / all
    positive = good / all * 100
  }
  return (
    <>
      <h1>statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all}</p>
      <p>average: {average}</p>
      <p>positive: {positive}%</p>
    </>
)}

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
