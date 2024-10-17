/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');

// The board object used to save the current status of a gameplay
let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] =  mark;
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
    console.log(`${board[1]} | ${board[2]} | ${board[3]}`);
    console.log('---------');
    console.log(`${board[4]} | ${board[5]} | ${board[6]}`);
    console.log('---------');
    console.log(`${board[7]} | ${board[8]} | ${board[9]}`);
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
    return position >= 1 && position <= 9 && board[position] === ' ';
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], 
    [1, 4, 7], [2, 5, 8], [3, 6, 9], 
    [1, 5, 9], [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    return winCombinations.some(combination => 
        combination.every(index => board[index] === player)
    );
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    return Object.values(board).every(mark => mark !== ' ');
}


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let position;

    // Keep asking for input until a valid move is made
    do {
        position = parseInt(prompt(`Player ${player}, enter a position (1-9): `));
    } while (!validateMove(position));

    // Mark the board
    markBoard(position, player);

    // Check if the current player wins
    if (checkWin(player)) {
        console.log(`Player ${player} wins!`);
        return true;  // End game if there's a winner
    } else if (checkFull()) {  // Check if the game is a tie
        console.log('The game is a draw!');
        return true;  // End game if it's a tie
    }

    return false;  // Continue game if no winner or tie
}

// Function to restart the game
function restartGame(currentTurnPlayer) {
    let restart = prompt('Do you want to play again? (Y/N): ').toUpperCase();

    if (restart === 'Y') {
        // Reset the board for a new game
        board = { 1: ' ', 2: ' ', 3: ' ', 4: ' ', 5: ' ', 6: ' ', 7: ' ', 8: ' ', 9: ' ' };

        // Change the starting player
        currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X';

        console.log('Game restarted!');
        printBoard();  // Print initial board again
        startGame(currentTurnPlayer);  // Start the game again
    } else {
        console.log('Thanks for playing!');
    }
}

// Function to start the game
function startGame(currentTurnPlayer = 'X') {
    let winnerIdentified = false;

    // Initial message and empty board
    console.log('Game started: \n\n' +
        ' 1 | 2 | 3 \n' +
        ' --------- \n' +
        ' 4 | 5 | 6 \n' +
        ' --------- \n' +
        ' 7 | 8 | 9 \n');
    
    printBoard();  // Print initial board

    // Main game loop
    while (!winnerIdentified) {
        // Get User Input and Check Winner/Tie
        winnerIdentified = playTurn(currentTurnPlayer);  // Play turn and check for winner/tie

        // Print updated board
        printBoard();

        if (!winnerIdentified) {
            // Switch players
            currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X';
        }
    }

    // After the game ends, ask if the user wants to restart
    restartGame(currentTurnPlayer);
}

// Entry point of the program
startGame();