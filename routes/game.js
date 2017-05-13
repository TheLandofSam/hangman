const router = require('express').Router()
var Game = require('./../models/game')

exports.mountPath = '/game'
exports.router = router

router.route('/guess')
  .post(checkGuess)

router.route('/start-game')
  .post(startGame)

/*function getGame(req, res, next){
  Game.find({}).then(function(game){
    res.send(game)
  }) 
}*/

function checkGuess(req, res, next) {
  // find game by ID
  // check the game
  // send back game state
  var gameid = req.body._id
  var guess = req.body.letter
  Game.findById(gameid).then(function (game) {
    checkGame(game, guess, function (gameState) {
      res.send(gameState)
    })
  })
}

function startGame(req, res, next) {
  var newGame = {
    word: 'cata',
    correct: [],
    incorrect: []
  }
  Game.create(newGame).then(function (game) {
    checkGame(game, "", function (gameState) {
      res.send(gameState)
    })
  })
}

function checkGame(game, guess, callWhenDone) {


  var letterFound = false
  var gameState = {
    word: [],
    correct: game.correct,
    incorrect: game.incorrect,
    _id: game._id
  }

  for (var j = 0; j < game.word.length; j++) {
    gameState.word.push("_")
  }

  if (game.victory == true || game.maxGuesses == game.incorrect.length) {
    return callWhenDone("Game is over")
  }
  if (guess != "") {
    if (game.word.indexOf(guess) > -1) {
      gameState.correct.push(guess)
    } else {
      gameState.incorrect.push(guess)
    }
  }
  for (var i = 0; i < gameState.correct.length; i++) {
    var letter = gameState.correct[i]
    mapWord(game.word, gameState, letter)
  }
  game.save().then(function () {

    callWhenDone(gameState)
  }).catch(function (err) {
    console.log(err)
    callWhenDone(err)
  })
}

function mapWord(word, gameState, guess) {
  for (var i = 0; i < word.length; i++) {
    var letter = word[i];
    if (gameState.word[i] == '_') {
      if (letter == guess) {
        gameState.word[i] = letter
      }
    }
  }
}