/*

MVP - Minimum Viable Product

1. Initialize the game
    - players
    - board display
    - board model
    - current player tracker
    - click handlers for each column
2. Take player input
    - know which player is dropping a disc
    - which column are we dropping into?
    - is that column already full?
    - drop the disc into the top of the column
3. Check for game end conditions
    - tie
    - win
    - announce that the game is over

*/
// variables to call reset functions
const col0 = document.getElementById("col0");
const col1 = document.getElementById("col1");
const col2 = document.getElementById("col2");
const col3 = document.getElementById("col3");
const col4 = document.getElementById("col4");
const col5 = document.getElementById("col5");
const col6 = document.getElementById("col6");

let boardModel = [
    [ null, null, null, null, null, null, ],
    [ null, null, null, null, null, null, ],
    [ null, null, null, null, null, null, ],
    [ null, null, null, null, null, null, ],
    [ null, null, null, null, null, null, ],
    [ null, null, null, null, null, null, ],
    [ null, null, null, null, null, null, ],
]
let currentPlayer = 1 // 1 or 2
let numberOfDiscsDropped = 0


const displayMessage = function (message) { // Stub
    // Clear out the message div
    // Add new message to div
    console.log(message)
    document.getElementById("game-status").innerText = message;
}
const displayCurrentPlayer = function () {
    console.log("Current player: " + currentPlayer)
    document.getElementById("current-player").innerText = "Current player: " + currentPlayer;
}
const displayTieMessage = function () {
    displayMessage("Tie game! Click 'new game' to play again.")
}
const displayWinMessage = function () {
    displayMessage("Winner is: Player " + currentPlayer);
}

const isColumnFull = function () {
    // TODO: Look at the boardModel to determine if col is full
    for (let rowNum=0; rowNum<6; rowNum++) {
        
        for (let colNum=0; colNum<boardModel[rowNum].length; colNum++) {
            if (colNum.childElementCount !== 6) {
                console.log(colNum.childElementCount)

                return false // or true
            }
        }
        console.log(rowNum)
    }

    console.log(colNum)
    return true
}


const dropDisc = function (colNum, colNode, playerNum) {
    // TODO: Add a disc to the DOM node colNode for the current player
    // <div class="disc red"></div>
    
    // TODO: Add a disc to the boardModel
    let redPiece = document.createElement('div')
    redPiece.className = 'red piece'
    let blackPiece = document.createElement('div')
    blackPiece.className = 'black piece'
      if (isColumnFull() === true) {
                return
            }
            
            let coordinate = boardModel[Number(colNode.id[3])].indexOf(null);
            if ((playerNum === 1) && (colNode.childElementCount !== 6)) {
                boardModel[Number(colNode.id[3])].splice(coordinate, 1, 1);
                
                colNode.appendChild(redPiece)
                numberOfDiscsDropped++
                return true;
            }

            else if ((playerNum === 2) && (colNode.childElementCount !== 6)) {
                colNode.appendChild(blackPiece)  
                console.log(colNode);
                boardModel[Number(colNode.id[3])].splice(coordinate, 1, 2);
                numberOfDiscsDropped++
                return true;
            }
        }

