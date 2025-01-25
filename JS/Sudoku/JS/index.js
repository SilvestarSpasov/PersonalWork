
let currentdigit = 0;   // Current digit from the menu
let generatedarr = [];  // Array for generated puzzle
let arrremuvedblocks = [];  // Array with random generated blocks to be cleared from the puzzle
let solvedarr = []; // Array with solved by the player puzzle
let i, j, n, k, x, y;  // counters
let avdigits = []; // Array to hold avaible digits for each field in the puzzle
let finished = false; //Status for finish
let gamestarted = false; //Status for start
let nextdigitscolor = "black"; // Next digit color
let arrbackgroundcolor = [3, 4, 5, 12, 13, 14, 21, 22, 23, 27, 28, 29, 33, 34, 35, 36, 37,
    38, 42, 43, 44, 45, 46, 47, 51, 52, 53, 57, 58, 59, 66, 67, 68, 75, 76, 77]; //array with ids of the tiles with different color
let language = "BG"; // Current language
let darkmode; // Darkmode 

//Check if darkmode var exist and change the darkmode switch
console.log(localStorage.getItem('darkmode'));
if (localStorage.getItem('darkmode') !== null) {
    if (localStorage.getItem('darkmode') == "true") {
        document.getElementById("darkmode").checked = true;
    } else {
        document.getElementById("darkmode").checked = false;
    }
}

let time = 0; //total seconds
let h, m, s; //Seconds, minutes, hours in integer
let hh, mm, ss; //Seconds, minutes, hours in string
// color consts
let backgroundcolordigitsdarkmode = "rgb(0, 113, 155)";
let backgroundcolordigitsnodarkmode = "rgb(141, 224, 255)";
let backgroundcolortilesdarkmode = "rgb(51, 51, 50)";
let backgroundcolortilesnodarkmode = "rgb(230, 230, 230)";
let timerr; //timer var


initializeBoard();
// Creat board and digit menu
function initializeBoard() {
    //creating the board
    for (i = 0; i < 10; i++) {

        let tile = document.createElement("div");
        tile.id = "0" + i.toString();
        tile.classList.add("tile");
        document.getElementById("board").append(tile);

        if (darkmode) {
            if (arrbackgroundcolor.includes(i)) {
                tile.style.backgroundColor = backgroundcolortilesdarkmode;
            } else {
                tile.style.backgroundColor = "black";
            }
        } else {
            if (arrbackgroundcolor.includes(i)) {
                tile.style.backgroundColor = backgroundcolortilesnodarkmode;
            } else {
                tile.style.backgroundColor = "white";
            }
        }
    }

    for (i = 10; i < 81; i++) {

        let tile = document.createElement("div");
        tile.id = i.toString()
        tile.classList.add("tile");
        document.getElementById("board").append(tile);

        if (darkmode) {
            if (arrbackgroundcolor.includes(i)) {
                tile.style.backgroundColor = backgroundcolortilesdarkmode;
            } else {
                tile.style.backgroundColor = "black";
            }
        } else {
            if (arrbackgroundcolor.includes(i)) {
                tile.style.backgroundColor = backgroundcolortilesnodarkmode;
            } else {
                tile.style.backgroundColor = "white";
            }
        }
    }

    //Creating the digits menu
    for (n = 0; n <= 9; n++) {
        let digit = document.createElement("div");
        digit.id = n;

        if (n == 0) {
            digit.textContent = "C";
            if (darkmode) {
                digit.style.backgroundColor = backgroundcolordigitsdarkmode;
            } else {
                digit.style.backgroundColor = backgroundcolordigitsnodarkmode;
            }

        } else {
            digit.textContent = n;
        }
        digit.classList.add("digit");
        document.getElementById("digits").append(digit);

    }

    // event listener for digits menu
    const digits = document.querySelectorAll(".digit");
    digits.forEach(digit => digit.addEventListener("click", digitClicked));

    //event listener for board 
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => tile.addEventListener("click", tileClicked));
    darkmodefn();
}



