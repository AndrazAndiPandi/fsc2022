import { useState } from 'react'

const ContactsDisplay = ({person})=>{
    return <li key={person.id}>{person.name}  {person.number}</li>
}

const Filtering = ({persons, filter}) =>{
  return (
    persons.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()) || filter === '')
    .map(person => <ContactsDisplay key={person.id} person = {person}/>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
   { name: 'Arto Hellas', number: '040-123456', id: 1 },
   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  const AddNew = (event)=>{
    event.preventDefault()
    let flag = false
    for(let i=0; i<persons.length; i++){
      if(persons[i].name === newName)
        flag=true
    }
    if(!flag){
      const newPerson = {
        name: newName,
        number: newNum,
        id: persons.length+1
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNum('')
    } else alert(`${newName} is already added to phonebook!`)
  }
  const HandleChange = (event) =>{
    setNewName(event.target.value)
  }
  const HandleChangeNum = (event) =>{
    setNewNum(event.target.value)
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with: <input value={filter} onChange={event=>setFilter(event.target.value)}/>
      </div>

      <form onSubmit={AddNew}>
        <h2>Add new contact</h2>
        <div>
          name: <input value={newName} onChange={HandleChange} />
        </div>
        <div>
          number: <input value={newNum} onChange={HandleChangeNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <Filtering persons={persons} filter={filter}/>
      </ul>
    </div>
  )
}

export default App
