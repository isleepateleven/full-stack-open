import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect( () => {
    axios
      .get('http://localhost:3002/persons')
      .then(response =>{
        setPersons(response.data)
      })
  }, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()

    // Check if names exist
    const isNameExist = persons.some(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )
    
    // Prevent the user from being able to add names that already exist 
    if (isNameExist){
      alert(`${newName} is already added to phonebook`)
      return
    } 
    
    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    setPersons([...persons, personObj])
    setNewName("")
    setNewNumber("")
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase()
        .includes(filter.toLowerCase())) //checks if the name contains the search term
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App