// this may check for horizontal
function vertWin(model) {
    for (let i = 0; i < 4; i++) {
        for (let n = 0; n < model[i].length; n++) {
            console.log(model[i].length)
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

// this may check for vertical
const winnerHorizontal = function (model) {
    console.log(model.length)
    for (let rowNum=0; rowNum<7; rowNum++) {
        for (let colNum=0; colNum<model[rowNum].length; colNum++) {
            if (model[rowNum][colNum] === model[rowNum][colNum+1] &&
                model[rowNum][colNum] === model[rowNum][colNum+2] &&
                model[rowNum][colNum] === model[rowNum][colNum+3] &&
                model[rowNum][colNum] !== null) {
                    console.log('hi')
                return true
            }
        }
    }
    return false
}

const winnerDiagonalUp = function (model) {
    for (let rowNum=0; rowNum<=3; rowNum++) {
                for (let colNum=0; colNum<6; colNum++) {
                    if (model[rowNum][colNum] === model[rowNum+1][colNum+1] &&
                        model[rowNum][colNum] === model[rowNum+2][colNum+2] &&
                        model[rowNum][colNum] === model[rowNum+3][colNum+3] &&
                        model[rowNum][colNum] !== null) {
                            console.log('hi')
                        return true
                    }
                }
            }
    return false
}

const winnerDiagonalDown = function (model) {
    for (let rowNum=0; rowNum<4; rowNum++) {
        for (let colNum=0; colNum<4; colNum++) {
            if ( 
                model[rowNum][colNum] !== null &&
                model[rowNum][colNum] === model[rowNum+1][colNum-1] &&
                model[rowNum][colNum] === model[rowNum+2][colNum-2] &&
                model[rowNum][colNum] === model[rowNum+3][colNum-3] 
            ){
                console.log(model[rowNum+1][colNum-1])
                console.log(model[rowNum+2][colNum-2])
                console.log(model[rowNum+3][colNum-3])
                console.log('hello')

                return true
            }
        }
    }
    return false
}


const isGameOver = function (model) { // pure function
    // Check for a win
    console.log(model)
    if (vertWin(model) ||
        winnerHorizontal(model) ||
        winnerDiagonalUp(model) ||
        winnerDiagonalDown(model)) {
        return "win"
    }
    
    return false // false, "tie", "win"
}

const isATie = function () {
    return (numberOfDiscsDropped === 42)
}


const switchToNextPlayer = function () {
    //     TODO: Toggle currentPlayer variable 1<-->2

    switch(currentPlayer) {
        case 1: currentPlayer = 2
        console.log("current player is " + currentPlayer)
        displayCurrentPlayer();
        break

        case 2: currentPlayer = 1
        console.log("current player is " + currentPlayer)
        displayCurrentPlayer();
        break
    }
}

const columnClickHandler = function (event) {
    const selectedCol = event.currentTarget
    const columnNum = Number(selectedCol.id.slice(-1))
    console.log("Click on column " + columnNum)
    if (isColumnFull(columnNum)) {
        displayMessage("Can't drop a disc in a full column")
    } else {
        dropDisc(columnNum, selectedCol, currentPlayer)
        const gameStatus = isGameOver(boardModel)
        if (isATie() === true) {
            displayTieMessage()
        } else if (gameStatus === "win") {
            displayWinMessage()
        } else {
            switchToNextPlayer()
        }
    }
}


const setUpEventListeners = function () {
    document.querySelector('#col0').addEventListener('click', columnClickHandler)
    document.querySelector('#col1').addEventListener('click', columnClickHandler)
    document.querySelector('#col2').addEventListener('click', columnClickHandler)
    document.querySelector('#col3').addEventListener('click', columnClickHandler)
    document.querySelector('#col4').addEventListener('click', columnClickHandler)
    document.querySelector('#col5').addEventListener('click', columnClickHandler)
    document.querySelector('#col6').addEventListener('click', columnClickHandler)
}

const initializeGame = function () {
    setUpEventListeners()
    displayCurrentPlayer(currentPlayer)
}

initializeGame()



const testwinnerDiagonalUp = function () {
    console.log("Empty board: " + (winnerDiagonalUp([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null,    2, null, null, null ],
        [ null, null, null, null,    2, null, null ],
        [ null, null, null, null, null,    2, null ],
        [ null, null, null, null, null, null,    2 ]
    ])))
    console.log("Player 1 win on Column 1: " + (winnerDiagonalUp([
        [ null, null, null,    2,    2,    2,    2 ],
        [ null, null, null, null, null, null, null ],
        [    1, null, null, null, null, null, null ],
        [    1, null, null, null, null, null, null ],
        [    1, null, null, null, null, null, null ],
        [    1, null, null, null, null, null, null ]
    ])))
    console.log("Player 2 win on Column 1: " + (winnerDiagonalUp([
        [    2, null, null, null, null, null, null ],
        [ null,    2, null, null, null, null, null ],
        [ null, null,    2, null, null, null, null ],
        [ null, null, null,    2, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [    2,    2,    2,    2, null, null, null ]
    ])))
    console.log("Player 2 win on top of Column 7: " + (winnerDiagonalUp([
        [ null, null, null,    2, null, null,  2],
        [ null, null, null, null,    2, null,  2],
        [ null,    2,    2,    2,    2,    2,  2],
        [ null, null, null, null, null, null,  2],
        [ null, null, null, null, null, null,  1],
        [ null, null, null, null, null, null,  1]
    ])))
    console.log("Player 1 win on middle of Column 3: " + (winnerDiagonalUp([
        [ null, null, null, null, null, null, 2 ],
        [ null, null, null, null, null,    1, null ],
        [ null, null, null, null,    1, null, 2 ],
        [ null, null, null,    1, null, null, 2 ],
        [ null, null,    1, null, null, null, 1 ],
        [ null, null, null, null, null, null, 1 ]
    ])))
    console.log("Random board with no winner yet: " + (winnerDiagonalUp([
        [ null, null, null, null, null, null, null ],
        [ null, null,    2, null, null, null, null ],
        [    1, null,    2, null,    2, null, null ],
        [    1, null,    2, null,    1, null, null ],
        [    2,    2,    1,    1,    2, null,    2 ],
        [    2,    1,    2,    1,    1,    2,    1 ]
    ])))
}
// testwinnerDiagonalUp()

document.getElementById("new-game").onclick = function() {
    while (col0.firstChild) {
        col0.removeChild(col0.lastChild);
    }
    while (col1.firstChild) {
        col1.removeChild(col1.lastChild);
    }
    while (col2.firstChild) {
        col2.removeChild(col2.lastChild);
    }
    while (col3.firstChild) {
        col3.removeChild(col3.lastChild);
    }
    while (col4.firstChild) {
        col4.removeChild(col4.lastChild);
    }
    while (col5.firstChild) {
        col5.removeChild(col5.lastChild);
    }
    while (col6.firstChild) {
        col6.removeChild(col6.lastChild);
    }

    currentPlayer = 1;
    numberOfDiscsDropped = 0;
    document.getElementById("game-status").innerText = "";
    boardModel = [
        [ null, null, null, null, null, null, ],
        [ null, null, null, null, null, null, ],
        [ null, null, null, null, null, null, ],
        [ null, null, null, null, null, null, ],
        [ null, null, null, null, null, null, ],
        [ null, null, null, null, null, null, ],
        [ null, null, null, null, null, null, ],
    ]
}