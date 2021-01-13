const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
let fruitIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
    //create element
    const square = document.createElement('div')
    //add styling to the element
    square.classList.add('square')
    //put the element into our grid
    grid.appendChild(square)
    //push it into a new squares array
    squares.push(square)
  }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
  //remove the snake
  currentSnake.forEach(index => squares[index].classList.remove('snake'))
  //remove the fruit
  squares[fruitIndex].textContent = ''
  squares[currentSnake[0]].classList.remove('fruit')
  clearInterval(timerId)
  currentSnake = [2, 1, 0]
  score = 0
  generateFruit()
  //re add new score to browser
  scoreDisplay.textContent = score
  direction = 1
  intervalTime = 1000

  //readd the class of snake to our new currentSnake
  currentSnake.forEach(index => squares[index].classList.add('snake'))
  timerId = setInterval(move, intervalTime)
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains('snake')
  )
    return clearInterval(timerId)

  //remove last element from our currentSnake array
  const tail = currentSnake.pop()
  //remove styling from last element
  squares[tail].classList.remove('snake')
  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction)
  //add styling so we can see it

  //deal with snake head gets fruit
  if (squares[currentSnake[0]].classList.contains('fruit')) {
    //remove the class of fruit
    squares[currentSnake[0]].textContent = ''
    squares[currentSnake[0]].classList.remove('fruit')
    //grow our snake by adding class of snake to it
    squares[tail].classList.add('snake')
    // console.log(tail)
    //grow our snake array
    currentSnake.push(tail)
    // console.log(currentSnake)
    //generate new fruit
    generateFruit()
    //add one to the score
    score += 10
    //display our score
    scoreDisplay.textContent = score
    //speed up our snake
    clearInterval(timerId)
    // console.log(intervalTime)
    intervalTime = intervalTime * speed
    // console.log(intervalTime)
    timerId = setInterval(move, intervalTime)
  }



  squares[currentSnake[0]].classList.add('snake')
}


function generateFruit() {
  do {
    fruitIndex = Math.floor(Math.random() * squares.length)
    console.log(fruitIndex)
  } while (squares[fruitIndex].classList.contains('snake'))
  squares[fruitIndex].classList.add('fruit')
  const fruit = document.querySelector('.fruit')
  console.log(fruit)
  //making snake fruits different by each time with Math.random() and Math.floor()
  const fruitSelection = ['🍎', '🍐', '🍊', '🍉', '🍇', '🍒', '🥭', '🥝', '🥑', '🍑']
  let randomNumber = Math.floor(Math.random() * fruitSelection.length)
  // console.log(randomNumber)
  let randomFruit = fruitSelection[randomNumber]
  // console.log(randomFruit)
  fruit.innerHTML = randomFruit
}


function control(e) {


  if (e.keyCode === 39) { // 39 is right arrow
    console.log('right pressed')
    direction = 1
  } else if (e.keyCode === 38) { // 38 is for the up arrow
    console.log('up pressed')
    direction = -width
  } else if (e.keyCode === 37) { // 37 is for the left arrow
    console.log('left pressed')
    direction = -1
  } else if (e.keyCode === 40) { // 40 is for the down arrow
    console.log('down pressed')
    direction = +width
  }
}
document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)