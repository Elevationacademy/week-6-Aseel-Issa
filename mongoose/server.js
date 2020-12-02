
const express = require('express')
const app = express()

const port = 3000
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/personDB', { useNewUrlParser: true })

const Schema = mongoose.Schema

const personSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number
})
const Person = mongoose.model('person', personSchema)

app.post('/person', function (request, response) {
    let p1 = new Person(request.body)
    p1.save()
    response.send(p1)
})

app.put('/person/:id', function (request, response) {
    console.log(request.params.id)
    let p1 = Person.findByIdAndUpdate({_id : request.params.id}, {age: "80"}, function(error, person){
      if (error) {
        response.send(error)
      } else {
        response.send(person)
      }
    })
})

app.get('/people', function (request, response) {
    Person.find({}, function (error, result) {
        response.send(result)
    })
})

app.delete('/apocalypse', function (request, response) {
    Person.remove({}, function (error, result) {
        if (error) {
            response.send(error)
          } else {
            response.send(result)
          }
    })
})


// const bookSchema = new Schema({ 
//     title: String,
//     author: String,
//     reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}] //reference to an array of Review documents
//   })

//   const reviewSchema = new Schema({ 
//     book: {type: Schema.Types.ObjectId, ref: 'Book'}, //reference to a Book document
//     reviewText: String,
//     critic: {type: Schema.Types.ObjectId, ref: 'Critic'} //reference to a Critic document
//   })

//   const criticSchema = new Schema({ 
//     name: String,
//     reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}], //reference to an array of Review documents
//   })

//   const Book = mongoose.model('Book', bookSchema)
//   const Review = mongoose.model('Review', reviewSchema)
//   const Critic = mongoose.model('Critic', criticSchema)

//   let b1 = new Book({
//     title: "Name of the Wind",
//     author: "Patrick Rothfuss",
//     reviews: []
// })

// let c1 = new Critic({
//     name: "William Jeffery",
//     reviews: []
// })

// let r1 = new Review({
//     book: b1,
//     critic: c1,
//     reviewText: "Excellent Book"
// })

// b1.reviews.push(r1)
// c1.reviews.push(r1)

// b1.save()
// c1.save()
// r1.save()

// Book.find({}, function(err, books){
//     console.log(books)
// })

// Book.findOne({})
//     .populate("reviews")
//     .exec(function (err, book) {
//         console.log(book.reviews)
//     })

// Review.find({})
//     .populate('book critic')
//     .exec(function (err, reviews) {
//         console.log(reviews)
//     })
