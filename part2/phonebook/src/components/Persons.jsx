const Person = ({person, handleDelete}) => (
  <p>
    <span>{person.name} {person.number}</span><button onClick={() => handleDelete(person.id)}>delete</button>
  </p>
)

const Persons = ({personsToShow, handleDelete}) => {
  return (
  <>
    {personsToShow.map(person => <Person key={person.id} person={person} handleDelete={handleDelete} />)}
  </>
)}

export default Persons