// onclick digit menu
function digitClicked() {

    let prevdigit = document.getElementById(currentdigit.toString());
    if (darkmode) {
        prevdigit.style.backgroundColor = "black";
    } else {
        prevdigit.style.backgroundColor = "white";
    }

    if (darkmode) {
        this.style.backgroundColor = backgroundcolordigitsdarkmode;
    } else {
        this.style.backgroundColor = backgroundcolordigitsnodarkmode;
    }

    currentdigit = parseInt(this.getAttribute("id"));
}



//onclick tile
function tileClicked() {

    let emptyfields = false;

    //Check if the tile is in the generetaed puzzle and if the puzzle is finished
    if (arrremuvedblocks.includes(parseInt(this.getAttribute("id"))) && finished == false) {
        if (currentdigit == 0) {
            this.textContent = "";
        } else {
            this.textContent = currentdigit;
            this.setAttribute("style", "color:" + nextdigitscolor + ";");

        }
        if (darkmode) {
            this.style.borderColor = "white";

            if (arrbackgroundcolor.includes(parseInt(this.getAttribute("id")))) {
                this.style.backgroundColor = backgroundcolortilesdarkmode;
            } else {
                this.style.backgroundColor = "black";
            }
        } else {
            this.style.borderColor = "black";

            if (arrbackgroundcolor.includes(parseInt(this.getAttribute("id")))) {
                this.style.backgroundColor = backgroundcolortilesnodarkmode;
            } else {
                this.style.backgroundColor = "white";
            }

        }
    }

    // Check if all tiles are filled
    const tiles = document.querySelectorAll(".tile");
    for (i = 0; i < 81; i++) {
        if (tiles[i].textContent == "") {
            emptyfields = true;
            break;
        }
    }

    // Check if the puzzle is completed right
    if (emptyfields == false && !finished) {
        finished = checkfinished();
        if (finished == true) {
            alert("The puzzle is solved correctly :)");
            clearInterval(timerr);
        } else {
            alert("The puzzle is not solved correctly :(");
        }
    }
}

//Pass the value from the field with the number of missing blocks to function 'GenerateSudoku'
function passMissingBlocks() {
    const value = document.getElementById('MissingBlocks').value;
    if (value < 82 && value > 0) {
        GenerateSudoku(value);
    }
    else {
        alert('Please enter number betwen 1 and 80');
    }
}

//Function for generating the puzzle and fill it in to the board
function GenerateSudoku(MissingBlocks) {
    finished = false;
    gamestarted = true;
    cleartimer();
    timerr = setInterval(starttimer, 1000);
    generatedarr = createlevel(arr = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    arrremuvedblocks = new Array(MissingBlocks)

    for (i = 0; i < MissingBlocks; i++) {
        let numberbuffer = Math.floor(Math.random() * 81)
        while (arrremuvedblocks.includes(numberbuffer)) {
            numberbuffer = Math.floor(Math.random() * 81)
        }
        arrremuvedblocks[i] = numberbuffer;
    }

    const tiles = document.querySelectorAll(".tile");
    let index = 0;

    for (i = 0; i < generatedarr.length; i++) {
        for (j = 0; j < generatedarr[i].length; j++) {

            if (darkmode) {
                tiles[index].style.color = "white";
            } else {
                tiles[index].style.color = "black";
            }
            if (arrremuvedblocks.includes(index)) {
                tiles[index].textContent = "";
            } else {
                tiles[index].textContent = generatedarr[i][j];
            }
            index++;
        }
    }




}

// function that restart current level.
function RestartLevel() {
    finished = false;
    if (gamestarted == true) {
        if (language == 'BG') {
            if (confirm("Искате ли да започне ново време на играта?")) {
                cleartimer();
                timerr = setInterval(starttimer, 1000);
            }
        }
        else if (language == 'EN') {
            if (confirm("Do you want to set new time?")) {
                cleartimer();
                timerr = setInterval(starttimer, 1000);
            }
        }
    }

    const tiles = document.querySelectorAll(".tile");
    let index = 0;

    for (i = 0; i < generatedarr.length; i++) {
        for (j = 0; j < generatedarr[i].length; j++) {

            if (darkmode) {
                tiles[index].style.color = "white";
            } else {
                tiles[index].style.color = "black";
            }
            if (arrremuvedblocks.includes(index)) {
                tiles[index].textContent = "";
            } else {
                tiles[index].textContent = generatedarr[i][j];
            }
            index++;
        }
    }


}

//Function that create the puzzle
function createlevel(arr) {
    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr[i].length; j++) {

            avdigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            avdigits = checkavailabledigits(arr, avdigits, i, j)
            avdigits = JSON.parse(JSON.stringify(avdigits.filter(a => a !== 0)))

            if (avdigits.length > 0) {
                let x = Math.floor(Math.random() * avdigits.length);
                arr[i][j] = avdigits[x];
            } else {
                return createlevel(arr = [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],]);
            }
        }
    }
    return arr;
}

