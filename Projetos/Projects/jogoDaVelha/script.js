const boardRegions = document.querySelectorAll("#gameBoard span");
let vBoard = [];
let turnPlayer = "";
let reset = false;
function updateTitle() {
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = playerInput.value;
}

function initializeGame() {
  // preparação pro jogo começar
  //vBoard para mostrar o tabuleiro no console
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turnPlayer = "player1";
  //resetar o h2
  document.querySelector("h2").innerHTML =
    "Vez de: <span id='turnPlayer' ></span>";
  updateTitle();
  boardRegions.forEach(function (element) {
    element.classList.remove("win");
    element.innerText = " ";

    element.addEventListener("click", handBoardClick);
  });
}

function getWinRegions() {
  const winRegions = [];
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2");
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

function disableRegion(element) {
  element.style.cursor = "default";
  element.removeEventListener("click", handBoardClick);
}

function handleWin(regions) {
  regions.forEach(function (region) {
    document
      .querySelector('[data-region="' + region + '"]')
      .classList.add("win");
  });
  const platerName = document.getElementById(turnPlayer).value;
  document.querySelector("h2").innerHTML = platerName + " Venceu";
}

function handBoardClick(ev) {
  //vai servir quando clicar no tabuleiro
  const span = ev.currentTarget;
  const region = span.dataset.region;
  const rowColumnPair = region.split("."); //split = dividir uma string transformando um array
  const row = rowColumnPair[0];
  const column = rowColumnPair[1];
  if (turnPlayer === "player1") {
    span.innerText = "x";
    vBoard[row][column] = "X";
  } else {
    span.innerText = "O";
    vBoard[row][column] = "O";
  }
  console.clear();
  console.table();

  disableRegion(span);

  const winRegions = getWinRegions();
  if (winRegions.length > 0) {
    //se retornar maior do que 0 significa que ele venceu
    handleWin(winRegions);
  } else if (vBoard.flat().includes("")) {
    //flat = vai transformar o array vboard em unidimensional
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1"; //se for jogador 1 tranforma em jg 2, se for 2 transforma em 1
    updateTitle();
  } else {
    document.querySelector("h2").innerHTML = "empate!";
  }
}

document.getElementById("start").addEventListener("click", initializeGame);
