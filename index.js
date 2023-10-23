const Gameboard = () => {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const fillCell = (cell, player) => {

  }

  return {
    getBoard,
  }
}

function Cell() {
  let value = null;

  const addValue = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addValue,
    getValue
  };
}

const renderGameboard = () => {
  const gamecells = document.querySelectorAll(".gamecell");

  gamecells.forEach((cell, i) => {
    if (i % 2 === 0) {
      cell.style.backgroundImage = "url(assets/x.png)"
    } else {
      cell.style.backgroundImage = "url(assets/o.png)"
    }
  });
}

renderGameboard();