// Function that check for avaible digits on each tile of the puzzle board
function checkavailabledigits(arr, avdigits, i, j) {
    // Check each column
    for (let jj = 0; jj < arr[i].length; jj++) {
        if (avdigits.includes(arr[i][jj])) {
            avdigits[arr[i][jj]] = 0;
        }
    }
    // Cheack each row
    for (let ii = 0; ii < arr.length; ii++) {
        if (avdigits.includes(arr[ii][j])) {
            avdigits[arr[ii][j]] = 0;
        }
    }

    //Cheack each 9 3x3 boxs of the board
    if (i >= 0 && i < 3 && j >= 0 && j < 3) {
        x = 0; y = 0;
        if (avdigits.includes(arr[x][y])) { avdigits[arr[x][y]] = 0; }
        if (avdigits.includes(arr[x][y + 1])) { avdigits[arr[x][y + 1]] = 0; }
        if (avdigits.includes(arr[x][y + 2])) { avdigits[arr[x][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 1][y])) { avdigits[arr[x + 1][y]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 1])) { avdigits[arr[x + 1][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 2])) { avdigits[arr[x + 1][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 2][y])) { avdigits[arr[x + 2][y]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 1])) { avdigits[arr[x + 2][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 2])) { avdigits[arr[x + 2][y + 2]] = 0; }
        return avdigits;
    }

    if (i >= 0 && i < 3 && j >= 3 && j < 6) {
        x = 0; y = 3;
        if (avdigits.includes(arr[x][y])) { avdigits[arr[x][y]] = 0; }
        if (avdigits.includes(arr[x][y + 1])) { avdigits[arr[x][y + 1]] = 0; }
        if (avdigits.includes(arr[x][y + 2])) { avdigits[arr[x][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 1][y])) { avdigits[arr[x + 1][y]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 1])) { avdigits[arr[x + 1][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 2])) { avdigits[arr[x + 1][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 2][y])) { avdigits[arr[x + 2][y]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 1])) { avdigits[arr[x + 2][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 2])) { avdigits[arr[x + 2][y + 2]] = 0; }
        return avdigits;
    }

    if (i >= 0 && i < 3 && j >= 6 && j < 9) {
        x = 0; y = 6;
        if (avdigits.includes(arr[x][y])) { avdigits[arr[x][y]] = 0; }
        if (avdigits.includes(arr[x][y + 1])) { avdigits[arr[x][y + 1]] = 0; }
        if (avdigits.includes(arr[x][y + 2])) { avdigits[arr[x][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 1][y])) { avdigits[arr[x + 1][y]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 1])) { avdigits[arr[x + 1][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 2])) { avdigits[arr[x + 1][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 2][y])) { avdigits[arr[x + 2][y]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 1])) { avdigits[arr[x + 2][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 2])) { avdigits[arr[x + 2][y + 2]] = 0; }
        return avdigits;
    }

    if (i >= 3 && i < 6 && j >= 0 && j < 3) {
        x = 3; y = 0;
        if (avdigits.includes(arr[x][y])) { avdigits[arr[x][y]] = 0; }
        if (avdigits.includes(arr[x][y + 1])) { avdigits[arr[x][y + 1]] = 0; }
        if (avdigits.includes(arr[x][y + 2])) { avdigits[arr[x][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 1][y])) { avdigits[arr[x + 1][y]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 1])) { avdigits[arr[x + 1][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 2])) { avdigits[arr[x + 1][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 2][y])) { avdigits[arr[x + 2][y]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 1])) { avdigits[arr[x + 2][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 2])) { avdigits[arr[x + 2][y + 2]] = 0; }
        return avdigits;
    }

    if (i >= 3 && i < 6 && j >= 3 && j < 6) {
        x = 3; y = 3;
        if (avdigits.includes(arr[x][y])) { avdigits[arr[x][y]] = 0; }
        if (avdigits.includes(arr[x][y + 1])) { avdigits[arr[x][y + 1]] = 0; }
        if (avdigits.includes(arr[x][y + 2])) { avdigits[arr[x][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 1][y])) { avdigits[arr[x + 1][y]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 1])) { avdigits[arr[x + 1][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 2])) { avdigits[arr[x + 1][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 2][y])) { avdigits[arr[x + 2][y]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 1])) { avdigits[arr[x + 2][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 2])) { avdigits[arr[x + 2][y + 2]] = 0; }
        return avdigits;
    }

    if (i >= 3 && i < 6 && j >= 6 && j < 9) {
        x = 3; y = 6;
        if (avdigits.includes(arr[x][y])) { avdigits[arr[x][y]] = 0; }
        if (avdigits.includes(arr[x][y + 1])) { avdigits[arr[x][y + 1]] = 0; }
        if (avdigits.includes(arr[x][y + 2])) { avdigits[arr[x][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 1][y])) { avdigits[arr[x + 1][y]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 1])) { avdigits[arr[x + 1][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 2])) { avdigits[arr[x + 1][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 2][y])) { avdigits[arr[x + 2][y]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 1])) { avdigits[arr[x + 2][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 2])) { avdigits[arr[x + 2][y + 2]] = 0; }
        return avdigits;
    }

    if (i >= 6 && i < 9 && j >= 0 && j < 3) {
        x = 6; y = 0;
        if (avdigits.includes(arr[x][y])) { avdigits[arr[x][y]] = 0; }
        if (avdigits.includes(arr[x][y + 1])) { avdigits[arr[x][y + 1]] = 0; }
        if (avdigits.includes(arr[x][y + 2])) { avdigits[arr[x][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 1][y])) { avdigits[arr[x + 1][y]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 1])) { avdigits[arr[x + 1][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 2])) { avdigits[arr[x + 1][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 2][y])) { avdigits[arr[x + 2][y]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 1])) { avdigits[arr[x + 2][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 2])) { avdigits[arr[x + 2][y + 2]] = 0; }
        return avdigits;
    }

    if (i >= 6 && i < 9 && j >= 3 && j < 6) {
        x = 6; y = 3;
        if (avdigits.includes(arr[x][y])) { avdigits[arr[x][y]] = 0; }
        if (avdigits.includes(arr[x][y + 1])) { avdigits[arr[x][y + 1]] = 0; }
        if (avdigits.includes(arr[x][y + 2])) { avdigits[arr[x][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 1][y])) { avdigits[arr[x + 1][y]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 1])) { avdigits[arr[x + 1][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 2])) { avdigits[arr[x + 1][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 2][y])) { avdigits[arr[x + 2][y]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 1])) { avdigits[arr[x + 2][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 2])) { avdigits[arr[x + 2][y + 2]] = 0; }
        return avdigits;
    }

    if (i >= 6 && i < 9 && j >= 6 && j < 9) {
        x = 6; y = 6;
        if (avdigits.includes(arr[x][y])) { avdigits[arr[x][y]] = 0; }
        if (avdigits.includes(arr[x][y + 1])) { avdigits[arr[x][y + 1]] = 0; }
        if (avdigits.includes(arr[x][y + 2])) { avdigits[arr[x][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 1][y])) { avdigits[arr[x + 1][y]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 1])) { avdigits[arr[x + 1][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 1][y + 2])) { avdigits[arr[x + 1][y + 2]] = 0; }
        if (avdigits.includes(arr[x + 2][y])) { avdigits[arr[x + 2][y]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 1])) { avdigits[arr[x + 2][y + 1]] = 0; }
        if (avdigits.includes(arr[x + 2][y + 2])) { avdigits[arr[x + 2][y + 2]] = 0; }
        return avdigits;
    }
}

