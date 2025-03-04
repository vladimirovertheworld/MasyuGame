const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 6;
const cellSize = 50;
const canvasSize = gridSize * cellSize;
canvas.width = canvasSize;
canvas.height = canvasSize;

let horizontalLines = Array(gridSize).fill().map(() => Array(gridSize - 1).fill(0));
let verticalLines = Array(gridSize - 1).fill().map(() => Array(gridSize).fill(0));

let circles = [];
let correctPath = [];

let mouseStart = null;

async function loadPuzzle(index) {
    const response = await fetch(`/puzzle/${index}`);
    if (!response.ok) {
        alert("Puzzle not found!");
        return;
    }

    const puzzle = await response.json();
    circles = puzzle.black.map(p => ({ ...p, type: "black" })).concat(
        puzzle.white.map(p => ({ ...p, type: "white" }))
    );
    correctPath = puzzle.solution || [];

    resetBoard();
}

function resetBoard() {
    horizontalLines = Array(gridSize).fill().map(() => Array(gridSize - 1).fill(0));
    verticalLines = Array(gridSize - 1).fill().map(() => Array(gridSize).fill(0));
    drawGrid();
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;

    for (let r = 0; r <= gridSize; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * cellSize);
        ctx.lineTo(canvasSize, r * cellSize);
        ctx.stroke();
    }

    for (let c = 0; c <= gridSize; c++) {
        ctx.beginPath();
        ctx.moveTo(c * cellSize, 0);
        ctx.lineTo(c * cellSize, canvasSize);
        ctx.stroke();
    }

    circles.forEach(({ r, c, type }) => {
        ctx.beginPath();
        ctx.arc(c * cellSize + cellSize / 2, r * cellSize + cellSize / 2, 10, 0, 2 * Math.PI);
        ctx.fillStyle = type === "black" ? "black" : "white";
        ctx.fill();
        ctx.stroke();
    });

    ctx.strokeStyle = "orange";
    ctx.lineWidth = 4;

    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize - 1; c++) {
            if (horizontalLines[r][c]) {
                ctx.beginPath();
                ctx.moveTo(c * cellSize + cellSize / 2, r * cellSize + cellSize / 2);
                ctx.lineTo((c + 1) * cellSize + cellSize / 2, r * cellSize + cellSize / 2);
                ctx.stroke();
            }
        }
    }

    for (let r = 0; r < gridSize - 1; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (verticalLines[r][c]) {
                ctx.beginPath();
                ctx.moveTo(c * cellSize + cellSize / 2, r * cellSize + cellSize / 2);
                ctx.lineTo(c * cellSize + cellSize / 2, (r + 1) * cellSize + cellSize / 2);
                ctx.stroke();
            }
        }
    }
}

canvas.addEventListener("mousedown", (e) => {
    const { row, col } = getMouseCell(e);
    mouseStart = { row, col };
});

canvas.addEventListener("mouseup", (e) => {
    if (!mouseStart) return;
    const { row, col } = getMouseCell(e);

    if (row === mouseStart.row && col === mouseStart.col) {
        mouseStart = null;
        return;
    }

    if (row === mouseStart.row && Math.abs(col - mouseStart.col) === 1) {
        horizontalLines[row][Math.min(col, mouseStart.col)] = 1;
    } else if (col === mouseStart.col && Math.abs(row - mouseStart.row) === 1) {
        verticalLines[Math.min(row, mouseStart.row)][col] = 1;
    }

    mouseStart = null;
    drawGrid();
});

function getMouseCell(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { row: Math.floor(y / cellSize), col: Math.floor(x / cellSize) };
}

function validatePuzzle() {
    const correct = correctPath.every(move => {
        if (move.type === "horizontal") {
            return horizontalLines[move.r][move.c] === 1;
        } else {
            return verticalLines[move.r][move.c] === 1;
        }
    });

    if (correct) {
        alert("🎉 Correct! You solved the puzzle!");
    } else {
        alert("❌ Incorrect. Keep trying!");
    }
}

function undoMove() {
    horizontalLines = horizontalLines.map(row => row.map(val => 0));
    verticalLines = verticalLines.map(row => row.map(val => 0));
    drawGrid();
}

function resetGame() {
    resetBoard();
}

function nextPuzzle() {
    puzzleIndex = (puzzleIndex + 1) % 3;
    loadPuzzle(puzzleIndex);
}

loadPuzzle(0);
