function Controller() {

  var service = new Service()


  this.startGameH = function () {
    service.startGameH(draw, fail)
  }

  this.startGameE = function () {
    service.startGameE(draw, fail)
  }

  this.startGameM = function () {
    service.startGameM(draw, fail)
  }
  this.startGame = function () {
    $('.level').css("display", "none")
    $('body').css("background-image", "url(http://wallpapercave.com/wp/6SKGas2.png)")
    service.startGame(draw, fail)
  }

  this.guess = function (event) {
    event.preventDefault()
    service.guess(event.target.value, draw, fail)
  }


  function draw(data) {
    var elem = document.getElementById('display')
    var button = document.getElementById('button')
    var buttonTemp = ''
    var wordTemplate = data.word.join(' ')
    var charMap = getCharMap(data)
    var template = ''
    if (data.victory == true) {
      template +=`
      <h1>win</h1>
      `
      elem.innerHTML = template
    }
    if(data.maxGuesses == data.incorrect.length){
      template +=`
      <h1>lose</h1>
      `
      elem.innerHTML = template
    }
    else {
      for (var i = 0; i < charMap.length; i++) {
        var char = charMap[i];
        buttonTemp += `
        <button onclick='app.controllers.ctrl.guess(event)' value='${charMap[i]}'>${charMap[i]}</button>
        `
      }
      template +=`
      <h3>${data.incorrect}</h3>
      <h3>${wordTemplate}</h3>
      `
      elem.innerHTML = template
      button.innerHTML = buttonTemp
    }
  }

  function fail(error) {
    console.error("Something broke", error)
  }

  function getCharMap(data) {
    var usedLet = data.incorrect.concat([...data.correct])
    var charMap = 'abcdefghijklmnopqrstubwxyz'.split('')
    for (var i = 0; i < charMap.length; i++) {
      var char = charMap[i]
      for (var j = 0; j < usedLet.length; j++) {
        var letter = usedLet[j];
        if (char == letter) {
          charMap.splice(i, 1)
          i--
        }
      }
    }
    return charMap
  }
}