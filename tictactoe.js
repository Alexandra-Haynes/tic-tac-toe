//array that holds the board:

let boardData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
//game variables
let player = 1;
let gameOver = false;
let resultGameOver = document.getElementById("game-over");
const resultElement = document.getElementById("result");
const cellElements = document.querySelectorAll(".cell");
cellElements.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    placeMarker(index);
  });
});

function placeMarker(index) {
  //determine row and col from index
  let col = index % 3;
  let row = (index - col) / 3;
  //check if the curr cell is empty & nobody won
  if (boardData[row][col] == 0 && gameOver == false) {
    boardData[row][col] = player;
    //switching players:
    player *= -1;
    drawMarker();
    checkResult();
  }
}

function drawMarker() {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      //update cell class
      if (boardData[r][c] == 1) {
        cellElements[r * 3 + c].classList.add("cross");
        //index = row * 3 + col COOOOL!!!
      } else if (boardData[r][c] == -1) {
        cellElements[r * 3 + c].classList.add("circle");
      }
    }
  }
}

function checkResult() {
  //check rows & cols
  for (let i = 0; i < 3; i++) {
    let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
    let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
    if (rowSum == 3 || colSum == 3) {
      endGame(1);
      return;
    } else if (rowSum == -3 || colSum == -3) {
      endGame(2);
      return;
    }
  }

  //check diagonals:
  let diagSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
  let diagSum2 = boardData[2][0] + boardData[1][1] + boardData[0][2];
  if (diagSum1 == 3 || diagSum2 == 3) {
    endGame(1);
    return;
  } else if (diagSum1 == -3 || diagSum2 == -3) {
    endGame(2);
    return;
  }

  //check for a tie

  if (
    boardData[0].indexOf(0) == -1 &&
    boardData[1].indexOf(0) == -1 &&
    boardData[2].indexOf(0) == -1
  ) {
    //index -1 means not found - no zero found
    //winner=0 means it's a tie
    endGame(0);
  }
}

//end game & results:

function endGame(winner) {
  gameOver = true;
  if (winner == 0) {
    resultElement.innerText = "it's a tie!";
    resultGameOver.style.display = "block";
  } else {
    resultElement.innerText = `Player ${winner} wins!`;
    resultGameOver.style.display = "block";
    document.querySelector("body").style.backgroundColor = "PowderBlue";
  }
}

//restart game:

const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () => {
  //reset game variables:
  boardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  player = 1;
  gameOver = false;
  //reset game board:
  cellElements.forEach((cell) => {
    cell.classList.remove("cross", "circle");
  });
  resultElement.innerText = ``;
  resultGameOver.style.display = "none";
  document.querySelector("body").style.backgroundColor = "";
});
