const boardModel = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
]

let player = 1;
let discsDropped = 0;

function displayCurrentPlayer(playerNum) {

}

function isColFull(colNum) {
    
}

function dropDisc(colNum, colNode, playerNum) {

    discsDropped++;
}

function gameOver(model) {

}

function displayMsg(message) {
    document.querySelector("#statusMsg").innerText = message;
    console.log(message);
}

function displayTie() {
    displayMsg("It's a tie!");
}

function displayWin() {
    displayMsg("Player " + null + " has won!");
}

function switchToNextPlayer() {
    if (player === 1) {
        player = 2;
    } else if (player === 2) {
        player = 1;
    }
}

function columnClickHandler(evt) {
    const selectedColumn = evt.target;
    const colNum = Number(selectedColumn.id.slice(-1));
    if (isColumnFull(colNum)) {
        displayMsg("Current column is full");
    } else {
        dropDisc(colNum, selectedColumn, player);

        const gameStatus = gameOver(boardModel);

        if (gameStatus === "tie") {
            displayTie();
        } else if (gameStatus === "win") {
            displayWin();
        } else {
            switchToNextPlayer();
 
       }
   }
}

function initListeners() {
    document.querySelector("#col1").addEventListener("click", columnClickHandler);
    document.querySelector("#col2").addEventListener("click", columnClickHandler);
    document.querySelector("#col3").addEventListener("click", columnClickHandler);
    document.querySelector("#col4").addEventListener("click", columnClickHandler);
    document.querySelector("#col5").addEventListener("click", columnClickHandler);
    document.querySelector("#col6").addEventListener("click", columnClickHandler);
    document.querySelector("#col7").addEventListener("click", columnClickHandler);
}

function initGame() {
    initListeners();
    displayCurrentPlayer(player);
}

initGame();

function vertWin(model) {
    for (let i = 0; i < 3; i++) {
        for (let n = 0; n < model[i.length]; n++) {
            if ((model[i][n] === model[i+1][n]) && 
            (model[i][n] === model[i+2][n]) &&
            (model[i][n] === model[i+3][n]) &&
            (model[i][n] !== null)) {
                return true;
            }
        }
    }
    return false;
}


function horizWin(model) {
    return false;
}

function diagUpWin(model) {
    return false;
}

function diagDownWin(model) {
    return false;
}

function isTie(model) {
    return false;
}

function isGameOver(model) {
    if (vertWin(model) ||
    horizWin(model) ||
    diagUpWin(model) ||
    diagDownWin(model)) {
        return "win"
    }

    if (isTie(model)) {
        return "tie";
    }

    return false;
}