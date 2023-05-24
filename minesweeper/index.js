const grid = document.getElementById("grid");
let lockGame = false;
const debug = false;

const ROWS = 15;
const COLS = 15;
const MINES = 7;

// Gen Grid
function generateGrid() {
    lockGame = false;
    grid.innerHTML = "";
    for (var i = 0; i < ROWS; i++) {
        row = grid.insertRow(i);
        for (var j = 0; j < COLS; j++) {
            cell = row.insertCell(j);
            cell.onclick = function () { init(this); };
            cell.oncontextmenu = function (e) {
                e.preventDefault();
                markFlag(this);
            };
            var mine = document.createAttribute("mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
        }
    }
    generateMines();
}

function generateMines() {
    for (var i = 0; i < MINES; i++) {
        var row = Math.floor(Math.random() * ROWS);
        var col = Math.floor(Math.random() * COLS);
        var cell = grid.rows[row].cells[col];
        cell.setAttribute("mine", "true");
        if (debug) {
            cell.innerHTML = 'X'
        }
    }
}

function revealMines() {
    for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLS; j++) {
            var cell = grid.rows[i].cells[j];
            if (cell.getAttribute("mine") == 'true') {
                if (cell.className == 'flag') {
                    cell.className = "correct"
                } else {
                    cell.className = "mine"
                }
            }
        }
    }
}

function checkWin() {
    if (checkFlagWin() || checkGameWin()) {
        lockGame = true;
        revealMines()
        alert("You win! You found all the mines!");
        return;
    }
}


function checkFlagWin() {
    var gameComplete = true;
    for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLS; j++) {
            var cell = grid.rows[i].cells[j];
            if ((cell.getAttribute("mine") == 'true') && (!cell.className.includes("flag"))) {
                gameComplete = false;
            }
            if ((cell.getAttribute("mine") == 'false') && (cell.className.includes("flag"))) {
                gameComplete = false;
            }
        }
    }
    return gameComplete
}
function checkGameWin() {
    var gameComplete = true;
    for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLS; j++) {
            var cell = grid.rows[i].cells[j];
            if ((cell.getAttribute("mine") == 'false') && (!cell.className.includes("active"))) {
                gameComplete = false;
            }
        }
    }
    return gameComplete
}
function markFlag(cell) {
    if (lockGame) {
        return;
    }
    if (cell.className == "flag") {
        cell.className = "";
    } else if (!cell.className.includes("active")) {
        cell.className = "flag";
    }
    checkWin();
}

function init(cell) {
    if (lockGame || cell.className == "flag") {
        return;
    }
    if (cell.getAttribute("mine") == "true") {
        cell.innerHTML = "X"
        revealMines();
        lockGame = true;
    } else {
        cell.className = "active";
        var mineCount = 0;
        var cellRow = cell.parentNode.rowIndex;
        var cellCol = cell.cellIndex;
        for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, ROWS - 1); i++) {
            for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, COLS - 1); j++) {
                if (grid.rows[i].cells[j].getAttribute("mine") == "true") {
                    mineCount++;
                }
            }
        }

        cell.innerHTML = mineCount;
        cell.className += " " + mineCount.toString()

        if (mineCount == 0) {
            cell.innerHTML = " ";
            for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, ROWS - 1); i++) {
                for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, COLS - 1); j++) {
                    if (grid.rows[i].cells[j].innerHTML == "") {
                        init(grid.rows[i].cells[j]);
                    }
                }
            }
        }
        checkWin();
    }
}