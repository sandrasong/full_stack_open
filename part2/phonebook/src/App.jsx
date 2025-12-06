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
          setMessage({
            message: `${returnPerson.name}'s number is updated`,
            type: 'success'
          })
          setTimeout(() => {
            setMessage(null)
          }, 4000)
          setPersons(persons.map(p => p.id !== returnPerson.id ? p : returnPerson))
        })
        .catch(error => {
          // set notification error message, last for 4s
          setMessage({
            message: `Information of ${personExist.name} has already been removed from phone book`,
            type: 'error'
          })
          setTimeout(() => {
            setMessage(null)
          }, 4000)
          setPersons(persons.filter(p => p.id !== id))
        })
      }
      setNewNumber('')
      setNewName('')
      return
    }

    personService
      .create(personObject)
      .then(returnPerson => {
        // set notification success message, last for 4s
        setMessage({
          type: 'success',
          message: `Added ${returnPerson.name} to the phone book`
        })
        setTimeout(() => {
          setMessage(null)
        }, 4000)
        setPersons(persons.concat(returnPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setMessage({
          type: 'error',
          message: error.response.data.error
        })
      })
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
          setMessage({
          type: 'success',
          message: `${personToDelete.name} is deleted`
        })
        setTimeout(() => { setMessage(null) }, 4000)
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        // set error notification when person doesn't exist in the server
        setMessage({
          type: 'error',
          message: `person ${personToDelete.name} was already deleted from server`
        })
        setTimeout(() => { setMessage(null) }, 4000)

        // remove non-exist person from local state
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