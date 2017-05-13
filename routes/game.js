const router = require('express').Router()
var request = require('request')
var Game = require('./../models/game')

exports.mountPath = '/game'
exports.router = router

router.route('/guess')
  .post(checkGuess)

router.route('/start-gameh')
  .post(startGameH)

router.route('/start-gamee')
  .post(startGameE)

router.route('/start-gamem')
  .post(startGameM)

function checkGuess(req, res, next) {
  var gameid = req.body._id
  var guess = req.body.letter
  Game.findById(gameid).then(function (game) {
    checkGame(game, guess, function (gameState) {
      res.send(gameState)
    })
  })
}

function getRandomIntInclusive(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function startGameH(req, res, next) {
  var number = getRandomIntInclusive(3,8)
  var url = 'http://setgetgo.com/randomword/get.php?len='
  request.get(url + number, function (error, response, body) {
    console.log(error, response, body)
    var newGame = {
      word: body.toLowerCase(),
      correct: [],
      incorrect: [],
      maxGuesses: 4
    }
    Game.create(newGame).then(function (game) {
      checkGame(game, "", function (gameState) {
        res.send(gameState)
      })
    })
  })
}

function startGameE(req, res, next) {
  var number = getRandomIntInclusive(15,20)
  var url = 'http://setgetgo.com/randomword/get.php?len='
  request.get(url + number, function (error, response, body) {
    console.log(error, response, body)
    var newGame = {
      word: body.toLowerCase(),
      correct: [],
      incorrect: [],
      maxGuesses: 6
    }
    Game.create(newGame).then(function (game) {
      checkGame(game, "", function (gameState) {
        res.send(gameState)
      })
    })
  })
}

function startGameM(req, res, next) {
  var number = getRandomIntInclusive(9,14)
  var url = 'http://setgetgo.com/randomword/get.php?len='
  request.get(url + number, function (error, response, body) {
    console.log(error, response, body)
    var newGame = {
      word: body.toLowerCase(),
      correct: [],
      incorrect: [],
      maxGuesses: 5
    }
    Game.create(newGame).then(function (game) {
      checkGame(game, "", function (gameState) {
        res.send(gameState)
      })
    })
  })
}

function checkGame(game, guess, callWhenDone) {

  var letterFound = false
  var gameState = {
    word: [],
    correct: game.correct,
    incorrect: game.incorrect,
    _id: game._id,
    victory: game.victory,
    endTime: game.endTime,
    maxGuesses: game.maxGuesses
  }
  if(game.word == gameState.word){
    gameState.victory = true
  }
  for (var j = 0; j < game.word.length; j++) {
    gameState.word.push("_")
  }
  if (game.victory == true) {
    return callWhenDone(gameState)
  }
  if(game.maxGuesses == game.incorrect.length){
    return callWhenDone(gameState)
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