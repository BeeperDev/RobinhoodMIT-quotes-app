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
    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({extended: true}))    
    // We normally abbreviate `request` to `req` and `response` to `res`. [  app.get(endpoint, callback)  ]
    app.get('/', (req, res) => {            // Makes a request to the server to 
    res.sendFile(__dirname + '/index.html')    
    })
    app.post('/quotes', (req,res) => {          // [  app.post(endpoint, callback)  ] 
        console.log(req.body)
    })
    app.listen(3000, function() {
        console.log('listening on 3000')
    })
})
  .catch(error => console.error(error))








