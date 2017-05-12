const router = require('express').Router()
var Game = require('./../models/game')

exports.mountPath = '/game'
exports.router = router

router.route('/')
  .get(getGame)

router.route('/')
  .post(startGame)

/*function getGame(req, res, next){
  Game.find({}).then(function(game){
    res.send(game)
  }) 
}*/

function startGame(req, res, next){
  var newGame = req.body
  Game.create(newGame).then(function(startGame){
    res.send(startGame)
  })
}

function checkGame(req, res, next){
  
}