// grab the gamecells
// iterate
// alternate putting xs and os in them

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

