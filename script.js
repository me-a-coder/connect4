const COLS = 7;
const ROWS = 6;
const board = [];
let currentPlayer = 'red';
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

function createBoard() {
    boardElement.innerHTML = '';
    for (let r = 0; r < ROWS; r++) {
        const row = [];
        for (let c = 0; c < COLS; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => handleClick(c));
            boardElement.appendChild(cell);
            row.push(null);
        }
        board.push(row);
    }
}

function handleClick(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.classList.add(currentPlayer);
            if (checkWin(row, col)) {
                messageElement.textContent = `${currentPlayer.toUpperCase()} Wins!`;
                boardElement.style.pointerEvents = 'none';
            } else if (board.flat().every(cell => cell)) {
                messageElement.textContent = 'Draw!';
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                messageElement.textContent = `${currentPlayer.toUpperCase()}'s Turn`;
            }
            break;
        }
    }
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) ||
        checkDirection(row, col, 0, 1) ||
        checkDirection(row, col, 1, 1) ||
        checkDirection(row, col, 1, -1)
    );
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const r = row + i * rowDir;
        const c = col + i * colDir;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

resetBtn.addEventListener('click', () => {
    board.length = 0;
    createBoard();
    currentPlayer = 'red';
    messageElement.textContent = `${currentPlayer.toUpperCase()}'s Turn`;
    boardElement.style.pointerEvents = 'auto';
});

createBoard();
messageElement.textContent = `${currentPlayer.toUpperCase()}'s Turn`;
