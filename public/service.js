function Service() {
  var url = 'http://localhost:4545/game'

    this.startGame = function () {
      $.post(url).then(function (data) {
        console.log(data)
      })
    }

}