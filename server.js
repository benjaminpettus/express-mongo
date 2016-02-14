var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/pixeltest');

//schema has one property name:
var drawingSchema = mongoose.Schema({name: String});
//model prototype that takes a name and the above schema
var Drawing = mongoose.model('Drawing', drawingSchema);

var app = express();
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()) ;

app.get('/drawings/:id', function (req, res) {
  var drawingId = req.params.id;
  Drawing.findById(drawingId, function(err, drawing){
    res.json(drawing);
  });
});

app.put('/drawings/:id', function (req, res) {
  var drawingId = req.params.id;
  Drawing.findByIdAndUpdate(drawingId, {
   $set: {name: req.body.name}
  },
  {new: true
  },
  function(err, drawing){
    res.json(drawing);
  });
});

app.get('/drawings', function (req, res) {
  Drawing.find({}, function(err, drawings){
    res.json(drawings);
  });
});

app.post('/drawings', function (req, res) {
  var newDrawing = new Drawing({
    name: req.body.name
  });
  newDrawing.save();
  res.json(newDrawing);
});





var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (){
  console.log('db connected');
  app.listen(3000, function() {
   console.log('Listening to port');
  });
});