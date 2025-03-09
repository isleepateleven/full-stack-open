import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect( () => {
    personService
      .getAll()
      .then((initialPersons)=>{
        setPersons(initialPersons)
      })
  }, [])

  const displayNotification = (text, type) => {
    setNotification({text, type})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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
            displayNotification(
              `Updated ${newName}`,
              "success"
            )
          })
          .catch(error => {
            displayNotification(
             `Information of ${newName} has already been removed from server`,
              "error"
            )
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
        displayNotification(
          `Added ${newName}`,
          "success"
        )

      })
  }

  const deletePerson = (id, name) => {
      if(window.confirm(`Delete ${name} ?`)){
        personService.remove(id)
          .then(() => {
            setPersons(persons.filter((p) => p.id !== id)) // keeps only persons whose id is NOT the deleted one.
            displayNotification(
              `Deleted ${name}`, 
              "success"
            ) 
          })
          .catch(error => {
            displayNotification(
              `Information of ${name} has already been removed from server`,
               "error"
             )
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
      <Notification message={notification}/>
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