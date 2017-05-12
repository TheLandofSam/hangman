var mongoose = require('mongoose')

var Schema = mongoose.Schema
var GameSchema = new Schema({
  word: { type: String, required: true, default: 'cat' },
  numGuess: { type: Number, required: true, default: 0 },
  totalGuess: { type: Number, default: 2 },
  victory: { type: Boolean, required: true, default: false  },
  score: { type: Number, required: true, default: 0  },
  letterGuess: { type: Array, required: true  },
  startTime: { type: Number, required: true, default: Date.now()  },
  endTime: { type: Number, required: true  }
})

var Game = mongoose.model('Game', GameSchema)

module.exports = Game