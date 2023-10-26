// pressing start initiates the game
// event handler -> GameController.start
// GameController.start
// unlock the board
// player x goes first
// grab all squares (ScreenController?)
// click is registered on a square
// if the square is not already occupied
// place an x there
// computer is player o and goes second
// after one player has made three moves
// we start checking for wins and ties
const Gameboard = () => {
  const rows = 3;
  const columns = 3;
  const board = [];
  let unlocked = false;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const markBoard = (cell, playerToken) => {
    if (!cell.getValue()) {
      cell.setValue(playerToken);
    }
  };

  const unlock = () => {
    unlocked = true;
  };

  const isUnlocked = () => unlocked;

  return {
    getBoard,
    markBoard,
    unlock,
    isUnlocked,
  };
};

function Cell() {
  let value = null;

  const setValue = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    setValue,
    getValue,
  };
}

const GameController = (
  playerOneName = "Player",
  playerTwoName = "Computer"
) => {
  const board = Gameboard();
  const players = [
    {
      name: playerOneName,
      token: "x",
    },
    {
      name: playerTwoName,
      token: "o",
    },
  ];
  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const playTurn = (cell) => {
    board.markBoard(cell, getActivePlayer().token);

    /*  This is where we would check for a winner and handle that logic,
        such as a win message. */

    switchPlayer();
  };

  return {
    playTurn,
    getActivePlayer,
    getBoard: board.getBoard,
    unlock: board.unlock,
    isUnlocked: board.isUnlocked,
  };
};

const ScreenController = () => {
  const game = GameController();
  const turnDiv = document.querySelector(".turn");
  const startButton = document.querySelector(".start");
  const cells = document.querySelectorAll(".cell");

  const updateScreen = (clickedCell) => {
    const activePlayer = game.getActivePlayer();
    turnDiv.textContent = `${activePlayer.name}'s turn...`;

    if (activePlayer.token === "x") {
      clickedCell.classList.add("x");
    } else {
      clickedCell.classList.add("o");
    }
  };

  const clickHandlerCell = (e) => {
    if (!game.isUnlocked()) {
      return;
    }

    const clickedCell = e.target;
    if (!clickedCell) return;

    const row = clickedCell.dataset.row;
    const col = clickedCell.dataset.col;
    const modelCell = game.getBoard()[row][col];

    game.playTurn(modelCell);
    updateScreen(clickedCell);
  };

  const addEventListeners = () => {
    cells.forEach((cell, i) => {
      let row = Math.floor(i / 3);
      let col = i % 3;

      cell.dataset.row = row;
      cell.dataset.col = col;

      cell.addEventListener("click", clickHandlerCell);
    });

    startButton.addEventListener("click", () => {
      const activePlayer = game.getActivePlayer();
      turnDiv.style.visibility = "visible";
      turnDiv.textContent = `${activePlayer.name}'s turn...`;
      game.unlock();
    });
  };

  addEventListeners();
};

ScreenController();
