const mongoose = require('mongoose')
const password = 'fsc2022'
const url = `mongodb+srv://fullstack:${password}@cluster0.5vlcj.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.connect(url)

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true},
  number: String
})

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person',bookSchema)
