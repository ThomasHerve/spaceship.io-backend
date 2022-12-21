// app.listen() Method Demo Example

// Importing the express module
var express = require('express');

// Initializing the express and port number
var app = express();

// Initializing the router from express
var router = express.Router();
var PORT = 3000;

// App listening on the below port
app.listen(PORT, function(err){
   if (err) console.log(err);
   console.log("Server listening on PORT", PORT);
});