require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(morgan('combined'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }

  next(error)
}

app.get('/', (request,response)=>{
  response.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (request,response)=>{
  Person.find({}).then(person=>response.json(person))
  })


app.get('/info', (request,response)=>{
  let date = new Date()
  response.send(`<p>Phonebook has info for ${Person.length} persons.</p>
    <p>${date}</p>`)
})

app.get('/api/persons/:id', (request,response)=>{
  const id = Number(request.params.id)
  const person = Person.find(p=> p.id===id)
  response.json(person)
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request,response,next)=>{
  const id = request.params.id
  Person.findByIdAndDelete(id,()=>{
    response.redirect('/')
  }).catch(error=>next(error))
})



app.post('/api/persons', (request,response,next)=>{
  const person = new Person({
    name: request.body.name,
    number: request.body.number
  })
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`HelloNode app listening on port ${PORT}!`))
console.log(`Server running on port ${PORT}`)
