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
  let board = [];
  let unlocked = false;

  const setUpBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
  };

  const clearBoard = () => {
    setUpBoard();
  };

  const getBoard = () => board;

  const markBoard = (cell, playerToken) => {
    if (!cell.getValue()) {
      cell.setValue(playerToken);
    }
  };

  const toggleLock = () => {
    unlocked = !unlocked;
  };

  const isUnlocked = () => unlocked === true;

  setUpBoard();

  return {
    getBoard,
    markBoard,
    toggleLock,
    isUnlocked,
    clearBoard,
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

  const resetActivePlayer = () => (activePlayer = players[0]);

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const playTurn = (cell) => {
    board.markBoard(cell, getActivePlayer().token);
    switchPlayer();
  };

  return {
    playTurn,
    getActivePlayer,
    getBoard: board.getBoard,
    toggleLock: board.toggleLock,
    isUnlocked: board.isUnlocked,
    clearBoard: board.clearBoard,
    resetActivePlayer,
  };
};

const ScreenController = () => {
  const game = GameController();
  const turnDiv = document.querySelector(".turn");
  const startButton = document.querySelector(".start");
  const cells = document.querySelectorAll(".cell");

  const reportPlayerTurn = () => {
    const activePlayer = game.getActivePlayer();
    turnDiv.textContent = `${activePlayer.name}'s turn...`;
    return activePlayer;
  };

  const updateScreen = (clickedCell) => {
    // If a cell was not clicked, we are resetting the board.
    if (!clickedCell) {
      cells.forEach((cell) => (cell.className = "cell"));
      return;
    }

    const activePlayer = game.getActivePlayer();

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
    // if (!clickedCell) return;

    // If the cell already has an "x" or an "o", don't
    // play a turn
    if (clickedCell.classList.length > 1) {
      return;
    }

    const row = clickedCell.dataset.row;
    const col = clickedCell.dataset.col;
    const modelCell = game.getBoard()[row][col];

    updateScreen(clickedCell);
    game.playTurn(modelCell);
    reportPlayerTurn();
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
      if (startButton.textContent === "Start Game") {
        game.toggleLock();
        turnDiv.style.visibility = "visible";
        startButton.textContent = "Reset Game";
        reportPlayerTurn();
      } else if (startButton.textContent === "Reset Game") {
        game.clearBoard();
        turnDiv.style.visibility = "hidden";
        startButton.textContent = "Start Game";
        updateScreen();
        game.toggleLock();
        game.resetActivePlayer();
      }
    });
  };

  addEventListeners();
};

ScreenController();
