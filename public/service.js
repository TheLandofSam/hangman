function Service() {
  var url2 = 'http://localhost:4545/game/guess'
  var urlh = 'http://localhost:4545/game/start-gameh'
  var urle = 'http://localhost:4545/game/start-gamee'
  var urlm = 'http://localhost:4545/game/start-gamem'
  var currentGameId = ''


  this.startGameH = function (draw, fail) {
    $.post(urlh).then(function (data) {
      console.log(data)
      draw(data)
      currentGameId = data._id
    }).catch(fail)
  }

  this.startGameE = function (draw, fail) {
    $.post(urle).then(function (data) {
      draw(data)
      currentGameId = data._id
    }).catch(fail)
  }

  this.startGameM = function (draw, fail) {
    $.post(urlm).then(function (data) {
      console.log(data)
      draw(data)
      currentGameId = data._id
    }).catch(fail)
  }

  this.guess = function (val, draw, fail) {
    $.post(url2, { letter: val, _id: currentGameId }).then(function (event) {
      draw(event)
    }).catch(fail)
  }



}