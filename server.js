var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/');


app.get('/', function (req, res) {
  res.send('hi');
});

// app.get('/drawings', function (req, res) {

// });


// app.get('/drawings/:id', function (req, res) {
  
// });

// app.post('/drawings', function (req, res) {
  
// });

// app.put('/drawings', function (req, res) {
  
// });







var server = app.listen(3000, function() {
  console.log('Listening to port', server.address().port);
});