// function that check finished puzzle
function checkfinished() {

    solvedarr = JSON.parse(JSON.stringify(generatedarr));
    const tiles = document.querySelectorAll(".tile");
    let index = 0;

    //colect all data from the tiles of the board
    for (i = 0; i < generatedarr.length; i++) {
        for (j = 0; j < generatedarr[i].length; j++) {
            solvedarr[i][j] = parseInt(tiles[index].textContent);
            index++;
        }
    }

    //check each tile
    for (i = 0; i < solvedarr.length; i++) {
        for (j = 0; j < solvedarr[i].length; j++) {
            let flag = 0;
            //check field is it corect filled in the row
            for (let jj = 0; jj < solvedarr[i].length; jj++) {
                if (solvedarr[i][jj] == solvedarr[i][j]) {
                    flag++;
                }
            }
            if (flag > 1) {
                return false;
            }
            flag = 0;
            //check field is it corect filled in the column
            for (let ii = 0; ii < solvedarr.length; ii++) {
                if (solvedarr[ii][j] == solvedarr[i][j]) {
                    flag++;
                }
            }
            if (flag > 1) {
                return false;
            }
            flag = 0;

            ////check field is it corect filled in the 3x3 box
            if (i >= 0 && i < 3 && j >= 0 && j < 3) {
                x = 0; y = 0;
                if (solvedarr[x][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 2] == solvedarr[i][j]) { flag++; }
                if (flag > 1) {
                    return false;
                }
            }

            if (i >= 0 && i < 3 && j >= 3 && j < 6) {
                x = 0; y = 3;
                if (solvedarr[x][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 2] == solvedarr[i][j]) { flag++; }
                if (flag > 1) {
                    return false;
                }
            }

            if (i >= 0 && i < 3 && j >= 6 && j < 9) {
                x = 0; y = 6;
                if (solvedarr[x][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 2] == solvedarr[i][j]) { flag++; }
                if (flag > 1) {
                    return false;
                }
            }

            if (i >= 3 && i < 6 && j >= 0 && j < 3) {
                x = 3; y = 0;
                if (solvedarr[x][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 2] == solvedarr[i][j]) { flag++; }
                if (flag > 1) {
                    return false;
                }
            }

            if (i >= 3 && i < 6 && j >= 3 && j < 6) {
                x = 3; y = 3;
                if (solvedarr[x][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 2] == solvedarr[i][j]) { flag++; }
                if (flag > 1) {
                    return false;
                }
            }

            if (i >= 3 && i < 6 && j >= 6 && j < 9) {
                x = 3; y = 6;
                if (solvedarr[x][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 2] == solvedarr[i][j]) { flag++; }
                if (flag > 1) {
                    return false;
                }
            }

            if (i >= 6 && i < 9 && j >= 0 && j < 3) {
                x = 6; y = 0;
                if (solvedarr[x][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 2] == solvedarr[i][j]) { flag++; }
                if (flag > 1) {
                    return false;
                }
            }

            if (i >= 6 && i < 9 && j >= 3 && j < 6) {
                x = 6; y = 3;
                if (solvedarr[x][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 2] == solvedarr[i][j]) { flag++; }
                if (flag > 1) {
                    return false;
                }
            }

            if (i >= 6 && i < 9 && j >= 6 && j < 9) {
                x = 6; y = 6;
                if (solvedarr[x][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 1][y + 2] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 1] == solvedarr[i][j]) { flag++; }
                if (solvedarr[x + 2][y + 2] == solvedarr[i][j]) { flag++; }
                if (flag > 1) {
                    return false;
                }
            }
        }
    }
    return true;

}

