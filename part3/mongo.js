const mongoose = require('mongoose')

if(process.argv.length < 3){
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.5vlcj.mongodb.net/phoneBook?retryWrites=true&w=majority`

const bookSchema = mongoose.Schema({
  name: String,
  number: String
})

const Person = new mongoose.model('Person',bookSchema)


if(process.argv.length === 3){
    mongoose.connect(url).then(()=>{
      console.log("Database connected!")
      Person.find({}).then(result=>{
        console.log("Found results")
        result.forEach((person) => {console.log(person)})
        })
        mongoose.connection.close()
      })
}
if(process.argv.length > 3){
  mongoose.connect(url).then((result)=>{
    console.log("Database connected!")
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4]
    })
    return person.save()
  }).then(()=>{
    console.log("New contact added!")
    mongoose.connection.close()
  }).catch(err => console.log(err))
}
