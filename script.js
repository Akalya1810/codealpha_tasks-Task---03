const board = document.getElementById("board");
const status = document.getElementById("status");

let currentPlayer = "X";
let cells = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function drawBoard() {
  board.innerHTML = "";
  cells.forEach((cell, i) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.innerText = cell;
    div.addEventListener("click", () => cellClicked(i));
    board.appendChild(div);
  });
}

function cellClicked(i) {
  if (!gameActive || cells[i]) return;
  cells[i] = currentPlayer;
  drawBoard();
  if (checkWinner()) {
    status.innerText = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!cells.includes("")) {
    status.innerText = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.innerText = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],  // rows
    [0,3,6],[1,4,7],[2,5,8],  // cols
    [0,4,8],[2,4,6]           // diagonals
  ];
  return wins.some(pattern => 
    pattern.every(index => cells[index] === currentPlayer)
  );
}

function resetGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  status.innerText = "Player X's turn";
  drawBoard();
}

resetGame();