// function for next fill color black and white
function SetColorToBlackOrWhite() {

    if (darkmode) {
        nextdigitscolor = "white";
    } else {
        nextdigitscolor = "black";
    }

    document.getElementById("colorblack").style.width = "40px";
    document.getElementById("colorblack").style.height = "40px";
    document.getElementById("colorred").style.borderWidth = "0";
    document.getElementById("colorred").style.width = "30px";
    document.getElementById("colorred").style.height = "30px";
    document.getElementById("colorgreen").style.borderWidth = "0";
    document.getElementById("colorgreen").style.width = "30px";
    document.getElementById("colorgreen").style.height = "30px";

}
// function for next fill color red
function SetColorToRed() {
    nextdigitscolor = "red";
    document.getElementById("colorred").style.border = "2px solid black";
    document.getElementById("colorred").style.width = "40px";
    document.getElementById("colorred").style.height = "40px";
    document.getElementById("colorblack").style.borderWidth = "0";
    document.getElementById("colorblack").style.width = "30px";
    document.getElementById("colorblack").style.height = "30px";
    document.getElementById("colorgreen").style.borderWidth = "0";
    document.getElementById("colorgreen").style.width = "30px";
    document.getElementById("colorgreen").style.height = "30px";
}
// function for next fill color green
function SetColorToGreen() {
    nextdigitscolor = "green";
    document.getElementById("colorgreen").style.border = "2px solid black";
    document.getElementById("colorgreen").style.width = "40px";
    document.getElementById("colorgreen").style.height = "40px";
    document.getElementById("colorblack").style.borderWidth = "0";
    document.getElementById("colorblack").style.width = "30px";
    document.getElementById("colorblack").style.height = "30px";
    document.getElementById("colorred").style.borderWidth = "0";
    document.getElementById("colorred").style.width = "30px";
    document.getElementById("colorred").style.height = "30px";
}


