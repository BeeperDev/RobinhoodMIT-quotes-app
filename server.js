console.log('May Node be with you')

const express = require('express');         // Hey, we're going to be using express.
const bodyParser = require('body-parser');  // Hey, we're using body-parser to read data in the form
const app = express();                      // Shortening so we can call express methods
const MongoClient = require('mongodb').MongoClient      // Require storage for this server
const connectionString = 'mongodb+srv://heyblinkin:abelincoln@cluster0.vrj1m.mongodb.net/?retryWrites=true&w=majority'  // link from MongoDB.com

// *******************************************************************
// MongoClient.connect(connectionString, (err, client) => {    // Connection string - Lets us know if we're connected to DB
//     if(err) return console.log(err)
//     console.log('Connected to Database')
// })
// *******************************************************************
// We'll use modern syntax with a promise compared to above

MongoClient.connect(connectionString, { useUnifiedTopology: true }) // Connection string to the MongoDB
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('robin-hood-quotes')           // name your db cloud
    const quotesCollection = db.collection('quotes')    // name your db collection
    // Make sure you place body-parser before your CRUD handlers!
    app.set('view engine', 'ejs')                       // tells express we're using EJS as the template engine

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))           // Use public/main.js
    app.use(bodyParser.json())                  // Teach it to read json

    //CRUD - READ
    // [  app.get(endpoint, callback)  ]
    app.get('/', (req, res) => {                 // Makes a request to the server to return something back to us 
      quotesCollection.find().toArray()         // Returns an array of all the db results so far.
        .then(results => {                      // results is holding the array of quotes
          console.log(results)
          res.render('index.ejs', { quotes: results })             // render results to this 'index' file
        })
        .catch(error => console.error(error))
    })
    
    //CRUD - CREATE
    app.post('/quotes', (req, res) => {          // [  app.post(endpoint, callback)  ] 
      quotesCollection.insertOne(req.body)    // promise to log stuff into the db collection
        .then(result => {
          console.log(result)
          res.redirect('/')                   // Submitted quote and returned to home so you can enter another
        })
        .catch(error => console.error(error))
    })

    //CRUD - UPDATE
    app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate(    // Let's us find and change one item in the database
        { name: 'Robin Hood' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
        .then(result => {
          console.log(result)
          res.json('Success')
        })
        .catch(error => console.error(error))
    })

    //CRUD - DELETE
    app.delete('/quotes', (req,res) => {
      quotesCollection.deleteOne(
        { name: req.body.name },
      )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No quote to delete')
        }
        res.json("Deleted Prince John's quote")
      })
      .catch(error => console.error(error))
    })


    app.listen(3000, function () {
      console.log('listening on 3000')
    })
  })
  .catch(error => console.error(error))








