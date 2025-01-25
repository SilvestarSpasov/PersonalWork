
//All cells on the game board
const cells = document.querySelectorAll(".cell");
//button to restart the game
const restartBtn = document.querySelector("#restartBtn");
//button to clear score
const clearBtn = document.querySelector("#clearBtn");
//var for checking which player turn is 
let player = 1;
// array for status of all cells in the matrix
let cellsstatus = ["", "", "", "", "", "", "", "", ""];
//var for finished game
let winner = false;
//score of player 1
let player1score = 0;
//score of player 2
let player2score = 0;

//all winning variants of the matrix board in a matrix
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


initializeGame();

function initializeGame() {
    //adding listener 'click' to all cells
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    //adding listener 'click' to button restart game
    restartBtn.addEventListener("click", restartGame);
    //adding listener 'click' to button clear score
    clearBtn.addEventListener("click", clearscore);
}




// function after any cell is clicked
function cellClicked() {
    //takes cellindex of the clicked cell
    const cellIndex = this.getAttribute("cellIndex");

    if (this.textContent == '' && winner == false) {
        updateCell(this, cellIndex);
        checkWinner();
        checkdraw();
    }
}


// check which player turn is, and update the cell
function updateCell(cell, index) {

    if (player == 1) {
        cell.textContent = "X";
        cellsstatus[index] = "X";
        document.getElementById("statusText").textContent = 'Player 2 turn "O"';
        cell.style.color = "blue"
        player = 2;
    } else {
        cell.textContent = "O";
        cellsstatus[index] = "O";
        document.getElementById("statusText").textContent = 'Player 1 turn "X"';
        cell.style.color = "red"
        player = 1;
    }
}

//run through all winnings variants, and check if there is a winner.
//then update the score end mark the cells in the winning line in green
function checkWinner() {
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = cellsstatus[condition[0]];
        const cellB = cellsstatus[condition[1]];
        const cellC = cellsstatus[condition[2]];

        if (cellA == cellB && cellB == cellC && cellB != "") {
            if (cellB == "X") {
                document.getElementById("statusText").textContent = 'Player 1 won';
                player1score += 1;
                document.getElementById("Player1score").textContent = player1score;
                winner = true;
                cells[condition[0]].setAttribute("style", "background-color: rgb(0, 255, 0);");
                cells[condition[0]].style.color = "blue";
                cells[condition[1]].setAttribute("style", "background-color: rgb(0, 255, 0);");
                cells[condition[1]].style.color = "blue";
                cells[condition[2]].setAttribute("style", "background-color: rgb(0, 255, 0);");
                cells[condition[2]].style.color = "blue";
                break;
            } else {
                cells[condition[0]].setAttribute("style", "background-color: rgb(0, 255, 0);");
                cells[condition[0]].style.color = "red";
                cells[condition[1]].setAttribute("style", "background-color: rgb(0, 255, 0);");
                cells[condition[1]].style.color = "red";
                cells[condition[2]].setAttribute("style", "background-color: rgb(0, 255, 0);");
                cells[condition[2]].style.color = "red";
                document.getElementById("statusText").textContent = 'Player 2 won';
                player2score += 1;
                document.getElementById("Player2score").textContent = player2score;
                winner = true;
                break;
            }
        }
    }

}
//if there is no winner, checking for draw
function checkdraw() {
    if (!cellsstatus.includes("") && winner == false) {
        document.getElementById("statusText").textContent = 'Draw!';
        winner = true;
    }

}
//restart the game
function restartGame() {
    winner = false;
    cellsstatus = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    cells.forEach(cell => cell.setAttribute("style", "background-color: white;"))
    document.getElementById("statusText").textContent = 'Player 1 turn "X"';
    player = 1;
}
//clear the score sheet
function clearscore() {
    player1score = 0;
    player2score = 0;
    document.getElementById("Player1score").textContent = 0;
    document.getElementById("Player2score").textContent = 0;
}