//function darkmode
function darkmodefn() {

    if (document.getElementById("darkmode").checked == true) {
        document.body.classList.add('darkmode');
        localStorage.setItem('darkmode', "true");
        darkmode = true;
    } else {
        document.body.classList.remove('darkmode');
        localStorage.setItem('darkmode', "false");
        darkmode = false;
    }
    console.log(localStorage.getItem(darkmode));

    if (darkmode) {

        if (nextdigitscolor == "black") {
            nextdigitscolor = "white";
        }

        const tiles = document.querySelectorAll(".tile");

        for (i = 0; i < tiles.length; i++) {
            if (tiles[i].style.color == "black") {
                tiles[i].style.color = "white";
            }
            tiles[i].style.borderColor = "white";

            if (arrbackgroundcolor.includes(i)) {
                tiles[i].style.backgroundColor = backgroundcolortilesdarkmode;
            } else {
                tiles[i].style.backgroundColor = "black";
            }
        }

        const digits = document.querySelectorAll(".digit");
        for (i = 0; i < digits.length; i++) {
            digits[i].style.color = "white";
            digits[i].style.borderColor = "white";
            digits[i].style.backgroundColor = "black";
        }
        digits[currentdigit].style.backgroundColor = backgroundcolordigitsdarkmode;
        if (language == 'BG') {
            document.getElementById("EN").style.backgroundColor = "white";
        } else {
            document.getElementById("BG").style.backgroundColor = "white";
        }

    }
    else {
        if (nextdigitscolor == "white") {
            nextdigitscolor = "black";
        }

        const tiles = document.querySelectorAll(".tile");
        for (i = 0; i < tiles.length; i++) {
            if (tiles[i].style.color == "white") {
                tiles[i].style.color = "black";
            }
            tiles[i].style.borderColor = "black";
            if (arrbackgroundcolor.includes(i)) {
                tiles[i].style.backgroundColor = backgroundcolortilesnodarkmode;
            } else {
                tiles[i].style.backgroundColor = "white";
            }
        }

        const digits = document.querySelectorAll(".digit");
        for (i = 0; i < digits.length; i++) {

            digits[i].style.color = "black";
            digits[i].style.borderColor = "black";
            digits[i].style.backgroundColor = "white";
        }
        digits[currentdigit].style.backgroundColor = backgroundcolordigitsnodarkmode;

        if (language == 'BG') {
            document.getElementById("EN").style.backgroundColor = "white";
        } else {
            document.getElementById("BG").style.backgroundColor = "white";
        }

    }

}

