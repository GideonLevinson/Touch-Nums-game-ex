'use strict'

var gNums
var gSize = 16
var gNextNum
var gStartTime
var gIntervalId

function onInit() {
    gNextNum = 1
    gNums = getShuffledNums(gSize)
    renderBoard()
}
function getShuffledNums(size) {
    // Create an array of numbers from 1 to n
    var shuffledNums = Array.from({ length: size }, (_, i) => i + 1)

    for (var i = shuffledNums.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)); //if I delete the (;) i get an error! why?
        [shuffledNums[i], shuffledNums[j]] = [shuffledNums[j], shuffledNums[i]]
    }

    return shuffledNums
}

function renderBoard() {
    var strHTML = ''
    var boardLength = gNums.length ** 0.5
    for (var i = 0; i < boardLength; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < boardLength; j++) {
            var currCell = gNums.pop()
            strHTML += `<td class="cell" onclick="cellClicked(this)">${currCell}</td>`
        }
        strHTML += '</tr>\n'
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function selectLevel(level) {
    gSize = level
    newGame()
}

function newGame() {
    stopTimer()
    document.querySelector('#timer').innerText = '00:00:00'
    onInit()
    document.querySelector('.next-number').innerText = gNextNum
    document.querySelector('h2').innerText = ''
}

function cellClicked(elCell) {
    var clickedNum = +elCell.innerText // clickedNum = num in each cell.
    if (clickedNum === 1) startTimer()
    if (clickedNum === gNextNum) {
        elCell.classList.add('clicked') // adding css class on clicked cell.
        if (gNextNum === gSize) {
            victory() // render victorious and init
        } else {
            gNextNum++
            document.querySelector('.next-number').innerText = gNextNum
        }
    }
}

function victory() {
    stopTimer()
    document.querySelector('h2').innerText = 'You did it!'
  }

function startTimer() {
    gStartTime = Date.now();
    gIntervalId = setInterval(updateTimer, 10);
  }

  function stopTimer() {
    clearInterval(gIntervalId);
  }
  
  function updateTimer() {
    var elapsedTime = Date.now() - gStartTime;
    var minutes = Math.floor(elapsedTime / (1000 * 60));
    var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((elapsedTime % 1000) / 10);
    document.getElementById('timer').textContent =
      formatTime(minutes) +
      ':' +
      formatTime(seconds) +
      ':' +
      formatTime(milliseconds);
  }
  
  function formatTime(time) {
    return (time < 10 ? '0' : '') + time;
  }