const router = require('express').Router()
var Game = require('./../models/game')

exports.mountPath = '/game'
exports.router = router

router.route('/')
  .get(getGame)

router.route('/')
  .post(createGame)

/*function getGame(req, res, next){
  Game.find({}).then(function(game){
    res.send(game)
  }) 
}*/

function createGame(req, res, next){
  var newGame = req.body
  Game.create(newGame).then(function(createdGame){
    res.send(createdGame)
  })
}