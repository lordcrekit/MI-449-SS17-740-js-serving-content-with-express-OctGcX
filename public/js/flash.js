flashtext = (function() {

  /**
   * Every entry should be a function that takes and returns a color.
   * Colors that are generated are passed through every entry in order.
   */
  var colorModifiers = []

  var timeConst = 500
  var timeVariance = 500
  var elements = document.getElementsByClassName('ft')

  function start() {
    for (var i = 0; i < elements.length; i++) {
      swapColor(elements[i])
    }
  }

  function swapColor(element) {
    element.style.color = getRandomColor()
    setInterval(function() {
      element.style.color = getRandomColor()
    }, timeConst+Math.random()*timeVariance)
  }

  function getRandomColor () {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    for (c in colorModifiers) {
      color = c(color)
    }
    return color
  }

  return {
    timeConst,
    timeVariance,
    colorModifiers,
    start
  }

})()

flashtext.start()