//function for language
function SetLang(lang) {
    language = lang;
    if (language == 'BG') {
        document.getElementById("titletext").textContent = "Судоку";
        document.getElementById("MissingBlocksLabel").textContent = "Изберете брой липсващи полета от пъзела(от 1 до 81):";
        document.getElementById("MissingBlocksButton").value = "Нов пъзел";
        document.getElementById("RestartLabel").textContent = "Рестартиране на текущия пъзел:";
        document.getElementById("RestartButton").value = "Рестарт";
        document.getElementById("OptionsTitle").textContent = "Опции";
        document.getElementById("ColorLabel").textContent = "Изберете цвят за попълване:";
        document.getElementById("DarkModeLabel").textContent = "Тъмен режим:";
        document.getElementById("LanguageMenuLabel").textContent = "Изберете език:";
        document.getElementById("BG").style.backgroundColor = "rgb(175, 175, 175)";
        document.getElementById("EN").style.backgroundColor = "white";

    } else {
        document.getElementById("titletext").textContent = "Sudoku";
        document.getElementById("MissingBlocksLabel").textContent = "Select number of missing squares from the puzzle(from 1 to 81):";
        document.getElementById("MissingBlocksButton").value = "New puzzle";
        document.getElementById("RestartLabel").textContent = "Restart the current puzzle:";
        document.getElementById("RestartButton").value = "Restart";
        document.getElementById("OptionsTitle").textContent = "Options";
        document.getElementById("ColorLabel").textContent = "Choose a fill color:";
        document.getElementById("DarkModeLabel").textContent = "Dark mode:";
        document.getElementById("LanguageMenuLabel").textContent = "Choose language:";
        document.getElementById("EN").style.backgroundColor = "rgb(175, 175, 175)";
        document.getElementById("BG").style.backgroundColor = "white";

    }



    if (time == 0) {
        if (language == 'EN') {
            document.getElementById("timer").textContent = 'Time: 00:00:00';
        } else if (language == 'BG') {
            document.getElementById("timer").textContent = 'Време: 00:00:00';
        }
    } else {
        h = ~~(time / 3600);
        m = ~~((time - h * 3600) / 60);
        s = time - (h * 3600) - (m * 60);

        if (h < 10) {
            hh = '0' + h;
        } else {
            hh = h;
        }
        if (m < 10) {
            mm = '0' + m;
        } else {
            mm = m;
        }
        if (s < 10) {
            ss = '0' + s;
        } else {
            ss = s;
        }

        if (language == 'EN') {
            document.getElementById("timer").textContent = 'Time: ' + hh + ':' + mm + ':' + ss;
        } else if (language == 'BG') {
            document.getElementById("timer").textContent = 'Време: ' + hh + ':' + mm + ':' + ss;
        }
    }
}

// function for timer
function starttimer() {
    if (!finished) {
        time++;
    }

    h = ~~(time / 3600);
    m = ~~((time - h * 3600) / 60);
    s = time - (h * 3600) - (m * 60);

    if (h < 10) {
        hh = '0' + h;
    } else {
        hh = h;
    }
    if (m < 10) {
        mm = '0' + m;
    } else {
        mm = m;
    }
    if (s < 10) {
        ss = '0' + s;
    } else {
        ss = s;
    }

    if (language == 'EN') {
        document.getElementById("timer").textContent = 'Time: ' + hh + ':' + mm + ':' + ss;
    } else if (language == 'BG') {
        document.getElementById("timer").textContent = 'Време: ' + hh + ':' + mm + ':' + ss;
    }
}

//function to clear the timer
function cleartimer() {
    time = 0;
    if (language == 'EN') {
        document.getElementById("timer").textContent = 'Time: 00:00:00';
    } else if (language == 'BG') {
        document.getElementById("timer").textContent = 'Време: 00:00:00';
    }
    clearInterval(timerr);
}

function collaps() {
    let Menu = document.getElementById("Options");

    if (Menu.style.opacity == "0") {

        Menu.style.opacity = "1";
        Menu.style.zIndex = "1";

    } else {

        Menu.style.opacity = "0";
        Menu.style.zIndex = "-1";
    }

}
