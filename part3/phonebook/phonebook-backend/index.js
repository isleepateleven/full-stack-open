const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

// Display how many entries and timestamp
app.get('/info', (request, response) => {
    const totalPersons = persons.length
    const timestamp = new Date() 

    response.send(`
        <p>Phonebook has info for ${totalPersons} people</p>
        <p>${timestamp}</p>
    `)
})

// Fetching all phonebook entries 
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// Fetching a single phonebook entry
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// Deleting a single phonebook entry
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return String(Math.floor(Math.random() * 1000000))
}

// Adding new phonenook entries
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number){
        return response.status(400).json( { error: 'name or number is missing' } )
    }

    const nameExists = persons.some(p => p.name === body.name)
    if (nameExists) {
        return response.status(400).json( { error: 'name must be unique' } )
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson) 
    response.json(newPerson)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})