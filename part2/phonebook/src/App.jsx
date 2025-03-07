import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect( () => {
    personService
      .getAll()
      .then((initialPersons)=>{
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    // Check if there is existing person 
    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )
    
    // If user exists, replace the old number 
    if (existingPerson){
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate){
        const updatedPerson = { ...existingPerson, number: newNumber };

        // Send PUT request to update the number
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((person) => 
              person.id !== existingPerson.id ? person : returnedPerson
            ));
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            alert(`Error: ${newName} was already deleted from the server.`);
            setPersons(persons.filter(person => person.id !== existingPerson.id)); 
          });
                    
      }
      return;
    } 
    
    // If name doesn't exist, create new contact
    const personObj = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1
    }

    personService
      .create(personObj)
      .then((returnedPersons) => {
        setPersons(persons.concat(returnedPersons))
        setNewName("")
        setNewNumber("")
      })
  }

  const deletePerson = (id, name) => {
      if(window.confirm(`Delete ${name} ?`)){
        personService.remove(id)
          .then(() => {
            setPersons(persons.filter((p) => p.id !== id)) // keeps only persons whose id is NOT the deleted one.
          })
          .catch(error => {
            alert(`Error: ${name} was already deleted from server`)
            setPersons(persons.filter((p) => p.id !== id)) 
          })
      }
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase()
        .includes(filter.toLowerCase())) //checks if the name contains the search term
    : persons

    
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/> 
    </div>
  )
}

export default App