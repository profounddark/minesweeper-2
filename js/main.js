import { GridBoard } from "./grid-board.js";
import { Minesweeper } from "./game-logic.js";

function clickerFunction(x, y, button) {
    console.log(`you clicked ${x}, ${y} with the ${button} button!`)
    // gameBoard.changeToNumber(x, y, 8);
    gameBoard.toggleFlag(x, y);
}

let gameDiv = document.getElementById('board-container');

let gameBoard = new GridBoard(10);
let gameState = new Minesweeper(10, 10);

gameBoard.setClickFunction(gameState.processSpace.bind(gameState));
gameState.setBoardFunction(gameBoard.setSpace.bind(gameBoard));

gameBoard.buildBoard(gameDiv);


