var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')
var Book = require('./models/books')
var Movie = require('./models/movies')
var routes = require('./routes')

var server = express()
var port = 4545
var connectionString = 'mongodb://darryl:darryl@ds137291.mlab.com:37291/hackathonhangmanbooks'
var connection = mongoose.connection

mongoose.connect(connectionString, {
  server: {socketOptions:{keepAlive: 300000, connectTimeoutMS: 30000}},
  replset: {socketOptions:{keepAlive: 300000, connectTimeoutMS: 30000}}
})
connection.on('error', function(err){//I am listening any time the event error to happen...
  console.log('There is a connection problem', err)
})
connection.once('open',function(){ //I am listening for the event open to happen one time, if it happens I will open one time
  console.log('We are connected...')
  server.listen(port, function(){
    console.log('Working!!', 'http://localhost:' + port)
  })
})

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use('/', express.static(`${__dirname}/public/`))
server.use(routes.router);

//ABOVE THIS LINE MOST STUFF SAME, EXECPT THE CONNECTIONSTRING

server.get('/', function(req, res, next){
  res.send('You are connected to the book database')
})