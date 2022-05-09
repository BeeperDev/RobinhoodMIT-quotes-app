console.log('May Node be with you')

const express = require('express');         // Hey, we're going to be using express.
const bodyParser = require('body-parser');  // Hey, we're using body-parser to read data in the form
const app = express();                      // Shortening so we can call express methods


// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function() {
    console.log('listening on 3000')
})

// We normally abbreviate `request` to `req` and `response` to `res`. [  app.get(endpoint, callback)  ]
app.get('/', (req, res) => {            // Makes a request to the server to 
    res.sendFile(__dirname + '/index.html')             
})

app.post('/quotes', (req,res) => {          // [  app.post(endpoint, callback)  ] 
    console.log(req.body)
})