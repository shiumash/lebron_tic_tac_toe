class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'lebron';
        this.gameActive = true;
        this.scores = { lebron: 0, mj: 0 };

        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerElement = document.getElementById('current-player');
        this.gameMessage = document.getElementById('game-message');
        this.resetBtn = document.getElementById('reset-btn');
        this.resetScoreBtn = document.getElementById('reset-score-btn');
        this.lebronScore = document.getElementById('lebron-score');
        this.mjScore = document.getElementById('mj-score');

        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        this.initializeGame();
    }

    initializeGame() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });

        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.resetScoreBtn.addEventListener('click', () => this.resetScore());

        this.updateDisplay();
        this.updateScoreDisplay();
    }

    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }

        this.board[index] = this.currentPlayer;
        this.updateCellDisplay(index);

        if (this.checkWinner()) {
            this.handleGameEnd('win');
        } else if (this.checkTie()) {
            this.handleGameEnd('tie');
        } else {
            this.switchPlayer();
        }
    }

    updateCellDisplay(index) {
        const cell = this.cells[index];
        cell.classList.add(this.currentPlayer);
        cell.style.pointerEvents = 'none';

        // Add the player image with optimization
        const img = document.createElement('img');
        img.src = this.currentPlayer === 'lebron' ? 'lebron.png' : 'mj.png';
        img.alt = this.currentPlayer === 'lebron' ? 'LeBron' : 'MJ';
        img.loading = 'eager';
        img.decoding = 'sync';
        cell.appendChild(img);
    }

    checkWinner() {
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            return this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c];
        });
    }

    checkTie() {
        return this.board.every(cell => cell !== '');
    }

    handleGameEnd(result) {
        this.gameActive = false;

        if (result === 'win') {
            const winner = this.currentPlayer === 'lebron' ? 'LeBron' : 'MJ';
            this.scores[this.currentPlayer]++;
            this.gameMessage.textContent = `${winner} Wins! 🏆`;
            this.gameMessage.className = 'game-message winner-message';
            this.updateScoreDisplay();
        } else {
            this.gameMessage.textContent = "It's a Tie! 🤝";
            this.gameMessage.className = 'game-message tie-message';
        }

        // Disable all cells
        this.cells.forEach(cell => {
            cell.style.pointerEvents = 'none';
        });
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'lebron' ? 'mj' : 'lebron';
        this.updateDisplay();
    }

    updateDisplay() {
        const playerName = this.currentPlayer === 'lebron' ? 'LeBron' : 'MJ';
        this.currentPlayerElement.textContent = `${playerName}'s Turn`;
    }

    updateScoreDisplay() {
        this.lebronScore.textContent = this.scores.lebron;
        this.mjScore.textContent = this.scores.mj;
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'lebron';
        this.gameActive = true;

        this.cells.forEach(cell => {
            cell.className = 'cell';
            cell.style.pointerEvents = 'auto';
            cell.innerHTML = ''; // Clear any images
        });

        this.gameMessage.textContent = '';
        this.gameMessage.className = 'game-message';
        this.updateDisplay();
    }

    resetScore() {
        this.scores = { lebron: 0, mj: 0 };
        this.updateScoreDisplay();
        this.resetGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});