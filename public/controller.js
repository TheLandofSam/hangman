function Controller() {

  var service = new Service()

  this.startGame = function () {
    service.startGame(draw, fail)
  }

  this.guess = function (event) {
    event.preventDefault()
    service.guess(event.target.guess.value, draw, fail)
  }


  function draw(data) {
    var elem = document.getElementById('display')
    var wordTemplate = data.word.join(' ')
    var template = `
      <h3>${data.incorrect}</h3>
      <h3>${wordTemplate}</h3>
      `

    elem.innerHTML = template
  }

  function fail(error) {
    console.error("Something broke", error)
  }
}