const Person = ({person}) => (
  <p>{person.name} {person.number}</p>
)

const Persons = ({personsToShow}) => {
  return (
  <>
    {personsToShow.map(person => <Person key={person.id} person={person} />)}
  </>
)}

export default Persons