function Service() {
  var url = 'http://localhost:4545/game/start-game'
  var url2 = 'http://localhost:4545/game/guess'
  var currentGameId = ''

  
    this.startGame = function (draw, fail) {
      $.post(url).then(function (data) {
        console.log(data)
        draw(data)
        currentGameId = data._id
      }).catch(fail)
    }

    this.guess = function (val, draw, fail) {
      $.post(url2, {letter: val, _id: currentGameId}).then(function (event) {
        draw(event)
      }).catch(fail)
    }



}