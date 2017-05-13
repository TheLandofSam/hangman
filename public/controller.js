function Controller(){

  var service = new Service()

  this.startGame = function (){
    service.startGame(draw,fail)
  }

  this.guess = function (event) {
    event.preventDefault()
    service.guess(event.target.guess.value, draw, fail)
  }


  function draw(){}

  function fail(error){
    console.error("Something broke", error)
  }
}