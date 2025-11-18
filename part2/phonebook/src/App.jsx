import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }

    const personExist = persons.find(person => 
      person.name === newName)

    if (personExist) {
      if (window.confirm(`${personExist.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .update(personExist.id, personObject)
        .then(returnPerson => {
          setMessage(`${returnPerson.name}'s number is updated`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
          setPersons(persons.map(p => p.id !== returnPerson.id ? p : returnPerson))
        })
      }
      setNewNumber('')
      setNewName('')
      return
    }

    personService
      .create(personObject)
      .then(returnPerson => {
        setMessage(`Added ${returnPerson.name} to the phone book`)
        setTimeout(() => {
          setMessage(null)
        }, 4000)
        setPersons(persons.concat(returnPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(
          `person ${personToDelete.name} was already deleted from server`
        )
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h3>Add a new person</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addPerson={addPerson}/>  
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App