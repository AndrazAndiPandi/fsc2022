import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './App.css'

const Notifications = ({message})=>{
  if(message === null)
    return null
  return (
      <div class="notify">
        {message}
      </div>
    )
}
const App = () => {
  let [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)



  const hook = () =>{
    personService.getAll()
      .then(response=>setPersons(response.data))
  }
  useEffect(hook,[])



  const Remove = (person) =>{
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log("I want to remove this person: ", person.name)
      personService.remove(person.id)
      .then(()=>{
        const posts = persons.filter(item => item.id !== person.id)
        setPersons(posts)
      }).catch(()=>setErrorMsg('Contact has been already deleted!'))
    }
  }
  const ContactsDisplay = ({person})=>{
      return (<li key={person.id}>{person.name}  {person.number}
        <button onClick={()=>Remove(person)}>delete</button></li>)
  }

  const Filtering = ({persons, filter}) =>{
    return (
      persons.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()) || filter === '')
      .map(person => <ContactsDisplay key={person.id} person = {person}/>)
    )
  }

  const AddNew = (event)=>{
    event.preventDefault()
    let flag = false
    for(let i=0; i<persons.length; i++){
      if(persons[i].name === newName){
        flag=true
        if (window.confirm(`${persons[i].name} is already in phonebook - replace old number with new one?`)){
          const updatePerson = {
            name: persons[i].name,
            number: newNum,
            id: persons[i].id}
          personService.update(persons[i].id,updatePerson).then(()=>setErrorMsg(`Contact ${updatePerson.name} updated`))
          .then(()=>{
            personService.getAll().then(response=>setPersons(response.data))
          })
          setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
        }
      }
    }
    if(!flag){
      const newPerson = {
        name: newName,
        number: newNum,
        id: persons.length+1
      }

      personService.create(newPerson)
        .then(response=>setPersons(persons.concat(response.data)))
        .then(()=>setErrorMsg(`Added ${newPerson.name}`))
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)

      setNewName('')
      setNewNum('')
    }
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
      <Notifications message={errorMsg}/>
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
