import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const voteAnecdotes = () => {
    const copyVotes = [ ...votes ]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  const nextAnecdotes = () => {
    let random;
    do {
      random = Math.floor(Math.random() * anecdotes.length);
    } while (random === selected);

    setSelected(random);
    console.log(random)
  }

  const largest = Math.max(...votes)
  const largestIndex = votes.indexOf(largest)

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button onClick={voteAnecdotes} text="vote"/>
      <Button onClick={nextAnecdotes} text="next anecdotes"/>

      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[largestIndex]}</div>
      <div>has {votes[largestIndex]} votes</div>
    </>
  )
}

export default App
