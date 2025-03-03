import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // executed immediately after rendering
  // param 1: function (effect itself)
  // param 2:  specify how often the effect is run ([] means only run along with the first render)
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes') // fetching of data from the server
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data) // triggers the re-rendering of the component
      })
  }, [])
  console.log('render', notes.length, 'notes')


  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App 