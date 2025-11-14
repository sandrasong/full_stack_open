const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map(part => <Part part={part} key={part.id} />)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  const total = props.parts.reduce((accumulation, part) => accumulation += part.exercises, 0)
  return(
    <p>Number of exercises {total} </p>
  )
}

const Course = (props) => {
  const {name, parts} = props.course

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )

}

export default Course