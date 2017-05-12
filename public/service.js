function Service() {
  var url = 

    this.startGame = function () {
      $.post(url).then(function (data) {
        console.log(data)
      })
    }

}