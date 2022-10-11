require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(morgan('combined'))
app.use(cors())
app.use(express.static('build'))

app.get('/', (request,response)=>{
  response.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (request,response)=>{
  Person.find({}).then(person=>response.json(person))
    mongoose.connection.close()
  })


app.get('/info', (request,response)=>{
  let date = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} persons.</p>
    <p>${date}</p>`)
})

app.get('/api/persons/:id', (request,response)=>{
  const id = Number(request.params.id)
  const person = persons.find(p=> p.id===id)
  response.json(person)
})

app.delete('/api/persons/:id', (request,response)=>{
  const id = Number(request.params.id)
  const person = persons.find(p=> p.id!==id)
  response.status(204).end()
})

app.use(express.json())

app.post('/api/persons', (request,response)=>{
  const person = request.body
  if(person.name === '')
    response.status(204).send({error: 'Input your name!'})
  if(person.number === '')
    response.status(204).send({error:'Input your number!'})
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`HelloNode app listening on port ${PORT}!`))
console.log(`Server running on port ${PORT}`)
